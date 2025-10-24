// Centralized API config
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://160.191.243.253:8003';
export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export default {
  API_BASE,
  authHeaders
};
