import React from "react";

export default function InvestorStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 flex flex-col items-center">
        <span className="text-3xl font-bold text-yellow-600 mb-1">0</span>
        <span className="text-sm text-gray-700">Kết nối mới</span>
      </div>
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 flex flex-col items-center">
        <span className="text-3xl font-bold text-yellow-600 mb-1">0</span>
        <span className="text-sm text-gray-700">Dự án đang theo dõi</span>
      </div>
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 flex flex-col items-center">
        <span className="text-3xl font-bold text-yellow-600 mb-1">0</span>
        <span className="text-sm text-gray-700">Cuộc hẹn tuần này</span>
      </div>
    </div>
  );
}
