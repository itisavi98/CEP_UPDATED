// ============================================================
//  middleware/authMiddleware.js
//  Verifies Supabase-issued JWTs using your SUPABASE_JWT_SECRET.
//  Attaches decoded user payload to req.user.
// ============================================================

import jwt from 'jsonwebtoken';

// ── 1. Verify Supabase JWT ───────────────────────────────────
export const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Supabase signs JWTs with your project's JWT secret.
    // Find it in: Supabase Dashboard → Project Settings → API → JWT Secret
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);

    // Supabase JWT payload shape:
    // { sub, email, role, aud, exp, iat, ... }
    req.user = {
      id:    decoded.sub,
      email: decoded.email,
      role:  decoded.role,         // 'authenticated' for normal users
      // custom app role from user_metadata (optional, see notes below)
      appRole: decoded.user_metadata?.app_role ?? null,
    };

    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// ── 2. Admin role guard ──────────────────────────────────────
// Uses app_role stored in Supabase user_metadata.
// To set this, run in Supabase SQL editor:
//   UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"app_role":"admin"}'
//   WHERE email = 'admin@dreamland.com';
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.appRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  next();
};