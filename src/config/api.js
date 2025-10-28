// Backend API Base URL - đọc từ .env file
const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';
export { API_BASE };
export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });
export default { API_BASE, authHeaders };
