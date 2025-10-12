import React, { useEffect, useRef } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { exportProjectPDF } from '../../utils/pdfExport';

export default function ProjectProfilePreview({ form, setForm, onBack, sectionId }) {
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!sectionId) return;
    const token = localStorage.getItem("token");
    const wsUrl = `ws://127.0.0.1:8000/projects/ws/${sectionId}?token=${token}`;
    const ws = new window.WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Nếu server gửi về nội dung mới cho section, cập nhật form
        if (data && data.content) {
          setForm((prev) => ({ ...prev, ...data.content }));
        }
      } catch (e) {
        console.error("WS message parse error", e);
      }
    };
    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };
    ws.onclose = () => {
      console.log("WebSocket closed");
    };
    return () => {
      ws.close();
    };
  }, [sectionId, setForm]);

  // Hàm gửi dữ liệu lên server qua WebSocket
  const sendSectionUpdate = (content) => {
    if (wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(JSON.stringify({ content }));
    }
  };

  // Tự động tăng chiều cao cho textarea
  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    e.target.style.overflow = 'hidden'; // Ẩn thanh cuộn
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 w-full">
  <h2 className="text-2xl font-bold mb-8 text-center text-[#FFCE23]">Hồ sơ dự án</h2>
      <div className="space-y-2">
  <div className="text-sm py-1"><span className="font-semibold">Tên dự án / Startup:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); autoResize(e); sendSectionUpdate({ name: e.target.value }); }} rows={1} /></div>
  <div className="text-sm py-1"><span className="font-semibold">Slogan:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.tagline} onChange={e => { setForm({ ...form, slogan: e.target.value }); autoResize(e); sendSectionUpdate({ tagline: e.target.value }); }} rows={1} /></div>
  <div className="text-sm py-1"><span className="font-semibold">Lĩnh vực:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.industry} onChange={e => { setForm({ ...form, industry: e.target.value }); autoResize(e); sendSectionUpdate({ industry: e.target.value }); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Địa điểm triển khai:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.location} onChange={e => { setForm({ ...form, location: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Giai đoạn hiện tại:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.stage} onChange={e => { setForm({ ...form, stage: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Mô tả ngắn gọn về ý tưởng:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.idea} onChange={e => { setForm({ ...form, idea: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Mô tả sản phẩm/dịch vụ:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.product} onChange={e => { setForm({ ...form, product: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Vấn đề khách hàng đang gặp phải:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.painPoint} onChange={e => { setForm({ ...form, painPoint: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Giải pháp của ý tưởng:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.solution} onChange={e => { setForm({ ...form, solution: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Phân khúc khách hàng mục tiêu:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.customerSegment} onChange={e => { setForm({ ...form, customerSegment: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Đặc điểm khách hàng:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.customerFeatures} onChange={e => { setForm({ ...form, customerFeatures: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Quy mô thị trường:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.marketSize} onChange={e => { setForm({ ...form, marketSize: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Khu vực thị trường nhắm tới:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.marketArea} onChange={e => { setForm({ ...form, marketArea: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Mô hình kinh doanh:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.businessModel} onChange={e => { setForm({ ...form, businessModel: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Cách thức tạo doanh thu:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.revenueMethod} onChange={e => { setForm({ ...form, revenueMethod: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Kênh phân phối :</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.distributionChannel} onChange={e => { setForm({ ...form, distributionChannel: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Đối tác chính:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.partners} onChange={e => { setForm({ ...form, partners: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Số lượng thành viên đang có:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.memberCount} onChange={e => { setForm({ ...form, memberCount: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Vai trò chính :</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.memberSkills} onChange={e => { setForm({ ...form, memberSkills: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Nguồn lực hiện có:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.resources} onChange={e => { setForm({ ...form, resources: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Chi phí lớn nhất dự kiến:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.costEstimate} onChange={e => { setForm({ ...form, costEstimate: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Nguồn vốn hiện tại:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.capitalSource} onChange={e => { setForm({ ...form, capitalSource: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Mục tiêu doanh thu ngắn hạn (6–12 tháng):</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.revenueGoal} onChange={e => { setForm({ ...form, revenueGoal: e.target.value }); autoResize(e); }} rows={1} /></div>
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
