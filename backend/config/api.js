const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API = {
  properties: (category, type) =>
    `${BASE_URL}/api/properties?category=${category}&type=${type || ''}`,
  projects: (status) => `${BASE_URL}/api/projects?status=${status}`,
  gallery:  () => `${BASE_URL}/api/gallery`,
  clients:  () => `${BASE_URL}/api/clients`,
};