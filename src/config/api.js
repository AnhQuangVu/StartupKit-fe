// Centralized API config
// Force secure proxy in production to avoid Mixed Content when site runs over HTTPS
// Development (local): allow VITE_API_BASE or fall back to /api/proxy
let resolvedBase = '/api/proxy';

if (!import.meta.env.PROD) {
  // In dev, allow explicit override
  resolvedBase = import.meta.env.VITE_API_BASE || '/api/proxy';
} else {
  // In prod, ignore any insecure http bases to prevent mixed content
  const envBase = import.meta.env.VITE_API_BASE;
  if (envBase && /^https:\/\//i.test(envBase)) {
    resolvedBase = envBase;
  } else {
    resolvedBase = '/api/proxy';
  }
}

export const API_BASE = resolvedBase;

export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export default {
  API_BASE,
  authHeaders
};
