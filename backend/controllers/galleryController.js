// ============================================================
//  controllers/galleryController.js
//  CRUD for the public gallery carousel images.
// ============================================================

import { supabase } from '../config/supabase.js';

// GET /api/gallery  — Public
export const getAllGalleryImages = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('getAllGalleryImages error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
};

// POST /api/gallery  — Admin
export const createGalleryImage = async (req, res) => {
  try {
    const { src, alt, title, description, category } = req.body;

    const { data, error } = await supabase
      .from('gallery')
      .insert({
        src,
        alt,
        title: title || null,
        description: description || null,
        category: category || null,
      })
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('createGalleryImage error:', error);
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ error: 'Gallery image already exists' });
    }
    res.status(500).json({ error: 'Failed to add gallery image' });
  }
};

// PUT /api/gallery/:id  — Admin
export const updateGalleryImage = async (req, res) => {
  try {
    const { src, alt, title, description, category } = req.body;

    const { data, error } = await supabase
      .from('gallery')
      .update({
        src, alt,
        title: title || null,
        description: description || null,
        category: category || null,
      })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.json(data[0]);
  } catch (error) {
    console.error('updateGalleryImage error:', error);
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
};

// DELETE /api/gallery/:id  — Admin
export const deleteGalleryImage = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('deleteGalleryImage error:', error);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
};