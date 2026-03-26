// frontend/src/services/clientService.js
import api from './api';

const clientService = {
  getAll: ()         => api.get('/api/clients'),
  create: (data)     => api.post('/api/clients', data),
  update: (id, data) => api.put(`/api/clients/${id}`, data),
  delete: (id)       => api.delete(`/api/clients/${id}`),
};

export default clientService;