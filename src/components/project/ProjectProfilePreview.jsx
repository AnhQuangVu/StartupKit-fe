import React from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { exportProjectPDF } from '../../utils/pdfExport';

export default function ProjectProfilePreview({ form, setForm, onBack }) {
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 w-full">
  <h2 className="text-2xl font-bold mb-8 text-center text-[#FFCE23]">Hồ sơ dự án</h2>
      <div className="space-y-2">
        <div className="text-sm py-1"><span className="font-semibold">Tên dự án / Startup:</span> {form.name}</div>
        <div className="text-sm py-1"><span className="font-semibold">Slogan:</span> {form.slogan}</div>
        <div className="text-sm py-1"><span className="font-semibold">Lĩnh vực:</span> {form.industry}</div>
        <div className="text-sm py-1"><span className="font-semibold">Địa điểm triển khai:</span> {form.location}</div>
        <div className="text-sm py-1"><span className="font-semibold">Giai đoạn hiện tại:</span> {form.stage}</div>
        <div className="text-sm py-1"><span className="font-semibold">Mô tả ngắn gọn về ý tưởng:</span> {form.idea}</div>
        <div className="text-sm py-1"><span className="font-semibold">Mô tả sản phẩm/dịch vụ:</span> {form.product}</div>
        <div className="text-sm py-1"><span className="font-semibold">Vấn đề khách hàng đang gặp phải:</span> {form.painPoint}</div>
        <div className="text-sm py-1"><span className="font-semibold">Giải pháp của ý tưởng:</span> {form.solution}</div>
        <div className="text-sm py-1"><span className="font-semibold">Phân khúc khách hàng mục tiêu:</span> {form.customerSegment}</div>
        <div className="text-sm py-1"><span className="font-semibold">Đặc điểm khách hàng:</span> {form.customerFeatures}</div>
        <div className="text-sm py-1"><span className="font-semibold">Quy mô thị trường:</span> {form.marketSize}</div>
        <div className="text-sm py-1"><span className="font-semibold">Khu vực thị trường nhắm tới:</span> {form.marketArea}</div>
        <div className="text-sm py-1"><span className="font-semibold">Mô hình kinh doanh:</span> {form.businessModel}</div>
        <div className="text-sm py-1"><span className="font-semibold">Cách thức tạo doanh thu:</span> {form.revenueMethod}</div>
        <div className="text-sm py-1"><span className="font-semibold">Kênh phân phối :</span> {form.distributionChannel}</div>
        <div className="text-sm py-1"><span className="font-semibold">Đối tác chính:</span> {form.partners}</div>
        <div className="text-sm py-1"><span className="font-semibold">Số lượng thành viên đang có:</span> {form.memberCount}</div>
        <div className="text-sm py-1"><span className="font-semibold">Vai trò chính :</span> {form.memberSkills}</div>
        <div className="text-sm py-1"><span className="font-semibold">Nguồn lực hiện có:</span> {form.resources}</div>
        <div className="text-sm py-1"><span className="font-semibold">Chi phí lớn nhất dự kiến:</span> {form.costEstimate}</div>
        <div className="text-sm py-1"><span className="font-semibold">Nguồn vốn hiện tại:</span> {form.capitalSource}</div>
        <div className="text-sm py-1"><span className="font-semibold">Mục tiêu doanh thu ngắn hạn (6–12 tháng):</span> {form.revenueGoal}</div>
        {form.productImagePreview && (
          <div className="text-sm py-1">
            <span className="font-semibold">Hình ảnh sản phẩm:</span>
            <img src={form.productImagePreview} alt="Product" className="object-cover w-24 h-24 rounded mt-2" />
          </div>
        )}
        {form.teamImagePreview && (
          <div className="text-sm py-1">
            <span className="font-semibold">Hình ảnh đội ngũ:</span>
            <img src={form.teamImagePreview} alt="Team" className="object-cover w-24 h-24 rounded mt-2" />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" className="bg-[#FFCE23] hover:bg-yellow-500 text-base font-semibold px-4 py-2 rounded-lg shadow" aria-label="Lưu hồ sơ" onClick={() => setShowSaveModal(true)}>
          Lưu hồ sơ
        </button>
        <button type="button" className="bg-[#FFCE23] hover:bg-yellow-500 text-black text-base font-semibold px-4 py-2 rounded-lg shadow flex items-center" aria-label="Xuất hồ sơ PDF" onClick={() => window.dispatchEvent(new CustomEvent('goToExportTab'))}>
          Xuất hồ sơ
        </button>
        <button type="button" className="bg-gray-200 hover:bg-gray-300 text-base font-semibold px-4 py-2 rounded-lg shadow" onClick={onBack} aria-label="Quay lại chỉnh sửa hồ sơ">
          Quay lại chỉnh sửa
        </button>
      </div>
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Lưu hồ sơ thành công</h3>
            <p className="mb-6 text-gray-700">Hồ sơ dự án của bạn đã được lưu lại. Bạn có thể tiếp tục chỉnh sửa hoặc xuất hồ sơ.</p>
            <button
              className="bg-[#FFCE23] hover:bg-yellow-500 text-base font-semibold px-4 py-2 rounded"
              onClick={() => setShowSaveModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
