// ============================================================
//  middleware/authMiddleware.js
//  Two reusable Express middleware functions:
//
//  1. protect   — verifies the JWT token on the request.
//                 Attaches the decoded user payload to req.user.
//
//  2. adminOnly — must come AFTER protect.
//                 Blocks non-admin users from protected routes.
// ============================================================

import jwt from 'jsonwebtoken';

// ── 1. Verify JWT ────────────────────────────────────────────
export const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Handle demo token in development
  if (process.env.NODE_ENV !== 'production' && token === 'dev-demo-admin-token') {
    req.user = {
      id: 'demo-admin',
      email: 'admin@dreamland.com',
      role: 'admin'
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role, iat, exp }
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// ── 2. Admin role guard ──────────────────────────────────────
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  next();
};