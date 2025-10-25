import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Cloudinary upload
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import ProjectProfileFullForm from "../components/project/ProjectProfileFullForm";
import { useAuth } from "../context/AuthContext";
import ProjectPreview from "../components/project/ProjectPreview";
import ProjectProfilePreview from "../components/project/ProjectProfilePreview";
import ProjectProfileChatbot from "../components/project/ProjectProfileChatbot";
import { normalizeProjectPayload } from "../utils/normalizeProjectPayload";
import { API_BASE } from "../config/api";

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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full">
      <h3 className="text-lg font-semibold mb-6">Chọn mẫu hồ sơ khởi nghiệp</h3>
      <div className="flex gap-6 mb-6 flex-wrap">
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
  const [currentStep, setCurrentStep] = useState(0); // 0: chọn mẫu, 1: tạo hồ sơ, 2: preview
  const [isChatOpen, setIsChatOpen] = useState(false); // State cho dialog chatbot
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [form, setForm] = useState({
    name: "",
    slogan: "",
    industry: "",
    location: "",
    stage: "",
    idea: "",
    product: "",
    painPoint: "",
    solution: "",
    customerSegment: "",
    customerFeatures: "",
    marketSize: "",
    marketArea: "",
    businessModel: "",
    revenueMethod: "",
    distributionChannel: "",
    partners: "",
    memberCount: "",
    memberSkills: "",
    resources: "",
    costEstimate: "",
    capitalSource: "",
    revenueGoal: "",
    image: null,
    imagePreview: null,
    members: user
      ? [
          {
            name: user.name || "Tác giả",
            email: user.email || "",
            role: "Founder",
            permission: "Quản lý",
          },
        ]
      : [],
    website: "",
  });

  const [projectData, setProjectData] = useState({
    name: "",
    banner: null,
    logo: null,
    description: "",
    summary: "",
    website: "",
    contact: "",
  });

  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    avatar: null,
  });

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState("");

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
        ...mappedData
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

  // Nếu vào từ tab quản lý dự án (step=2), lấy dữ liệu từ localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const step = params.get("step");
    if (step === "2") {
      const previewData = localStorage.getItem("projectPreviewForm");
      if (previewData) {
        setForm(JSON.parse(previewData));
        setCurrentStep(2);
      }
    }
  }, []);

  // Lắng nghe sự kiện chuyển tab xuất hồ sơ
  React.useEffect(() => {
    const handler = () => setCurrentStep(3);
    window.addEventListener("goToExportTab", handler);
    return () => window.removeEventListener("goToExportTab", handler);
  }, []);

  // Hàm gọi API tạo dự án
  async function createProjectAPI(form) {
    const payload = normalizeProjectPayload(form); // Sửa lỗi normalizePayload thành normalizeProjectPayload
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      // Log the payload to make sure location is included
      console.log("Sending payload to API:", payload);

      const res = await fetch(`https://cors-anywhere.herokuapp.com/http://160.191.243.253:8003/projects`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let errorMsg =
          "Tạo dự án thất bại. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.";
        try {
          const errorData = await res.json();
          if (errorData && errorData.message) errorMsg = errorData.message;
          else if (typeof errorData === "string") errorMsg = errorData;
          else if (errorData && errorData.detail) errorMsg = errorData.detail;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }
        // Sử dụng jQuery để hiển thị toast và đảm bảo remove element sau khi fadeOut
        if (window.$) {
          window
            .$('<div class="my-toast">' + errorMsg + "</div>")
            .appendTo("body")
            .fadeIn()
            .delay(2000)
            .fadeOut(function () {
              $(this).remove(); // Remove element khỏi DOM sau khi fadeOut hoàn tất
            });
        } else {
          // Fallback: create a simple toast manually if jQuery is not available
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
        return null;
      }
      return await res.json();
    } catch (err) {
      // Sử dụng jQuery để hiển thị toast và đảm bảo remove element sau khi fadeOut
      if (window.$) {
        window
          .$('<div class="my-toast">Có lỗi xảy ra. Vui lòng thử lại sau.</div>')
          .appendTo("body")
          .fadeIn()
          .delay(2000)
          .fadeOut(function () {
            $(this).remove(); // Remove element khỏi DOM sau khi fadeOut hoàn tất
          });
      } else {
        var toast = document.createElement("div");
        toast.className = "my-toast";
        toast.innerText = "Có lỗi xảy ra. Vui lòng thử lại sau.";
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
      return null;
    }
  }

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

  // Handlers
  const handleProjectChange = (field, value) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProjectChange(type, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.position) {
      setMembers((prev) => [...prev, { ...newMember, id: Date.now() }]);
      setNewMember({ name: "", position: "", avatar: null });
    }
  };

  const handleMemberAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    setPosts((prev) => [
      {
        id: Date.now(),
        content: newPost,
        author: user?.name || "Anonymous",
        timestamp: new Date(),
        avatar: user?.avatar || "/default-avatar.png",
      },
      ...prev,
    ]);

    setNewPost("");
  };

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFile(f);
      // Thêm logic xử lý file PDF nếu cần
    }
  };

  // Toggle dialog chatbot
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handler cho Đăng đa nền tảng từ form
  const handlePublish = () => {
    console.log("Chuyển sang step 2"); // Debug log
    setCurrentStep(2); // Chuyển sang giao diện Đăng hồ sơ (step 2)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar trái: các bước + hoạt động gần đây */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <ProjectSteps
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
        {/* Nội dung chính */}
        <div className="lg:col-span-9 flex items-center justify-center">
          <div className="w-full min-h-[500px] max-w-[1800px] mx-auto">
            {currentStep === 0 && (
              <div style={{ marginTop: "-97px" }}>
                <ProjectTemplateSelector
                  onSelect={(val) => {
                    // If user uploaded a file, val will be {type: 'uploaded', file}
                    if (val && val.type === "uploaded" && val.file) {
                      // Save file into form state for future upload when creating project
                      setForm((prev) => ({ ...prev, profileFile: val.file }));
                      setSelectedTemplate("Uploaded CV");
                      setCurrentStep(1);
                      return;
                    }
                    // Otherwise proceed to template selection (default behavior)
                    setCurrentStep(1);
                  }}
                />
              </div>
            )}

            {currentStep === 1 && (
              <div style={{ marginTop: 0 }}>
                {" "}
                {/* Loại bỏ marginTop để tránh che nút */}
                <ProjectProfileFullForm
                  initialData={form}
                  onChange={setForm}
                  onPublish={handlePublish}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="w-full -mt-24">
                <div className="bg-white rounded-lg shadow">
                  {/* Slide giới thiệu / Banner */}
                  <div className="relative h-64 bg-gray-200 rounded-t-lg overflow-hidden">
                    {projectData.banner ? (
                      <img
                        src={projectData.banner}
                        alt="Project Banner"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <label className="cursor-pointer bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "banner")}
                            className="hidden"
                          />
                          Chọn ảnh bìa
                        </label>
                      </div>
                    )}

                    {/* Logo overlay */}
                    <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow">
                      {projectData.logo ? (
                        <img
                          src={projectData.logo}
                          alt="Project Logo"
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <label className="cursor-pointer flex items-center justify-center w-16 h-16 bg-gray-100 rounded hover:bg-gray-200">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "logo")}
                            className="hidden"
                          />
                          <span className="text-sm text-gray-500">
                            Chọn logo
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Nút thay đổi ảnh */}
                    {projectData.banner && (
                      <div className="absolute top-4 right-4 space-x-2">
                        <label className="cursor-pointer bg-white px-3 py-1 rounded shadow text-sm hover:bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "banner")}
                            className="hidden"
                          />
                          Đổi ảnh bìa
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    {/* Bio và Thông tin cơ bản */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                      <div className="lg:col-span-2">
                        <input
                          type="text"
                          value={projectData.name}
                          onChange={(e) =>
                            handleProjectChange("name", e.target.value)
                          }
                          placeholder="Tên dự án"
                          className="text-3xl font-bold mb-4 w-full border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                        />

                        <div className="prose max-w-none mb-6">
                          <h2 className="text-xl font-semibold mb-2">
                            Giới thiệu dự án
                          </h2>
                          <textarea
                            value={projectData.description}
                            onChange={(e) =>
                              handleProjectChange("description", e.target.value)
                            }
                            placeholder="Nội dung giới thiệu chi tiết về dự án..."
                            className="w-full p-2 border rounded-lg"
                            rows="4"
                          />
                        </div>

                        <div className="prose max-w-none mb-6">
                          <h2 className="text-xl font-semibold mb-2">
                            Tóm tắt dự án
                          </h2>
                          <textarea
                            value={projectData.summary}
                            onChange={(e) =>
                              handleProjectChange("summary", e.target.value)
                            }
                            placeholder="Điểm nổi bật và tóm tắt về dự án..."
                            className="w-full p-2 border rounded-lg"
                            rows="3"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h2 className="text-xl font-semibold mb-4">
                            Thông tin liên hệ
                          </h2>
                          <div className="space-y-3">
                            <input
                              type="url"
                              value={projectData.website}
                              onChange={(e) =>
                                handleProjectChange("website", e.target.value)
                              }
                              placeholder="Website dự án"
                              className="w-full p-2 border rounded"
                            />
                            <input
                              type="text"
                              value={projectData.contact}
                              onChange={(e) =>
                                handleProjectChange("contact", e.target.value)
                              }
                              placeholder="Thông tin liên hệ"
                              className="w-full p-2 border rounded"
                            />
                            <button className="w-full bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded">
                              Liên hệ ngay
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hồ sơ dự án */}
                    <div className="border-t pt-8">
                      <h2 className="text-2xl font-bold mb-6">Hồ sơ dự án</h2>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tải lên hồ sơ dự án (PDF)
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={onFileChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFCE23] file:text-black hover:file:bg-yellow-500"
                        />
                      </div>
                    </div>

                    {/* Thành viên dự án */}
                    <div className="border-t pt-8 mt-8">
                      <h2 className="text-2xl font-bold mb-6">
                        Thành viên dự án
                      </h2>

                      {/* Form thêm thành viên */}
                      <div className="mb-8 p-4 border rounded-lg">
                        <h3 className="font-semibold mb-4">
                          Thêm thành viên mới
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              value={newMember.name}
                              onChange={(e) =>
                                setNewMember((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              placeholder="Tên thành viên"
                              className="w-full p-2 border rounded"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={newMember.position}
                              onChange={(e) =>
                                setNewMember((prev) => ({
                                  ...prev,
                                  position: e.target.value,
                                }))
                              }
                              placeholder="Vị trí trong dự án"
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleMemberAvatarUpload}
                              className="hidden"
                            />
                            {newMember.avatar
                              ? "Đổi ảnh đại diện"
                              : "Chọn ảnh đại diện"}
                          </label>
                          <button
                            onClick={handleAddMember}
                            className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded"
                          >
                            Thêm thành viên
                          </button>
                        </div>
                      </div>

                      {/* Danh sách thành viên */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center space-x-4 p-4 border rounded-lg"
                          >
                            <div className="flex-shrink-0">
                              {member.avatar ? (
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-2xl text-gray-500">
                                    {member.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{member.name}</h3>
                              <p className="text-sm text-gray-600">
                                {member.position}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bài đăng và hoạt động */}
                    <div className="border-t pt-8 mt-8">
                      <h2 className="text-2xl font-bold mb-6">
                        Bài đăng & Hoạt động
                      </h2>
                      {/* Form đăng bài */}
                      <div className="mb-8">
                        <textarea
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="w-full p-3 border rounded-lg"
                          rows="3"
                          placeholder="Chia sẻ thông tin về dự án..."
                        ></textarea>
                        <div className="mt-3">
                          <button
                            onClick={handlePost}
                            className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded"
                          >
                            Đăng hồ sơ
                          </button>
                        </div>
                      </div>

                      {/* Danh sách bài đăng */}
                      <div className="space-y-6">
                        {posts.map((post) => (
                          <div key={post.id} className="border rounded-lg p-4">
                            <div className="flex items-center mb-4">
                              <img
                                src={post.avatar}
                                alt={post.author}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <div className="font-semibold">
                                  {post.author}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {new Date(post.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600">{post.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && <div className="w-full"></div>}
          </div>
        </div>
      </div>

      {currentStep === 1 && (
        <>
          {/* Icon chatbot hình tròn ở góc phải trên (thấp hơn) */}
          <button
            onClick={toggleChat}
            className="fixed top-20 right-4 z-40 w-12 h-12 bg-[#FFCE23] rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-500 transition-colors"
            aria-label="Chatbot"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>

          {/* Dialog chatbot */}
          {isChatOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-24">
              {" "}
              {/* pt-24 để tránh menu và icon */}
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={toggleChat}
              />
              {/* Nội dung dialog với chiều cao cố định và chiều rộng fixed */}
              <div className="relative bg-white w-full max-w-md h-[calc(100vh-120px)] rounded-lg shadow-xl overflow-hidden flex flex-col">
                {/* Header với nút đóng */}
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Trò chuyện với AI</h3>
                  <button
                    onClick={toggleChat}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Nội dung chat với overflow để fit khung */}
                <div className="flex-1 overflow-y-auto p-4 max-h-full">
                  <div className="h-full flex flex-col">
                    <ProjectProfileChatbot 
                      form={form} 
                      onFillField={(fieldName, value) => {
                        // Map từ ProjectProfileChatbot field names sang form field names
                        const fieldMap = {
                          pain_point: "painPoint",
                          solution: "solution",
                          product: "product",
                          targetCustomer: "customerSegment",
                          advantage: "customerFeatures",
                          marketSize: "marketSize",
                          businessModel: "businessModel",
                          finance: "costEstimate",
                          team: "memberSkills",
                        };
                        const formField = fieldMap[fieldName] || fieldName;
                        setForm(prev => ({
                          ...prev,
                          [formField]: value
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CreateProject;
