import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faComment, faSpinner, faEye, faEyeSlash, faEdit, faTrash, 
  faX, faCheck, faTimes, faArrowLeft, faUser
} from '@fortawesome/free-solid-svg-icons';
import { API_BASE, authHeaders } from '../config/api';
import { listPostComments, createPostComment } from '../api/posts';
import { useAuth } from '../context/AuthContext';
import { uploadToCloudinary } from '../utils/cloudinary';

export default function DienDan() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterVisibility, setFilterVisibility] = useState('all');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [comments, setComments] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPostData, setEditingPostData] = useState({ title: '', body: '' });
  const [deleteConfirmPostId, setDeleteConfirmPostId] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postLoadingStates, setPostLoadingStates] = useState({});
  // ✅ Thêm state cho form tạo post
  const [newPostData, setNewPostData] = useState({ title: '', body: '', visibility: 'public' });
  const [creatingPost, setCreatingPost] = useState(false);
  // ✅ Thêm state cho chỉnh sửa project info
  const [editingProject, setEditingProject] = useState(false);
  const [editProjectData, setEditProjectData] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  // ✅ State cho quick visibility change
  const [visibilityModalPostId, setVisibilityModalPostId] = useState(null);
  // ✅ State cho project status edit
  const [statusModalProjectId, setStatusModalProjectId] = useState(null);
  // ✅ State cho followers và members
  const [followers, setFollowers] = useState([]);
  const [members, setMembers] = useState([]);

  // Stage mapping
  const stageMap = {
    'y-tuong': '(ý tưởng)',
    'nghien-cuu-thi-truong': '(nghiên cứu thị trường)',
    'hoan-thien-san-pham': '(hoàn thiện sản phẩm)',
    'khao-sat': '(khảo sát)',
    'launch': '(ra mắt)',
  };
  
  const getDisplayStage = (stage) => {
    return stageMap[stage] || stage || 'N/A';
  };

  const showToast = (message, type = 'info', duration = 3500) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), duration);
  };

  // Fetch danh sách projects của user hiện tại
  useEffect(() => {
    if (user?.id) {
      fetchUserProjects();
    }
  }, [user]);

  // Fetch posts khi thay đổi project
  useEffect(() => {
    if (selectedProject) {
      fetchPosts();
      fetchFollowers();
      fetchMembers();
    }
  }, [selectedProject]);

  // Cập nhật project list khi posts, followers, members thay đổi
  useEffect(() => {
    if (selectedProject) {
      setProjects(prev => prev.map(p => 
        p.id === selectedProject.id 
          ? { ...p, posts_count: posts.length, followers_count: followers.length }
          : p
      ));
    }
  }, [posts, followers, members]);

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      
      if (!token) {
        showToast('Vui lòng đăng nhập để xem danh sách hồ sơ', 'warning');
        setProjects([]);
        setLoading(false);
        return;
      }
      
      // ✅ Sử dụng endpoint /projects (không /projects/my) - backend sẽ lấy projects của current_user từ token
      const response = await fetch(`${API_BASE}/projects?skip=0&limit=50`, {
        headers: authHeaders(token)
      });

      if (!response.ok) {
        console.error('Response status:', response.status);
        let errorMessage = 'Không thể lấy danh sách hồ sơ';
        try {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          errorMessage = errorData.detail || errorMessage;
        } catch (parseErr) {
          console.error('Error parsing response:', parseErr);
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      const projectList = Array.isArray(data) ? data : (data?.projects || data?.items || []);
      
      // ✅ Normalize logo URLs
      const normalizedProjects = projectList.map(p => ({
        ...p,
        logo_url: normalizeImageUrl(p.logo_url),
        team_image_url: normalizeImageUrl(p.team_image_url || p.team_image?.url)
      }));
      
      // Sort theo created_at mới nhất phía trước
      const sortedProjects = normalizedProjects.sort((a, b) => {
        const dateA = new Date(a.created_at || 0);
        const dateB = new Date(b.created_at || 0);
        return dateB - dateA;
      });
      
      setProjects(sortedProjects || []);
    } catch (error) {
      console.error('Fetch user projects error:', error);
      showToast('❌ ' + error.message, 'error');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Normalize image URLs
  const normalizeImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200/E0E0E0/999999?text=No+Image';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return `${API_BASE}${url}`;
    return `https://${url}`;
  };

  const fetchPosts = async () => {
    if (!selectedProject) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE}/projects/${selectedProject.id}/posts?limit=50`, {
        headers: authHeaders(token),
      });

      if (!response.ok) throw new Error('Không thể lấy bài đăng');
  let data = await response.json();
      
      // Bổ sung author_name từ các trường phổ biến của author (BE có thể khác tên field)
      const currentDisplayName = (u) => u?.full_name || u?.fullName || u?.name || u?.username || u?.email || null;
      data = data.map(post => ({
        ...post,
        author_name:
          post.author_name ||
          post.author?.full_name ||
          post.author?.fullName ||
          post.author?.name ||
          post.author?.username ||
          post.author?.email ||
          (post.author_id === user?.id ? currentDisplayName(user) : null) ||
          'Người dùng'
      }));
      
      setPosts(data || []);
    } catch (error) {
      console.error('Fetch posts error:', error);
      showToast('Lỗi khi tải bài đăng', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch followers
  const fetchFollowers = async () => {
    if (!selectedProject?.id) return;
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/projects/${selectedProject.id}/followers`, {
        headers: authHeaders(token),
      });
      if (response.ok) {
        const data = await response.json();
        setFollowers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Fetch followers error:', error);
    }
  };

  // Fetch members
  const fetchMembers = async () => {
    if (!selectedProject?.id) return;
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/projects/${selectedProject.id}/members`, {
        headers: authHeaders(token),
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Fetch members error:', error);
    }
  };

  // Like/Unlike post
  const toggleLikePost = async (postId) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      
      setPostLoadingStates(prev => ({ ...prev, [postId]: true }));
      
      const response = await fetch(`${API_BASE}/projects/posts/${postId}/like`, {
        method: 'POST',
        headers: authHeaders(token),
      });

      if (!response.ok) throw new Error('Lỗi like/unlike');
      
      const data = await response.json();
      
      if (data.liked) {
        setLikedPosts(prev => new Set([...prev, postId]));
        showToast('Đã thích bài viết', 'success');
      } else {
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        showToast('Bỏ thích bài viết', 'info');
      }

      // Update likes count in posts
      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, likes_count: data.likes_count } : p
      ));
    } catch (error) {
      console.error('Like toggle error:', error);
      showToast('Lỗi khi thích bài viết', 'error');
    } finally {
      setPostLoadingStates(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Edit post
  const startEditPost = (post) => {
    setEditingPostId(post.id);
    setEditingPostData({ title: post.title, body: post.body, visibility: post.visibility || 'public' });
  };

  const saveEditPost = async (postId) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      
      setPostLoadingStates(prev => ({ ...prev, [postId]: true }));

      const response = await fetch(`${API_BASE}/projects/posts/${postId}`, {
        method: 'PATCH',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPostData),
      });

      if (!response.ok) throw new Error('Không thể cập nhật bài viết');
      
      const updatedPost = await response.json();
      setPosts(prev => prev.map(p => p.id === postId ? updatedPost : p));
      setEditingPostId(null);
      showToast('Cập nhật bài viết thành công', 'success');
    } catch (error) {
      console.error('Edit post error:', error);
      showToast('Lỗi khi cập nhật bài viết', 'error');
    } finally {
      setPostLoadingStates(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      
      setPostLoadingStates(prev => ({ ...prev, [postId]: true }));

      const response = await fetch(`${API_BASE}/projects/posts/${postId}`, {
        method: 'DELETE',
        headers: authHeaders(token),
      });

      if (!response.ok) throw new Error('Không thể xóa bài viết');
      
      setPosts(prev => prev.filter(p => p.id !== postId));
      setDeleteConfirmPostId(null);
      showToast('Xóa bài viết thành công', 'success');
    } catch (error) {
      console.error('Delete post error:', error);
      showToast('Lỗi khi xóa bài viết', 'error');
    } finally {
      setPostLoadingStates(prev => ({ ...prev, [postId]: false }));
    }
  };

  // ✅ Update post visibility nhanh chóng
  const updatePostVisibility = async (postId, newVisibility) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      
      setPostLoadingStates(prev => ({ ...prev, [postId]: true }));

      const response = await fetch(`${API_BASE}/projects/posts/${postId}`, {
        method: 'PATCH',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: newVisibility }),
      });

      if (!response.ok) throw new Error('Không thể cập nhật hiển thị bài viết');
      
      const updatedPost = await response.json();
      setPosts(prev => prev.map(p => p.id === postId ? updatedPost : p));
      setVisibilityModalPostId(null);
      showToast('Cập nhật hiển thị bài viết thành công', 'success');
    } catch (error) {
      console.error('Update visibility error:', error);
      showToast('Lỗi khi cập nhật hiển thị bài viết', 'error');
    } finally {
      setPostLoadingStates(prev => ({ ...prev, [postId]: false }));
    }
  };

  // ✅ Update project status
  const updateProjectStatus = async (newStatus) => {
    if (!selectedProject) return;
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      
      console.log('📤 Updating status:', {
        projectId: selectedProject.id,
        newStatus,
        url: `${API_BASE}/projects/${selectedProject.id}`
      });
      
      const payload = {
        name: selectedProject.name,
        sections: {
          status: newStatus
        }
      };
      
      console.log('📤 Payload:', JSON.stringify(payload));
      
      const response = await fetch(`${API_BASE}/projects/${selectedProject.id}`, {
        method: 'PATCH',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Status update error response:', errorText);
        throw new Error('Không thể cập nhật trạng thái');
      }
      
      const updatedProject = await response.json();
      setSelectedProject(updatedProject);
      setProjects(prev => prev.map(p => p.id === selectedProject.id ? updatedProject : p));
      setStatusModalProjectId(null);
      showToast('Cập nhật trạng thái thành công', 'success');
    } catch (error) {
      console.error('Update status error:', error);
      showToast('Lỗi khi cập nhật trạng thái: ' + error.message, 'error');
    }
  };

  // Fetch comments
  const fetchComments = async (postId) => {
    try {
      const data = await listPostComments(postId);
      setComments(prev => ({ ...prev, [postId]: data || [] }));
    } catch (error) {
      console.error('Fetch comments error:', error);
      showToast('Lỗi khi tải bình luận', 'error');
    }
  };

  // Add comment
  const addComment = async (postId) => {
    if (!commentText.trim()) {
      showToast('Vui lòng nhập bình luận', 'warning');
      return;
    }

    try {
      setPostLoadingStates(prev => ({ ...prev, [postId]: true }));
      const newComment = await createPostComment(postId, { body: commentText });
      setComments(prev => ({ 
        ...prev, 
        [postId]: [...(prev[postId] || []), newComment] 
      }));
      setCommentText('');
      showToast('Thêm bình luận thành công', 'success');
    } catch (error) {
      console.error('Add comment error:', error);
      showToast('Lỗi khi thêm bình luận', 'error');
    } finally {
      setPostLoadingStates(prev => ({ ...prev, [postId]: false }));
    }
  };

  // ✅ Tạo post mới
  const createPost = async () => {
    if (!newPostData.title.trim()) {
      showToast('Vui lòng nhập tiêu đề bài viết', 'warning');
      return;
    }
    if (!newPostData.body.trim()) {
      showToast('Vui lòng nhập nội dung bài viết', 'warning');
      return;
    }

    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    if (!token) {
      showToast('Vui lòng đăng nhập', 'warning');
      return;
    }

    try {
      setCreatingPost(true);
      const response = await fetch(`${API_BASE}/projects/${selectedProject.id}/posts`, {
        method: 'POST',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPostData.title,
          body: newPostData.body,
          visibility: newPostData.visibility
        })
      });

      if (!response.ok) throw new Error('Không thể tạo bài viết');

      const createdPost = await response.json();
      
      // Bổ sung author_name với fallback chain giống fetchPosts
      const postWithAuthor = {
        ...createdPost,
        author_name:
          createdPost.author_name ||
          createdPost.author?.full_name ||
          createdPost.author?.fullName ||
          createdPost.author?.name ||
          createdPost.author?.username ||
          createdPost.author?.email ||
          user?.full_name ||
          user?.fullName ||
          user?.name ||
          user?.username ||
          user?.email ||
          createdPost.author_id
      };
      
      setPosts(prev => [postWithAuthor, ...prev]);
      setNewPostData({ title: '', body: '', visibility: 'public' });
      showToast('✓ Tạo bài viết thành công!', 'success');
    } catch (error) {
      console.error('Create post error:', error);
      showToast('Lỗi khi tạo bài viết: ' + error.message, 'error');
    } finally {
      setCreatingPost(false);
    }
  };

  // ✅ Hàm cập nhật thông tin project
  const updateProjectInfo = async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    if (!token) {
      showToast('Vui lòng đăng nhập', 'warning');
      return;
    }

    try {
      setLoading(true);
      
      // Helper: Normalize URL to string (xử lý HttpUrl objects)
      const normalizeUrl = (url) => {
        if (!url) return null;
        return typeof url === 'string' ? url : url.toString?.();
      };
      
      // Upload logo nếu có file mới
      let newLogoUrl = normalizeUrl(selectedProject.logo_url);
      if (logoFile) {
        try {
          newLogoUrl = await uploadLogo();
          showToast('✓ Upload logo thành công', 'success', 2000);
        } catch (error) {
          showToast(`❌ Upload logo thất bại: ${error.message}`, 'error', 3000);
          return;
        }
      }
      
      // Upload banner nếu có file mới
      let newBannerUrl = normalizeUrl(selectedProject.team_image_url) || normalizeUrl(selectedProject.team_image?.url);
      if (bannerFile) {
        try {
          newBannerUrl = await uploadBanner();
          showToast('✓ Upload ảnh bìa thành công', 'success', 2000);
        } catch (error) {
          showToast(`❌ Upload ảnh bìa thất bại: ${error.message}`, 'error', 3000);
          return;
        }
      }
      
      // Chỉ gửi những fields được edit (khác với giá trị hiện tại)
      const payload = {};
      
      // ✅ Luôn gửi required fields (name, description)
      payload.name = editProjectData.name || selectedProject.name;
      payload.description = editProjectData.description || selectedProject.description;
      
      // Optional fields: chỉ gửi nếu được edit
      if (editProjectData.tagline !== undefined && editProjectData.tagline !== selectedProject.tagline) {
        payload.tagline = editProjectData.tagline;
      }
      if (editProjectData.stage && editProjectData.stage !== selectedProject.stage) {
        payload.stage = editProjectData.stage;
      }
      if (editProjectData.website_url && editProjectData.website_url !== selectedProject.website_url) {
        payload.website_url = normalizeUrl(editProjectData.website_url);
      }
      if (editProjectData.industry && editProjectData.industry !== selectedProject.industry) {
        payload.industry = editProjectData.industry;
      }
      
      // Business & Market fields
      if (editProjectData.pain_point !== undefined && editProjectData.pain_point !== selectedProject.pain_point) {
        payload.pain_point = editProjectData.pain_point;
      }
      if (editProjectData.solution !== undefined && editProjectData.solution !== selectedProject.solution) {
        payload.solution = editProjectData.solution;
      }
      if (editProjectData.product !== undefined && editProjectData.product !== selectedProject.product) {
        payload.product = editProjectData.product;
      }
      if (editProjectData.customer_segment !== undefined && editProjectData.customer_segment !== selectedProject.customer_segment) {
        payload.customer_segment = editProjectData.customer_segment;
      }
      if (editProjectData.customer_features !== undefined && editProjectData.customer_features !== selectedProject.customer_features) {
        payload.customer_features = editProjectData.customer_features;
      }
      if (editProjectData.market_size !== undefined && editProjectData.market_size !== selectedProject.market_size) {
        payload.market_size = editProjectData.market_size;
      }
      if (editProjectData.market_area !== undefined && editProjectData.market_area !== selectedProject.market_area) {
        payload.market_area = editProjectData.market_area;
      }
      if (editProjectData.business_model !== undefined && editProjectData.business_model !== selectedProject.business_model) {
        payload.business_model = editProjectData.business_model;
      }
      if (editProjectData.revenue_method !== undefined && editProjectData.revenue_method !== selectedProject.revenue_method) {
        payload.revenue_method = editProjectData.revenue_method;
      }
      if (editProjectData.revenue_goal !== undefined && editProjectData.revenue_goal !== selectedProject.revenue_goal) {
        payload.revenue_goal = editProjectData.revenue_goal;
      }
      if (editProjectData.cost_estimate !== undefined && editProjectData.cost_estimate !== selectedProject.cost_estimate) {
        payload.cost_estimate = editProjectData.cost_estimate;
      }
      if (editProjectData.capital_source !== undefined && editProjectData.capital_source !== selectedProject.capital_source) {
        payload.capital_source = editProjectData.capital_source;
      }
      if (editProjectData.distribution_channel !== undefined && editProjectData.distribution_channel !== selectedProject.distribution_channel) {
        payload.distribution_channel = editProjectData.distribution_channel;
      }
      if (editProjectData.partners !== undefined && editProjectData.partners !== selectedProject.partners) {
        payload.partners = editProjectData.partners;
      }
      if (editProjectData.member_count !== undefined && editProjectData.member_count !== selectedProject.member_count) {
        payload.member_count = editProjectData.member_count;
      }
      if (editProjectData.member_skills !== undefined && editProjectData.member_skills !== selectedProject.member_skills) {
        payload.member_skills = editProjectData.member_skills;
      }
      if (editProjectData.resources !== undefined && editProjectData.resources !== selectedProject.resources) {
        payload.resources = editProjectData.resources;
      }
      if (editProjectData.deployment_location !== undefined && editProjectData.deployment_location !== selectedProject.deployment_location) {
        payload.deployment_location = editProjectData.deployment_location;
      }
      
      // Nếu có logo mới, chỉ gửi logo_url (string), không gửi logo object
      if (logoFile) {
        payload.logo_url = newLogoUrl;
      }
      
      // ⚠️ Không gửi team_image_url - backend schema có vấn đề với nó

      // Nếu không có field nào thay đổi (chỉ có name và description là bắt buộc)
      const hasChanges = logoFile || bannerFile || 
                        editProjectData.tagline !== selectedProject.tagline ||
                        editProjectData.stage !== selectedProject.stage ||
                        editProjectData.website_url !== selectedProject.website_url ||
                        editProjectData.industry !== selectedProject.industry ||
                        editProjectData.pain_point !== selectedProject.pain_point ||
                        editProjectData.solution !== selectedProject.solution ||
                        editProjectData.product !== selectedProject.product ||
                        editProjectData.customer_segment !== selectedProject.customer_segment ||
                        editProjectData.customer_features !== selectedProject.customer_features ||
                        editProjectData.market_size !== selectedProject.market_size ||
                        editProjectData.market_area !== selectedProject.market_area ||
                        editProjectData.business_model !== selectedProject.business_model ||
                        editProjectData.revenue_method !== selectedProject.revenue_method ||
                        editProjectData.revenue_goal !== selectedProject.revenue_goal ||
                        editProjectData.cost_estimate !== selectedProject.cost_estimate ||
                        editProjectData.capital_source !== selectedProject.capital_source ||
                        editProjectData.distribution_channel !== selectedProject.distribution_channel ||
                        editProjectData.partners !== selectedProject.partners ||
                        editProjectData.member_count !== selectedProject.member_count ||
                        editProjectData.member_skills !== selectedProject.member_skills ||
                        editProjectData.resources !== selectedProject.resources ||
                        editProjectData.deployment_location !== selectedProject.deployment_location ||
                        (editProjectData.name && editProjectData.name !== selectedProject.name) ||
                        (editProjectData.description && editProjectData.description !== selectedProject.description);
      
      if (!hasChanges) {
        showToast('Không có thay đổi nào', 'info');
        setEditingProject(false);
        return;
      }

      console.log('📤 Update payload:', payload);

      const response = await fetch(`${API_BASE}/projects/${selectedProject.id}`, {
        method: 'PATCH',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorMessage = 'Không thể cập nhật thông tin';
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = typeof errorData.detail === 'string' 
              ? errorData.detail 
              : JSON.stringify(errorData.detail);
          }
        } catch (e) {}
        throw new Error(errorMessage);
      }

      const updated = await response.json();
      setSelectedProject(updated);
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
      setEditingProject(false);
      setLogoFile(null);
      setLogoPreview(null);
      setBannerFile(null);
      setBannerPreview(null);
      showToast('✓ Cập nhật thông tin thành công!', 'success');
    } catch (error) {
      console.error('Update project error:', error);
      showToast('❌ Lỗi khi cập nhật: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Bắt đầu edit project
  const startEditProject = () => {
    setEditProjectData({
      name: selectedProject.name,
      description: selectedProject.description,
      industry: selectedProject.industry,
      website_url: selectedProject.website_url,
      tagline: selectedProject.tagline,
      stage: selectedProject.stage,
      pain_point: selectedProject.pain_point,
      solution: selectedProject.solution,
      product: selectedProject.product,
      customer_segment: selectedProject.customer_segment,
      customer_features: selectedProject.customer_features,
      market_size: selectedProject.market_size,
      market_area: selectedProject.market_area,
      business_model: selectedProject.business_model,
      revenue_method: selectedProject.revenue_method,
      distribution_channel: selectedProject.distribution_channel,
      partners: selectedProject.partners,
      cost_estimate: selectedProject.cost_estimate,
      capital_source: selectedProject.capital_source,
      revenue_goal: selectedProject.revenue_goal,
      member_count: selectedProject.member_count,
      member_skills: selectedProject.member_skills,
      resources: selectedProject.resources,
      deployment_location: selectedProject.deployment_location
    });
    setLogoFile(null);
    // ✅ Set logoPreview từ current logo
    setLogoPreview(selectedProject.logo_url);
    setBannerFile(null);
    // ✅ Set bannerPreview từ current banner
    setBannerPreview(selectedProject.team_image_url || selectedProject.team_image?.url);
    setEditingProject(true);
  };

  // ✅ Handle logo change
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle banner change
  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Upload logo to Cloudinary
  const uploadLogo = async () => {
    if (!logoFile) return selectedProject.logo_url;
    
    try {
      setUploadingLogo(true);
      const uploadResponse = await uploadToCloudinary(logoFile);
      if (typeof uploadResponse === 'string') {
        return uploadResponse;
      } else {
        return uploadResponse.url;
      }
    } catch (error) {
      console.error('Logo upload error:', error);
      throw error;
    } finally {
      setUploadingLogo(false);
    }
  };

  // ✅ Upload banner to Cloudinary
  const uploadBanner = async () => {
    if (!bannerFile) return selectedProject.team_image_url || selectedProject.team_image?.url;
    
    try {
      setUploadingBanner(true);
      const uploadResponse = await uploadToCloudinary(bannerFile);
      if (typeof uploadResponse === 'string') {
        return uploadResponse;
      } else {
        return uploadResponse.url;
      }
    } catch (error) {
      console.error('Banner upload error:', error);
      throw error;
    } finally {
      setUploadingBanner(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins}p trước`;
    if (diffHours < 24) return `${diffHours}h trước`;
    if (diffDays < 7) return `${diffDays}d trước`;
    
    return date.toLocaleString('vi-VN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Filter và sort posts
  const filteredAndSortedPosts = posts
    .filter(post => {
      if (filterVisibility !== 'all' && post.visibility !== filterVisibility) return false;
      if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !post.body.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diễn Đàn - Quản Lý Hồ Sơ Đã Công Bố</h1>
          <p className="text-gray-600">Xem, chỉnh sửa và quản lý các hồ sơ đã đăng lên nền tảng</p>
        </div>

        {loading && !selectedProject ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-[#FFCE23] animate-spin mb-4" />
            <p className="text-gray-600">Đang tải danh sách dự án...</p>
          </div>
        ) : !selectedProject ? (
          // Danh sách Published Projects
          <div>
            {projects.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">Chưa có dự án nào được công bố</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
                       onClick={() => setSelectedProject(project)}>
                    {/* ✅ Project Image with normalized URL */}
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={project.logo_url} 
                        alt={project.name} 
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/E0E0E0/999999?text=No+Image';
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description || 'Chưa có mô tả'}</p>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="mt-4 w-full px-4 py-2 bg-[#FFCE23] hover:bg-[#FFE066] text-black font-semibold rounded-lg transition-colors">
                      Quản Lý
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Chi tiết Project & Posts
          <div>
            {/* Search & Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài đăng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                />
                <select
                  value={filterVisibility}
                  onChange={(e) => setFilterVisibility(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                >
                  <option value="all">Tất cả</option>
                  <option value="public">Công khai</option>
                  <option value="private">Riêng tư</option>
                  <option value="friends">Bạn bè</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                </select>
              </div>
            </div>

            {/* ✅ Project Info Section - Facebook Style */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-100">
              {/* Quay lại button */}
              <div className="p-4 border-b border-gray-100">
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setPosts([]);
                    setEditingPostId(null);
                    setShowCommentsModal(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Quay lại danh sách
                </button>
              </div>
              
              {!editingProject ? (
                // View Mode - UploadProfile Style
                <div>
                  {/* Banner with Overlapping Logo - Like UploadProfile */}
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    <img 
                      src={selectedProject.team_image_url || selectedProject.team_image?.url} 
                      alt="Banner"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x300/E0E0E0/999999?text=Banner';
                      }}
                    />
                    {/* Logo Overlap - Absolute positioned bottom-left */}
                    <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow">
                      <img 
                        src={selectedProject.logo_url} 
                        alt={selectedProject.name}
                        className="w-20 h-20 object-contain rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80/E0E0E0/999999?text=Logo';
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Details Section Below Banner */}
                  <div className="p-6">
                    {/* Name + Edit Button */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h2>
                        <p className="text-gray-600 text-sm line-clamp-2">{selectedProject.description}</p>
                      </div>
                      <button 
                        onClick={startEditProject}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FFCE23] hover:bg-[#FFE066] text-black font-semibold rounded-lg transition-colors flex-shrink-0 ml-4"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        Chỉnh sửa
                      </button>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">Ngành</p>
                        <p className="text-sm font-bold text-gray-900">{selectedProject.industry || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">Giai đoạn</p>
                        <p className="text-sm font-bold text-gray-900">{getDisplayStage(selectedProject.stage)}</p>
                      </div>
                      <button
                        onClick={() => setStatusModalProjectId(selectedProject.id)}
                        className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors cursor-pointer text-left"
                        title="Nhấp để thay đổi trạng thái"
                      >
                        <p className="text-xs text-gray-600 font-semibold mb-1">Trạng thái</p>
                        <p className="text-sm font-bold text-green-600">{selectedProject.status || 'Công bố'}</p>
                      </button>
                    </div>

                    {/* Stats Grid - Followers, Members, Posts */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-600 font-semibold mb-1">Người theo dõi</p>
                        <p className="text-lg font-bold text-blue-900">{followers.length}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-xs text-purple-600 font-semibold mb-1">Thành viên</p>
                        <p className="text-lg font-bold text-purple-900">{members.length}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-green-600 font-semibold mb-1">Bài đăng</p>
                        <p className="text-lg font-bold text-green-900">{posts.length}</p>
                      </div>
                    </div>

                    {/* Website Link */}
                    {selectedProject.website_url && (
                      <div>
                        <a href={selectedProject.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#FFCE23] hover:underline font-semibold">
                          Xem website
                          <span className="text-xs">↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Chỉnh sửa thông tin dự án</h3>
                  
                  {/* Banner Upload - Full Width */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Ảnh bìa (Banner)</label>
                    <div className="relative group">
                      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-[#FFCE23] transition-colors">
                        <img 
                          src={bannerPreview || selectedProject.team_image_url || selectedProject.team_image?.url} 
                          alt="Banner preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x300/E0E0E0/999999?text=No+Image';
                          }}
                        />
                      </div>
                      {/* Upload Overlay */}
                      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl cursor-pointer">
                        <div className="text-center">
                          <p className="text-white font-semibold">Nhấp để thay đổi</p>
                          <p className="text-gray-200 text-xs mt-1">hoặc kéo ảnh vào</p>
                        </div>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                        disabled={uploadingBanner}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    {bannerFile && <p className="text-sm text-green-600 mt-2">✓ Đã chọn: <span className="font-semibold">{bannerFile.name}</span></p>}
                  </div>

                  {/* Logo Upload - Compact */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Logo dự án</label>
                    <div className="flex gap-4 items-end">
                      {/* Logo Preview */}
                      <div className="relative group flex-shrink-0">
                        <div className="w-28 h-28 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-[#FFCE23] transition-colors flex items-center justify-center">
                          <img 
                            src={logoPreview || selectedProject.logo_url} 
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/112/E0E0E0/999999?text=Logo';
                            }}
                          />
                        </div>
                        {/* Upload Overlay */}
                        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl cursor-pointer">
                          <p className="text-white text-2xl">↑</p>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          disabled={uploadingLogo}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      {/* Upload Info */}
                      <div className="flex-1">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-blue-900 mb-2">Lưu ý:</p>
                          <ul className="text-xs text-blue-800 space-y-1">
                            <li>✓ Kích thước: 300x300px</li>
                            <li>✓ Định dạng: JPG, PNG</li>
                            <li>✓ Dung lượng: &lt;5MB</li>
                          </ul>
                        </div>
                        {logoFile && <p className="text-sm text-green-600 mt-2">✓ Đã chọn: <span className="font-semibold">{logoFile.name}</span></p>}
                      </div>
                    </div>
                  </div>
                  
                  <hr className="my-2 border-gray-200" />
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Tên dự án</label>
                    <input
                      type="text"
                      value={editProjectData.name || ''}
                      onChange={(e) => setEditProjectData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Mô tả</label>
                    <textarea
                      value={editProjectData.description || ''}
                      onChange={(e) => setEditProjectData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Ngành</label>
                      <input
                        type="text"
                        value={editProjectData.industry || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, industry: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Website</label>
                      <input
                        type="text"
                        value={editProjectData.website_url || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, website_url: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Tagline</label>
                    <input
                      type="text"
                      value={editProjectData.tagline || ''}
                      onChange={(e) => setEditProjectData(prev => ({ ...prev, tagline: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Giai đoạn</label>
                    <select
                      value={editProjectData.stage || selectedProject.stage || 'y-tuong'}
                      onChange={(e) => setEditProjectData(prev => ({ ...prev, stage: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                    >
                      <option value="y-tuong">(ý tưởng)</option>
                      <option value="nghien-cuu-thi-truong">(nghiên cứu thị trường)</option>
                      <option value="hoan-thien-san-pham">(hoàn thiện sản phẩm)</option>
                      <option value="khao-sat">(khảo sát)</option>
                      <option value="launch">(ra mắt)</option>
                    </select>
                  </div>

                  {/* Business & Market Section */}
                  <hr className="my-4 border-gray-200" />
                  <h4 className="font-bold text-gray-800 mb-4">Kinh doanh & Thị trường</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Vấn đề giải quyết</label>
                      <textarea
                        value={editProjectData.pain_point || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, pain_point: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows={2}
                        placeholder="Mô tả vấn đề mà startup giải quyết..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Giải pháp của bạn</label>
                      <textarea
                        value={editProjectData.solution || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, solution: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows={2}
                        placeholder="Giải pháp độc đáo của bạn là gì?"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Sản phẩm/Dịch vụ</label>
                      <textarea
                        value={editProjectData.product || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, product: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows={2}
                        placeholder="Mô tả chi tiết sản phẩm/dịch vụ chính..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Đối tượng khách hàng</label>
                      <textarea
                        value={editProjectData.customer_segment || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, customer_segment: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows={2}
                        placeholder="VD: Startup, SME, Doanh nghiệp, Cá nhân"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Kích thước thị trường</label>
                      <input
                        type="text"
                        value={editProjectData.market_size || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, market_size: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        placeholder="VD: 100 tỷ USD, Quy mô toàn cầu"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Địa bàn hoạt động</label>
                      <input
                        type="text"
                        value={editProjectData.market_area || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, market_area: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        placeholder="VD: Hà Nội, TP.HCM, Toàn Việt Nam, Đông Nam Á"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Mô hình kinh doanh</label>
                      <textarea
                        value={editProjectData.business_model || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, business_model: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows={2}
                        placeholder="VD: B2B SaaS, B2C E-commerce, Subscription"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Phương thức tạo doanh thu</label>
                      <textarea
                        value={editProjectData.revenue_method || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, revenue_method: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows={2}
                        placeholder="VD: Huy động vốn, Freemium, Bán hàng, Advertising"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Mục tiêu doanh thu</label>
                      <input
                        type="text"
                        value={editProjectData.revenue_goal || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, revenue_goal: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        placeholder="VD: 1 tỷ VND năm 1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Chi phí dự kiến</label>
                      <input
                        type="text"
                        value={editProjectData.cost_estimate || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, cost_estimate: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        placeholder="VD: 1-2 tỷ VND"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Nguồn vốn dự kiến</label>
                      <input
                        type="text"
                        value={editProjectData.capital_source || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, capital_source: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        placeholder="VD: Đầu tư thiên thần, VC"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Kênh phân phối</label>
                      <textarea
                        value={editProjectData.distribution_channel || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, distribution_channel: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows={2}
                        placeholder="VD: Bán trực tiếp, Sàn thương mại, Hợp tác"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Địa điểm triển khai</label>
                      <input
                        type="text"
                        value={editProjectData.deployment_location || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, deployment_location: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        placeholder="VD: Hà Nội, TP.HCM, Online"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Đối tác/Investor hiện tại</label>
                      <textarea
                        value={editProjectData.partners || ''}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, partners: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows={2}
                        placeholder="Danh sách các đối tác, investor hoặc mentor..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Số lượng thành viên</label>
                      <input
                        type="number"
                        value={editProjectData.member_count || 0}
                        onChange={(e) => setEditProjectData(prev => ({ ...prev, member_count: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        placeholder="Nhập số lượng..."
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-4">
                    <button 
                      onClick={() => setEditingProject(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faX} />
                      Hủy
                    </button>
                    <button 
                      onClick={updateProjectInfo}
                      className="flex items-center gap-2 px-4 py-2 bg-[#FFCE23] hover:bg-[#FFE066] text-black font-semibold rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                      Lưu
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Create Post Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border-2 border-[#FFCE23]">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Tạo bài viết mới</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tiêu đề bài viết..."
                  value={newPostData.title}
                  onChange={(e) => setNewPostData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                />
                <textarea
                  placeholder="Nội dung bài viết..."
                  value={newPostData.body}
                  onChange={(e) => setNewPostData(prev => ({ ...prev, body: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                  rows={4}
                />
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Độ hiển thị</label>
                    <select
                      value={newPostData.visibility}
                      onChange={(e) => setNewPostData(prev => ({ ...prev, visibility: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                    >
                      <option value="public">Công khai</option>
                      <option value="private">Riêng tư</option>
                      <option value="friends">Bạn bè</option>
                    </select>
                  </div>
                  <button
                    onClick={createPost}
                    disabled={creatingPost}
                    className="px-6 py-2 bg-[#FFCE23] hover:bg-[#FFE066] text-black font-semibold rounded-lg transition-colors disabled:opacity-60"
                  >
                    {creatingPost ? 'Đang tạo...' : 'Đăng bài'}
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <FontAwesomeIcon icon={faSpinner} className="text-4xl text-[#FFCE23] animate-spin mb-4" />
                <p className="text-gray-600">Đang tải bài đăng...</p>
              </div>
            ) : filteredAndSortedPosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">Chưa có bài đăng nào</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAndSortedPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {/* Author Info */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#FFCE23] to-[#FFE066] rounded-full flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon icon={faUser} className="text-gray-700 text-sm" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{post.author_name || post.author?.full_name || post.author?.fullName || post.author?.name || post.author?.username || post.author?.email || 'Người dùng'}</p>
                            <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
                          </div>
                        </div>

                        {/* Post Title */}
                        {editingPostId === post.id ? (
                          <input
                            type="text"
                            value={editingPostData.title}
                            onChange={(e) => setEditingPostData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full text-lg font-bold text-gray-900 mb-2 px-3 py-2 border border-[#FFCE23] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                          />
                        ) : (
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                        )}

                        {/* Visibility & Stats */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                          <button
                            onClick={() => setVisibilityModalPostId(post.id)}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                            title="Nhấp để thay đổi hiển thị"
                          >
                            {post.visibility === 'public' ? (
                              <>
                                <FontAwesomeIcon icon={faEye} /> Công khai
                              </>
                            ) : post.visibility === 'private' ? (
                              <>
                                <FontAwesomeIcon icon={faEyeSlash} /> Riêng tư
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faEye} /> Bạn bè
                              </>
                            )}
                          </button>
                          {post.likes_count > 0 && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full">
                              <FontAwesomeIcon icon={faHeart} className="text-xs" /> {post.likes_count}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {editingPostId === post.id ? (
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => saveEditPost(post.id)}
                            disabled={postLoadingStates[post.id]}
                            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
                            title="Lưu chỉnh sửa"
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            onClick={() => setEditingPostId(null)}
                            className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg flex items-center gap-2 transition-colors text-sm"
                            title="Hủy"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      ) : deleteConfirmPostId === post.id ? (
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => deletePost(post.id)}
                            disabled={postLoadingStates[post.id]}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
                            title="Xác nhận xóa"
                          >
                            <FontAwesomeIcon icon={faCheck} /> Xác nhận
                          </button>
                          <button
                            onClick={() => setDeleteConfirmPostId(null)}
                            className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg flex items-center gap-2 transition-colors text-sm"
                            title="Hủy xóa"
                          >
                            <FontAwesomeIcon icon={faTimes} /> Hủy
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => startEditPost(post)}
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm"
                            title="Chỉnh sửa bài viết"
                          >
                            <FontAwesomeIcon icon={faEdit} /> Sửa
                          </button>
                          <button
                            onClick={() => setDeleteConfirmPostId(post.id)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm"
                            title="Xóa bài viết"
                          >
                            <FontAwesomeIcon icon={faTrash} /> Xóa
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Post Content */}
                    {editingPostId === post.id ? (
                      <div className="space-y-4 mb-4">
                        <textarea
                          value={editingPostData.body}
                          onChange={(e) => setEditingPostData(prev => ({ ...prev, body: e.target.value }))}
                          className="w-full px-3 py-2 border border-[#FFCE23] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                          rows="4"
                        />
                        <div className="flex items-end gap-3">
                          <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-2">Độ hiển thị</label>
                            <select
                              value={editingPostData.visibility || 'public'}
                              onChange={(e) => setEditingPostData(prev => ({ ...prev, visibility: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23] text-sm"
                            >
                              <option value="public">Công khai</option>
                              <option value="private">Riêng tư</option>
                              <option value="friends">Bạn bè</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap line-clamp-4">{post.body}</p>
                    )}

                    {/* Media */}
                    {post.media && post.media.length > 0 && (
                      <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {post.media.map((media, index) => (
                          <div key={index} className="relative group rounded-lg overflow-hidden bg-gray-100">
                            {media.media_type === 'video' || media.url.includes('.mp4') ? (
                              <video src={media.url} className="w-full h-48 object-cover" controls />
                            ) : (
                              <img src={media.url} alt={`media-${index}`} className="w-full h-48 object-cover" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Interactions */}
                    <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-6 flex-wrap">
                        <button
                          onClick={() => toggleLikePost(post.id)}
                          disabled={postLoadingStates[post.id]}
                          className={`flex items-center gap-2 transition-all px-3 py-2 rounded-lg ${
                            likedPosts.has(post.id) 
                              ? 'text-red-500 font-semibold bg-red-50' 
                              : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                          }`}
                          title="Thích bài viết"
                        >
                          <FontAwesomeIcon icon={faHeart} className="text-lg" />
                          <span className="text-sm font-medium">{post.likes_count || 0}</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowCommentsModal(post.id);
                            if (!comments[post.id]) {
                              fetchComments(post.id);
                            }
                          }}
                          className="flex items-center gap-2 hover:text-blue-500 hover:bg-blue-50 transition-all px-3 py-2 rounded-lg text-gray-600"
                          title="Xem bình luận"
                        >
                          <FontAwesomeIcon icon={faComment} className="text-lg" />
                          <span className="text-sm font-medium">{(comments[post.id] || []).length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ✅ Project Status Change Modal */}
      {statusModalProjectId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thay đổi trạng thái dự án</h3>
            <div className="space-y-3">
              <button
                onClick={() => updateProjectStatus('Công bố')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Công bố</p>
                  <p className="text-xs text-gray-600">Hiển thị trên nền tảng</p>
                </div>
              </button>
              <button
                onClick={() => updateProjectStatus('Ẩn')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
              >
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Ẩn</p>
                  <p className="text-xs text-gray-600">Chỉ mình tôi thấy</p>
                </div>
              </button>
            </div>
            <button
              onClick={() => setStatusModalProjectId(null)}
              className="w-full mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* ✅ Visibility Change Modal */}
      {visibilityModalPostId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thay đổi hiển thị bài đăng</h3>
            <div className="space-y-3">
              <button
                onClick={() => updatePostVisibility(visibilityModalPostId, 'public')}
                disabled={postLoadingStates[visibilityModalPostId]}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors disabled:opacity-50 text-left"
              >
                <FontAwesomeIcon icon={faEye} className="text-gray-600 text-lg" />
                <div>
                  <p className="font-semibold text-gray-900">Công khai</p>
                  <p className="text-xs text-gray-600">Mọi người đều có thể xem</p>
                </div>
              </button>
              <button
                onClick={() => updatePostVisibility(visibilityModalPostId, 'friends')}
                disabled={postLoadingStates[visibilityModalPostId]}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors disabled:opacity-50 text-left"
              >
                <FontAwesomeIcon icon={faEye} className="text-gray-600 text-lg" />
                <div>
                  <p className="font-semibold text-gray-900">Bạn bè</p>
                  <p className="text-xs text-gray-600">Chỉ bạn bè có thể xem</p>
                </div>
              </button>
              <button
                onClick={() => updatePostVisibility(visibilityModalPostId, 'private')}
                disabled={postLoadingStates[visibilityModalPostId]}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors disabled:opacity-50 text-left"
              >
                <FontAwesomeIcon icon={faEyeSlash} className="text-gray-600 text-lg" />
                <div>
                  <p className="font-semibold text-gray-900">Riêng tư</p>
                  <p className="text-xs text-gray-600">Chỉ bạn có thể xem</p>
                </div>
              </button>
            </div>
            <button
              onClick={() => setVisibilityModalPostId(null)}
              className="w-full mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Bình luận</h3>
              <button onClick={() => setShowCommentsModal(null)} className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Comments List */}
              {(comments[showCommentsModal] || []).length === 0 ? (
                <p className="text-gray-500 text-center py-6">Chưa có bình luận nào</p>
              ) : (
                (comments[showCommentsModal] || []).map((comment, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-[#FFCE23] transition-colors">
                    <div className="flex items-start gap-3">
                      {/* User Avatar */}
                      <div className="flex-shrink-0 w-10 h-10 bg-[#FFCE23] rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-gray-700 text-sm" />
                      </div>
                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{comment.author_name || comment.author?.full_name || comment.author?.fullName || comment.author?.name || comment.author?.username || comment.author?.email || comment.author_id || 'Người dùng'}</p>
                        <p className="text-sm text-gray-700 mt-1 break-words">{comment.body}</p>
                        <p className="text-xs text-gray-500 mt-2">{formatDate(comment.created_at)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <div className="sticky bottom-0 bg-white border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Viết bình luận..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addComment(showCommentsModal)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                />
                <button
                  onClick={() => addComment(showCommentsModal)}
                  disabled={postLoadingStates[showCommentsModal]}
                  className="px-4 py-2 bg-[#FFCE23] hover:bg-[#FFE066] text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-semibold shadow-lg ${
          toast.type === 'error' ? 'bg-red-500' : 
          toast.type === 'success' ? 'bg-green-500' : 
          toast.type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`}>
          {toast.message}
        </div>
      )}

      <Footer />
    </div>
  );
}