// Use proxy route for API calls
const API_BASE = '/api/proxy';
export { API_BASE };
export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });
export default { API_BASE, authHeaders };
