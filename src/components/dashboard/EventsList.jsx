import React from "react";

export default function EventsList() {
  const events = [
    {
      title: "Tư vấn với mentor Lê Tuấn Đạt",
      date: "15/01/2025",
      time: "09:00"
    },
    {
      title: "Thông báo sự kiện",
      date: "22/01/2025",
      time: "14:30"
    },
    {
      title: "Hạn chót HOU Start UP",
      date: "28/01/2025",
      time: "16:00"
    }
  ];

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
