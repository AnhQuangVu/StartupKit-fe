// NotificationBell.jsx
import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function NotificationBell() {
  const { notifications, count, loading, markRead, deleteNotification, markAllRead } = useNotification();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative bg-transparent border-none cursor-pointer focus:outline-none group mt-1"
        aria-label="Thông báo"
      >
        <FontAwesomeIcon
          icon={faBell}
          className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 transition-colors duration-150"
        />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow border-2 border-white">{count}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 font-semibold text-gray-800">
            <span>Thông báo</span>
            <button
              className="text-xs text-yellow-600 hover:underline font-medium"
              onClick={markAllRead}
            >
              Đánh dấu tất cả đã đọc
            </button>
          </div>
          {loading ? (
            <div className="p-6 text-center text-gray-500">Đang tải...</div>
          ) : notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              <span className="text-2xl">📭</span>
              <div className="mt-2">Không có thông báo mới</div>
            </div>
          ) : (
            <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100">
              {notifications.map(n => (
                <li
                  key={n.id}
                  className={`px-4 py-3 flex flex-col gap-1 transition bg-white hover:bg-yellow-50 ${n.read ? 'opacity-70' : ''}`}
                >
                  <div className="font-medium text-gray-900">{n.title}</div>
                  <div className="text-sm text-gray-600">{n.content}</div>
                  <div className="flex gap-2 mt-1">
                    {!n.read && (
                      <button
                        className="text-xs text-blue-600 hover:underline"
                        onClick={() => markRead(n.id)}
                      >Đã đọc</button>
                    )}
                    <button
                      className="text-xs text-red-500 hover:underline"
                      onClick={() => deleteNotification(n.id)}
                    >Xóa</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
