import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../context/AuthContext';

export default function PriorityTasks({ userType }) {
  const { user } = useAuth();
  const role = userType || user?.role || 'startup';

  const tasksByRole = {
    startup: [
      // { text: "Sử dụng số liệu cụ thể về quy mô thị trường", completed: false },
      // { text: "Phân tích SWOT so với đối thủ", completed: false },
      // { text: "Xác định rõ lợi thế cạnh tranh độc đáo", completed: false },
      // { text: "Bổ sung mô hình kinh doanh", completed: false },
      // { text: "Hoàn thiện phần trình bày tài chính", completed: false }
    ],
    mentor: [
      { text: "Kiểm tra tiến độ dự án tư vấn", completed: false },
      { text: "Đánh giá hồ sơ startup gửi lên", completed: false },
      { text: "Chuẩn bị tài liệu cho buổi tư vấn", completed: false }
    ],
    investor: [
      { text: "Xem xét dự án tiềm năng", completed: false },
      { text: "Đánh giá hồ sơ tài chính", completed: false },
      { text: "Chuẩn bị câu hỏi cho buổi demo", completed: false }
    ],
    admin: [
      { text: "Kiểm tra tiến độ toàn hệ thống", completed: false },
      { text: "Duyệt hồ sơ mới", completed: false },
      { text: "Quản lý sự kiện", completed: false }
    ],
  };
  const initialTasks = tasksByRole[role] || tasksByRole['startup'];
  const [tasks, setTasks] = useState(initialTasks);

  const handleComplete = (idx) => {
    setTasks(tasks => tasks.map((task, i) => i === idx ? { ...task, completed: true } : task));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm">
      <h2 className="text-base font-bold mb-4">Nhiệm vụ ưu tiên</h2>
      <ul className="space-y-3">
        {tasks.filter(task => !task.completed).length === 0 ? (
          <li className="text-sm text-gray-400">Đã hoàn thành tất cả nhiệm vụ!</li>
        ) : (
          tasks.map((task, idx) =>
            !task.completed && (
              <li key={idx} className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCaretRight} className="text-yellow-500 text-base min-w-[18px]" />
                <span className="text-sm text-gray-700 flex-1">{task.text}</span>
                <button
                  className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                  onClick={() => handleComplete(idx)}
                >Hoàn thành</button>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}
