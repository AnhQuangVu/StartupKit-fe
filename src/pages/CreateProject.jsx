import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectProfileFullForm, {
  FORM_SECTIONS,
} from "../components/project/ProjectProfileFullForm";
import { useAuth } from "../context/AuthContext";
import ProjectProfileChatbot from "../components/project/ProjectProfileChatbot";
// Sidebar các bước tạo hồ sơ
function ProjectSteps({ currentStep, onStepClick }) {
  const steps = [
    { label: "Chọn mẫu", value: 0 },
    { label: "Tạo hồ sơ", value: 1 },
    // { label: "Đăng hồ sơ", value: 2 },
    // { label: "Xuất hồ sơ", value: 3 },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <h3 className="font-bold text-gray-700 mb-4">Các bước tạo hồ sơ</h3>
      <div className="flex flex-col gap-4">
        {steps.map((step, idx) => (
          <button
            key={step.value}
            className={`w-full px-4 py-3 rounded-md font-semibold text-left transition ${
              currentStep === step.value
                ? "bg-[#FFCE23] text-black"
                : "bg-gray-100 text-gray-600 hover:bg-yellow-100"
            }`}
            disabled={currentStep === step.value}
            onClick={() => onStepClick(step.value)}
          >
            {step.label}
          </button>
        ))}
      </div>
    </div>
  );
}
// Component: Chọn mẫu hồ sơ
function ProjectTemplateSelector({ onSelect }) {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const navigate = useNavigate();
  const templates = [
    { type: "Từ cuộc thi", items: ["HOU Sinh Viên Startup"] },
    { type: "Trang trắng", items: ["Chọn mẫu trống"] },
    { type: "Tải hồ sơ", items: ["Tải hồ sơ đã có "] },
  ];
  return (
    // mt-24: điện thoại
    // -mt-24: máy tính
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full mt-24 ">
      <h3 className="text-lg font-semibold mb-6">Chọn mẫu hồ sơ khởi nghiệp</h3>
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {templates.map((group, idx) => (
          <div
            key={group.type + "-" + idx}
            className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex-1 flex flex-col items-center"
          >
            <span className="text-sm font-bold text-yellow-500 mb-3">
              {group.type}
            </span>
            {group.items.map((item, i) =>
              group.type === "Trang trắng" ? (
                <React.Fragment key={group.type + "-" + i}>
                  <button
                    key={group.type + "-" + i + "-btn"}
                    className="w-full bg-white hover:bg-yellow-100 text-sm rounded px-4 py-2 border mb-2 font-semibold text-yellow-600 border-yellow-400 text-center"
                    onClick={() => setShowModal(true)}
                  >
                    {item}
                  </button>
                  {showModal && (
                    <div
                      key={group.type + "-" + i + "-modal"}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                    >
                      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
                        <h3 className="text-xl font-bold mb-4 text-yellow-600">
                          Chức năng đang được phát triển
                        </h3>
                        <p className="mb-6 text-gray-700">
                          Tính năng tạo hồ sơ từ mẫu trống sẽ sớm được cập nhật.
                          Vui lòng chọn mẫu khác hoặc quay lại sau.
                        </p>
                        <button
                          className="bg-[#FFCE23] hover:bg-yellow-500 text-base font-semibold px-6 py-2 rounded"
                          onClick={() => setShowModal(false)}
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ) : group.type === "Tải hồ sơ" ? (
                <button
                  key={group.type + "-" + i + "-btn"}
                  className="w-full bg-white hover:bg-yellow-100 text-sm rounded px-4 py-2 border mb-2 font-semibold text-gray-700 border-gray-200"
                  onClick={() => navigate("/profile/upload")}
                >
                  {item}
                </button>
              ) : (
                <button
                  key={group.type + "-" + i + "-btn"}
                  className="w-full bg-white hover:bg-yellow-100 text-sm rounded px-4 py-2 border mb-2 font-semibold text-gray-700 border-gray-200"
                  onClick={() => onSelect(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>
        ))}
      </div>
      {/* Inline upload section (acts like UploadProfile section but embedded) */}
      {showUploadSection && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-4">
          <h4 className="text-lg font-semibold mb-3">Tải hồ sơ lên</h4>
          <p className="text-sm text-gray-600 mb-3">
            Bạn có thể chọn file CV (PDF/DOC/DOCX) để tiếp tục chỉnh sửa hồ sơ.
          </p>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0];
                if (f) {
                  setUploadedFile(f);
                }
              }}
            />
            {uploadedFile && (
              <div className="text-sm text-gray-700">{uploadedFile.name}</div>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                if (uploadedFile) {
                  onSelect &&
                    onSelect({ type: "uploaded", file: uploadedFile });
                  setShowUploadSection(false);
                  setUploadedFile(null);
                }
              }}
              className="bg-[#FFCE23] text-black px-4 py-2 rounded font-semibold"
            >
              Tiếp tục chỉnh sửa hồ sơ
            </button>
            <button
              onClick={() => {
                setShowUploadSection(false);
                setUploadedFile(null);
              }}
              className="bg-white border border-gray-300 px-4 py-2 rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// Main page component
function CreateProject() {
  const { user } = useAuth();
  const role = user?.role || "founder";
  const [currentStep, setCurrentStep] = useState(0); // 0: chọn mẫu, 1: tạo hồ sơ
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [mobileChatbotOpen, setMobileChatbotOpen] = useState(false);
  // Dữ liệu dùng cho ProjectProfileFullForm (new unified form)
  const [form, setForm] = useState({});
  const location = useLocation();
  // If navigated here with a file from UploadProfile, pick it up and set form
  useEffect(() => {
    const state = location.state || {};
    // Xử lý step từ location.state (từ ProfileManagement)
    if (state.step !== undefined) {
      setCurrentStep(state.step);
    }
    // Xử lý project data từ location.state
    if (state.project) {
      // Map dữ liệu từ API sang format của ProjectProfileFullForm
      const mappedData = {
        projectName: state.project.name || "",
        field: state.project.industry || "",
        organization: state.project.organization || "",
        time: state.project.time || "",
        teamInfo: state.project.team || "",
        mainIdea: state.project.pain_point || state.project.solution || "",
        productValue: state.project.product || state.project.description || "",
        productImages: state.project.product_images || [],
        mission: state.project.mission || "",
        vision: state.project.vision || "",
        productCoreValue: state.project.product_core_value || "",
        targetCustomer: state.project.customer_segment || "",
        advantage: state.project.competitive_advantage || "",
        communityValue: state.project.community_value || "",
        marketSize: state.project.market_size || "",
        partners: state.project.partners || "",
        finance: state.project.cost_estimate || "",
        feasibility: state.project.feasibility || "",
        products: state.project.products || "",
        swot: state.project.swot || "",
        prosCons: state.project.pros_cons || "",
        creativity: state.project.creativity || "",
        businessPlan: state.project.business_model || "",
        distribution: state.project.distribution_channel || "",
        marketDevelopment: state.project.market_development || "",
        potentialResult: state.project.potential_result || "",
        growthImpact: state.project.growth_impact || "",
        team: state.project.team || "",
        hrEvaluation: state.project.hr_evaluation || "",
        cooperation: state.project.cooperation || "",
        mediaGoal: state.project.media_goal || "",
        mediaTarget: state.project.media_target || "",
        mediaChannel: state.project.media_channel || "",
        marketingCampaign: state.project.marketing_campaign || "",
        mediaTool: state.project.media_tool || "",
        mediaMeasure: state.project.media_measure || "",
        logo: state.project.logo_url || "",
      };
      setForm((prev) => ({
        ...prev,
        ...mappedData,
      }));
      setCurrentStep(state.step || 1);
    }
    if (state.file) {
      setForm((prev) => ({ ...prev, profileFile: state.file }));
      if (state.extractedText) {
        setForm((prev) => ({
          ...prev,
          profileExtractedText: state.extractedText,
        }));
      }
      setCurrentStep(1);
      // Clear history state so repeated reloads don't reapply
      try {
        window.history.replaceState({}, document.title);
      } catch (e) {
        // ignore
      }
    }
  }, [location.state]);
  if (role !== "founder") {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Chức năng này chỉ dành cho Founder
        </h2>
        <p className="text-gray-600">
          Vui lòng đăng nhập với vai trò Founder để khởi tạo dự án mới.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar trái: các bước tạo hồ sơ (ẩn khi ở bước Tạo hồ sơ) */}
        {currentStep === 0 && (
          <div className="lg:col-span-3 flex flex-col gap-6">
            <ProjectSteps
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>
        )}
        {/* Nội dung chính */}
        <div
          className={`${
            currentStep === 0 ? "lg:col-span-9" : "lg:col-span-12"
          } flex items-start justify-center`}
        >
          <div className="w-full min-h-[500px] max-w-[1800px] mx-auto">
            {currentStep === 0 && (
              <div style={{ marginTop: "-97px" }}>
                <ProjectTemplateSelector
                  onSelect={(val) => {
                    if (val && val.type === "uploaded" && val.file) {
                      setForm((prev) => ({ ...prev, profileFile: val.file }));
                      setSelectedTemplate("Uploaded CV");
                      setCurrentStep(1);
                      return;
                    }
                    setCurrentStep(1);
                  }}
                />
              </div>
            )}
            {currentStep === 1 && (
              <div className="w-full" style={{ marginTop: 0 }}>
                <div className="flex items-center justify-between mb-3">
                  <div />
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Quay lại
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_500px] gap-4 w-full">
                  <aside>
                    <div className="sticky top-24">
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">
                          Mục lục
                        </h4>
                        <nav className="space-y-1 max-h-[calc(100vh-180px)] overflow-auto pr-1">
                          {FORM_SECTIONS.map((sec, idx) => (
                            <a
                              key={idx}
                              href={`#ppf-sec-${idx}`}
                              className="block text-sm text-gray-600 hover:text-blue-700 hover:underline"
                            >
                              {sec.title || sec.subtitle || `Phần ${idx + 1}`}
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </aside>
                  <main className="lg:max-w-[100%] ">
                    <ProjectProfileFullForm
                      initialData={form}
                      onChange={setForm}
                      compact
                      sectionIdPrefix="ppf"
                    />
                  </main>
                  {/* Chatbot sidebar - chỉ hiện trên desktop */}
                  <aside className="hidden lg:block">
                    <div className="sticky top-24">
                      <div
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                        style={{ height: "calc(100vh - 120px)" }}
                      >
                        <ProjectProfileChatbot
                          form={form}
                          onFillField={(fieldName, value) => {
                            const fieldMap = {
                              pain_point: "mainIdea",
                              solution: "productValue",
                              product: "products",
                              targetCustomer: "targetCustomer",
                              advantage: "advantage",
                              marketSize: "marketSize",
                              businessModel: "businessPlan",
                              finance: "finance",
                              team: "team",
                            };
                            const formField = fieldMap[fieldName] || fieldName;
                            setForm((prev) => ({
                              ...prev,
                              [formField]: value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating chatbot icon và dialog cho mobile - chỉ hiện ở step 1 */}
      {currentStep === 1 && (
        <>
          {/* Floating chatbot icon - ẩn khi mở dialog */}
          <button
            className={`fixed bottom-4 right-4 w-12 h-12 bg-[#FFCE23] rounded-full shadow-lg flex items-center justify-center text-black font-semibold text-lg z-50 lg:hidden hover:bg-yellow-500 transition ${
              mobileChatbotOpen ? "hidden" : ""
            }`}
            onClick={() => setMobileChatbotOpen(true)}
          >
            💬
          </button>

          {/* Mobile chatbot dialog - bottom right */}
          {mobileChatbotOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setMobileChatbotOpen(false)}
              />
              {/* Chatbot panel */}
              <div
                className="fixed bottom-4 right-4 left-4 lg:left-auto lg:w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 lg:hidden overflow-hidden flex flex-col"
                style={{ height: "calc(100vh - 100px)", maxHeight: "700px" }}
              >
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between shrink-0">
                  <h4 className="text-sm font-bold text-gray-700">Trợ lý AI</h4>
                  <button
                    onClick={() => setMobileChatbotOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-hidden">
                  <ProjectProfileChatbot
                    form={form}
                    onFillField={(fieldName, value) => {
                      const fieldMap = {
                        pain_point: "mainIdea",
                        solution: "productValue",
                        product: "products",
                        targetCustomer: "targetCustomer",
                        advantage: "advantage",
                        marketSize: "marketSize",
                        businessModel: "businessPlan",
                        finance: "finance",
                        team: "team",
                      };
                      const formField = fieldMap[fieldName] || fieldName;
                      setForm((prev) => ({
                        ...prev,
                        [formField]: value,
                      }));
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default CreateProject;
