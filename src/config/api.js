// Centralized API config
// Production (Vercel): use /api/proxy to avoid Mixed Content errors
// Development (local): use vite proxy (see vite.config.js)
export const API_BASE = import.meta.env.VITE_API_BASE || '/api/proxy';

export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export default {
  API_BASE,
  authHeaders
};
