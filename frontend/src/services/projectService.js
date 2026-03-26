// frontend/src/services/projectService.js
import api from './api';

const projectService = {
  // Ongoing
  getOngoing:      ()        => api.get('/api/ongoing-projects'),
  createOngoing:   (data)    => api.post('/api/ongoing-projects', data),
  updateOngoing:   (id, data)=> api.put(`/api/ongoing-projects/${id}`, data),
  deleteOngoing:   (id)      => api.delete(`/api/ongoing-projects/${id}`),

  // Completed
  getCompleted:    ()        => api.get('/api/completed-projects'),
  createCompleted: (data)    => api.post('/api/completed-projects', data),
  updateCompleted: (id, data)=> api.put(`/api/completed-projects/${id}`, data),
  deleteCompleted: (id)      => api.delete(`/api/completed-projects/${id}`),
};

export default projectService;