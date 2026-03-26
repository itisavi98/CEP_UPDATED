// frontend/src/controllers/useGallery.js
import { useState, useEffect, useCallback } from 'react';
import supabaseGalleryService from '../services/supabaseGalleryService';
import backendGalleryService from '../services/galleryService';

const safeGalleryAction = async (supabaseAction, backendAction) => {
  try {
    return await supabaseAction();
  } catch (supabaseError) {
    console.warn('Supabase gallery action failed; falling back to backend:', supabaseError.message || supabaseError);
    return backendAction();
  }
};

export function useGallery() {
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try Supabase first for reading (might work with public read policy)
      const res = await safeGalleryAction(
        () => supabaseGalleryService.getAll(),
        () => backendGalleryService.getAll()
      );
      const data = res?.data ?? [];
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const createImage = async (formData) => {
    // Use backend API for admin operations (has proper auth)
    const res = await backendGalleryService.create(formData);
    await fetchImages();
    return res?.data;
  };

  const updateImage = async (id, formData) => {
    // Strip fields Supabase shouldn't receive on update
    const { id: _id, created_at, ...cleanData } = formData;
    // Use backend API for admin operations (has proper auth)
    const res = await backendGalleryService.update(id, cleanData);
    await fetchImages();
    return res?.data;
  };

  const deleteImage = async (id) => {
    // Use backend API for admin operations (has proper auth)
    const res = await backendGalleryService.delete(id);
    await fetchImages();
    return res?.data;
  };

  return { images, loading, error, refetch: fetchImages, createImage, updateImage, deleteImage };
}