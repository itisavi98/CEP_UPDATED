// ============================================================
//  controllers/authController.js
//  Auth is now handled client-side by Supabase.
//  This controller only exposes:
//    - verifyToken  : confirms the token is valid (used by frontend)
//    - createTestUser: admin SDK helper to create users server-side
// ============================================================

import { supabase } from '../config/supabase.js';

// ── GET /api/auth/verify ────────────────────────────────────
// req.user is already populated by the protect middleware.
export const verifyToken = (req, res) => {
  res.json({
    user: {
      id:      req.user.id,
      email:   req.user.email,
      role:    req.user.role,
      appRole: req.user.appRole,
    },
  });
};

// ── POST /api/auth/create-test-user ──────────────────────────
// Creates a Supabase Auth user via the service-role admin client.
// Only useful for dev/seeding. Guard with adminOnly in production.
export const createTestUser = async (req, res) => {
  try {
    const { email, password, appRole = 'client' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { app_role: appRole },
    });

    if (error) {
      console.error('Create user error:', error);
      return res.status(500).json({ error: error.message || 'Failed to create user' });
    }

    res.json({ message: 'User created successfully', user: data.user });
  } catch (error) {
    console.error('Create test user error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};