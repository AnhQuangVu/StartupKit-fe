import React from "react";

export default function ProjectSteps({ currentStep, onStepClick }) {
  const steps = [
    "Chọn mẫu hồ sơ",
    "Nhập thông tin cơ bản",
    "Tải lên logo/hình ảnh",
    "Xác định ý tưởng/vấn đề",
    "Đề xuất giải pháp/sản phẩm",
    "Phân tích thị trường đối thủ",
    "Xây dựng mô hình kinh doanh",
    "Hoàn thành và xác nhận"
  ];
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-base font-semibold mb-4">Các bước tạo hồ sơ</h3>
      {/* Thanh tiến trình */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-yellow-400 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Tiến độ: <span className="font-bold text-yellow-600">{progress}%</span>
      </p>
      <ol className="space-y-3">
        {steps.map((step, idx) => (
          <li key={idx}>
            <button
              className={`w-full flex items-center gap-3 text-sm rounded px-3 py-2 border transition ${
                currentStep === idx
                  ? "bg-yellow-400 text-white border-yellow-400 font-bold"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-yellow-50"
              }`}
              onClick={() => onStepClick(idx)}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs ${
                  currentStep === idx
                    ? "bg-white text-yellow-500 border-yellow-400"
                    : "bg-gray-100 text-gray-400 border-gray-300"
                }`}
              >
                {idx + 1}
              </span>
              <span>{step}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
