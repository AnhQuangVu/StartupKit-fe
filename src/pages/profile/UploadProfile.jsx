import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { API_BASE, authHeaders } from '../../config/api';
import { uploadToCloudinary } from '../../utils/cloudinary';

// Note: This component optionally uses `pdfjs-dist` to render a PDF preview and extract text.
// If you don't have pdfjs installed, run: npm install pdfjs-dist

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
  const [posts, setPosts] = useState([]);
  // keep file objects for later upload
  const [projectFiles, setProjectFiles] = useState({ bannerFile: null, logoFile: null });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const toastTimerRef = useRef(null);

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

  // Lấy projectId: ưu tiên location.state, fallback query param ?projectId=...
  const projectId = location.state?.projectId || location.state?.project?.id || new URLSearchParams(window.location.search).get('projectId');

  // Utility: lấy token từ localStorage (tùy project có thể khác key)
  const getToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('access_token') || null;
  };

  // ---------- Load project và posts khi mount ----------
  useEffect(() => {
    if (!projectId) return;
    loadProject();
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  async function loadProject() {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}`, {
        headers: authHeaders(token)
      });
      if (!res.ok) {
        console.warn('Không load được project', await res.text());
        return;
      }
      const data = await res.json();
      // Map các trường từ API response
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

      // Try to fetch members if backend exposes endpoint
      const memRes = await fetch(`${API_BASE}/projects/${projectId}/members`, { headers: authHeaders(token) });
      if (memRes.ok) {
        const mems = await memRes.json();
        setMembers(mems.map(m => ({ id: m.id, name: m.name || (m.user_id ? `User ${m.user_id}` : ''), position: m.role_in_project || '', avatar: m.avatar_url || '' })));
      }
    } catch (err) {
      console.error('loadProject error', err);
    }
  }

  async function loadPosts() {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}/posts?limit=50`, {
        headers: authHeaders(token)
      });
      if (!res.ok) {
        console.warn('Không load được posts', await res.text());
        return;
      }
      const data = await res.json();
      const mapped = data.map(p => ({ id: p.id, content: p.body || p.title || '', author: p.author_id ? `User ${p.author_id}` : 'Người dùng', timestamp: p.created_at || new Date().toISOString(), avatar: (projectData.logo) ? projectData.logo : '/default-avatar.png', media: p.media || [] }));
      setPosts(mapped);
    } catch (err) {
      console.error('loadPosts error', err);
    }
  }

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
        console.log(`Image selected (${type}):`, base64.substring(0, 50) + '...');
        
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

      console.log('Adding member:', body);
      const res = await fetch(`${API_BASE}/projects/${projectId}/members`, {
        method: 'POST',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error('add member failed', txt);
        showToast('Thêm thành viên thất bại: ' + txt.substring(0, 150), 'error');
        return;
      }

      const created = await res.json();
      console.log('Member created:', created);

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
      console.error('handleAddMember error:', err);
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
          const uploadResponse = await uploadToCloudinary(projectFiles.logoFile);
          // uploadResponse có thể là string URL hoặc object {url, public_id}
          if (typeof uploadResponse === 'string') {
            logo_url = uploadResponse;
            // Extract public_id từ URL nếu cần (Cloudinary URL format)
            logoPublicId = uploadResponse.split('/').pop().split('.')[0];
          } else {
            logo_url = uploadResponse.url;
            logoPublicId = uploadResponse.public_id || '';
          }
          console.log('✅ Logo upload thành công, URL:', logo_url, 'Public ID:', logoPublicId);
          showToast('✓ Logo upload thành công', 'success', 2000);
        } catch (err) {
          console.error('Logo upload error:', err);
          showToast(`⚠️ Upload logo thất bại: ${err.message}. Vui lòng thử lại.`, 'warning', 5000);
        }
      }

      // Upload banner nếu có file mới
      if (projectFiles.bannerFile) {
        try {
          const uploadResponse = await uploadToCloudinary(projectFiles.bannerFile);
          if (typeof uploadResponse === 'string') {
            team_image_url = uploadResponse;
            bannerPublicId = uploadResponse.split('/').pop().split('.')[0];
          } else {
            team_image_url = uploadResponse.url;
            bannerPublicId = uploadResponse.public_id || '';
          }
          console.log('✅ Banner upload thành công, URL:', team_image_url, 'Public ID:', bannerPublicId);
          showToast('✓ Banner upload thành công', 'success', 2000);
        } catch (err) {
          console.error('Banner upload error:', err);
          showToast(`⚠️ Upload banner thất bại: ${err.message}. Vui lòng thử lại.`, 'warning', 5000);
        }
      }

      // ✅ Payload: gửi đơn giản, tránh xung đột schema (không gửi object lồng logo/team_image)
      const rawPayload = {
        name: projectData.name,
        tagline: projectData.tagline,
        description: projectData.description,
        website_url: normalizedWebsiteUrl,
        industry: projectData.industry,
        stage: projectData.stage,
        // Chỉ gửi URL đơn giản để backend xử lý ổn định
        logo_url: logo_url || undefined,
        team_image_url: team_image_url || undefined,
        // Các trường khác
        pain_point: projectData.pain_point,
        solution: projectData.solution,
        product: projectData.product,
        customer_segment: projectData.customer_segment,
        customer_features: projectData.customer_features,
        market_size: projectData.market_size,
        market_area: projectData.market_area,
        business_model: projectData.business_model,
        revenue_method: projectData.revenue_method,
        distribution_channel: projectData.distribution_channel,
        partners: projectData.partners,
        cost_estimate: projectData.cost_estimate,
        capital_source: projectData.capital_source,
        revenue_goal: projectData.revenue_goal,
        member_count: typeof projectData.member_count === 'number' ? projectData.member_count : parseInt(projectData.member_count) || undefined,
        member_skills: projectData.member_skills,
        resources: projectData.resources,
        deployment_location: projectData.deployment_location
      };

      // ✅ Loại bỏ key rỗng/undefined để tránh 500 từ backend
      const payload = Object.fromEntries(
        Object.entries(rawPayload)
          .map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
          .filter(([_, v]) => v !== undefined && v !== null && !(typeof v === 'string' && v.length === 0))
      );

      console.log('📤 Payload gửi lên API:', payload);

  const method = projectId ? 'PATCH' : 'POST';
  // Backend của bạn chấp nhận đường dẫn không có trailing slash
  const url = projectId ? `${API_BASE}/projects/${projectId}` : `${API_BASE}/projects`;

      const res = await fetch(url, {
        method,
        headers: { ...authHeaders(token), 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let errorMessage = 'Lưu project thất bại';
        // Đọc body một lần dưới dạng text, sau đó thử parse JSON
        const raw = await res.text();
        try {
          const errorData = raw ? JSON.parse(raw) : null;
          if (errorData) {
            if (errorData.detail) {
              errorMessage = typeof errorData.detail === 'string' 
                ? errorData.detail 
                : JSON.stringify(errorData.detail);
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.errors) {
              errorMessage = Object.entries(errorData.errors)
                .map(([field, msg]) => `${field}: ${msg}`)
                .join('; ');
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

      // Nếu tạo project mới, lưu projectId vào localStorage và URL
      if (!projectId && newProjectId) {
        localStorage.setItem('lastProjectId', newProjectId);
        window.history.replaceState(null, '', `?projectId=${newProjectId}`);
      }
    } catch (err) {
      console.error('saveProject error', err);
      showToast('Lỗi khi lưu project: ' + err.message, 'error');
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
      const res = await fetch(`${API_BASE}/projects/${projectId}/publish`, {
        method: 'POST',
        headers: authHeaders(token)
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error('publishProject failed', txt);
        showToast('Đăng tải project thất bại', 'error');
        return;
      }

      const data = await res.json();
      showToast('Đăng tải project thành công!', 'success');
      
      // Có thể redirect hoặc update UI tùy ý
      console.log('Published project:', data);
    } catch (err) {
      console.error('publishProject error', err);
      showToast('Lỗi khi đăng tải project', 'error');
    }
    finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        {/* Header với nút quay lại */}
        <div className="mb-6 flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
            title="Quay lại"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ dự án</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          {/* Banner / basic info */}
          <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6 group">
            {projectData.team_image_url && projectData.team_image_url.length > 0 ? (
              <>
                <img 
                  src={projectData.team_image_url} 
                  alt="Project Banner" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Banner image load failed');
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Banner loaded successfully')}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p>Banner chưa được thêm</p>
                  {projectData.team_image_url && <p className="text-xs mt-2 text-gray-400">(Kích thước: {projectData.team_image_url.length} bytes)</p>}
                </div>
              </div>
            )}
            {/* Upload banner button - appears on hover */}
            <label className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
              <div className="text-white text-center">
                <div className="text-sm font-semibold">Tải lên ảnh banner</div>
              </div>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} className="hidden" />
            </label>
            {/* Logo overlay */}
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow group">
              {projectData.logo_url && projectData.logo_url.length > 0 ? (
                <div className="relative">
                  <img 
                    src={projectData.logo_url} 
                    alt="Project Logo" 
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      console.error('Logo image load failed');
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => console.log('Logo loaded successfully')}
                  />
                  <label className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 rounded transition-all">
                    <span className="text-white text-xs font-semibold">Đổi</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors">
                  <span>Logo</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={projectData.name}
                    onChange={(e) => handleProjectChange('name', e.target.value)}
                    placeholder="Tên dự án (tối thiểu 3 ký tự)"
                    className={`text-3xl font-bold w-full border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none ${
                      projectData.name && projectData.name.trim().length > 0
                        ? projectData.name.trim().length < 3
                          ? 'text-red-600'
                          : 'text-gray-900'
                        : 'text-gray-900'
                    }`}
                  />
                  {projectData.name && projectData.name.trim().length > 0 && (
                    <span className={`text-sm font-semibold whitespace-nowrap ${projectData.name.trim().length >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                      {projectData.name.trim().length >= 3 ? '✓' : `${projectData.name.trim().length}/3`}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Tóm tắt ngắn</h3>
                <input type="text" value={projectData.tagline} onChange={(e) => handleProjectChange('tagline', e.target.value)} placeholder="VD: Công cụ quản lý dự án hỗ trợ AI" className="w-full p-2 border rounded-lg" maxLength="150" />
                <p className="text-xs text-gray-500 mt-1">{projectData.tagline.length}/150</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Giới thiệu dự án</h3>
                <textarea value={projectData.description} onChange={(e) => handleProjectChange('description', e.target.value)} className="w-full p-2 border rounded-lg" rows={4} placeholder="Mô tả chi tiết về dự án..." />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ngành công nghiệp</h3>
                <input type="text" value={projectData.industry} onChange={(e) => handleProjectChange('industry', e.target.value)} placeholder="VD: SaaS, Fintech, Edtech, Healthtech" className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Website</h3>
                  <input type="url" value={projectData.website_url} onChange={(e) => handleProjectChange('website_url', e.target.value)} placeholder="https://example.vn" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Giai đoạn</h3>
                  <select value={projectData.stage} onChange={(e) => handleProjectChange('stage', e.target.value)} className="w-full p-2 border rounded">
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


          {/* Business & Market */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Kinh doanh & Thị trường</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Vấn đề cần giải quyết</h3>
                <textarea 
                  value={projectData.pain_point} 
                  onChange={(e) => handleProjectChange('pain_point', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
                  placeholder="Mô tả vấn đề mà startup giải quyết..."
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Giải pháp của bạn</h3>
                <textarea 
                  value={projectData.solution} 
                  onChange={(e) => handleProjectChange('solution', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
                  placeholder="Giải pháp độc đáo của bạn là gì?"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sản phẩm/Dịch vụ</h3>
                <textarea 
                  value={projectData.product} 
                  onChange={(e) => handleProjectChange('product', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
                  placeholder="Mô tả chi tiết sản phẩm/dịch vụ chính..."
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Đối tượng khách hàng mục tiêu</h3>
                <textarea 
                  value={projectData.customer_segment} 
                  onChange={(e) => handleProjectChange('customer_segment', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Mô hình kinh doanh</h3>
                <textarea 
                  value={projectData.business_model} 
                  onChange={(e) => handleProjectChange('business_model', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
                  placeholder="VD: B2B SaaS, B2C E-commerce, Subscription"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phương thức tạo doanh thu</h3>
                <textarea 
                  value={projectData.revenue_method} 
                  onChange={(e) => handleProjectChange('revenue_method', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <textarea 
                  value={projectData.distribution_channel} 
                  onChange={(e) => handleProjectChange('distribution_channel', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={2} 
                  placeholder="VD: Bán trực tiếp, Sàn thương mại, Hợp tác với partner"
                />
              </div>
            </div>
          </div>

          {/* Partners & Deployment */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Đối tác & Triển khai</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Đối tác/Investor hiện tại</h3>
                <textarea 
                  value={projectData.partners} 
                  onChange={(e) => handleProjectChange('partners', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
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

          {/* Members / Skills */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Đội ngũ & Tài nguyên</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <textarea 
                  value={projectData.member_skills} 
                  onChange={(e) => handleProjectChange('member_skills', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={4} 
                  placeholder="VD: Lập trình web, AI/ML, Thiết kế, Marketing"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tài nguyên</h3>
                <textarea 
                  value={projectData.resources} 
                  onChange={(e) => handleProjectChange('resources', e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  rows={4} 
                  placeholder="VD: Vốn tài chính, Không gian văn phòng, Cố vấn, Hợp tác"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4 flex-wrap">
            <button 
              onClick={saveProject} 
              disabled={saving} 
              className={`bg-gray-600 hover:bg-gray-700 text-white inline-flex items-center justify-center text-sm font-semibold px-6 py-2.5 rounded-md h-10 transition-colors ${saving ? 'opacity-60 cursor-wait' : ''}`}
              title={projectFiles.logoFile || projectFiles.bannerFile ? '✓ Có ảnh chờ upload' : ''}
            >
              {saving ? (
                <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>Đang lưu...</span>
              ) : (
                projectId ? 'Cập nhật hồ sơ' : 'Lưu hồ sơ'
              )}
            </button>
            
            <button 
              onClick={publishProject} 
              disabled={saving || !projectId} 
              className={`bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center justify-center text-sm font-semibold px-6 py-2.5 rounded-md h-10 transition-colors ${(saving || !projectId) ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {saving ? (
                <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>Đang đăng...</span>
              ) : 'Đăng tải dự án'}
            </button>
          </div>
        </div>
      </main>
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
