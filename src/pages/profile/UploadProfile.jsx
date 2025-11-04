import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { API_BASE, authHeaders, fetchWithTimeout } from '../../config/api';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { usePosts } from '../../hooks/usePosts';

// Note: This component optionally uses `pdfjs-dist` to render a PDF preview and extract text.
// If you don't have pdfjs installed, run: npm install pdfjs-dist

// Auto-resize textarea component: grows with content up to maxRows
function AutoResizeTextarea({ value, onChange, className = '', minRows = 1, maxRows = 12, ...rest }) {
  const ref = useRef(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const computed = window.getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight) || 20;
    const maxHeight = maxRows ? lineHeight * maxRows : undefined;
    const newHeight = el.scrollHeight;
    el.style.height = (maxHeight ? Math.min(newHeight, maxHeight) : newHeight) + 'px';
    // Toggle vertical scrollbar only if exceeding max
    if (maxHeight && newHeight > maxHeight) {
      el.style.overflowY = 'auto';
    } else {
      el.style.overflowY = 'hidden';
    }
  };

  useEffect(() => {
    resize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e) => {
    onChange && onChange(e);
    // Defer resize until value is applied in React state
    setTimeout(resize, 0);
  };

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      onChange={handleChange}
      className={`resize-none overflow-hidden ${className}`}
      {...rest}
    />
  );
}

function SectionNav() {
  const sections = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'market', label: 'Thị trường' },
    { id: 'business', label: 'Kinh doanh' },
    { id: 'partners', label: 'Đối tác' },
    { id: 'posts', label: 'Bài viết' },
    { id: 'team', label: 'Đội ngũ' },
  ];
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24 bg-white rounded-lg border border-gray-200 shadow-sm p-3">
        <div className="text-xs font-semibold text-gray-600 mb-2">Mục lục</div>
        <nav className="space-y-1">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="block px-2 py-1.5 rounded text-sm text-gray-700 hover:bg-gray-50">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default function UploadProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  // PDF upload/preview feature removed. Kept other project/profile state below.

  // Thêm states để quản lý dữ liệu
  const [projectData, setProjectData] = useState({
    name: '',
    tagline: '',
    description: '',
    logo_url: null,
    team_image_url: null,
    website_url: '',
    industry: '',
    stage: 'y-tuong',
    pain_point: '',
    solution: '',
    product: '',
    customer_segment: '',
    customer_features: '',
    market_size: '',
    market_area: '',
    business_model: '',
    revenue_method: '',
    distribution_channel: '',
    partners: '',
    cost_estimate: '',
    capital_source: '',
    revenue_goal: '',
    member_count: 0,
    member_skills: '',
    resources: '',
    deployment_location: ''
  });

  const [members, setMembers] = useState([]);
  // keep file objects for later upload
  const [projectFiles, setProjectFiles] = useState({ bannerFile: null, logoFile: null });
  const [saving, setSaving] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);
  const [logoProgress, setLogoProgress] = useState(0);
  const [bannerProgress, setBannerProgress] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const toastTimerRef = useRef(null);

  // Lấy projectId: ưu tiên location.state, fallback query param ?projectId=...
  const projectId = location.state?.projectId || location.state?.project?.id || new URLSearchParams(window.location.search).get('projectId');

  // Posts hook (sau khi đã có projectId)
  const { posts, loading: postsLoading, loadingMore: postsLoadingMore, hasMore: postsHasMore, loadMore: postsLoadMore, error: postsError } = usePosts(projectId, { pageSize: 20 });

  const showToast = (message, type = 'info', ms = 3500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ visible: true, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast({ visible: false, message: '', type: 'info' });
      toastTimerRef.current = null;
    }, ms);
  };

  const closeToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = null;
    setToast({ visible: false, message: '', type: 'info' });
  };

  

  // Utility: lấy token từ localStorage (tùy project có thể khác key)
  const getToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('access_token') || null;
  };

  // ---------- Load project và posts khi mount ----------
  useEffect(() => {
    if (!projectId) return;
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  async function loadProject() {
    const token = getToken();
    if (!token) return;
    try {
      setLoadingProject(true);
      const t0 = performance.now();
      const res = await fetchWithTimeout(`${API_BASE}/projects/${projectId}/`, {
        headers: authHeaders(token)
      , timeout: 10000 });
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      const t1 = performance.now();
      // Map các trường từ API response
      setProjectData(prev => ({
        ...prev,
        name: data.name || prev.name,
        tagline: data.tagline || prev.tagline,
        description: data.description || prev.description,
        logo_url: data.logo_url || data.logo?.url || prev.logo_url,
        team_image_url: data.team_image_url || data.team_image?.url || prev.team_image_url,
        website_url: data.website_url || prev.website_url,
        industry: data.industry || prev.industry,
        stage: data.stage || prev.stage,
        pain_point: data.pain_point || prev.pain_point,
        solution: data.solution || prev.solution,
        product: data.product || prev.product,
        customer_segment: data.customer_segment || prev.customer_segment,
        customer_features: data.customer_features || prev.customer_features,
        market_size: data.market_size || prev.market_size,
        market_area: data.market_area || prev.market_area,
        business_model: data.business_model || prev.business_model,
        revenue_method: data.revenue_method || prev.revenue_method,
        distribution_channel: data.distribution_channel || prev.distribution_channel,
        partners: data.partners || prev.partners,
        cost_estimate: data.cost_estimate || prev.cost_estimate,
        capital_source: data.capital_source || prev.capital_source,
        revenue_goal: data.revenue_goal || prev.revenue_goal,
        member_skills: data.member_skills || prev.member_skills,
        resources: data.resources || prev.resources,
        deployment_location: data.deployment_location || prev.deployment_location
      }));

      // Try to fetch members if backend exposes endpoint
      const memRes = await fetchWithTimeout(`${API_BASE}/projects/${projectId}/members`, { headers: authHeaders(token), timeout: 8000 });
      if (memRes.ok) {
        const mems = await memRes.json();
        setMembers(mems.map(m => ({ id: m.id, name: m.name || (m.user_id ? `User ${m.user_id}` : ''), position: m.role_in_project || '', avatar: m.avatar_url || '' })));
      }
      const ms = Math.round(t1 - t0);
      if (ms > 2000) {
        showToast('Máy chủ phản hồi chậm khi tải project (' + ms + 'ms)', 'warning', 2500);
      }
    } catch (err) {

    } finally {
      setLoadingProject(false);
    }
  }

  // loadPosts removed: replaced by usePosts hook

  // previously handled incoming file via location.state; feature removed

  // PDF processing functions removed

  // Handler cho việc cập nhật thông tin dự án
  const handleProjectChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validate và normalize URL
  const validateAndNormalizeUrl = (url) => {
    if (!url || !url.trim()) return null; // URL optional
    
    let normalizedUrl = url.trim();
    
    // Nếu không có scheme, thêm https://
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }
    
    try {
      new URL(normalizedUrl);
      return normalizedUrl;
    } catch (err) {
      return false; // Invalid URL
    }
  };

  // Handler cho việc upload ảnh
  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;

        
        // Lưu base64 vào state - key khác nhau
        if (type === 'logo') {
          setProjectData(prev => ({ ...prev, logo_url: base64 }));
        } else if (type === 'banner') {
          setProjectData(prev => ({ ...prev, team_image_url: base64 }));
        }
        
        // Lưu file object để upload sau
        setProjectFiles(prev => ({ 
          ...prev, 
          [`${type}File`]: file 
        }));
        
        showToast(`✓ Đã chọn ảnh ${type === 'logo' ? 'logo' : 'banner'}. Nhấn "Lưu hồ sơ" để upload.`, 'info', 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler cho việc thêm thành viên
  const [newMember, setNewMember] = useState({
    name: '',
    position: ''
  });

  const handleAddMember = async () => {
    if (!projectId) { showToast('Project ID không xác định', 'error'); return; }
    if (!newMember.name || !newMember.name.trim()) { showToast('Vui lòng nhập tên thành viên', 'warning'); return; }
    if (!newMember.position || !newMember.position.trim()) { showToast('Vui lòng nhập vị trí', 'warning'); return; }

    const token = getToken();
    if (!token) { showToast('Bạn cần đăng nhập', 'warning'); return; }

    try {
      const body = {
        name: newMember.name.trim(),
        role_in_project: newMember.position.trim()
      };


      const res = await fetch(`${API_BASE}/projects/${projectId}/members`, {
        method: 'POST',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const txt = await res.text();

        showToast('Thêm thành viên thất bại: ' + txt.substring(0, 150), 'error');
        return;
      }

      const created = await res.json();


      // Thêm vào UI list
      const newMemberItem = {
        id: created.id || Math.random().toString(),
        name: created.name || body.name,
        position: created.role_in_project || body.role_in_project,
        avatar: created.avatar_url || ''
      };

      setMembers(prev => [newMemberItem, ...prev]);
      setNewMember({ name: '', position: '' });
      showToast('✓ Thêm thành viên thành công!', 'success');
    } catch (err) {

      showToast('Lỗi thêm thành viên: ' + err.message, 'error');
    }
  };

  // Lưu project: POST tạo mới hoặc PATCH cập nhật
  const saveProject = async () => {
    const token = getToken();
    if (!token) { showToast('Bạn cần đăng nhập', 'warning'); return; }
    // Validation
    if (!projectData.name || projectData.name.trim().length === 0) {
      showToast('Vui lòng nhập tên dự án', 'warning');
      return;
    }
    if (projectData.name.trim().length < 3) {
      showToast('Tên dự án phải có ít nhất 3 ký tự', 'warning');
      return;
    }
    if (!projectData.tagline || projectData.tagline.trim().length === 0) {
      showToast('Vui lòng nhập tóm tắt ngắn cho dự án', 'warning');
      return;
    }
    if (!projectData.description || projectData.description.trim().length === 0) {
      showToast('Vui lòng nhập giới thiệu dự án', 'warning');
      return;
    }

    // ✅ Validation: Stage enum must be valid
    const ALLOWED_STAGES = ['y-tuong', 'nghien-cuu-thi-truong', 'hoan-thien-san-pham', 'khao-sat', 'launch'];
    if (!ALLOWED_STAGES.includes(projectData.stage)) {
      showToast('⚠️ Stage không hợp lệ. Vui lòng chọn giai đoạn hợp lệ.', 'warning');
      return;
    }

    // ✅ Validation: Website URL nếu có
    let normalizedWebsiteUrl = projectData.website_url;
    if (projectData.website_url && projectData.website_url.trim()) {
      const validationResult = validateAndNormalizeUrl(projectData.website_url);
      if (validationResult === false) {
        showToast('⚠️ Website URL không hợp lệ. Vui lòng nhập URL đúng định dạng.', 'warning');
        return;
      }
      normalizedWebsiteUrl = validationResult;
    }

    setSaving(true);
    try {
      let logo_url = projectData.logo_url;
      let team_image_url = projectData.team_image_url;
      let logoPublicId = '';
      let bannerPublicId = '';

      // Upload logo nếu có file mới
      if (projectFiles.logoFile) {
        try {
          setLogoProgress(1);
          const uploadResponse = await uploadToCloudinary(projectFiles.logoFile, { onProgress: (p) => setLogoProgress(p) });
          // uploadResponse có thể là string URL hoặc object {url, public_id}
          if (typeof uploadResponse === 'string') {
            logo_url = uploadResponse;
            // Extract public_id từ URL nếu cần (Cloudinary URL format)
            logoPublicId = uploadResponse.split('/').pop().split('.')[0];
          } else {
            logo_url = uploadResponse.url;
            logoPublicId = uploadResponse.public_id || '';
          }

          showToast('✓ Logo upload thành công', 'success', 2000);
        } catch (err) {

          showToast(`⚠️ Upload logo thất bại: ${err.message}. Vui lòng thử lại.`, 'warning', 5000);
        } finally {
          setTimeout(() => setLogoProgress(0), 600);
        }
      }

      // Upload banner nếu có file mới
      if (projectFiles.bannerFile) {
        try {
          setBannerProgress(1);
          const uploadResponse = await uploadToCloudinary(projectFiles.bannerFile, { onProgress: (p) => setBannerProgress(p) });
          if (typeof uploadResponse === 'string') {
            team_image_url = uploadResponse;
            bannerPublicId = uploadResponse.split('/').pop().split('.')[0];
          } else {
            team_image_url = uploadResponse.url;
            bannerPublicId = uploadResponse.public_id || '';
          }

          showToast('✓ Banner upload thành công', 'success', 2000);
        } catch (err) {
          console.error('Banner upload error:', err);
          showToast(`⚠️ Upload banner thất bại: ${err.message}. Vui lòng thử lại.`, 'warning', 5000);
        } finally {
          setTimeout(() => setBannerProgress(0), 600);
        }
      }

      // Nếu upload thất bại và giá trị còn là base64 (data:...), đừng gửi lên backend
      if (typeof logo_url === 'string' && logo_url.startsWith('data:')) {
        logo_url = undefined;
      }
      if (typeof team_image_url === 'string' && team_image_url.startsWith('data:')) {
        team_image_url = undefined;
      }

      // Tạo payload tối giản với các trường bắt buộc trước
      const requiredFields = {
        name: projectData.name?.trim(),
        description: projectData.description?.trim(),
        stage: projectData.stage || 'y-tuong'
      };

      // Thêm các trường có giá trị (đã được xác thực) vào payload
      const optionalFields = {
        logo_url: logo_url,
        team_image_url: team_image_url,
        website_url: normalizedWebsiteUrl,
        industry: projectData.industry?.trim(),
        tagline: projectData.tagline?.trim(),
        pain_point: projectData.pain_point?.trim(),
        solution: projectData.solution?.trim(),
        product: projectData.product?.trim(),
        customer_segment: projectData.customer_segment?.trim(),
        customer_features: projectData.customer_features?.trim(),
        market_size: projectData.market_size?.trim(),
        market_area: projectData.market_area?.trim(),
        business_model: projectData.business_model?.trim(),
        revenue_method: projectData.revenue_method?.trim(),
        distribution_channel: projectData.distribution_channel?.trim(),
        partners: projectData.partners?.trim(),
        cost_estimate: projectData.cost_estimate?.trim(),
        capital_source: projectData.capital_source?.trim(),
        revenue_goal: projectData.revenue_goal?.trim(),
        // Chuyển đổi member_count thành số
        member_count: typeof projectData.member_count === 'string' 
          ? parseInt(projectData.member_count, 10) 
          : (typeof projectData.member_count === 'number' ? projectData.member_count : undefined),
        member_skills: projectData.member_skills?.trim(),
        resources: projectData.resources?.trim(),
        deployment_location: projectData.deployment_location?.trim(),
        // Thêm object logo và team_image đúng chuẩn backend
        logo: logo_url ? { url: logo_url, public_id: logoPublicId || '' } : undefined,
        team_image: team_image_url ? { url: team_image_url, public_id: bannerPublicId || '' } : undefined
      };

      // Đảm bảo tagline luôn có mặt trong payload (có thể là chuỗi rỗng)
      const filteredOptionalFields = { ...optionalFields };
      if (!('tagline' in filteredOptionalFields) || filteredOptionalFields.tagline === undefined || filteredOptionalFields.tagline === null) {
        filteredOptionalFields.tagline = '';
      }

      const rawPayload = {
        ...requiredFields,
        ...Object.fromEntries(
          Object.entries(filteredOptionalFields)
            .filter(([k, v]) => k === 'tagline' || (v !== undefined && v !== null && v !== ''))
        )
      };

      // ✅ Loại bỏ key rỗng/undefined để tránh 500 từ backend, nhưng giữ tagline
      const payload = Object.fromEntries(
        Object.entries(rawPayload)
          .map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
          .filter(([k, v]) => k === 'tagline' || (v !== undefined && v !== null && !(typeof v === 'string' && v.length === 0)))
      );

      console.log('📤 Payload gửi lên API:', payload);
      // Tự động test logic: kiểm tra trường logo/team_image
      if (payload.logo && payload.logo.url && payload.logo.url.startsWith('https://')) {
        console.log('✅ Logo object gửi đúng chuẩn:', payload.logo);
      } else {
        console.warn('⚠️ Logo object thiếu hoặc sai:', payload.logo);
      }
      if (payload.team_image && payload.team_image.url && payload.team_image.url.startsWith('https://')) {
        console.log('✅ Banner object gửi đúng chuẩn:', payload.team_image);
      } else {
        console.warn('⚠️ Banner object thiếu hoặc sai:', payload.team_image);
      }

  const method = projectId ? 'PATCH' : 'POST';
  // Backend của bạn chấp nhận đường dẫn không có trailing slash
  const url = projectId ? `${API_BASE}/projects/${projectId}` : `${API_BASE}/projects`;

      // Log payload để debug
      console.log('Final payload:', JSON.stringify(payload, null, 2));

      const t0 = performance.now();
      const res = await fetchWithTimeout(url, {
        method,
        headers: {
          ...authHeaders(token),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Thêm header để backend biết request từ đâu
          'X-Request-Source': 'startup-kit-fe'
        },
        body: JSON.stringify(payload),
        timeout: 12000
      });

      if (!res.ok) {
        let errorMessage = 'Lưu project thất bại';
        // Đọc body một lần dưới dạng text, sau đó thử parse JSON
        const raw = await res.text();
        console.log('Save project response:', raw);
        try {
          const errorData = raw ? JSON.parse(raw) : null;
          if (errorData) {
            if (errorData.backend_response) {
              // Enhanced proxy error with backend details
              console.log('Backend error details:', errorData.backend_response);
              errorMessage = errorData.message || JSON.stringify(errorData.backend_response);
            } else if (errorData.detail) {
              errorMessage = typeof errorData.detail === 'string' 
                ? errorData.detail 
                : JSON.stringify(errorData.detail);
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.errors) {
              errorMessage = Object.entries(errorData.errors)
                .map(([field, msg]) => `${field}: ${msg}`)
                .join('; ');
            } else if (errorData.error === 'fetch failed') {
              errorMessage = `Không kết nối được tới backend (${errorData.message || 'unknown error'}). URL: ${errorData.request_url}`;
            } else {
              errorMessage = JSON.stringify(errorData).slice(0, 200);
            }
          } else {
            errorMessage = raw.slice(0, 200) || errorMessage;
          }
        } catch {
          errorMessage = raw.slice(0, 200) || errorMessage;
        }
        console.error('saveProject failed', errorMessage);
        showToast('❌ ' + errorMessage, 'error');
        return;
      }

  const data = await res.json();
      console.log('✅ Response từ API:', data);
      const newProjectId = data.id || projectId;

      setProjectData(prev => ({
        ...prev,
        name: data.name || prev.name,
        tagline: data.tagline || prev.tagline,
        description: data.description || prev.description,
        logo_url: data.logo_url || data.logo?.url || prev.logo_url,
        team_image_url: data.team_image?.url || prev.team_image_url,
        website_url: data.website_url || prev.website_url,
        industry: data.industry || prev.industry,
        stage: data.stage || prev.stage,
        pain_point: data.pain_point || prev.pain_point,
        solution: data.solution || prev.solution,
        product: data.product || prev.product,
        customer_segment: data.customer_segment || prev.customer_segment,
        customer_features: data.customer_features || prev.customer_features,
        market_size: data.market_size || prev.market_size,
        market_area: data.market_area || prev.market_area,
        business_model: data.business_model || prev.business_model,
        revenue_method: data.revenue_method || prev.revenue_method,
        distribution_channel: data.distribution_channel || prev.distribution_channel,
        partners: data.partners || prev.partners,
        cost_estimate: data.cost_estimate || prev.cost_estimate,
        capital_source: data.capital_source || prev.capital_source,
        revenue_goal: data.revenue_goal || prev.revenue_goal,
        member_skills: data.member_skills || prev.member_skills,
        resources: data.resources || prev.resources,
        deployment_location: data.deployment_location || prev.deployment_location
      }));

      // ✅ Reset projectFiles sau khi upload thành công
      setProjectFiles({ bannerFile: null, logoFile: null });

      showToast('Lưu project thành công!', 'success');
      const t1 = performance.now();
      const ms = Math.round(t1 - t0);
      if (ms > 2500) {
        showToast('Máy chủ xử lý lưu chậm (' + ms + 'ms). Ảnh lớn có thể làm chậm.', 'warning', 3000);
      }

      // Nếu tạo project mới, lưu projectId vào localStorage và URL
      if (!projectId && newProjectId) {
        localStorage.setItem('lastProjectId', newProjectId);
        window.history.replaceState(null, '', `?projectId=${newProjectId}`);
      }
    } catch (err) {
      console.error('saveProject error', err);
      const msg = err?.name === 'AbortError' ? 'Máy chủ phản hồi quá lâu (timeout). Vui lòng thử lại.' : ('Lỗi khi lưu project: ' + err.message);
      showToast(msg, 'error');
    }
    finally {
      setSaving(false);
    }
  };

  // Đăng tải project (publish)
  const publishProject = async () => {
    if (!projectId) {
      showToast('Vui lòng tạo project trước', 'warning');
      return;
    }

    const token = getToken();
    if (!token) { showToast('Bạn cần đăng nhập', 'warning'); return; }

    setSaving(true);
    try {
      const t0 = performance.now();
      const res = await fetchWithTimeout(`${API_BASE}/projects/${projectId}/publish`, {
        method: 'POST',
        headers: authHeaders(token),
        timeout: 10000
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error('publishProject failed', txt);
        showToast('Đăng tải project thất bại', 'error');
        return;
      }

      const data = await res.json();
      showToast('Đăng tải project thành công!', 'success');
      const t1 = performance.now();
      const ms = Math.round(t1 - t0);
      if (ms > 2000) {
        showToast('Máy chủ xử lý publish chậm (' + ms + 'ms)', 'warning', 2500);
      }
      // Có thể redirect hoặc update UI tùy ý
      console.log('Published project:', data);
    } catch (err) {
      console.error('publishProject error', err);
      const msg = err?.name === 'AbortError' ? 'Máy chủ phản hồi quá lâu (timeout) khi publish.' : 'Lỗi khi đăng tải project';
      showToast(msg, 'error');
    }
    finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
  <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-8 pb-24">
        {/* Header với nút quay lại */}
        <div className="mb-4 flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-lg transition-colors"
            title="Quay lại"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="sm" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Hồ sơ dự án</h1>
        </div>

        {/* Legend for required fields */}
        <p className="text-xs text-gray-500 mb-4">
          Các trường có dấu <span className="text-red-500">*</span> là bắt buộc.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <SectionNav />
          <div className="lg:col-span-9">
        <div id="overview" className="bg-white rounded-lg shadow p-6">
          {/* Banner / basic info */}
          <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-5 group">
            {loadingProject ? (
              <div className="w-full h-full animate-pulse bg-gray-200" />
            ) : projectData.team_image_url && projectData.team_image_url.length > 0 ? (
              <>
                <img 
                  src={projectData.team_image_url} 
                  alt="Project Banner" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {}}
                />
                {bannerProgress > 0 && bannerProgress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2">
                    <div className="h-2 bg-gray-300 rounded">
                      <div className="h-2 bg-blue-500 rounded" style={{ width: `${bannerProgress}%` }} />
                    </div>
                    <div className="text-xs text-white mt-1">Đang tải banner: {bannerProgress}%</div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p>Banner chưa được thêm</p>
                  {projectData.team_image_url && <p className="text-xs mt-2 text-gray-400">(Kích thước: {projectData.team_image_url.length} bytes)</p>}
                  <p className="text-xs mt-1 text-gray-400">Khuyến nghị: 1600×600px, &lt; 1.5MB.</p>
                </div>
              </div>
            )}
            {/* Upload banner button - appears on hover */}
            <label className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
              <div className="text-white text-center">
                <div className="text-sm font-semibold">Tải lên ảnh banner</div>
                <div className="text-[11px] opacity-90">Khuyến nghị: 1600×600px (JPEG)</div>
              </div>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} className="hidden" />
            </label>
            {/* Logo overlay */}
            <div className="absolute bottom-3 left-3 bg-white p-1.5 rounded-lg shadow group">
              {projectData.logo_url && projectData.logo_url.length > 0 ? (
                <div className="relative">
                  <img 
                    src={projectData.logo_url} 
                    alt="Project Logo" 
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => {}}
                  />
                  <label className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 rounded transition-all">
                    <span className="text-white text-xs font-semibold">Đổi</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} className="hidden" />
                  </label>
                  {logoProgress > 0 && logoProgress < 100 && (
                    <div className="absolute -bottom-2 left-0 right-0">
                      <div className="h-0.5 bg-gray-300 rounded">
                        <div className="h-0.5 bg-blue-500 rounded" style={{ width: `${logoProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <label className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors">
                  <span>Logo</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên dự án <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={projectData.name}
                    onChange={(e) => handleProjectChange('name', e.target.value)}
                    placeholder="Tên dự án (tối thiểu 3 ký tự)"
                    required
                    aria-required="true"
                    minLength={3}
                    className={`text-2xl font-bold w-full border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none ${
                      projectData.name && projectData.name.trim().length > 0
                        ? projectData.name.trim().length < 3
                          ? 'text-red-600'
                          : 'text-gray-900'
                        : 'text-gray-900'
                    }`}
                  />
                  {projectData.name && projectData.name.trim().length > 0 && (
                    <span className={`text-xs font-semibold whitespace-nowrap ${projectData.name.trim().length >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                      {projectData.name.trim().length >= 3 ? '✓' : `${projectData.name.trim().length}/3`}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Tóm tắt ngắn <span className="text-red-500">*</span></h3>
                <input type="text" value={projectData.tagline} onChange={(e) => handleProjectChange('tagline', e.target.value)} placeholder="VD: Công cụ quản lý dự án hỗ trợ AI" className="w-full p-2 border rounded-lg" maxLength="150" required aria-required="true" />
                <p className="text-[11px] text-gray-500 mt-1">{projectData.tagline.length}/150</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Giới thiệu dự án <span className="text-red-500">*</span></h3>
                <AutoResizeTextarea
                  value={projectData.description}
                  onChange={(e) => handleProjectChange('description', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  minRows={3}
                  placeholder="Mô tả chi tiết về dự án..."
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label className="font-semibold mb-2 block" htmlFor="industry">Ngành công nghiệp</label>
                <input id="industry" type="text" value={projectData.industry} onChange={(e) => handleProjectChange('industry', e.target.value)} placeholder="VD: SaaS, Fintech, Edtech, Healthtech" className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-5 rounded-lg space-y-3.5">
                <div>
                  <label className="font-semibold mb-2 block" htmlFor="website_url">Website</label>
                  <input id="website_url" type="url" value={projectData.website_url} onChange={(e) => handleProjectChange('website_url', e.target.value)} placeholder="https://example.vn" className="w-full p-2 border rounded" />
                  <p className="text-[11px] text-gray-500 mt-1">VD: https://example.vn (tự động thêm https:// nếu thiếu)</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Giai đoạn <span className="text-red-500">*</span></h3>
                  <select
                    value={projectData.stage}
                    onChange={(e) => handleProjectChange('stage', e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                    aria-required="true"
                  >
                    <option value="y-tuong">(ý tưởng)</option>
                    <option value="nghien-cuu-thi-truong">(nghiên cứu thị trường)</option>
                    <option value="hoan-thien-san-pham">(hoàn thiện sản phẩm)</option>
                    <option value="khao-sat">(khảo sát)</option>
                    <option value="launch">(ra mắt)</option>
                  </select>
                </div>

              </div>
            </div>
          </div>
          </div>

          {/* Business & Market */}
          <div id="business" className="border-t pt-6 mt-6">
            <h2 className="text-xl font-bold mb-5">Kinh doanh & Thị trường</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Vấn đề cần giải quyết</h3>
                <AutoResizeTextarea 
                  value={projectData.pain_point} 
                  onChange={(e) => handleProjectChange('pain_point', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={3} 
                  placeholder="Mô tả vấn đề mà startup giải quyết..."
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Giải pháp của bạn</h3>
                <AutoResizeTextarea 
                  value={projectData.solution} 
                  onChange={(e) => handleProjectChange('solution', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={3} 
                  placeholder="Giải pháp độc đáo của bạn là gì?"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sản phẩm/Dịch vụ</h3>
                <AutoResizeTextarea 
                  value={projectData.product} 
                  onChange={(e) => handleProjectChange('product', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={3} 
                  placeholder="Mô tả chi tiết sản phẩm/dịch vụ chính..."
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Đối tượng khách hàng mục tiêu</h3>
                <AutoResizeTextarea 
                  value={projectData.customer_segment} 
                  onChange={(e) => handleProjectChange('customer_segment', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={3} 
                  placeholder="VD: Startup, SME, Doanh nghiệp, Cá nhân"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kích thước thị trường</h3>
                <input 
                  type="text"
                  value={projectData.market_size} 
                  onChange={(e) => handleProjectChange('market_size', e.target.value)} 
                  className="w-full p-2 border rounded-lg"
                  placeholder="VD: 100 tỷ USD, Quy mô toàn cầu"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Địa bàn hoạt động</h3>
                <input 
                  type="text"
                  value={projectData.market_area} 
                  onChange={(e) => handleProjectChange('market_area', e.target.value)} 
                  className="w-full p-2 border rounded-lg"
                  placeholder="VD: Hà Nội, TP.HCM, Toàn Việt Nam, Đông Nam Á"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Mô hình kinh doanh</h3>
                <AutoResizeTextarea 
                  value={projectData.business_model} 
                  onChange={(e) => handleProjectChange('business_model', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={3} 
                  placeholder="VD: B2B SaaS, B2C E-commerce, Subscription"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phương thức tạo doanh thu</h3>
                <AutoResizeTextarea 
                  value={projectData.revenue_method} 
                  onChange={(e) => handleProjectChange('revenue_method', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={3} 
                  placeholder="VD: Huy động vốn, Freemium, Bán hàng, Advertising"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Mục tiêu doanh thu</h3>
                <input 
                  type="text"
                  value={projectData.revenue_goal} 
                  onChange={(e) => handleProjectChange('revenue_goal', e.target.value)} 
                  className="w-full p-2 border rounded-lg"
                  placeholder="VD: 1 tỷ VND năm 1, 50 tỷ VND trong 3 năm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div>
                <h3 className="font-semibold mb-2">Chi phí dự kiến</h3>
                <input 
                  type="text"
                  value={projectData.cost_estimate} 
                  onChange={(e) => handleProjectChange('cost_estimate', e.target.value)} 
                  className="w-full p-2 border rounded-lg"
                  placeholder="VD: 1-2 tỷ VND, 5 tỷ VND"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Nguồn vốn dự kiến</h3>
                <input 
                  type="text"
                  value={projectData.capital_source} 
                  onChange={(e) => handleProjectChange('capital_source', e.target.value)} 
                  className="w-full p-2 border rounded-lg"
                  placeholder="VD: Vốn cá nhân, Đầu tư thiên thần, Venture capital"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kênh phân phối</h3>
                <AutoResizeTextarea 
                  value={projectData.distribution_channel} 
                  onChange={(e) => handleProjectChange('distribution_channel', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={2} 
                  placeholder="VD: Bán trực tiếp, Sàn thương mại, Hợp tác với partner"
                />
              </div>
            </div>
          </div>

          {/* Partners & Deployment */}
          <div id="partners" className="border-t pt-6 mt-6">
            <h2 className="text-xl font-bold mb-5">Đối tác & Triển khai</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Đối tác/Investor hiện tại</h3>
                <AutoResizeTextarea 
                  value={projectData.partners} 
                  onChange={(e) => handleProjectChange('partners', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={3} 
                  placeholder="Danh sách các đối tác, investor hoặc mentor..."
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Địa điểm triển khai</h3>
                <input 
                  type="text"
                  value={projectData.deployment_location} 
                  onChange={(e) => handleProjectChange('deployment_location', e.target.value)} 
                  className="w-full p-2 border rounded-lg"
                  placeholder="VD: Hà Nội, TP.HCM, Online"
                />
              </div>
            </div>
          </div>

          {/* Posts */}
          <div id="posts" className="border-t pt-6 mt-6">
            <h2 className="text-xl font-bold mb-5">Bài viết</h2>
            {postsError && (
              <div className="text-sm text-red-600 mb-3">Lỗi tải bài viết: {postsError.message}</div>
            )}
            {postsLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {posts && posts.length > 0 ? posts.map((p) => (
                  <div key={p.id} className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">{new Date(p.created_at).toLocaleString()}</div>
                    <div className="text-gray-900">{p.title || p.body || '(không có nội dung)'}</div>
                  </div>
                )) : (
                  <div className="text-sm text-gray-500">Chưa có bài viết.</div>
                )}
                {postsHasMore && (
                  <button
                    onClick={postsLoadMore}
                    disabled={postsLoadingMore}
                    className={`bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded ${postsLoadingMore ? 'opacity-60 cursor-wait' : ''}`}
                  >
                    {postsLoadingMore ? 'Đang tải...' : 'Tải thêm'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Members / Skills */}
          <div id="team" className="border-t pt-6 mt-6">
            <h2 className="text-xl font-bold mb-5">Đội ngũ & Tài nguyên</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div>
                <h3 className="font-semibold mb-2">Số lượng thành viên</h3>
                <input 
                  type="number"
                  value={projectData.member_count || 0}
                  onChange={(e) => handleProjectChange('member_count', parseInt(e.target.value) || 0)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Nhập số lượng..."
                  min="0"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kỹ năng đội ngũ</h3>
                <AutoResizeTextarea 
                  value={projectData.member_skills} 
                  onChange={(e) => handleProjectChange('member_skills', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={4} 
                  placeholder="VD: Lập trình web, AI/ML, Thiết kế, Marketing"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tài nguyên</h3>
                <AutoResizeTextarea 
                  value={projectData.resources} 
                  onChange={(e) => handleProjectChange('resources', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  minRows={4} 
                  placeholder="VD: Vốn tài chính, Không gian văn phòng, Cố vấn, Hợp tác"
                />
              </div>
            </div>
          </div>

          {/* Removed in-content action buttons to avoid duplication with sticky bar */}
          </div>
        </div>
      </main>
      {/* Sticky action bar at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 px-3 py-2 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-end gap-2.5">
          <button 
            onClick={() => saveProject()} 
            disabled={saving}
            className={`bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-1.5 rounded-md ${saving ? 'opacity-60 cursor-wait' : ''}`}
          >
            {saving ? 'Đang lưu...' : (projectId ? 'Cập nhật hồ sơ' : 'Lưu hồ sơ')}
          </button>
          {(() => { const ALLOWED_STAGES = ['y-tuong','nghien-cuu-thi-truong','hoan-thien-san-pham','khao-sat','launch']; const isValidRequired = (projectData.name?.trim()?.length >= 3) && (projectData.description?.trim()?.length > 0) && ALLOWED_STAGES.includes(projectData.stage); return (
          <button
            onClick={() => publishProject()}
            disabled={saving || !projectId || !isValidRequired}
            className={`bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md ${(saving || !projectId || !isValidRequired) ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {saving ? 'Đang đăng...' : 'Đăng tải dự án'}
          </button>
          );})()}
        </div>
      </div>
      {/* Toast */}
      {toast.visible && (
        <div className="fixed right-4 bottom-6 z-50">
          <div className={`flex items-start gap-3 px-4 py-2 rounded shadow text-white ${toast.type === 'error' ? 'bg-red-600' : toast.type === 'success' ? 'bg-green-600' : toast.type === 'warning' ? 'bg-yellow-500 text-black' : 'bg-gray-800'}`}>
            <div className="flex-1">{toast.message}</div>
            <button onClick={closeToast} className="ml-2 opacity-90 hover:opacity-100">×</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
