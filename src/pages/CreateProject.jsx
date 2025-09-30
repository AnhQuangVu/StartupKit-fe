import React, { useState } from "react";
import RecentActivitySidebar from "../components/project/RecentActivitySidebar";
import AiAssistantSidebar from "../components/project/AiAssistantSidebar";
import { useAuth } from '../context/AuthContext';

// Sidebar các bước tạo hồ sơ
function ProjectSteps({ currentStep, onStepClick }) {
  const steps = [
    { label: "Chọn mẫu", value: 0 },
    { label: "Tạo hồ sơ", value: 1 },
    { label: "Preview hồ sơ", value: 2 },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <h3 className="font-bold text-gray-700 mb-4">Các bước tạo hồ sơ</h3>
      <div className="flex flex-col gap-4">
        {steps.map((step, idx) => (
          <button
            key={step.value}
            className={`w-full px-4 py-3 rounded-full font-semibold text-left transition ${
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
                onClick={() => onSelect(item)}
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

// Component nhập form hồ sơ
function ProjectBasicForm({ form, setForm, onCreate }) {
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        [field]: file,
        [`${field}Preview`]: URL.createObjectURL(file),
      });
    }
  };

  return (
    <form
      className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 w-full max-w-6xl mx-auto mt-4 space-y-8"
      style={{ marginTop: "0px" }} // dịch lên cao hơn
      onSubmit={e => { e.preventDefault(); onCreate(); }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center text-[#FFCE23]">Thông tin cơ bản dự án</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Tên dự án / Startup</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Slogan (nếu có)</label>
          <input name="slogan" value={form.slogan} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Lĩnh vực / ngành nghề</label>
          <input name="industry" value={form.industry} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Địa điểm triển khai</label>
          <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Giai đoạn hiện tại</label>
          <select name="stage" value={form.stage} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm">
            <option value="">Chọn</option>
            <option value="Ý tưởng">Ý tưởng</option>
            <option value="Prototype">Prototype</option>
            <option value="MVP">MVP</option>
            <option value="Đã ra thị trường">Đã ra thị trường</option>
          </select>
        </div>
        {/* Logo dự án */}
        <div>
          <label className="font-semibold">Logo dự án</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.logoPreview ? (
              <img src={form.logoPreview} alt="Logo" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có logo</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageChange(e, "logo")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Mô tả ngắn gọn về ý tưởng</label>
          <textarea name="idea" value={form.idea} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Mô tả sản phẩm/dịch vụ</label>
          <textarea name="product" value={form.product} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Vấn đề khách hàng đang gặp phải (Pain point)</label>
          <textarea name="painPoint" value={form.painPoint} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Giải pháp của ý tưởng</label>
          <textarea name="solution" value={form.solution} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Phân khúc khách hàng mục tiêu</label>
          <input name="customerSegment" value={form.customerSegment} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Đặc điểm khách hàng</label>
          <input name="customerFeatures" value={form.customerFeatures} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Quy mô thị trường</label>
          <input name="marketSize" value={form.marketSize} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Khu vực thị trường nhắm tới</label>
          <input name="marketArea" value={form.marketArea} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Mô hình kinh doanh</label>
          <input name="businessModel" value={form.businessModel} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Cách thức tạo doanh thu</label>
          <input name="revenueMethod" value={form.revenueMethod} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Kênh phân phối / tiếp cận khách hàng</label>
          <input name="distributionChannel" value={form.distributionChannel} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Đối tác chính</label>
          <input name="partners" value={form.partners} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Số lượng thành viên đang có</label>
          <input name="memberCount" value={form.memberCount} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Vai trò chính / kỹ năng nổi bật của từng thành viên</label>
          <textarea name="memberSkills" value={form.memberSkills} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Nguồn lực hiện có</label>
          <textarea name="resources" value={form.resources} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Chi phí lớn nhất dự kiến</label>
          <input name="costEstimate" value={form.costEstimate} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Nguồn vốn hiện tại</label>
          <input name="capitalSource" value={form.capitalSource} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Mục tiêu doanh thu ngắn hạn (6–12 tháng)</label>
          <input name="revenueGoal" value={form.revenueGoal} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      {/* Hình ảnh sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <label className="font-semibold">Hình ảnh sản phẩm</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.productImagePreview ? (
              <img src={form.productImagePreview} alt="Product" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có ảnh</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageChange(e, "productImage")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
        {/* Hình ảnh đội ngũ */}
        <div>
          <label className="font-semibold">Hình ảnh đội ngũ</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.teamImagePreview ? (
              <img src={form.teamImagePreview} alt="Team" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có ảnh</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageChange(e, "teamImage")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button type="submit" className="bg-[#FFCE23] hover:bg-yellow-500 text-base font-semibold px-8 py-3 rounded-lg shadow">
          Tạo hồ sơ
        </button>
      </div>
    </form>
  );
}

// Component preview hồ sơ
function ProjectPreview({ form, setForm, onBack }) {
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-lg p-12 w-full max-w-5xl mx-auto mt-4 space-y-8"
      style={{ marginTop: "0px" }} // dịch lên cao hơn
    >
      <h2 className="text-2xl font-bold mb-8 text-center text-[#FFCE23]">Chỉnh sửa & Preview hồ sơ dự án</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold">Tên dự án / Startup</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Slogan (nếu có)</label>
          <input name="slogan" value={form.slogan} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Lĩnh vực / ngành nghề</label>
          <input name="industry" value={form.industry} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Địa điểm triển khai</label>
          <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Giai đoạn hiện tại</label>
          <select name="stage" value={form.stage} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm">
            <option value="">Chọn</option>
            <option value="Ý tưởng">Ý tưởng</option>
            <option value="Prototype">Prototype</option>
            <option value="MVP">MVP</option>
            <option value="Đã ra thị trường">Đã ra thị trường</option>
          </select>
        </div>
        {/* Logo dự án */}
        <div>
          <label className="font-semibold">Logo dự án</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.logoPreview ? (
              <img src={form.logoPreview} alt="Logo" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có logo</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageChange(e, "logo")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold">Mô tả ngắn gọn về ý tưởng</label>
          <textarea name="idea" value={form.idea} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Mô tả sản phẩm/dịch vụ</label>
          <textarea name="product" value={form.product} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Vấn đề khách hàng đang gặp phải (Pain point)</label>
          <textarea name="painPoint" value={form.painPoint} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Giải pháp của ý tưởng</label>
          <textarea name="solution" value={form.solution} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold">Phân khúc khách hàng mục tiêu</label>
          <input name="customerSegment" value={form.customerSegment} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Đặc điểm khách hàng</label>
          <input name="customerFeatures" value={form.customerFeatures} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Quy mô thị trường</label>
          <input name="marketSize" value={form.marketSize} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Khu vực thị trường nhắm tới</label>
          <input name="marketArea" value={form.marketArea} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold">Mô hình kinh doanh</label>
          <input name="businessModel" value={form.businessModel} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Cách thức tạo doanh thu</label>
          <input name="revenueMethod" value={form.revenueMethod} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Kênh phân phối / tiếp cận khách hàng</label>
          <input name="distributionChannel" value={form.distributionChannel} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Đối tác chính</label>
          <input name="partners" value={form.partners} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold">Số lượng thành viên đang có</label>
          <input name="memberCount" value={form.memberCount} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Vai trò chính / kỹ năng nổi bật của từng thành viên</label>
          <textarea name="memberSkills" value={form.memberSkills} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Nguồn lực hiện có</label>
          <textarea name="resources" value={form.resources} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold">Chi phí lớn nhất dự kiến</label>
          <input name="costEstimate" value={form.costEstimate} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Nguồn vốn hiện tại</label>
          <input name="capitalSource" value={form.capitalSource} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="font-semibold">Mục tiêu doanh thu ngắn hạn (6–12 tháng)</label>
          <input name="revenueGoal" value={form.revenueGoal} onChange={handleChange} className="w-full border rounded px-2 py-2 mt-1 text-sm" />
        </div>
      </div>
      {/* Hình ảnh sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold">Hình ảnh sản phẩm</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.productImagePreview ? (
              <img src={form.productImagePreview} alt="Product" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có ảnh</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageChange(e, "productImage")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
        {/* Hình ảnh đội ngũ */}
        <div>
          <label className="font-semibold">Hình ảnh đội ngũ</label>
          <div className="w-20 h-20 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
            {form.teamImagePreview ? (
              <img src={form.teamImagePreview} alt="Team" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-xs">Chưa có ảnh</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageChange(e, "teamImage")}
            className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button type="button" onClick={onBack} className="bg-gray-200 hover:bg-gray-300 text-base font-semibold px-8 py-3 rounded-lg shadow">
          Quay lại
        </button>
        <button type="button" className="bg-[#FFCE23] hover:bg-yellow-500 text-base font-semibold px-8 py-3 rounded-lg shadow">
          Xác nhận & Lưu hồ sơ
        </button>
        {/* <button type="button" onClick={handleExportPDF}>Xuất PDF</button> */}
      </div>
    </div>
  );
}

export default function CreateProject() {
  const { user } = useAuth();
  const role = user?.role || 'startup';
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
  });

  if (role !== 'startup') {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Chức năng này chỉ dành cho Startup</h2>
        <p className="text-gray-600">Vui lòng đăng nhập với vai trò Startup để khởi tạo dự án mới.</p>
      </div>
    );
  }

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
            {currentStep === 0 && (
              <ProjectTemplateSelector onSelect={() => setCurrentStep(1)} />
            )}
            {currentStep === 1 && (
              <ProjectBasicForm
                form={form}
                setForm={setForm}
                onCreate={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 2 && (
              <ProjectPreview
                form={form}
                setForm={setForm}
                onBack={() => setCurrentStep(1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
