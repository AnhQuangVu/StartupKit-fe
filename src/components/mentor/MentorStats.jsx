import React from "react";

export default function MentorStats() {
  const stats = [
    { label: "Kết nối mới", value: 0 },
    { label: "Dự án đang theo dõi", value: 0 },
    { label: "Cuộc hẹn tuần này", value: 0 }
  ];
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-600 mb-1">{stat.value}</span>
          <span className="text-sm text-gray-700">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
