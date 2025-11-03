// NotificationProvider wrapper for App.jsx
import React from 'react';
import { NotificationProvider } from './context/NotificationContext';
import App from './App';

export default function AppWithNotification() {
  return (
    <NotificationProvider>
      <App />
    </NotificationProvider>
  );
}
