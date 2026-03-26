// ============================================================
//  routes/clientRoutes.js
//  Mounted at: /api/clients
// ============================================================

import { Router } from 'express';
import { getAllClients, createClient, updateClient, deleteClient } from '../controllers/clientController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/clients  — Public: fetch all clients
router.get('/', getAllClients);

// POST /api/clients  — Admin: create a new client
router.post('/', protect, adminOnly, createClient);

// PUT /api/clients/:id  — Admin: update a client
router.put('/:id', protect, adminOnly, updateClient);

// DELETE /api/clients/:id  — Admin: delete a client
router.delete('/:id', protect, adminOnly, deleteClient);

export default router;