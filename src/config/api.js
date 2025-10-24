// Centralized API config
// Production (Vercel): use /api/proxy to avoid Mixed Content errors
// Development (local): use direct backend URL via VITE_API_BASE
const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
export const API_BASE = isDev 
  ? (import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000')
  : '/api/proxy';

export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export default {
  API_BASE,
  authHeaders
};
