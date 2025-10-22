import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadToCloudinary } from '../../utils/cloudinary';
import styles from './styles/ProjectProfileForm.module.css';

// Cấu trúc các section và trường theo khung hồ sơ dự án
const FORM_SECTIONS = [
  {
    title: 'THÔNG TIN CHUNG DỰ ÁN',
    fields: [
      { label: 'Tên Dự án', key: 'projectName', type: 'input', placeholder: 'VD: GFU – GERMAN FOR U' },
          { label: 'Logo dự án', key: 'logo', type: 'image', placeholder: '' },
      { label: 'Lĩnh vực', key: 'field', type: 'input', placeholder: 'Giáo dục, Dịch vụ, Tài chính, Du lịch' },
      { label: 'Đơn vị thực hiện', key: 'organization', type: 'input', placeholder: 'TRƯỜNG ĐẠI HỌC MỞ HÀ NỘI' },
      { label: 'Thời gian thực hiện', key: 'time', type: 'input', placeholder: 'Hà Nội, Tháng 12/2023' },
  { label: 'Nhóm thực hiện & Giảng viên hướng dẫn', key: 'teamInfo', type: 'rich', placeholder: 'Nhập thông tin các thành viên' },
    ]
  },
  {
    title: 'PHẦN 1: TÓM TẮT DỰ ÁN',
    fields: [
      { label: 'Ý tưởng chính', key: 'mainIdea', type: 'rich', placeholder: 'Nhập ý tưởng chính...' },
      { label: 'Sản phẩm, dịch vụ & Giá trị', key: 'productValue', type: 'rich', placeholder: 'Nhập sản phẩm, dịch vụ, giá trị...' },
      { label: 'Hình ảnh sản phẩm (nhiều)', key: 'productImages', type: 'images', placeholder: '' },
    ]
  },
  {
    title: 'PHẦN 2: NỘI DUNG CHÍNH CỦA DỰ ÁN',
    subtitle: 'A. TỔNG QUAN DỰ ÁN',
    fields: [
      { label: 'Sứ mệnh', key: 'mission', type: 'rich', placeholder: 'Nhập sứ mệnh...' },
      { label: 'Tầm nhìn', key: 'vision', type: 'rich', placeholder: 'Nhập tầm nhìn...' },
      { label: 'Giá trị sản phẩm', key: 'productCoreValue', type: 'rich', placeholder: 'Nhập giá trị sản phẩm...' },
    ]
  },
  {
    title: '',
    subtitle: 'B. THÔNG TIN VỀ SẢN PHẨM, DỊCH VỤ',
    fields: [
      { label: 'Khách hàng mục tiêu', key: 'targetCustomer', type: 'rich', placeholder: 'Nhập khách hàng mục tiêu...' },
      { label: 'Lợi thế cạnh tranh', key: 'advantage', type: 'rich', placeholder: 'Nhập lợi thế cạnh tranh...' },
      { label: 'Giá trị mang lại cho cộng đồng và xã hội', key: 'communityValue', type: 'rich', placeholder: 'Nhập giá trị cộng đồng...' },
    ]
  },
  {
    title: '',
    subtitle: 'C. PHÂN TÍCH TÍNH KHẢ THI',
    fields: [
      { label: 'Quy mô thị trường', key: 'marketSize', type: 'rich', placeholder: 'Nhập quy mô thị trường...' },
      { label: 'Đối tác & Nguồn nhân lực', key: 'partners', type: 'rich', placeholder: 'Nhập đối tác, nguồn lực...' },
      { label: 'Tài chính (Khởi đầu)', key: 'finance', type: 'rich', placeholder: 'Nhập tài chính...' },
      { label: 'Tính khả thi', key: 'feasibility', type: 'rich', placeholder: 'Nhập tính khả thi...' },
      { label: 'Sản phẩm & Dịch vụ', key: 'products', type: 'rich', placeholder: 'Nhập sản phẩm & dịch vụ...' },
      { label: 'Phân tích SWOT', key: 'swot', type: 'rich', placeholder: 'Nhập phân tích SWOT...' },
      { label: 'Thuận lợi/Khó khăn', key: 'prosCons', type: 'rich', placeholder: 'Nhập thuận lợi/khó khăn...' },
      { label: 'Tính độc đáo, sáng tạo', key: 'creativity', type: 'rich', placeholder: 'Nhập tính độc đáo, sáng tạo...' },
    ]
  },
  {
    title: '',
    subtitle: 'D. KẾ HOẠCH SẢN XUẤT, KINH DOANH & PHÁT TRIỂN',
    fields: [
      { label: 'Kế hoạch kinh doanh (theo giai đoạn)', key: 'businessPlan', type: 'rich', placeholder: 'Nhập kế hoạch kinh doanh...' },
      { label: 'Kênh phân phối', key: 'distribution', type: 'rich', placeholder: 'Nhập kênh phân phối...' },
      { label: 'Phát triển, mở rộng thị trường', key: 'marketDevelopment', type: 'rich', placeholder: 'Nhập phát triển, mở rộng thị trường...' },
      { label: 'Kết quả tiềm năng', key: 'potentialResult', type: 'rich', placeholder: 'Nhập kết quả tiềm năng...' },
      { label: 'Khả năng tăng trưởng, tác động xã hội', key: 'growthImpact', type: 'rich', placeholder: 'Nhập khả năng tăng trưởng, tác động xã hội...' },
    ]
  },
  {
    title: '',
    subtitle: 'E. NGUỒN LỰC THỰC HIỆN',
    fields: [
      { label: 'Cơ cấu nhân sự (Team)', key: 'team', type: 'rich', placeholder: 'Nhập cơ cấu nhân sự...' },
      { label: 'Đánh giá nguồn nhân lực', key: 'hrEvaluation', type: 'rich', placeholder: 'Nhập đánh giá nguồn nhân lực...' },
      { label: 'Đối tác hợp tác', key: 'cooperation', type: 'rich', placeholder: 'Nhập đối tác hợp tác...' },
    ]
  },
  {
    title: '',
    subtitle: 'F. KÊNH TRUYỀN THÔNG VÀ TIẾP THỊ',
    fields: [
      { label: 'Mục tiêu truyền thông', key: 'mediaGoal', type: 'rich', placeholder: 'Nhập mục tiêu truyền thông...' },
      { label: 'Đối tượng mục tiêu', key: 'mediaTarget', type: 'rich', placeholder: 'Nhập đối tượng mục tiêu...' },
      { label: 'Kênh truyền thông', key: 'mediaChannel', type: 'rich', placeholder: 'Nhập kênh truyền thông...' },
      { label: 'Chiến dịch Marketing (Quý)', key: 'marketingCampaign', type: 'rich', placeholder: 'Nhập chiến dịch Marketing...' },
      { label: 'Công cụ truyền thông', key: 'mediaTool', type: 'rich', placeholder: 'Nhập công cụ truyền thông...' },
      { label: 'Đo lường và đánh giá', key: 'mediaMeasure', type: 'rich', placeholder: 'Nhập đo lường và đánh giá...' },
    ]
  },
];

export default function ProjectProfileFullForm({ initialData = {}, onChange }) {
  // Toolbar background can be changed here
  const TOOLBAR_BG = 'linear-gradient(180deg, rgba(255,255,255,0.99), #ececec)';
  const [form, setForm] = useState(() => {
    const obj = {};
    FORM_SECTIONS.forEach(sec => sec.fields.forEach(f => { obj[f.key] = initialData[f.key] || ''; }));
    return obj;
  });
  const [focusKey, setFocusKey] = useState(null);
  const editorRefs = useRef({});
  const [uploading, setUploading] = useState({}); // { fieldKey: boolean }
  // helpers for image uploads/previews
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSingleImageChange(key, file) {
    if (!file) return;
    // show immediate preview using object URL
    const temp = URL.createObjectURL(file);
    handleChange(key, temp);
    setUploading(u => ({ ...u, [key]: true }));
    try {
      const url = await uploadToCloudinary(file);
      // replace preview with returned URL
      handleChange(key, url);
    } catch (err) {
      console.error('Upload failed', err);
      // keep preview but optionally notify user
      // Could set an error state here
    } finally {
      setUploading(u => ({ ...u, [key]: false }));
    }
  }

  async function handleMultipleImagesChange(key, filesList) {
    const files = Array.from(filesList || []);
    if (files.length === 0) return;
    const existing = form[key] && Array.isArray(form[key]) ? form[key].slice() : [];
    setUploading(u => ({ ...u, [key]: true }));
    try {
      for (const file of files) {
        // append temporary preview first
        const temp = URL.createObjectURL(file);
        existing.push(temp);
        handleChange(key, existing.slice());
        // upload and replace temp with final url
        try {
          const url = await uploadToCloudinary(file);
          const idx = existing.indexOf(temp);
          if (idx !== -1) {
            existing[idx] = url;
            handleChange(key, existing.slice());
            // revoke temp object url
            try { URL.revokeObjectURL(temp); } catch (e) {}
          } else {
            // fallback: push url
            existing.push(url);
            handleChange(key, existing.slice());
          }
        } catch (uploadErr) {
          console.error('Upload failed for one file', uploadErr);
          // leave temp preview so user can retry or remove
        }
      }
    } finally {
      setUploading(u => ({ ...u, [key]: false }));
    }
  }

  function removeImageAt(key, idx) {
    const arr = (form[key] || []).slice();
    arr.splice(idx, 1);
    handleChange(key, arr);
  }

  function handleChange(key, value) {
    setForm(f => {
      const next = { ...f, [key]: value };
      if (onChange) onChange(next);
      return next;
    });
  }

  return (
    <form className="space-y-10">
      {FORM_SECTIONS.map((section, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6">
          {section.title && <h2 className="text-lg font-bold mb-2 text-blue-900 uppercase">{section.title}</h2>}
          {section.subtitle && <h3 className="text-base font-semibold mb-2 text-blue-700">{section.subtitle}</h3>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map(field => (
              <div key={field.key} className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 mb-1">{field.label}</label>
                {field.type === 'input' && (
                  <input
                    type="text"
                    className="border rounded p-2 bg-gray-50"
                    value={form[field.key]}
                    placeholder={field.placeholder}
                    onChange={e => handleChange(field.key, e.target.value)}
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea
                    className={
                      field.key === 'teamInfo'
                        ? "border rounded p-2 bg-gray-50 min-h-[120px] w-full md:w-[600px]"
                        : "border rounded p-2 bg-gray-50 min-h-[48px]"
                    }
                    value={form[field.key]}
                    placeholder={field.placeholder}
                    onChange={e => handleChange(field.key, e.target.value)}
                  />
                )}
                {field.type === 'image' && (
                  <div>
                    <input id={`file-${field.key}`} className={styles['file-input-hidden']} type="file" accept="image/*" onChange={e => handleSingleImageChange(field.key, e.target.files && e.target.files[0])} />
                    <label htmlFor={`file-${field.key}`} className={styles['file-picker-btn']}>
                      {uploading[field.key] ? 'Đang tải...' : 'Chọn ảnh'}
                    </label>
                    {form[field.key] && (
                      <div className="mt-2">
                        <div className={styles.thumb}><img src={form[field.key]} alt="preview" /></div>
                        <div>
                          <button type="button" className="text-sm text-red-500 mt-1" onClick={() => handleChange(field.key, '')}>Xóa</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {field.type === 'images' && (
                  <div>
                    <input id={`file-${field.key}`} className={styles['file-input-hidden']} type="file" accept="image/*" multiple onChange={e => handleMultipleImagesChange(field.key, e.target.files)} />
                    <label htmlFor={`file-${field.key}`} className={styles['file-picker-btn']}>
                      {uploading[field.key] ? 'Đang tải...' : 'Chọn nhiều ảnh'}
                    </label>
                    {Array.isArray(form[field.key]) && form[field.key].length > 0 && (
                      <div className={styles.thumbnails}>
                        {form[field.key].map((src, i) => (
                          <div key={i} className={styles.thumb}>
                            <img src={src} alt={`preview-${i}`} />
                            {src && src.startsWith('blob:') && (
                              <div style={{ position: 'absolute', left: 8, bottom: 6, background: 'rgba(255,255,255,0.88)', padding: '2px 6px', borderRadius: 6, fontSize: 11 }}>
                                Tạm xem
                              </div>
                            )}
                            <button type="button" className={styles.removeBtn} onClick={() => removeImageAt(field.key, i)}>×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {field.type === 'rich' && (
                  <div className="relative">
                    {/* Always render the toolbar DOM element, only show when focused */}
                    <div
                      id={`quill-custom-toolbar-${field.key}`}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: field.key === 'teamInfo' ? '-44px' : '-44px',
                        transform: 'translateX(-50%)',
                        display: focusKey === field.key ? 'flex' : 'none',
                        alignItems: 'center',
                        pointerEvents: 'auto',
                        zIndex: 70,
                        // stronger shadow and darker gradient so toolbar doesn't blend into card background
                        boxShadow: '0 22px 50px -22px rgba(15,23,42,0.22), 0 10px 30px -12px rgba(15,23,42,0.12)',
                        borderRadius: 10,
                        // subtle two-step gray gradient (top white -> bottom #ececec) for clearer separation
                        background: TOOLBAR_BG,
                        padding: '6px 10px',
                        minWidth: 0,
                        width: 'auto',
                        gap: 8,
                        border: '1px solid #cfe3ff',
                        transition: 'transform 0.14s cubic-bezier(.2,.9,.3,1), box-shadow 0.14s ease, border-color 0.14s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(-50%) translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 28px 80px -28px rgba(15,23,42,0.28), 0 12px 36px -16px rgba(15,23,42,0.14)'; e.currentTarget.style.borderColor = '#8bc6ff'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(-50%)'; e.currentTarget.style.boxShadow = '0 22px 50px -22px rgba(15,23,42,0.22), 0 10px 30px -12px rgba(15,23,42,0.12)'; e.currentTarget.style.borderColor = '#cfe3ff'; }}
                    >
                      <span className="ql-formats" style={{ display: 'flex', gap: 2 }}>
                        <button className="ql-bold quill-btn-beauty" style={{ width: 24, height: 24, borderRadius: 6, background: 'none', border: 'none', transition: 'background 0.15s' }}/>
                        <button className="ql-italic quill-btn-beauty" style={{ width: 24, height: 24, borderRadius: 6, background: 'none', border: 'none', transition: 'background 0.15s' }}/>
                        <button className="ql-underline quill-btn-beauty" style={{ width: 24, height: 24, borderRadius: 6, background: 'none', border: 'none', transition: 'background 0.15s' }}/>
                      </span>
                      <span className="ql-formats" style={{ display: 'flex', gap: 2 }}>
                        <button className="ql-list quill-btn-beauty" value="ordered" style={{ width: 24, height: 24, borderRadius: 6, background: 'none', border: 'none', transition: 'background 0.15s' }}/>
                        <button className="ql-list quill-btn-beauty" value="bullet" style={{ width: 24, height: 24, borderRadius: 6, background: 'none', border: 'none', transition: 'background 0.15s' }}/>
                      </span>
                      <span className="ql-formats" style={{ display: 'flex', gap: 2 }}>
                        <button className="ql-link quill-btn-beauty" style={{ width: 24, height: 24, borderRadius: 6, background: 'none', border: 'none', transition: 'background 0.15s' }}/>
                      </span>
                      <style>{`
                        /* Buttons */
                        .quill-btn-beauty:hover {
                          background: #eef2ff;
                          transform: translateY(-1px);
                        }
                        .quill-btn-beauty:focus {
                          outline: 2px solid #2563eb;
                          background: #eef2ff;
                        }
                        .quill-btn-beauty {
                          transition: transform 0.12s ease, background 0.12s ease;
                        }
                        /* Keep default Quill toolbars visually transparent, but exclude our custom toolbars by id prefix */
                        .ql-toolbar.ql-snow:not([id^="quill-custom-toolbar-"]) {
                          border: none !important;
                          padding: 0 !important;
                          background: transparent !important;
                        }
                        /* Force our custom toolbar id to use the configured background (important to override generic rules) */
                        #quill-custom-toolbar-${field.key} {
                          background: ${TOOLBAR_BG} !important;
                          border-radius: 10px;
                        }
                      `}</style>
                    </div>
                    <div
                      ref={el => (editorRefs.current[field.key] = el)}
                      style={
                        field.key === 'teamInfo'
                          ? { position: 'relative', width: '100%', maxWidth: 600, minHeight: 120, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb', padding: 0, boxSizing: 'border-box' }
                          : { position: 'relative' }
                      }
                    >
                      <ReactQuill
                        value={form[field.key]}
                        onChange={val => handleChange(field.key, val)}
                        onFocus={() => setFocusKey(field.key)}
                        onBlur={() => setFocusKey(null)}
                        theme="snow"
                        placeholder={field.placeholder}
                        modules={{ toolbar: { container: `#quill-custom-toolbar-${field.key}` } }}
                        style={
                          field.key === 'teamInfo'
                            ? { minHeight: 100, width: '100%', background: 'transparent', border: 'none', fontSize: 15, padding: 12, boxSizing: 'border-box' }
                            : undefined
                        }
                      />
                      {field.key === 'teamInfo' && (
                        <style>{`
                          .ql-container.ql-snow {
                            border: none !important;
                            background: transparent !important;
                            border-radius: 8px !important;
                            font-size: 15px !important;
                            font-family: inherit !important;
                            min-height: 100px;
                            padding: 0 !important;
                          }
                          .ql-editor {
                            min-height: 100px;
                            padding: 12px !important;
                            background: transparent !important;
                            font-size: 15px !important;
                            font-family: inherit !important;
                            color: #222;
                          }
                          .ql-editor.ql-blank::before {
                            color: #888 !important;
                            font-style: italic;
                            opacity: 1;
                            font-size: 15px;
                          }
                        `}</style>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}
