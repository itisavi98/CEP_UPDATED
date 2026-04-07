// frontend/src/services/api.js
// Base Axios instance — all API calls go through this
import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000')
  : (import.meta.env.VITE_API_URL || 'https://cep-updated.vercel.app/api');

if (!import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
  console.warn('VITE_API_URL is not defined; falling back to https://cep-updated.vercel.app/api');
}

const api = axios.create({
  baseURL,
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;