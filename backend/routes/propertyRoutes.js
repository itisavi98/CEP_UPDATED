// ============================================================
//  routes/propertyRoutes.js
//  Mounted at: /api/properties
// ============================================================

import { Router } from 'express';
import {
  getAllProperties,
  getPropertiesByCategoryAndType,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/properties  — Public: fetch all properties
router.get('/', getAllProperties);

// GET /api/properties/:category/:type?  — Public: fetch properties by category and optional type
// :category = Residential | Commercial | Plots
// :type     = sale | resale | rent (optional)
router.get('/:category/:type?', getPropertiesByCategoryAndType);

// POST /api/properties  — Admin: create a new property
router.post('/', protect, adminOnly, createProperty);

// PUT /api/properties/:id  — Admin: update a property
router.put('/:id', protect, adminOnly, updateProperty);

// DELETE /api/properties/:id  — Admin: delete a property
router.delete('/:id', protect, adminOnly, deleteProperty);

export default router;