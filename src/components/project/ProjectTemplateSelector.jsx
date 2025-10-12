import React from "react";

function ProjectTemplateSelector({ onSelect }) {
  const templates = [
    { type: "Từ cuộc thi", items: ["Techfest 2021"] },
    { type: "Trạng trắng", items: ["Chọn mẫu trống"] }
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full">
      <h3 className="text-lg font-semibold mb-6">Chọn mẫu hồ sơ khởi nghiệp</h3>
      <div className="flex gap-6 mb-6 flex-wrap">
        {templates.map((group, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex-1 flex flex-col items-center">
            <span className="text-sm font-bold text-yellow-500 mb-3">{group.type}</span>
            {group.items.map((item, i) => (
              <button
                key={i}
                className={`w-full bg-white hover:bg-yellow-100 text-sm rounded px-4 py-2 border mb-2 font-semibold ${
                  group.type === "Trạng trắng"
                    ? "text-yellow-600 border-yellow-400"
                    : "text-gray-700 border-gray-200"
                }`}
                onClick={() => {
                  if (group.type === "Trạng trắng") {
                    onSelect("blank"); // chuyển sang bước tạo hồ sơ
                  } else {
                    onSelect(item);
                  }
                }}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectTemplateSelector;
