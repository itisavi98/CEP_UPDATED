// frontend/src/services/authService.js
import api from './api';

const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),
};

export default authService;