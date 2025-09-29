// Import FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import React, { useState, useEffect } from "react";

const initialProjects = [
  {
    id: 1,
    title: "Edutech Platform",
    description: "Nền tảng giáo dục trực tuyến",
    progress: 75,
    status: "Đang xác định mục tiêu",
    tasks: [
      { text: "Phân tích nhu cầu học tập", completed: false },
      { text: "Thiết kế giao diện người dùng", completed: false },
      { text: "Tích hợp hệ thống quản lý khóa học", completed: false }
    ]
  },
  {
    id: 2,
    title: "Fintech Solution",
    description: "Ứng dụng tài chính",
    progress: 60,
    status: "Đang xác định ý tưởng thị trường",
    tasks: [
      { text: "Nghiên cứu thị trường tài chính", completed: false },
      { text: "Phát triển API thanh toán", completed: false },
      { text: "Kiểm thử bảo mật hệ thống", completed: false }
    ]
  }
];

export default function ProjectList() {
  const [projectList, setProjectList] = useState(initialProjects);
  const [animateId, setAnimateId] = useState(null);

  // Kích hoạt animation khi chọn dự án mới
  useEffect(() => {
    if (animateId !== null) {
      const timer = setTimeout(() => setAnimateId(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [animateId]);

  return (
    <div className="px-4 md:px-8 mb-8">
      <style>{`
        @keyframes progress-bar {
          0% { width: 0; }
          100% { width: var(--progress-width); }
        }
        .animate-progress-bar {
          animation: progress-bar 1s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
      <h2 className="text-lg font-semibold mb-4">Các dự án của bạn</h2>
      <div className="space-y-4">
        {projectList.map(project => (
          <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-sm">{project.title}</h3>
                <div className="text-xs text-gray-500">{project.description}</div>
              </div>
              <span className="text-xs font-bold">{project.progress}%</span>
            </div>
            {/* Progress bar with animation */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-1000 ${animateId === project.id ? 'animate-progress-bar' : ''}`}
                style={{
                  width: `${project.progress}%`,
                  background: project.progress === 100 ? '#4ade80' : project.progress < 30 ? '#f87171' : '#facc15',
                  boxShadow: animateId === project.id ? '0 0 6px #facc15' : 'none',
                  '--progress-width': `${project.progress}%`
                }}
                onMouseEnter={() => setAnimateId(project.id)}
              ></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <span className="font-medium text-green-600">{project.status}</span>
            </div>
            {/* Hiển thị danh sách các task */}
            <div className="mb-2">
              <span className="text-xs font-semibold text-gray-700">Tasks:</span>
              <ul className="pl-4 mt-1 space-y-1">
                {project.tasks && project.tasks.length > 0 ? (
                  project.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-center justify-between text-xs">
                      <span className={task.completed ? "line-through text-gray-400" : "text-gray-700"}>{task.text}</span>
                      <button
                        className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition"
                        onClick={() => {
                          setProjectList(prev =>
                            prev.map(p =>
                              p.id === project.id
                                ? {
                                    ...p,
                                    tasks: p.tasks.filter((_, i) => i !== idx)
                                  }
                                : p
                            )
                          );
                        }}
                      >Hoàn thành</button>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-400">Không có nhiệm vụ nào.</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// Collapsible component definition
function Collapsible({ title, children, isFirst }) {
  const [isOpen, setIsOpen] = useState(isFirst);
  
  return (
    <div className="mb-2">
      <button
        className="flex items-center text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors w-full"
        onClick={() => setIsOpen(!isOpen)}
        style={{ minHeight: 28 }}
      >
        <><FontAwesomeIcon icon={isOpen ? faCaretDown : faCaretRight} className="text-yellow-500 min-w-[18px] text-base flex-shrink-0" /><span className="ml-1 flex-1 text-left">{title}</span></>
      </button>
      {isOpen && <div className="transition-all">{children}</div>}
    </div>
  );
}

