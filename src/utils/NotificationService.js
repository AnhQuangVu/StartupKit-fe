// NotificationService.js
// Service để gọi các API thông báo

const API_BASE = '/api/notifications';

export const NotificationService = {
  async getList() {
    const res = await fetch(`${API_BASE}/list`, { credentials: 'include' });
    return res.json();
  },
  async getCount() {
    const res = await fetch(`${API_BASE}/count`, { credentials: 'include' });
    return res.json();
  },
  async getDetail(id) {
    const res = await fetch(`${API_BASE}/detail/${id}`, { credentials: 'include' });
    return res.json();
  },
  async markRead(id) {
    const res = await fetch(`${API_BASE}/mark-read/${id}`, { method: 'POST', credentials: 'include' });
    return res.json();
  },
  async delete(id) {
    const res = await fetch(`${API_BASE}/delete/${id}`, { method: 'DELETE', credentials: 'include' });
    return res.json();
  },
  async markAllRead() {
    const res = await fetch(`${API_BASE}/mark-all-read`, { method: 'POST', credentials: 'include' });
    return res.json();
  }
};
