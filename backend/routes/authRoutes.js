// ============================================================
//  routes/authRoutes.js
//  Mounted at: /api/auth
//
//  NOTE: Login is now handled client-side by Supabase Auth SDK.
//  This router only exposes token verification and admin helpers.
// ============================================================

import { Router } from 'express';
import { verifyToken, createTestUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// GET  /api/auth/verify  — requires valid Supabase JWT
router.get('/verify', protect, verifyToken);

// POST /api/auth/create-test-user  — dev only
router.post('/create-test-user', createTestUser);

export default router;