// Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import { API_BASE, authHeaders } from "../../config/api";

const mockProjects = [
  {
    id: 1,
    name: "EduTech Platform",
    tagline: "Nền tảng học tập trực tuyến thông minh",
    description: "Ứng dụng giáo dục sử dụng AI để cá nhân hóa học tập",
    stage: "launch",
    created_at: "2025-08-15T10:30:00",
    updated_at: "2026-02-05T14:20:00"
  },
  {
    id: 2,
    name: "GreenEnergy Solutions",
    tagline: "Giải pháp năng lượng tái tạo cho nhà ở",
    description: "Hệ thống panel năng lượng mặt trời thông minh",
    stage: "hoan-thien-san-pham",
    created_at: "2025-10-20T08:15:00",
    updated_at: "2026-02-08T09:45:00"
  },
  {
    id: 3,
    name: "HealthTrack App",
    tagline: "Ứng dụng theo dõi sức khỏe cộng đồng",
    description: "Nền tảng kết nối người khỏe mạnh và đội y tế",
    stage: "nghien-cuu-thi-truong",
    created_at: "2025-12-01T16:00:00",
    updated_at: "2026-02-09T11:30:00"
  },
  {
    id: 4,
    name: "E-Commerce Logistics",
    tagline: "Nền tảng giao hàng nhanh cho TMĐT",
    description: "Hệ thống quản lý vận chuyển tối ưu",
    stage: "y-tuong",
    created_at: "2026-01-10T12:00:00",
    updated_at: "2026-02-09T15:20:00"
  }
];

export default function ProjectList() {
  const [projectList, setProjectList] = useState(mockProjects);
  const [animateId, setAnimateId] = useState(null);

  // Stage mapping
  const stageMap = {
    "y-tuong": "(ý tưởng)",
    "nghien-cuu-thi-truong": "(nghiên cứu thị trường)",
    "hoan-thien-san-pham": "(hoàn thiện sản phẩm)",
    "khao-sat": "(khảo sát)",
    launch: "(ra mắt)",
  };

  const getDisplayStage = (stage) => {
    return stageMap[stage] || stage;
  };

  // Kích hoạt animation khi chọn dự án mới
  useEffect(() => {
    if (animateId !== null) {
      const timer = setTimeout(() => setAnimateId(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [animateId]);

  useEffect(() => {
    async function fetchProjects() {
      // Using mock data - skip real API call
      return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/projects/?skip=0&limit=50`, {
          method: "GET",
          headers: {
            ...authHeaders(token),
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          setProjectList([]);
          return;
          try {
            const errorData = await res.json();
            if (errorData && errorData.message) errorMsg = errorData.message;
            else if (typeof errorData === "string") errorMsg = errorData;
            else if (errorData && errorData.detail) errorMsg = errorData.detail;
          } catch {}
          if (window.$) {
            window
              .$('<div class="my-toast">' + errorMsg + "</div>")
              .appendTo("body")
              .fadeIn()
              .delay(2000)
              .fadeOut();
          } else {
            var toast = document.createElement("div");
            toast.className = "my-toast";
            toast.innerText = errorMsg;
            toast.style.position = "fixed";
            toast.style.top = "30px";
            toast.style.left = "50%";
            toast.style.transform = "translateX(-50%)";
            toast.style.background = "#333";
            toast.style.color = "#fff";
            toast.style.padding = "12px 24px";
            toast.style.borderRadius = "8px";
            toast.style.zIndex = "9999";
            document.body.appendChild(toast);
            setTimeout(function () {
              toast.remove();
            }, 2000);
          }
          return;
        }
        const data = await res.json();
        setProjectList(data);
      } catch (err) {
        setProjectList([]);
        return;
        if (window.$) {
          window
            .$('<div class="my-toast">Lỗi kết nối API dự án</div>')
            .appendTo("body")
            .fadeIn()
            .delay(2000)
            .fadeOut();
        } else {
          var toast = document.createElement("div");
          toast.className = "my-toast";
          toast.innerText = "Lỗi kết nối API dự án";
          toast.style.position = "fixed";
          toast.style.top = "30px";
          toast.style.left = "50%";
          toast.style.transform = "translateX(-50%)";
          toast.style.background = "#333";
          toast.style.color = "#fff";
          toast.style.padding = "12px 24px";
          toast.style.borderRadius = "8px";
          toast.style.zIndex = "9999";
          document.body.appendChild(toast);
          setTimeout(function () {
            toast.remove();
          }, 2000);
        }
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="px-4 md:px-8 mb-8">
      <div className="bg-white rounded-xl border border-gray-300 shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Các dự án của bạn</h2>
        <div className="space-y-4">
          {projectList.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              Không có dự án nào.
            </div>
          )}
          {projectList.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-base text-[#FFCE23]">
                    {project.name}
                  </h3>
                  {project.tagline && (
                    <div className="text-xs text-gray-500 mb-1">
                      {project.tagline}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-1">
                    {project.stage && (
                      <span>
                        Giai đoạn: <b>{getDisplayStage(project.stage)}</b>
                      </span>
                    )}
                    {project.created_at && (
                      <span>
                        Tạo lúc:{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                      </span>
                    )}
                    {project.updated_at && (
                      <span>
                        Cập nhật:{" "}
                        {new Date(project.updated_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                {/* Nếu có logo_url thì hiển thị logo */}
                {project.logo_url && (
                  <img
                    src={project.logo_url}
                    alt="Logo"
                    className="w-14 h-14 object-cover rounded-xl border ml-4"
                  />
                )}
              </div>
              {/* Bỏ phần hiển thị section */}
            </div>
          ))}
        </div>
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
        <>
          <FontAwesomeIcon
            icon={isOpen ? faCaretDown : faCaretRight}
            className="text-yellow-500 min-w-[18px] text-base flex-shrink-0"
          />
          <span className="ml-1 flex-1 text-left">{title}</span>
        </>
      </button>
      {isOpen && <div className="transition-all">{children}</div>}
    </div>
  );
}
