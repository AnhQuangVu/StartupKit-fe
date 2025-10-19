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
import { exportProjectPDF } from "../utils/pdfExport";
import RecentActivitySidebar from "../components/project/RecentActivitySidebar";
import AiAssistantSidebar from "../components/project/AiAssistantSidebar";
import { useAuth } from "../context/AuthContext";
import { uploadToCloudinary } from "../utils/cloudinary";

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
function ProjectBasicForm({ form, setForm, onCreate, useAI, setUseAI }) {
  // =============================
  // XỬ LÝ LƯU ẢNH TRONG TẠO HỒ SƠ
  // =============================
  // Khi người dùng chọn file ảnh (logo, sản phẩm, đội ngũ), hàm này sẽ upload lên Cloudinary
  // Sau khi upload thành công, trả về URL ảnh và lưu vào state để hiển thị preview và gửi lên backend
  // Ví dụ: chọn logo => gọi handleImageChange(e, "logo")
  // Hàm này dùng cho các trường: logo, productImage, teamImage
  const handleChange = (e) => {
    // Xử lý thay đổi giá trị input
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Khi chọn file, chỉ lưu file vào state, chưa upload
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        [`${field}File`]: file,
        [`${field}Preview`]: URL.createObjectURL(file), // Hiển thị preview tạm thời
      });
    }
  };

  // Khi submit, upload file lên Cloudinary rồi gọi onCreate
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newForm = { ...form };
    // Upload logo nếu có file
    if (form.logoFile) {
      try {
        const url = await uploadToCloudinary(form.logoFile);
        newForm.logoUrl = url;
        newForm.logoPreview = url; // Đảm bảo cập nhật preview bằng URL Cloudinary
        console.log("Logo Cloudinary URL:", url); // Debug
      } catch (err) {
        alert("Lỗi upload logo lên Cloudinary\n" + (err?.message || ""));
        return;
      }
    }
    // Upload productImage nếu có file
    if (form.productImageFile) {
      try {
        const url = await uploadToCloudinary(form.productImageFile);
        newForm.productImageUrl = url;
        newForm.productImagePreview = url;
      } catch (err) {
        alert(
          "Lỗi upload ảnh sản phẩm lên Cloudinary\n" + (err?.message || "")
        );
        return;
      }
    }
    // Upload teamImage nếu có file
    if (form.teamImageFile) {
      try {
        const url = await uploadToCloudinary(form.teamImageFile);
        newForm.teamImageUrl = url;
        newForm.teamImagePreview = url;
      } catch (err) {
        alert("Lỗi upload ảnh đội ngũ lên Cloudinary\n" + (err?.message || ""));
        return;
      }
    }
    // Upload profile (CV) nếu có
    if (form.profileFile) {
      try {
        const url = await uploadToCloudinary(form.profileFile);
        newForm.profileUrl = url;
        console.log("Profile uploaded to Cloudinary:", url);
      } catch (err) {
        alert("Lỗi upload hồ sơ lên Cloudinary\n" + (err?.message || ""));
        return;
      }
    }
    setForm(newForm);
    await onCreate(newForm);
  };

  // Khi submit form, các trường ảnh sẽ lấy URL từ state và gửi lên backend
  // Ví dụ: logo_url: form.logoUrl, product_image_url: form.productImageUrl, team_image_url: form.teamImageUrl

  return (
    <form
      className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 w-full max-w-6xl mx-auto mt-4 space-y-8"
      style={{ marginTop: "0px" }} // dịch lên cao hơn
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-8 text-center text-[#FFCE23]">
        Thông tin cơ bản dự án
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Tên dự án / Startup</label>
          <textarea
            name="name"
            value={form.name}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Slogan (nếu có)</label>
          <textarea
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Lĩnh vực / ngành nghề</label>
          <textarea
            name="industry"
            value={form.industry}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-4">
        <div>
          <label className="font-semibold">Website URL</label>
          <input
            name="website"
            type="url"
            value={form.website}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2 mt-1 text-sm"
            placeholder="https://yourstartup.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Địa điểm triển khai</label>
          <textarea
            name="location"
            value={form.location}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Giai đoạn hiện tại</label>
          <select
            name="stage"
            value={form.stage}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2 mt-1 text-sm"
          >
            <option value="">Chọn</option>
            <option value="y-tuong">Ý tưởng</option>
            <option value="nghien-cuu-thi-truong">Nghiên cứu thị trường</option>
            <option value="hoan-thien-san-pham">Hoàn thiện sản phẩm</option>
            <option value="khao-sat">Khảo sát</option>
            <option value="launch">Launch</option>
          </select>
        </div>
        {/* Logo dự án */}
        <div>
          <label className="font-semibold">Logo dự án</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.logoPreview ? (
              <img
                src={form.logoPreview}
                alt="Logo"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có logo</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "logo")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
      </div>
      {/* Nhóm trường dài, mỗi trường một hàng riêng */}
      <div className="grid grid-cols-1 gap-y-6">
        <div>
          <label className="font-semibold">Mô tả dự án</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Mô tả sản phẩm/dịch vụ</label>
          <textarea
            name="product"
            value={form.product}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">
            Vấn đề khách hàng đang gặp phải (Pain point)
          </label>
          <textarea
            name="painPoint"
            value={form.painPoint}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Giải pháp của ý tưởng</label>
          <textarea
            name="solution"
            value={form.solution}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      </div>
      {/* Nhóm trường ngắn, xếp cùng hàng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mt-8">
        <div>
          <label className="font-semibold">Phân khúc khách hàng mục tiêu</label>
          <textarea
            name="customerSegment"
            value={form.customerSegment}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Đặc điểm khách hàng</label>
          <textarea
            name="customerFeatures"
            value={form.customerFeatures}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Quy mô thị trường</label>
          <textarea
            name="marketSize"
            value={form.marketSize}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-6 mt-8">
        <div>
          <label className="font-semibold">Khu vực thị trường nhắm tới</label>
          <textarea
            name="marketArea"
            value={form.marketArea}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Mô hình kinh doanh</label>
          <textarea
            name="businessModel"
            value={form.businessModel}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Cách thức tạo doanh thu</label>
          <textarea
            name="revenueMethod"
            value={form.revenueMethod}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">
            Kênh phân phối / tiếp cận khách hàng
          </label>
          <textarea
            name="distributionChannel"
            value={form.distributionChannel}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-6 mt-8">
        <div>
          <label className="font-semibold">Đối tác chính</label>
          <textarea
            name="partners"
            value={form.partners}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Số lượng thành viên đang có</label>
          <input
            name="memberCount"
            type="number"
            min={0}
            value={form.memberCount}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2 mt-1 text-sm"
            placeholder="Nhập số lượng thành viên"
          />
        </div>
        <div>
          <label className="font-semibold">
            Vai trò chính / kỹ năng nổi bật của từng thành viên
          </label>
          <textarea
            name="memberSkills"
            value={form.memberSkills}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">Nguồn lực hiện có</label>
          <textarea
            name="resources"
            value={form.resources}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Chi phí lớn nhất dự kiến</label>
          <input
            name="costEstimate"
            type="number"
            min={0}
            value={form.costEstimate}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2 mt-1 text-sm"
            placeholder="Nhập chi phí dự kiến"
          />
        </div>
        <div>
          <label className="font-semibold">Nguồn vốn hiện tại</label>
          <textarea
            name="capitalSource"
            value={form.capitalSource}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-2 mt-1 text-sm resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
        <div>
          <label className="font-semibold">
            Mục tiêu doanh thu ngắn hạn (6–12 tháng)
          </label>
          <input
            name="revenueGoal"
            type="number"
            min={0}
            value={form.revenueGoal}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2 mt-1 text-sm"
            placeholder="Nhập mục tiêu doanh thu"
          />
        </div>
      </div>
      {/* Hình ảnh sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Hình ảnh sản phẩm</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.productImagePreview ? (
              <img
                src={form.productImagePreview}
                alt="Product"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có ảnh</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "productImage")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
        {/* Hình ảnh đội ngũ */}
        <div>
          <label className="font-semibold">Hình ảnh đội ngũ</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.teamImagePreview ? (
              <img
                src={form.teamImagePreview}
                alt="Team"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có ảnh</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "teamImage")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
      </div>
      <div className="flex items-center mt-8">
        <input
          type="checkbox"
          id="useAI"
          checked={useAI}
          onChange={(e) => setUseAI(e.target.checked)}
          className="mr-2 w-5 h-5 accent-yellow-500"
        />
        <label htmlFor="useAI" className="text-base font-medium text-gray-700">
          Sử dụng AI để tự động điền thông tin
        </label>
      </div>
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-[#FFCE23] hover:bg-yellow-500 text-base font-semibold px-8 py-3 rounded-lg shadow"
        >
          Tạo hồ sơ
        </button>
      </div>
    </form>
  );
}

import ProjectPreview from "../components/project/ProjectPreview";
import ProjectProfilePreview from "../components/project/ProjectProfilePreview";
import ProjectProfileChatbot from "../components/project/ProjectProfileChatbot";
import StartupCard from "../components/common/StartupCard";
import { useLocation } from 'react-router-dom';

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

  // Chuẩn hóa payload trước khi gửi lên backend
  function normalizePayload(form) {
    // Chỉ gửi các trường có giá trị, đúng kiểu dữ liệu
    const payload = {
      name: form.name || "",
      tagline: form.tagline || "",
      stage: form.stage && form.stage !== "" ? form.stage : null, // Enum hoặc null
      description: form.description || form.idea || "",
      logo_url: form.logoUrl || form.logoPreview || null,
      website_url: form.website_url || form.website || null,
      industry: form.industry || "",
      pain_point: form.pain_point || form.painPoint || "",
      solution: form.solution || "",
      product: form.product || "",
      customer_segment: form.customer_segment || form.customerSegment || "",
      customer_features: form.customer_features || form.customerFeatures || "",
      market_size: form.market_size || form.marketSize || "",
      market_area: form.market_area || form.marketArea || "",
      deployment_location: form.location || "",
      business_model: form.business_model || form.businessModel || "",
      revenue_method: form.revenue_method || form.revenueMethod || "",
      distribution_channel:
        form.distribution_channel || form.distributionChannel || "",
      partners: form.partners || "",
      cost_estimate: form.cost_estimate || form.costEstimate || "",
      capital_source: form.capital_source || form.capitalSource || "",
      revenue_goal: form.revenue_goal || form.revenueGoal || "",
      member_count:
        form.member_count && form.member_count !== ""
          ? Number(form.member_count)
          : form.memberCount && form.memberCount !== ""
          ? Number(form.memberCount)
          : null,
      member_skills: form.member_skills || form.memberSkills || "",
      resources: form.resources || "",
      team_image_url: form.teamImageUrl || form.teamImagePreview || null,
      product_image_url:
        form.productImageUrl || form.productImagePreview || null,
      profile_url: form.profileUrl || null,
      use_ai: !!form.use_ai || !!form.useAI,
    };
    return payload;
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
                <ProjectBasicForm
                  form={form}
                  setForm={setForm}
                  onCreate={async (finalForm) => {
                    // Debug: Hiển thị toàn bộ dữ liệu form khi submit
                    console.log("Form dữ liệu gửi lên:", finalForm);
                    const result = await createProjectAPI(finalForm);
                    if (result) {
                      // Hiển thị thông báo jQuery
                      if (window.$) {
                        window
                          .$(
                            '<div class="my-toast">Tạo hồ sơ thành công!</div>'
                          )
                          .appendTo("body")
                          .fadeIn()
                          .delay(2000)
                          .fadeOut();
                      } else {
                        var toast = document.createElement("div");
                        toast.className = "my-toast";
                        toast.innerText = "Tạo hồ sơ thành công!";
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
                      setSelectedTemplate("HOU Sinh Viên Startup"); // Đảm bảo tab xem hồ sơ hiển thị
                      setCurrentStep(2); // Chuyển qua tab xem hồ sơ
                    }
                  }}
                />
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
