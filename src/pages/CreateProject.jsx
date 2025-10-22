// File CreateProject.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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

// Sidebar các bước tạo hồ sơ
function ProjectSteps({ currentStep, onStepClick }) {
  const steps = [
    { label: "Chọn mẫu", value: 0 },
    { label: "Tạo hồ sơ", value: 1 },
    { label: "Xem hồ sơ", value: 2 },
    { label: "Xuất hồ sơ", value: 3 },
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
    { type: "Tải hồ sơ" , items: ["Tải hồ sơ đã có "] },
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
            <span className="text-sm font-bold text-yellow-500 mb-3">{group.type}</span>
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
                        <h3 className="text-xl font-bold mb-4 text-yellow-600">Chức năng đang được phát triển</h3>
                        <p className="mb-6 text-gray-700">Tính năng tạo hồ sơ từ mẫu trống sẽ sớm được cập nhật. Vui lòng chọn mẫu khác hoặc quay lại sau.</p>
                        <button className="bg-[#FFCE23] hover:bg-yellow-500 text-base font-semibold px-6 py-2 rounded" onClick={() => setShowModal(false)}>Đóng</button>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ) : group.type === "Tải hồ sơ" ? (
                <button
                  key={group.type + "-" + i + "-btn"}
                  className="w-full bg-white hover:bg-yellow-100 text-sm rounded px-4 py-2 border mb-2 font-semibold text-gray-700 border-gray-200"
                  onClick={() => navigate('/profile/upload')}
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
          <p className="text-sm text-gray-600 mb-3">Bạn có thể chọn file CV (PDF/DOC/DOCX) để tiếp tục chỉnh sửa hồ sơ.</p>
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
            {uploadedFile && <div className="text-sm text-gray-700">{uploadedFile.name}</div>}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                if (uploadedFile) {
                  onSelect && onSelect({ type: "uploaded", file: uploadedFile });
                  setShowUploadSection(false);
                  setUploadedFile(null);
                }
              }}
              className="bg-[#FFCE23] text-black px-4 py-2 rounded font-semibold"
            >
              Tiếp tục chỉnh sửa hồ sơ
            </button>
            <button onClick={() => { setShowUploadSection(false); setUploadedFile(null); }} className="bg-white border border-gray-300 px-4 py-2 rounded">Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Component nhập form hồ sơ
// Note: The detailed form UI used to be here (ProjectBasicForm) but was removed
// because `ProjectProfileFullForm` now provides the full project form UI and
// handles image uploads and state. Keeping page-level logic and step flow above.

import ProjectPreview from "../components/project/ProjectPreview";
import ProjectProfilePreview from "../components/project/ProjectProfilePreview";
import ProjectProfileChatbot from "../components/project/ProjectProfileChatbot";
import { useLocation } from 'react-router-dom';
import { normalizeProjectPayload } from '../utils/normalizeProjectPayload';

// Main page component
function CreateProject() {
  const { user } = useAuth();
  const role = user?.role || "founder";
  const [currentStep, setCurrentStep] = useState(0); // 0: chọn mẫu, 1: tạo hồ sơ, 2: preview
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

  const location = useLocation();

  // If navigated here with a file from UploadProfile, pick it up and set form
  useEffect(() => {
    const state = location.state || {};
    if (state.file) {
      setForm((prev) => ({ ...prev, profileFile: state.file }));
      if (state.extractedText) {
        setForm((prev) => ({ ...prev, profileExtractedText: state.extractedText }));
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
    const payload = normalizePayload(form);
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

      const res = await fetch("http://127.0.0.1:8000/projects/", {
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
        if (window.$) {
          window
            .$('<div class="my-toast">' + errorMsg + "</div>")
            .appendTo("body")
            .fadeIn()
            .delay(2000)
            .fadeOut();
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
      if (window.$) {
        window
          .$('<div class="my-toast">Có lỗi xảy ra. Vui lòng thử lại sau.</div>')
          .appendTo("body")
          .fadeIn()
          .delay(2000)
          .fadeOut();
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

  // Payload normalization is handled by utils/normalizeProjectPayload.js

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
              <div style={{ marginTop: "-97px" }}>
                <ProjectProfileFullForm
                  initialData={form}
                  onChange={setForm}
                />
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    className="px-6 py-2 bg-yellow-400 rounded font-semibold hover:bg-yellow-500"
                    onClick={() => setCurrentStep(2)}
                  >
                    Xem trước hồ sơ
                  </button>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-9 gap-6">
                  <div className="md:col-span-6 bg-white rounded-lg border border-gray-200 shadow-sm p-8">
                    <h3 className="text-lg font-semibold mb-6">
                      Xem trước hồ sơ khởi nghiệp
                    </h3>
                    <ProjectProfilePreview form={form} setForm={setForm} />
                  </div>
                  <div className="md:col-span-3 ">
                    <ProjectProfileChatbot form={form} />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && <div className="w-full"></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
