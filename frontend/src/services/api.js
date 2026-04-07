// frontend/src/services/api.js
// Base Axios instance — all API calls go through this
import axios from 'axios';

const fallbackProdURL = 'https://cep-updated.vercel.app/api';
const isLocalHostURL = url => typeof url === 'string' && url.includes('localhost');

const baseURL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000')
  : (import.meta.env.VITE_API_URL && !isLocalHostURL(import.meta.env.VITE_API_URL)
      ? import.meta.env.VITE_API_URL
      : fallbackProdURL);

if (!import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
  console.warn('VITE_API_URL is not defined in production; falling back to', fallbackProdURL);
}

if (!import.meta.env.DEV && isLocalHostURL(import.meta.env.VITE_API_URL)) {
  console.warn('VITE_API_URL is pointing to localhost in production; overriding to', fallbackProdURL);
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