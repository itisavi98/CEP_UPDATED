// frontend/src/services/api.js
// Base Axios instance — all API calls go through this
import axios from 'axios';

const fallbackProdURL = 'https://cep-updated.vercel.app';
const isLocalHostURL = url => typeof url === 'string' && url.includes('localhost');
const stripTrailingAPI = (url) => {
  if (!url || typeof url !== 'string') return url;
  return url.replace(/\/api\/?$/, '');
};

const envApiUrl = stripTrailingAPI(import.meta.env.VITE_API_URL);
const baseURL = import.meta.env.DEV
  ? (envApiUrl || 'http://localhost:5000')
  : (envApiUrl && !isLocalHostURL(envApiUrl)
      ? envApiUrl
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