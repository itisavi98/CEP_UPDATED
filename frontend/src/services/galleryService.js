// frontend/src/services/galleryService.js
import api from './api';

const galleryService = {
  getAll: ()         => api.get('/api/gallery'),
  create: (data)     => api.post('/api/gallery', data),
  update: (id, data) => api.put(`/api/gallery/${id}`, data),
  delete: (id)       => api.delete(`/api/gallery/${id}`),
};

export default galleryService;