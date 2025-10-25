// Use CORS proxy to bypass Mixed Content issue
const API_BASE = 'https://cors-anywhere.herokuapp.com/http://160.191.243.253:8003';
export { API_BASE };
export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });
export default { API_BASE, authHeaders };
