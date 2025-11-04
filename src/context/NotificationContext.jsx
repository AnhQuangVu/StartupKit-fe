// NotificationContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { NotificationService } from '../utils/NotificationService';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const list = await NotificationService.getList();
      setNotifications(Array.isArray(list) ? list : []);
      const cnt = await NotificationService.getCount();
      setCount(cnt?.count || 0);
    } catch (e) {
      console.error('Error fetching notifications:', e);
      setNotifications([]);
      setCount(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markRead = async (id) => {
    await NotificationService.markRead(id);
    fetchNotifications();
  };

  const deleteNotification = async (id) => {
    await NotificationService.delete(id);
    fetchNotifications();
  };

  const markAllRead = async () => {
    await NotificationService.markAllRead();
    fetchNotifications();
  };

  return (
    <NotificationContext.Provider value={{ notifications, count, loading, fetchNotifications, markRead, deleteNotification, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
