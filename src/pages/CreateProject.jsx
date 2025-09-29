import React, { useState } from "react";
import ProjectBasicInfoForm from "../components/project/ProjectBasicInfoForm";
import ProjectSteps from "../components/project/ProjectSteps";
import RecentActivitySidebar from "../components/project/RecentActivitySidebar";
import AiAssistantSidebar from "../components/project/AiAssistantSidebar";

// Component: Chọn mẫu hồ sơ
function ProjectTemplateSelector({ onSelect }) {
  const templates = [
    { type: "Từ cuộc thi", items: ["Techfest 2021"] },
    { type: "Trạng trắng", items: ["Chọn mẫu trống"] }
  ];

  const navigate = window.reactRouterNavigate || null;
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Chọn mẫu hồ sơ khởi nghiệp</h3>
      </div>
      <div className="flex gap-6 mb-6 flex-wrap">
        {templates.map((group, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex-1 flex flex-col items-center"
          >
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
                  if (item === "Chọn mẫu trống") {
                    if (navigate) {
                      navigate("/custom-project-builder");
                    } else {
                      window.location.href = "/custom-project-builder";
                    }
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
      <div className="flex justify-end">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded">
          Tiếp theo
        </button>
      </div>
    </div>
  );
}

// Layout trang tạo dự án
export default function CreateProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showAI, setShowAI] = useState(true);
  const [showProjectProfileModal, setShowProjectProfileModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar trái: các bước + hoạt động gần đây */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <ProjectSteps currentStep={currentStep} onStepClick={setCurrentStep} />
          <RecentActivitySidebar />
        </div>

        {/* Nội dung chính */}
            <div className="lg:col-span-9 flex items-center justify-center">
              <div className="w-full min-h-[500px] max-w-[1800px] mx-auto">
                {currentStep === 1 ? (
                  <div className="flex w-full min-h-[500px] bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className={`flex-${showAI ? '[2]' : '[1]'} p-12 border-r border-gray-200 w-full`}>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Nhập thông tin cơ bản</span>
                        {!showAI && (
                          <button
                            className="bg-gray-100 hover:bg-yellow-400 text-yellow-500 hover:text-white p-2 rounded-full border border-gray-300 transition flex items-center justify-center"
                            onClick={() => setShowAI(true)}
                            title="Hiện trợ lý AI"
                          >
                            <FontAwesomeIcon icon={faRobot} className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                      <ProjectBasicInfoForm onNext={() => setCurrentStep(2)} />
                    </div>
                    {showAI && (
                      <div className="flex-[1] p-4 flex flex-col justify-between min-w-[260px] max-w-[320px]">
                        <AiAssistantSidebar />
                      </div>
                    )}
                  </div>
                ) : currentStep === 2 ? (
                  <div className="flex w-full min-h-[500px] bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex-1 p-12">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Tải ảnh logo, sản phẩm, hoạt động</h3>
                      </div>
                      <div className="mb-6">
                        <label className="block font-semibold mb-2">Logo Công Ty</label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 text-gray-400 cursor-pointer">
                          <span className="text-2xl mb-2">📷</span>
                          <span>Kéo và thả hoặc click để chọn ảnh</span>
                          <span className="text-xs mt-2">PNG, JPG, tối đa 5MB</span>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block font-semibold mb-2">Ảnh Hoạt Động (Tối đa 3 ảnh)</label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 text-gray-400 cursor-pointer">
                          <span className="text-2xl mb-2">📷</span>
                          <span>Kéo và thả hoặc click để chọn ảnh</span>
                          <span className="text-xs mt-2">PNG, JPG, tối đa 5MB/ảnh</span>
                        </div>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 text-sm text-gray-700">
                          <b>Gợi ý ảnh:</b>
                          <ul className="list-disc ml-4 mt-2">
                            <li>Ảnh hoạt động nổi bật của dự án</li>
                            <li>Ảnh sản phẩm, dịch vụ, sự kiện</li>
                            <li>Ảnh truyền thông, báo chí</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block font-semibold mb-2">Ảnh Đội Ngũ (Tối đa 5 ảnh)</label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 text-gray-400 cursor-pointer">
                          <span className="text-2xl mb-2">📷</span>
                          <span>Kéo và thả hoặc click để chọn ảnh</span>
                          <span className="text-xs mt-2">PNG, JPG, tối đa 5MB/ảnh</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded" onClick={() => setCurrentStep(3)}>
                          Tiếp theo
                        </button>
                      </div>
                    </div>
                    {showAI && (
                      <div className="flex-[1] p-4 flex flex-col justify-between min-w-[260px] max-w-[320px] border-l border-gray-200">
                        <AiAssistantSidebar />
                      </div>
                    )}
                  </div>
                ) : currentStep === 3 ? (
                  <div className="flex w-full min-h-[500px] bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex-1 p-12">
                      <h3 className="text-lg font-semibold mb-6">Xác định ý tưởng và vấn đề</h3>
                      {/* Đã bỏ thanh tiến độ và tiến độ */}
                      <div className="mb-6 mt-6">
                        <label className="block font-medium mb-2">Mô tả ý tưởng của bạn</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[80px] resize-none" placeholder="Nhập mô tả ý tưởng khởi nghiệp" />
                        <span className="text-xs text-gray-500 mt-2 block">Ghi rõ mô tả ý tưởng bạn muốn làm</span>
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Vấn đề thị trường bạn muốn giải quyết</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[80px] resize-none" placeholder="Nhập vấn đề thị trường" />
                        <span className="text-xs text-gray-500 mt-2 block">Xác định rõ vấn đề mà sản phẩm của bạn sẽ giải quyết</span>
                      </div>
                      <div className="flex justify-between">
                        <button className="bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-6 py-3 rounded" onClick={() => setCurrentStep(2)}>
                          Quay lại
                        </button>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded" onClick={() => setCurrentStep(4)}>
                          Tiếp theo
                        </button>
                      </div>
                    </div>
                    {showAI && (
                      <div className="flex-[1] p-4 flex flex-col justify-between min-w-[260px] max-w-[320px] border-l border-gray-200">
                        <AiAssistantSidebar />
                      </div>
                    )}
                  </div>
                ) : currentStep === 4 ? (
                  <div className="flex w-full min-h-[500px] bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex-1 p-12">
                      <h3 className="text-lg font-semibold mb-6">Giải pháp & Sản phẩm/Dịch vụ</h3>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Giải pháp</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[80px] resize-none" placeholder="Mô tả các giải pháp giúp bạn giải quyết vấn đề đã xác định" />
                        <span className="text-xs text-gray-500 mt-2 block">Mô tả rõ các giải pháp/sản phẩm/dịch vụ sẽ phát triển</span>
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Sản phẩm/Dịch vụ</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[80px] resize-none" placeholder="Mô tả sản phẩm/dịch vụ sẽ phát triển" />
                        <span className="text-xs text-gray-500 mt-2 block">Mô tả sản phẩm, dịch vụ, công nghệ, giá trị mang lại</span>
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Ảnh sản phẩm (Tối đa 5 ảnh)</label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 text-gray-400 cursor-pointer">
                          <span className="text-2xl mb-2">📷</span>
                          <span>Kéo và thả ảnh đội ngũ tại đây hoặc click để chọn</span>
                          <span className="text-xs mt-2">PNG, JPG, tối đa 5MB/ảnh</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button className="bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-6 py-3 rounded" onClick={() => setCurrentStep(3)}>
                          Quay lại
                        </button>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded" onClick={() => setCurrentStep(5)}>
                          Tiếp theo
                        </button>
                      </div>
                    </div>
                    {showAI && (
                      <div className="flex-[1] p-4 flex flex-col justify-between min-w-[260px] max-w-[320px] border-l border-gray-200">
                        <AiAssistantSidebar />
                      </div>
                    )}
                  </div>
                ) : currentStep === 5 ? (
                  <div className="flex w-full min-h-[500px] bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex-1 p-12">
                      <h3 className="text-lg font-semibold mb-6">Phân tích thị trường và đối thủ</h3>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Thị trường mục tiêu</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Nhà khởi nghiệp 18-35 tuổi, chủ yếu xây dựng kế hoạch kinh doanh chuyên nghiệp..." />
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Đối thủ cạnh tranh & Lợi thế</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Upwork, LinkedIn... Lợi thế AI hỗ trợ, tối ưu hóa kinh doanh Việt Nam..." />
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Quy mô thị trường</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Thị trường khởi nghiệp Việt Nam, 3.000 doanh nghiệp mới mỗi năm..." />
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Giai đoạn phát triển</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Liệt kê các giai đoạn và mốc phát triển của dự án hoặc sản phẩm..." />
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Các cột mốc quan trọng</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Các cột mốc quan trọng" />
                      </div>
                      <div className="flex justify-between">
                        <button className="bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-6 py-3 rounded" onClick={() => setCurrentStep(4)}>
                          Quay lại
                        </button>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded" onClick={() => setCurrentStep(6)}>
                          Tiếp theo
                        </button>
                      </div>
                    </div>
                    {showAI && (
                      <div className="flex-[1] p-4 flex flex-col justify-between min-w-[260px] max-w-[320px] border-l border-gray-200">
                        <AiAssistantSidebar />
                      </div>
                    )}
                  </div>
                ) : currentStep === 6 ? (
                  <div className="flex w-full min-h-[500px] bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex-1 p-12">
                      <h3 className="text-lg font-semibold mb-6">Xây dựng mô hình kinh doanh</h3>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Mô hình kinh doanh</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Mô hình kinh doanh" />
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Doanh thu dự kiến</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Doanh thu dự kiến" />
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Chi phí dự kiến</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Chi phí dự kiến" />
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Kênh phân phối</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Kênh phân phối" />
                      </div>
                      <div className="mb-6">
                        <label className="block font-medium mb-2">Kế hoạch phát triển</label>
                        <textarea className="w-full border rounded px-4 py-3 min-h-[60px] resize-none" placeholder="Kế hoạch phát triển" />
                      </div>
                      <div className="flex justify-end">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded" onClick={() => setCurrentStep(7)}>
                          Tiếp theo
                        </button>
                      </div>
                    </div>
                    {showAI && (
                      <div className="flex-[1] p-4 flex flex-col justify-between min-w-[260px] max-w-[320px] border-l border-gray-200">
                        <AiAssistantSidebar />
                      </div>
                    )}
                  </div>
                ) : currentStep === 7 ? (
                  <div className="flex w-full min-h-[650px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {/* Nội dung chính */}
                    <div className="flex-1 p-10 flex flex-col gap-10">
                      {/* Tiêu đề */}
                      <h3 className="text-2xl font-bold text-gray-900">Hoàn thiện & Kết nối</h3>

                      {/* Preview hồ sơ */}
                      <div>
                        <h4 className="text-lg font-semibold text-yellow-600 mb-4">Preview hồ sơ</h4>
                        <div className="border-2 border-yellow-400 rounded-xl p-8 bg-yellow-50 shadow-sm space-y-4">
                          <div>
                            <span className="font-bold text-gray-700">Tên dự án:</span>
                            <span className="ml-2 text-gray-800">Nền tảng giáo dục công nghệ</span>
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Lĩnh vực:</span>
                            <span className="ml-2 text-gray-800">Công nghệ giáo dục</span>
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Ý tưởng/Vấn đề:</span>
                            <span className="ml-2 text-gray-800">Giải quyết vấn đề tiếp cận giáo dục chất lượng</span>
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Giải pháp/Sản phẩm:</span>
                            <span className="ml-2 text-gray-800">Nền tảng học tập AI cá nhân hóa</span>
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Thị trường/Đối thủ:</span>
                            <span className="ml-2 text-gray-800">Thị trường giáo dục Việt Nam, đối thủ: Edtech, Coursera...</span>
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Mô hình kinh doanh:</span>
                            <span className="ml-2 text-gray-800">Thu phí theo khóa học, hợp tác trường học</span>
                          </div>
                        </div>
                      </div>

                      {/* Hành động & kết nối */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Cột trái */}
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="watermark"
                              className="w-4 h-4 accent-yellow-400"
                              defaultChecked
                            />
                            <label
                              htmlFor="watermark"
                              className="text-sm font-medium text-gray-700 cursor-pointer"
                            >
                              Watermark
                            </label>
                            <span className="ml-2 text-xs text-gray-500">
                              Bảo vệ hồ sơ khi chia sẻ
                            </span>
                          </div>
                          <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded-lg shadow transition">
                            Tùy chỉnh hồ sơ
                          </button>

                            <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded-lg shadow transition" onClick={() => setShowProjectProfileModal(true)}>
                              Đăng thông tin dự án
                            </button>

                        </div>

                        {/* Cột phải */}
                        <div className="flex flex-col gap-6">
                          <div>
                            <h4 className="font-semibold text-base mb-2">Kết nối</h4>
                            <div className="flex gap-3 mb-4">
                              <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-4 py-2 rounded-lg shadow transition">
                                Xuất hồ sơ
                              </button>
                              <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-4 py-2 rounded-lg shadow transition">
                                Share
                              </button>
                            </div>
                            <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-sm font-semibold px-4 py-2 rounded-lg shadow transition">
                              Gửi yêu cầu kết nối với Mentor/Investor
                            </button>
                          </div>

                          {/* Thành viên dự án */}
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Thành viên dự án</h4>
                            <div className="bg-gray-50 border rounded-lg p-4 space-y-3 shadow-sm">
                              {[
                                { name: "Lê Tuấn Đạt", role: "CEO" },
                                { name: "Nguyễn An", role: "Co-Founder" },
                                { name: "Trần Đạt", role: "Co-Founder" }
                              ].map((m, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="font-bold text-gray-800">{m.name}</span>
                                  <span className="bg-white border px-2 py-1 text-xs rounded text-gray-600">
                                    {m.role}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Nút quay lại */}
                    {/* Modal xem trước hồ sơ dự án */}
                    {showProjectProfileModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl shadow-xl p-0 w-full max-w-3xl relative">
                          {/* Header */}
                          <div className="flex items-center justify-between px-8 pt-8 pb-2">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">Edutech Platform</h2>
                              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Đang phát triển</span>
                              <span className="ml-3 text-xs text-gray-400">Cập nhật: 25/08/2025</span>
                            </div>
                            <button
                              className="text-gray-400 hover:text-gray-700 text-2xl"
                              onClick={() => setShowProjectProfileModal(false)}
                            >
                              &times;
                            </button>
                          </div>
                          {/* Main content */}
                          <div className="grid grid-cols-2 gap-6 px-8 pb-8">
                            {/* Đội ngũ */}
                            <div>
                              <h4 className="font-semibold mb-3">Đội ngũ</h4>
                              <div className="flex gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-10 h-10 rounded-full" />
                                  <div>
                                    <div className="font-bold text-gray-800">Lê Tuấn Đạt <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded ml-2">CEO</span></div>
                                    <div className="text-xs text-gray-500">Founder & Leader</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="avatar" className="w-10 h-10 rounded-full" />
                                  <div>
                                    <div className="font-bold text-gray-800">Nguyễn An <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ml-2">Co-founder</span></div>
                                    <div className="text-xs text-gray-500">Technical Lead</div>
                                  </div>
                                </div>
                              </div>
                              {/* Vấn đề & Giải pháp */}
                              <div className="bg-white border rounded-xl p-5 mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-red-100 text-red-500 rounded-full w-6 h-6 flex items-center justify-center"><svg width="16" height="16" fill="currentColor"><circle cx="8" cy="8" r="8"/></svg></span>
                                  <span className="font-semibold text-gray-800">Vấn đề và Giải pháp</span>
                                </div>
                                <div className="mb-2">
                                  <span className="font-bold text-gray-700">Vấn đề</span>
                                  <div className="text-sm text-gray-700 mt-1">Hệ thống giáo dục truyền thống không đáp ứng được nhu cầu học tập cá nhân hóa và linh hoạt của học sinh trong thời đại số.</div>
                                </div>
                                <div>
                                  <span className="font-bold text-gray-700">Giải pháp</span>
                                  <div className="text-sm text-gray-700 mt-1">Nền tảng giáo dục trực tuyến với AI cá nhân hóa, cung cấp trải nghiệm học tập thích ứng và tương tác cao cho học sinh.</div>
                                </div>
                              </div>
                              {/* Thị trường */}
                              <div className="bg-white border rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-blue-100 text-blue-500 rounded-full w-6 h-6 flex items-center justify-center"><svg width="16" height="16" fill="currentColor"><rect width="16" height="16"/></svg></span>
                                  <span className="font-semibold text-gray-800">Thị trường</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Quy mô thị trường</div>
                                    <div className="font-semibold text-gray-700">Thị trường EdTech toàn cầu</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Khách hàng mục tiêu</div>
                                    <div className="font-semibold text-gray-700">Học sinh tại Việt Nam</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Tiến độ & Mô hình kinh doanh */}
                            <div className="flex flex-col gap-6">
                              {/* Tiến độ */}
                              <div className="bg-white border rounded-xl p-5 mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-purple-100 text-purple-500 rounded-full w-6 h-6 flex items-center justify-center"><svg width="16" height="16" fill="currentColor"><rect width="16" height="16"/></svg></span>
                                  <span className="font-semibold text-gray-800">Tiến độ</span>
                                </div>
                                <div className="mb-2">
                                  <span className="font-bold text-gray-700">Giai đoạn hiện tại</span>
                                  <div className="text-sm text-gray-700 mt-1">MVP Development Phase</div>
                                </div>
                                <div>
                                  <span className="font-bold text-gray-700">Các mốc quan trọng</span>
                                  <ul className="mt-2 space-y-1 text-sm">
                                    <li><span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>Q2 2025: Hoàn thành nghiên cứu thị trường</li>
                                    <li><span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>Q3 2025: Phát triển MVP (đang thực hiện)</li>
                                    <li><span className="inline-block w-2 h-2 rounded-full bg-gray-300 mr-2"></span>Q4 2025: Beta testing với 1000 users</li>
                                    <li><span className="inline-block w-2 h-2 rounded-full bg-gray-300 mr-2"></span>Q1 2026: Official launch</li>
                                  </ul>
                                </div>
                              </div>
                              {/* Mô hình kinh doanh */}
                              <div className="bg-white border rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-green-100 text-green-500 rounded-full w-6 h-6 flex items-center justify-center"><svg width="16" height="16" fill="currentColor"><rect width="16" height="16"/></svg></span>
                                  <span className="font-semibold text-gray-800">Mô hình Kinh doanh</span>
                                </div>
                                <div>
                                  <span className="font-bold text-gray-700">Nguồn doanh thu</span>
                                  <div className="text-sm text-gray-700 mt-1">Subscription Model<br />Gói học phí hàng tháng/năm</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Footer */}
                          <div className="flex items-center justify-end gap-4 px-8 pb-8">
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg" onClick={() => setShowProjectProfileModal(false)}>Đóng</button>
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
                              <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
                              Đăng dự án
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                      <div className="flex justify-start mt-6">
                        <button
                          className="bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-6 py-3 rounded-lg shadow transition"
                          onClick={() => { setCurrentStep(6); setShowProjectProfileModal(true); }}
                          onClickCapture={() => setShowProjectProfileModal(false)}
                        >
                          Quay lại
                        </button>
                      </div>
                    </div>

                    {/* Trợ lý AI */}
                    {showAI && (
                      <div className="flex-[1] p-8 min-w-[320px] max-w-[400px] border-l border-gray-200 bg-gray-50">
                        <AiAssistantSidebar />
                      </div>
                    )}
                  </div>
                ) : (
                  <ProjectTemplateSelector onSelect={() => setCurrentStep(1)} />
                )}
              </div>
            </div>

        {/* Sidebar phải: Trợ lý AI */}
        {/* Đã nối khung AI vào form, không cần sidebar phải nữa */}
      </div>
    </div>
  );
}
