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
    banner: null,
    logo: null,
    description: '',
    summary: '',
    website: '',
    contact: ''
  });

  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
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
      // Map các trường cần dùng cho UI
      setProjectData(prev => ({
        ...prev,
        name: data.name || prev.name,
        banner: data.team_image?.url || data.meta?.banner_url || prev.banner,
        logo: data.logo?.url || data.logo_url || prev.logo,
        description: data.description || prev.description,
        summary: (data.tagline || '') || prev.summary,
        website: data.website_url || prev.website,
        contact: data.meta?.contact || prev.contact
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

  // Handler cho việc upload ảnh
  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProjectChange(type, reader.result);
        // store raw file for later upload
        setProjectFiles(prev => ({ ...prev, [`${type}File`]: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler cho việc thêm thành viên
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    avatar: null
  });

  const handleAddMember = async () => {
    if (!projectId) { showToast('Project ID không xác định', 'error'); return; }
    if (!newMember.name || !newMember.position) { showToast('Hãy nhập tên và vị trí', 'warning'); return; }

    const token = getToken();
    if (!token) { showToast('Bạn cần đăng nhập', 'warning'); return; }

    // Nếu có file avatar, upload trước
    let avatar_url = undefined;
    try {
      if (newMember.avatarFile) {
        avatar_url = await uploadToCloudinary(newMember.avatarFile);
      } else if (newMember.avatar && typeof newMember.avatar === 'string' && newMember.avatar.startsWith('http')) {
        avatar_url = newMember.avatar;
      }
    } catch (err) {
      console.error('upload member avatar failed', err);
      showToast('Không upload được ảnh đại diện', 'error');
      return;
    }

    const body = {
      name: newMember.name,
      role_in_project: newMember.position,
      avatar_url: avatar_url || undefined
    };

    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}/members`, {
        method: 'POST',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error('add member failed', txt);
        showToast('Thêm thành viên thất bại', 'error');
        return;
      }
      const created = await res.json();
  setMembers(prev => [{ id: created.id, name: created.name || body.name, position: created.role_in_project || body.role_in_project, avatar: created.avatar_url || body.avatar_url }, ...prev]);
  setNewMember({ name: '', position: '', avatar: null, avatarFile: null });
    } catch (err) {
      console.error('handleAddMember error', err);
      showToast('Lỗi thêm thành viên', 'error');
    }
  };

  const handleMemberAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember(prev => ({ ...prev, avatar: reader.result, avatarFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Lưu project: POST tạo mới hoặc PATCH cập nhật
  const saveProject = async () => {
    const token = getToken();
    if (!token) { showToast('Bạn cần đăng nhập', 'warning'); return; }

    setSaving(true);
    try {
      let logo_url = null;
      let banner_url = null;

      if (projectFiles.logoFile) {
        logo_url = await uploadToCloudinary(projectFiles.logoFile);
      } else if (projectData.logo && typeof projectData.logo === 'string' && projectData.logo.startsWith('http')) {
        logo_url = projectData.logo;
      }

      if (projectFiles.bannerFile) {
        banner_url = await uploadToCloudinary(projectFiles.bannerFile);
      } else if (projectData.banner && typeof projectData.banner === 'string' && projectData.banner.startsWith('http')) {
        banner_url = projectData.banner;
      }

      const payload = {
        name: projectData.name,
        description: projectData.description,
        tagline: projectData.summary,
        website_url: projectData.website,
        logo_url
      };

      const method = projectId ? 'PATCH' : 'POST';
      const url = projectId ? `${API_BASE}/projects/${projectId}` : `${API_BASE}/projects`;

      const res = await fetch(url, {
        method,
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error('saveProject failed', txt);
        showToast('Lưu project thất bại', 'error');
        return;
      }

      const data = await res.json();
      const newProjectId = data.id || projectId;

      setProjectData(prev => ({
        ...prev,
        name: data.name || prev.name,
        description: data.description || prev.description,
        summary: data.tagline || prev.summary,
        website: data.website_url || prev.website,
        contact: (data.meta && data.meta.contact) || prev.contact,
        logo: (data.logo && data.logo.url) || data.logo_url || prev.logo,
        banner: (data.team_image && data.team_image.url) || (data.meta && data.meta.banner_url) || prev.banner
      }));

      showToast('Lưu project thành công', 'success');

      // Nếu tạo project mới, lưu projectId vào localStorage và URL
      if (!projectId && newProjectId) {
        localStorage.setItem('lastProjectId', newProjectId);
        window.history.replaceState(null, '', `?projectId=${newProjectId}`);
      }
    } catch (err) {
      console.error('saveProject error', err);
      showToast('Lỗi khi lưu project', 'error');
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

  // Handler cho việc đăng bài
  const handlePost = async () => {
    if (!newPost.trim()) return;
    if (!projectId) { showToast('Project ID không xác định', 'error'); return; }

    const token = getToken();
    if (!token) { showToast('Bạn cần đăng nhập', 'warning'); return; }

    const payload = {
      title: null,
      body: newPost,
      media: [],
      visibility: 'public'
    };

    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}/posts`, {
        method: 'POST',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
        if (!res.ok) {
          const txt = await res.text();
          console.error('create post failed', txt);
          showToast('Đăng bài thất bại', 'error');
          return;
        }
      const created = await res.json();
      const uiPost = { id: created.id, content: created.body || created.title || newPost, author: created.author_id ? `User ${created.author_id}` : 'Bạn', timestamp: created.created_at || new Date().toISOString(), avatar: projectData.logo || '/default-avatar.png', media: created.media || [] };
      setPosts(prev => [uiPost, ...prev]);
      setNewPost('');
    } catch (err) {
      console.error('handlePost error', err);
      showToast('Lỗi khi đăng bài', 'error');
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
          <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
            {projectData.banner ? (
              <img src={projectData.banner} alt="Project Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">Banner chưa được thêm</div>
            )}
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow">
              {projectData.logo ? (
                <img src={projectData.logo} alt="Project Logo" className="w-16 h-16 object-contain" />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">Logo</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <input
                type="text"
                value={projectData.name}
                onChange={(e) => handleProjectChange('name', e.target.value)}
                placeholder="Tên dự án"
                className="text-3xl font-bold mb-4 w-full border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
              />
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Giới thiệu dự án</h3>
                <textarea value={projectData.description} onChange={(e) => handleProjectChange('description', e.target.value)} className="w-full p-2 border rounded-lg" rows={4} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tóm tắt dự án</h3>
                <textarea value={projectData.summary} onChange={(e) => handleProjectChange('summary', e.target.value)} className="w-full p-2 border rounded-lg" rows={3} />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Thông tin liên hệ</h3>
                <input type="url" value={projectData.website} onChange={(e) => handleProjectChange('website', e.target.value)} placeholder="Website dự án" className="w-full p-2 border rounded mb-3" />
                <input type="text" value={projectData.contact} onChange={(e) => handleProjectChange('contact', e.target.value)} placeholder="Thông tin liên hệ" className="w-full p-2 border rounded" />
              </div>
            </div>
          </div>


          {/* Members */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Thành viên dự án</h2>
            <div className="mb-6 p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" value={newMember.name} onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))} placeholder="Tên thành viên" className="w-full p-2 border rounded" />
                <input type="text" value={newMember.position} onChange={(e) => setNewMember(prev => ({ ...prev, position: e.target.value }))} placeholder="Vị trí trong dự án" className="w-full p-2 border rounded" />
              </div>
              <div className="mt-4 flex items-center gap-4">
                <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                  <input type="file" accept="image/*" onChange={handleMemberAvatarUpload} className="hidden" />
                  {newMember.avatar ? 'Đổi ảnh đại diện' : 'Chọn ảnh đại diện'}
                </label>
                <button onClick={handleAddMember} className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded">Thêm thành viên</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map(member => (
                <div key={member.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">{member.name ? member.name.charAt(0) : '?'}</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Bài đăng & Hoạt động</h2>
            <div className="mb-8">
              <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} className="w-full p-3 border rounded-lg" rows={3} placeholder="Chia sẻ thông tin về dự án..." />
            </div>

            <div className="space-y-6">
              {posts.map(post => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{post.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-4 flex-wrap">
            <button 
              onClick={saveProject} 
              disabled={saving} 
              className={`bg-gray-600 hover:bg-gray-700 text-white inline-flex items-center justify-center text-sm font-semibold px-6 py-2.5 rounded-md h-10 transition-colors ${saving ? 'opacity-60 cursor-wait' : ''}`}
            >
              {saving ? (
                <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>Đang lưu...</span>
              ) : projectId ? 'Cập nhật hồ sơ' : 'Lưu hồ sơ'}
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
