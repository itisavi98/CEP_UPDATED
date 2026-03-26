// ============================================================
//  routes/authRoutes.js
//  Mounted at: /api/auth
// ============================================================

import { Router } from 'express';
import { login, verifyToken, createTestUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// POST /api/auth/login
router.post('/login', login);

// GET  /api/auth/verify  — requires valid JWT
router.get('/verify', protect, verifyToken);

// POST /api/auth/create-test-user
router.post('/create-test-user', createTestUser);

export default router;