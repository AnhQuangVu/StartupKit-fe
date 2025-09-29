import React, { useState } from "react";

export default function RecentActivitySidebar() {
  const [showHistory, setShowHistory] = useState(false);
  const activities = [
    { name: "Lê Tuấn Đạt", time: "09:45" },
    { name: "Nguyễn An", time: "10:15" },
    { name: "Mai Linh", time: "10:45" },
    { name: "Trần Minh", time: "09:30" }
  ];
  const history = [
    { user: "Lê Tuấn Đạt", action: "Chỉnh sửa mô tả dự án", time: "09:45" },
    { user: "Nguyễn An", action: "Thêm thành viên", time: "10:15" },
    { user: "Mai Linh", action: "Cập nhật tiến độ", time: "10:45" },
    { user: "Trần Minh", action: "Xóa tài liệu cũ", time: "09:30" }
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-base font-semibold mb-3">Hoạt động gần đây</h3>
      <ul className="space-y-2 mb-3">
        {activities.map((a, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
            <span className="font-medium text-gray-700">{a.name}</span>
            <span className="text-gray-400 ml-auto">{a.time}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold rounded py-2" onClick={() => setShowHistory(true)}>
        Xem tất cả
      </button>
      {/* Modal lịch sử chỉnh sửa */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Lịch sử chỉnh sửa dự án</h3>
            <ul className="space-y-3 mb-4">
              {history.map((h, idx) => (
                <li key={idx} className="text-sm flex flex-col">
                  <span className="font-semibold text-gray-800">{h.user}</span>
                  <span className="text-gray-600">{h.action}</span>
                  <span className="text-gray-400 text-xs">{h.time}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold rounded py-2" onClick={() => setShowHistory(false)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
