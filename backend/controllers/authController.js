// ============================================================
//  controllers/authController.js
//  Handles user authentication: login + token verification.
//  Uses bcrypt to compare passwords and JWT to sign tokens.
// ============================================================

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createClient } from '@supabase/supabase-js';

// Create Supabase admin client only if credentials are available
let supabaseAdmin = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY && process.env.SUPABASE_SERVICE_KEY !== 'your_service_role_key_here') {
  supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
}

// ── Helper: sign a JWT ──────────────────────────────────────
const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

// ── POST /api/auth/login ─────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user — include password field (excluded by default in toJSON)
    const user = await User.findOne({ email: email.toLowerCase().trim() })
      .select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If a specific role was requested (e.g. admin), enforce it
    if (role && user.role !== role) {
      return res.status(403).json({ error: `Access denied. ${role} credentials required.` });
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// ── GET /api/auth/verify ────────────────────────────────────
// Returns the currently authenticated user (from JWT payload)
export const verifyToken = (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

// ── POST /api/auth/create-test-user ──────────────────────────
// Creates a test admin user in Supabase for testing purposes
export const createTestUser = async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: 'Supabase admin client not configured. Please set SUPABASE_SERVICE_KEY in environment variables.' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
    });

    if (error) {
      console.error('Create user error:', error);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    res.json({ message: 'Test user created successfully', user: data.user });
  } catch (error) {
    console.error('Create test user error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};