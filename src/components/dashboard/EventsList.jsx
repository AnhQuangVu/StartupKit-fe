import React from "react";
import { useAuth } from '../../context/AuthContext';

export default function EventsList({ userType }) {
  const { user } = useAuth();
  const role = userType || user?.role || 'startup';

  const eventsByRole = {
    startup: [
      // { title: "Tư vấn với mentor Lê Tuấn Đạt", date: "15/01/2025", time: "09:00" },
      // { title: "Thông báo sự kiện", date: "22/01/2025", time: "14:30" },
      // { title: "Hạn chót HOU Start UP", date: "28/01/2025", time: "16:00" },
    ],
    mentor: [
      // { title: "Lịch tư vấn với startup TechFlow", date: "16/01/2025", time: "10:00" },
      // { title: "Họp mentor nội bộ", date: "23/01/2025", time: "15:00" },
    ],
    investor: [
      // { title: "Demo dự án FinanceHub", date: "18/01/2025", time: "13:00" },
      // { title: "Sự kiện đầu tư HOU", date: "25/01/2025", time: "17:00" },
    ],
    admin: [
      { title: "Quản lý sự kiện toàn hệ thống", date: "20/01/2025", time: "09:00" },
      { title: "Kiểm tra tiến độ dự án", date: "27/01/2025", time: "11:00" },
    ],
  };
  const events = eventsByRole[role] || eventsByRole['startup'];

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm">
      <h2 className="text-base font-bold mb-4">Lịch hẹn và sự kiện</h2>
      <ul className="space-y-3">
        {events.map((event, idx) => (
          <li key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0">
            <div>
              <span className="block text-sm font-medium text-gray-900">{event.title}</span>
              <span className="block text-xs text-gray-500">{event.date} - {event.time}</span>
            </div>
            <span className="text-gray-400 text-lg">&#x2026;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
