import React from "react";

export default function RecentActivity() {
  const activities = [
    {
      user: "Nguyễn Văn A",
      action: "đã thêm dự án mới",
      time: "2 phút trước"
    },
    {
      user: "Trần Thị B",
      action: "đã cập nhật tiến độ dự án",
      time: "1 giờ trước"
    },
    {
      user: "Startup HOU",
      action: "đã đăng thông báo sự kiện",
      time: "hôm qua"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm">
      <h2 className="text-base font-bold mb-4">Hoạt động gần đây</h2>
      <ul className="space-y-3">
        {activities.map((activity, idx) => (
          <li key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0">
            <div>
              <span className="block text-sm font-medium text-gray-900">{activity.user}</span>
              <span className="block text-xs text-gray-500">{activity.action}</span>
            </div>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
