// ============================================================
//  routes/galleryRoutes.js
//  Mounted at: /api/gallery
// ============================================================

import { Router } from 'express';
import { getAllGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/gallery  — Public: fetch all gallery images
router.get('/', getAllGalleryImages);

// POST /api/gallery  — Admin: add a new gallery image
router.post('/', protect, adminOnly, createGalleryImage);

// PUT /api/gallery/:id  — Admin: update a gallery image
router.put('/:id', protect, adminOnly, updateGalleryImage);

// DELETE /api/gallery/:id  — Admin: delete a gallery image
router.delete('/:id', protect, adminOnly, deleteGalleryImage);

export default router;