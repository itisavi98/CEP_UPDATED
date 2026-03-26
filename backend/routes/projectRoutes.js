// ============================================================
//  routes/projectRoutes.js
//  Mounted at: /api/projects
// ============================================================

import { Router } from 'express';
import {
  getOngoingProjects,
  createOngoingProject,
  updateOngoingProject,
  deleteOngoingProject,
  getCompletedProjects,
  createCompletedProject,
  updateCompletedProject,
  deleteCompletedProject,
  markProjectComplete,
  undoMarkComplete,
} from '../controllers/projectCotroller.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// ════════════════════════════════════════════════════════════
//  ONGOING PROJECTS
// ════════════════════════════════════════════════════════════

// GET /api/projects/ongoing  — Public: fetch all ongoing projects
router.get('/ongoing', getOngoingProjects);

// POST /api/projects/ongoing  — Admin: create a new ongoing project
router.post('/ongoing', protect, adminOnly, createOngoingProject);

// PUT /api/projects/ongoing/:id  — Admin: update an ongoing project
router.put('/ongoing/:id', protect, adminOnly, updateOngoingProject);

// DELETE /api/projects/ongoing/:id  — Admin: delete an ongoing project
router.delete('/ongoing/:id', protect, adminOnly, deleteOngoingProject);

// ════════════════════════════════════════════════════════════
//  COMPLETED PROJECTS
// ════════════════════════════════════════════════════════════

// GET /api/projects/completed  — Public: fetch all completed projects
router.get('/completed', getCompletedProjects);

// POST /api/projects/completed  — Admin: create a new completed project
router.post('/completed', protect, adminOnly, createCompletedProject);

// PUT /api/projects/completed/:id  — Admin: update a completed project
router.put('/completed/:id', protect, adminOnly, updateCompletedProject);

// DELETE /api/projects/completed/:id  — Admin: delete a completed project
router.delete('/completed/:id', protect, adminOnly, deleteCompletedProject);

// ════════════════════════════════════════════════════════════
//  WORKFLOW ROUTES
// ════════════════════════════════════════════════════════════

// POST /api/projects/mark-complete/:id  — Admin: move ongoing project to completed
router.post('/mark-complete/:id', protect, adminOnly, markProjectComplete);

// POST /api/projects/undo-complete/:id  — Admin: move completed project back to ongoing
router.post('/undo-complete/:id', protect, adminOnly, undoMarkComplete);

export default router;