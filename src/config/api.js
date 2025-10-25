// Centralized API config
// Always use proxy to avoid CORS issues
export const API_BASE = '/api/proxy';

export const API_BASE = resolvedBase;

export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export default {
  API_BASE,
  authHeaders
};
