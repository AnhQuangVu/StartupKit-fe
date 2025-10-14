import React, { useEffect, useRef } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { exportProjectPDF } from '../../utils/pdfExport';

export default function ProjectProfilePreview({ form, setForm, onBack, sectionId }) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const wsRef = useRef(null);
  
  // Hàm gọi API PUT để cập nhật toàn bộ thông tin dự án
  const updateProject = async () => {
    if (!form.id) {
      // Hiện thông báo lỗi
      if (window.$) {
        window.$('<div class="my-toast">Không thể cập nhật dự án: Thiếu ID dự án</div>')
          .appendTo('body').fadeIn().delay(2000).fadeOut();
      } else {
        var toast = document.createElement('div');
        toast.className = 'my-toast';
        toast.innerText = "Không thể cập nhật dự án: Thiếu ID dự án";
        toast.style.position = 'fixed';
        toast.style.top = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = '#333';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.zIndex = '9999';
        document.body.appendChild(toast);
        setTimeout(function(){ toast.remove(); }, 2000);
      }
      return;
    }
    setIsSaving(true);
    
    // Tạo payload từ form data
    const payload = {
      name: form.name || "",
      tagline: form.tagline || "",
      stage: form.stage ? form.stage.toLowerCase() : "",
      description: form.description || form.idea || "",
      logo_url: form.logo_url || form.logoPreview || "",
      website_url: form.website_url || form.website || "",
      industry: form.industry || "",
      pain_point: form.painPoint || "",
      solution: form.solution || "",
      product: form.product || "",
      customer_segment: form.customerSegment || "",
      customer_features: form.customerFeatures || "",
      market_size: form.marketSize || "",
      market_area: form.marketArea || "",
      deployment_location: form.location || "",
      business_model: form.businessModel || "",
      revenue_method: form.revenueMethod || "",
      distribution_channel: form.distributionChannel || "",
      partners: form.partners || "",
      cost_estimate: form.costEstimate || "",
      capital_source: form.capitalSource || "",
      revenue_goal: form.revenueGoal || "",
      member_count: Number(form.memberCount || 0),
      member_skills: form.memberSkills || "",
      resources: form.resources || "",
      team_image_url: form.team_image_url || form.teamImagePreview || "",
      product_image_url: form.product_image_url || form.productImagePreview || ""
    };

    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      // Gọi API PUT để cập nhật dự án
      const res = await fetch(`http://127.0.0.1:8000/projects/${form.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        // Cập nhật thành công
        const updatedProject = await res.json();
        
        // Cập nhật form với dữ liệu mới nhất từ server
        setForm(prevForm => ({ ...prevForm, ...updatedProject }));
        
        // Hiển thị thông báo thành công bằng jQuery
        if (window.$) {
          window.$('<div class="my-toast">Lưu hồ sơ thành công</div>')
            .appendTo('body').fadeIn().delay(2000).fadeOut();
        } else {
          var toast = document.createElement('div');
          toast.className = 'my-toast';
          toast.innerText = "Lưu hồ sơ thành công";
          toast.style.position = 'fixed';
          toast.style.top = '30px';
          toast.style.left = '50%';
          toast.style.transform = 'translateX(-50%)';
          toast.style.background = '#333';
          toast.style.color = '#fff';
          toast.style.padding = '12px 24px';
          toast.style.borderRadius = '8px';
          toast.style.zIndex = '9999';
          document.body.appendChild(toast);
          setTimeout(function(){ toast.remove(); }, 2000);
        }
        
        // Hiển thị modal thành công
        setShowSaveModal(true);
      } else {
        // Xử lý lỗi
        let errorMsg = "Cập nhật dự án thất bại";
        try {
          const errorData = await res.json();
          if (errorData && errorData.message) errorMsg = errorData.message;
          else if (errorData && errorData.detail) errorMsg = errorData.detail;
        } catch (e) {
          errorMsg = res.statusText || errorMsg;
        }
        
        // Hiển thị thông báo lỗi
        if (window.$) {
          window.$('<div class="my-toast">'+errorMsg+'</div>')
            .appendTo('body').fadeIn().delay(2000).fadeOut();
        } else {
          var toast = document.createElement('div');
          toast.className = 'my-toast';
          toast.innerText = errorMsg;
          toast.style.position = 'fixed';
          toast.style.top = '30px';
          toast.style.left = '50%';
          toast.style.transform = 'translateX(-50%)';
          toast.style.background = '#333';
          toast.style.color = '#fff';
          toast.style.padding = '12px 24px';
          toast.style.borderRadius = '8px';
          toast.style.zIndex = '9999';
          document.body.appendChild(toast);
          setTimeout(function(){ toast.remove(); }, 2000);
        }
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật dự án:", err);
      // Hiển thị thông báo lỗi
      if (window.$) {
        window.$('<div class="my-toast">Có lỗi xảy ra khi kết nối tới máy chủ</div>')
          .appendTo('body').fadeIn().delay(2000).fadeOut();
      } else {
        var toast = document.createElement('div');
        toast.className = 'my-toast';
        toast.innerText = 'Có lỗi xảy ra khi kết nối tới máy chủ';
        toast.style.position = 'fixed';
        toast.style.top = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = '#333';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.zIndex = '9999';
        document.body.appendChild(toast);
        setTimeout(function(){ toast.remove(); }, 2000);
      }
    } finally {
      setIsSaving(false);
    }
  };
  
  // Xử lý thay đổi hình ảnh
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      // Cập nhật state form
      setForm({
        ...form,
        [field]: file,
        [`${field}Preview`]: URL.createObjectURL(file),
      });
      
      // Đối với API, gửi cập nhật qua WebSocket với tên field đúng định dạng
      const apiFieldMap = {
        'productImage': 'product_image_url',
        'teamImage': 'team_image_url',
        'logo': 'logo_url'
      };
      
      if (apiFieldMap[field]) {
        // Tạm thời gửi URL trước, sau này có thể cần xử lý tải lên file thực tế
        sendSectionUpdate({ [apiFieldMap[field]]: URL.createObjectURL(file) });
      }
    }
  };

  // Map dữ liệu đầu vào về đúng key UI nếu cần
  useEffect(() => {
    if (!form) return;
    // Map các key snake_case sang camelCase nếu cần
    let changed = false;
    const mapped = { ...form };
    const keyMap = {
      pain_point: 'painPoint',
      customer_segment: 'customerSegment',
      customer_features: 'customerFeatures',
      market_size: 'marketSize',
      market_area: 'marketArea',
      business_model: 'businessModel',
      revenue_method: 'revenueMethod',
      distribution_channel: 'distributionChannel',
      member_skills: 'memberSkills',
      cost_estimate: 'costEstimate',
      capital_source: 'capitalSource',
      revenue_goal: 'revenueGoal',
      deployment_location: 'location',
    };
    Object.entries(keyMap).forEach(([apiKey, uiKey]) => {
      if (form[apiKey] !== undefined && mapped[uiKey] === undefined) {
        mapped[uiKey] = form[apiKey];
        changed = true;
      }
    });
    // Map các key khác như trước
    if (form.member_count !== undefined && mapped.memberCount === undefined) {
      mapped.memberCount = form.member_count;
      changed = true;
    }
    if (form.team_image_url && !mapped.teamImagePreview) {
      mapped.teamImagePreview = form.team_image_url;
      changed = true;
    }
    if (form.product_image_url && !mapped.productImagePreview) {
      mapped.productImagePreview = form.product_image_url;
      changed = true;
    }
    if (form.tagline === undefined && form.slogan !== undefined) {
      mapped.tagline = form.slogan;
      changed = true;
    }
    if (form.description === undefined && form.idea !== undefined) {
      mapped.description = form.idea;
      changed = true;
    }
    if (changed) setForm(mapped);
  }, [form, setForm]);

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
          setForm((prev) => {
            const updated = { ...prev };
            Object.keys(data.content).forEach(key => {
              // Nếu backend trả về chuỗi rỗng cho slogan thì giữ lại giá trị cũ
              if (key === 'tagline' && (data.content[key] === undefined || data.content[key] === null || data.content[key] === '')) {
                // Không cập nhật slogan nếu giá trị là undefined, null hoặc chuỗi rỗng
                return;
              }
              if (data.content[key] !== undefined && data.content[key] !== null) {
                updated[key] = data.content[key];
              }
            });
            return updated;
          });
        }
        // Nếu server gửi về thông báo lỗi hoặc trạng thái
        if (data && data.error) {
          const errorMsg = data.error;
          if (window.$) {
            window.$('<div class="my-toast">'+errorMsg+'</div>')
              .appendTo('body').fadeIn().delay(2000).fadeOut();
          } else {
            var toast = document.createElement('div');
            toast.className = 'my-toast';
            toast.innerText = errorMsg;
            toast.style.position = 'fixed';
            toast.style.top = '30px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.background = '#333';
            toast.style.color = '#fff';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '8px';
            toast.style.zIndex = '9999';
            document.body.appendChild(toast);
            setTimeout(function(){ toast.remove(); }, 2000);
          }
        }
      } catch (e) {
        if (window.$) {
          window.$('<div class="my-toast">WS message parse error</div>')
            .appendTo('body').fadeIn().delay(2000).fadeOut();
        } else {
          var toast = document.createElement('div');
          toast.className = 'my-toast';
          toast.innerText = 'WS message parse error';
          toast.style.position = 'fixed';
          toast.style.top = '30px';
          toast.style.left = '50%';
          toast.style.transform = 'translateX(-50%)';
          toast.style.background = '#333';
          toast.style.color = '#fff';
          toast.style.padding = '12px 24px';
          toast.style.borderRadius = '8px';
          toast.style.zIndex = '9999';
          document.body.appendChild(toast);
          setTimeout(function(){ toast.remove(); }, 2000);
        }
      }
    };
    ws.onerror = (err) => {
      if (window.$) {
        window.$('<div class="my-toast">WebSocket error</div>')
          .appendTo('body').fadeIn().delay(2000).fadeOut();
      } else {
        var toast = document.createElement('div');
        toast.className = 'my-toast';
        toast.innerText = 'WebSocket error';
        toast.style.position = 'fixed';
        toast.style.top = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = '#333';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.zIndex = '9999';
        document.body.appendChild(toast);
        setTimeout(function(){ toast.remove(); }, 2000);
      }
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
        {/* Các trường API chuẩn */}
        <div className="text-sm py-1"><span className="font-semibold">Tên dự án / Startup:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.name || ''} onChange={e => { setForm({ ...form, name: e.target.value }); autoResize(e); sendSectionUpdate({ name: e.target.value }); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Slogan:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.tagline || ''} onChange={e => { setForm({ ...form, tagline: e.target.value }); autoResize(e); sendSectionUpdate({ tagline: e.target.value }); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Mô tả dự án:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.description || ''} onChange={e => { setForm({ ...form, description: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Website:</span> {form.website_url ? (<a href={form.website_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline break-all">{form.website_url}</a>) : (<span className="ml-2 text-gray-400">Chưa có website</span>)}
        </div>
        <div className="text-sm py-1">
          <span className="font-semibold">Logo:</span> 
          <div className="mt-1 mb-1">
            {form.logo_url ? (
              <img src={form.logo_url} alt="Logo" className="inline-block h-12 w-12 object-contain rounded border mb-2" />
            ) : (form.logoPreview ? (
              <img src={form.logoPreview} alt="Logo" className="inline-block h-12 w-12 object-contain rounded border mb-2" />
            ) : <span className="ml-2 text-gray-400 block mb-2">Chưa có logo</span>)}
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "logo")}
              className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
            />
          </div>
        </div>
        <div className="text-sm py-1"><span className="font-semibold">Lĩnh vực:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.industry || ''} onChange={e => { setForm({ ...form, industry: e.target.value }); autoResize(e); sendSectionUpdate({ industry: e.target.value }); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Địa điểm triển khai:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.location || ''} onChange={e => { setForm({ ...form, location: e.target.value }); autoResize(e); sendSectionUpdate({ deployment_location: e.target.value }); }} rows={1} /></div>
       <div className="text-sm py-1"><span className="font-semibold">Giai đoạn hiện tại:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.stage} onChange={e => { setForm({ ...form, stage: e.target.value }); autoResize(e); }} rows={1} /></div>
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
  <div className="text-sm py-1"><span className="font-semibold">Số lượng thành viên đang có:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.memberCount || form.member_count || ''} onChange={e => { 
    const value = e.target.value;
    setForm({ ...form, memberCount: value }); 
    autoResize(e); 
    sendSectionUpdate({ member_count: isNaN(Number(value)) ? 0 : Number(value) }); 
  }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Vai trò chính :</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.memberSkills} onChange={e => { setForm({ ...form, memberSkills: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Nguồn lực hiện có:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.resources} onChange={e => { setForm({ ...form, resources: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Chi phí lớn nhất dự kiến:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.costEstimate} onChange={e => { setForm({ ...form, costEstimate: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Nguồn vốn hiện tại:</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.capitalSource} onChange={e => { setForm({ ...form, capitalSource: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1"><span className="font-semibold">Mục tiêu doanh thu ngắn hạn (6–12 tháng):</span> <textarea style={{overflow: 'hidden', minHeight: '32px'}} className="border rounded px-2 py-1 ml-2 w-full resize-none" value={form.revenueGoal} onChange={e => { setForm({ ...form, revenueGoal: e.target.value }); autoResize(e); }} rows={1} /></div>
        <div className="text-sm py-1">
          <span className="font-semibold">Hình ảnh sản phẩm:</span>
          <div className="mt-2">
            {(form.product_image_url && form.product_image_url !== "") ? (
              <img src={form.product_image_url} alt="Product" className="object-cover w-24 h-24 rounded mb-2" />
            ) : (form.productImagePreview ? (
              <img src={form.productImagePreview} alt="Product" className="object-cover w-24 h-24 rounded mb-2" />
            ) : <span className="ml-2 text-gray-400 block mb-2">Chưa có ảnh</span>)}
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "productImage")}
              className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
            />
          </div>
        </div>
        <div className="text-sm py-1">
          <span className="font-semibold">Hình ảnh đội ngũ:</span>
          <div className="mt-2">
            {(form.team_image_url && form.team_image_url !== "") ? (
              <img src={form.team_image_url} alt="Team" className="object-cover w-24 h-24 rounded mb-2" />
            ) : (form.teamImagePreview ? (
              <img src={form.teamImagePreview} alt="Team" className="object-cover w-24 h-24 rounded mb-2" />
            ) : <span className="ml-2 text-gray-400 block mb-2">Chưa có ảnh</span>)}
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "teamImage")}
              className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#FFCE23] file:text-black file:font-semibold"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button 
          type="button" 
          className="bg-[#FFCE23] hover:bg-yellow-500 text-base font-semibold px-4 py-2 rounded-lg shadow" 
          aria-label="Lưu hồ sơ" 
          onClick={updateProject}
          disabled={isSaving}
        >
          {isSaving ? 'Đang lưu...' : 'Lưu hồ sơ'}
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
