// frontend/src/services/propertyService.js
import api from './api';

const propertyService = {
  getByCategory:     (cat)        => api.get(`/api/categories/${cat}`),
  getByCategoryType: (cat, type)  => api.get(`/api/categories/${cat}/${type}`),
  create:            (data)       => api.post('/api/properties', data),
  update:            (id, data)   => api.put(`/api/properties/${id}`, data),
  delete:            (id)         => api.delete(`/api/properties/${id}`),
};

export default propertyService;