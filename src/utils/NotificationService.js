// NotificationService.js
// Service để gọi các API thông báo
import { API_BASE } from '../config/api';

const NOTIFICATIONS_API = `${API_BASE}/api/notifications`;

export const NotificationService = {
  async getList() {
    try {
      const res = await fetch(`${NOTIFICATIONS_API}/list`, { credentials: 'include' });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  },
  async getCount() {
    try {
      const res = await fetch(`${NOTIFICATIONS_API}/count`, { credentials: 'include' });
      if (!res.ok) return { count: 0 };
      const data = await res.json();
      return { count: data?.count || 0 };
    } catch (e) {
      return { count: 0 };
    }
  },
  async getDetail(id) {
    try {
      const res = await fetch(`${NOTIFICATIONS_API}/detail/${id}`, { credentials: 'include' });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },
  async markRead(id) {
    try {
      const res = await fetch(`${NOTIFICATIONS_API}/mark-read/${id}`, { 
        method: 'POST', 
        credentials: 'include' 
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },
  async delete(id) {
    try {
      const res = await fetch(`${NOTIFICATIONS_API}/delete/${id}`, { 
        method: 'DELETE', 
        credentials: 'include' 
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },
  async markAllRead() {
    try {
      const res = await fetch(`${NOTIFICATIONS_API}/mark-all-read`, { 
        method: 'POST', 
        credentials: 'include' 
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }
};
