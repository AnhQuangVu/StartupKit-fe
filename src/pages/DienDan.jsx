import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faSpinner,
  faEye,
  faEyeSlash,
  faEdit,
  faTrash,
  faX,
  faCheck,
  faTimes,
  faArrowLeft,
  faUser,
  faUpload,
  faBullhorn,
  faUsers,
  faFileLines,
  faBriefcase,
  faIndustry,
  faGlobe,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { API_BASE, authHeaders } from "../config/api";
import { listPostComments, createPostComment } from "../api/posts";
import { useAuth } from "../context/AuthContext";
import { uploadToCloudinary } from "../utils/cloudinary";

// ====================================================================
// --- MAIN COMPONENT: DIEN DAN ---
// ====================================================================

export default function DienDan() {
  const { user } = useAuth();

  // --- 1. STATE MANAGEMENT ---
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterVisibility, setFilterVisibility] = useState("all");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [comments, setComments] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPostData, setEditingPostData] = useState({
    title: "",
    body: "",
    visibility: "public",
  });

  // ✅ STATE XÓA AN TOÀN (Gõ "DELETE")
  const [deleteConfirm, setDeleteConfirm] = useState({
    postId: null,
    confirmText: "",
  });

  const [showCommentsModal, setShowCommentsModal] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [postLoadingStates, setPostLoadingStates] = useState({});
  const [newPostData, setNewPostData] = useState({
    title: "",
    body: "",
    visibility: "public",
  });
  const [creatingPost, setCreatingPost] = useState(false);
  const [editingProject, setEditingProject] = useState(false);
  const [editProjectData, setEditProjectData] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [visibilityModalPostId, setVisibilityModalPostId] = useState(null);
  const [statusModalProjectId, setStatusModalProjectId] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [members, setMembers] = useState([]);

  // --- 2. CONSTANTS & UTILITIES ---
  const stageMap = {
    "y-tuong": "Ý tưởng",
    "nghien-cuu-thi-truong": "Nghiên cứu thị trường",
    "hoan-thien-san-pham": "Hoàn thiện sản phẩm",
    "khao-sat": "Khảo sát",
    launch: "Ra mắt/Tăng trưởng",
  };

  const getDisplayStage = (stage) => stageMap[stage] || stage || "N/A";

  const showToast = useCallback((message, type = "info", duration = 3500) => {
    setToast({ visible: true, message, type });
    setTimeout(
      () => setToast({ visible: false, message: "", type: "info" }),
      duration
    );
  }, []);

  const normalizeImageUrl = (url) => {
    if (!url)
      return "https://via.placeholder.com/300x200/F3F4F6/9CA3AF?text=No+Image";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return `${API_BASE}${url}`;
    return `https://${url}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleString("vi-VN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case "public":
        return { icon: faEye, text: "Công khai", color: "text-green-600" };
      case "private":
        return { icon: faEyeSlash, text: "Riêng tư", color: "text-red-600" };
      case "friends":
        return { icon: faUsers, text: "Bạn bè", color: "text-blue-600" };
      default:
        return { icon: faEye, text: "N/A", color: "text-gray-600" };
    }
  };

  // --- 3. FETCH DATA HANDLERS ---
  const fetchUserProjects = useCallback(async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) {
      showToast("Vui lòng đăng nhập để xem danh sách hồ sơ", "warning");
      setProjects([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/projects?skip=0&limit=50`, {
        headers: authHeaders(token),
      });

      if (!response.ok) throw new Error("Không thể lấy danh sách hồ sơ");

      const data = await response.json();
      const projectList = Array.isArray(data)
        ? data
        : data?.projects || data?.items || [];

      const normalizedProjects = projectList.map((p) => ({
        ...p,
        logo_url: normalizeImageUrl(p.logo_url),
        team_image_url: normalizeImageUrl(
          p.team_image_url || p.team_image?.url
        ),
      }));

      const sortedProjects = normalizedProjects.sort(
        (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );

      setProjects(sortedProjects || []);
    } catch (error) {
      console.error("Fetch user projects error:", error);
      showToast("❌ " + error.message, "error");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const fetchPosts = useCallback(async () => {
    if (!selectedProject) return;
    setLoading(true);
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE}/projects/${selectedProject.id}/posts?limit=50`,
        {
          headers: authHeaders(token),
        }
      );

      if (!response.ok) throw new Error("Không thể lấy bài đăng");
      let data = await response.json();

      const currentDisplayName = (u) =>
        u?.full_name ||
        u?.fullName ||
        u?.name ||
        u?.username ||
        u?.email ||
        null;
      data = data.map((post) => ({
        ...post,
        author_name:
          post.author_name ||
          post.author?.full_name ||
          (post.author_id === user?.id ? currentDisplayName(user) : null) ||
          "Người dùng",
      }));

      setPosts(data || []);
    } catch (error) {
      console.error("Fetch posts error:", error);
      showToast("Lỗi khi tải bài đăng", "error");
    } finally {
      setLoading(false);
    }
  }, [selectedProject, user, showToast]);

  const fetchFollowers = useCallback(async () => {
    if (!selectedProject?.id) return;
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE}/projects/${selectedProject.id}/followers`,
        {
          headers: authHeaders(token),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFollowers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch followers error:", error);
    }
  }, [selectedProject]);

  const fetchMembers = useCallback(async () => {
    if (!selectedProject?.id) return;
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE}/projects/${selectedProject.id}/members`,
        {
          headers: authHeaders(token),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMembers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch members error:", error);
    }
  }, [selectedProject]);

  // --- 4. USE EFFECTS ---
  useEffect(() => {
    if (user?.id) {
      fetchUserProjects();
    }
  }, [user, fetchUserProjects]);

  useEffect(() => {
    if (selectedProject) {
      fetchPosts();
      fetchFollowers();
      fetchMembers();
    }
  }, [selectedProject, fetchPosts, fetchFollowers, fetchMembers]);

  useEffect(() => {
    if (selectedProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? {
                ...p,
                posts_count: posts.length,
                followers_count: followers.length,
              }
            : p
        )
      );
    }
  }, [posts, followers, selectedProject]);

  // --- 5. POST & COMMENT HANDLERS ---
// --- 5. POST & COMMENT HANDLERS ---

const toggleLikePost = async (postId) => {
    try {
        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        setPostLoadingStates(prev => ({ ...prev, [postId]: true }));

        // Lấy bài viết hiện tại để biết số like và trạng thái like
        const currentPost = posts.find(p => p.id === postId);
        if (!currentPost) return;

        const response = await fetch(`${API_BASE}/projects/posts/${postId}/like`, {
            method: 'POST',
            headers: authHeaders(token),
        });

        if (!response.ok) throw new Error('Lỗi like/unlike');
        
        // Đọc response (dù không dùng data.likes_count, vẫn cần check 'liked')
        const data = await response.json(); 
        const didLike = data.liked; // Giả sử API trả về { liked: true } hoặc { liked: false }

        // ✅ LOGIC TỰ ĐẾM (CLIENT-SIDE)
        setPosts(prev => prev.map(p => {
            if (p.id === postId) {
                let newLikesCount = p.likes_count || 0;
                
                if (didLike) {
                    // Nếu API báo đã like (trước đó chưa like)
                    newLikesCount += 1;
                } else {
                    // Nếu API báo đã unlike (trước đó đã like)
                    newLikesCount = Math.max(0, newLikesCount - 1); // Tránh số âm
                }
                
                return { ...p, likes_count: newLikesCount };
            }
            return p;
        }));

        // Cập nhật state likedPosts (để đổi màu nút)
        if (didLike) {
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

    } catch (error) {
        console.error('Like toggle error:', error);
        showToast('Lỗi khi thích bài viết', 'error');
    } finally {
        setPostLoadingStates(prev => ({ ...prev, [postId]: false }));
    }
};

// ... (Các hàm còn lại giữ nguyên) ...

  const startEditPost = (post) => {
    setEditingPostId(post.id);
    setEditingPostData({
      title: post.title,
      body: post.body,
      visibility: post.visibility || "public",
    });
  };

  const saveEditPost = async (postId) => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");
      setPostLoadingStates((prev) => ({ ...prev, [postId]: true }));

      const response = await fetch(`${API_BASE}/projects/posts/${postId}`, {
        method: "PATCH",
        headers: { ...authHeaders(token), "Content-Type": "application/json" },
        body: JSON.stringify(editingPostData),
      });

      if (!response.ok) throw new Error("Không thể cập nhật bài viết");

      const updatedPost = await response.json();
      setPosts((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));
      setEditingPostId(null);
      showToast("Cập nhật bài viết thành công", "success");
    } catch (error) {
      console.error("Edit post error:", error);
      showToast("Lỗi khi cập nhật bài viết", "error");
    } finally {
      setPostLoadingStates((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const deletePost = async (postId) => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");

      setPostLoadingStates((prev) => ({ ...prev, [postId]: true }));

      const response = await fetch(`${API_BASE}/projects/posts/${postId}`, {
        method: "DELETE",
        headers: authHeaders(token),
      });

      if (!response.ok) throw new Error("Không thể xóa bài viết");

      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setDeleteConfirm({ postId: null, confirmText: "" }); // Reset state xác nhận
      showToast("Xóa bài viết thành công", "success");
    } catch (error) {
      console.error("Delete post error:", error);
      showToast("Lỗi khi xóa bài viết", "error");
    } finally {
      setPostLoadingStates((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const updatePostVisibility = async (postId, newVisibility) => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");
      setPostLoadingStates((prev) => ({ ...prev, [postId]: true }));

      const response = await fetch(`${API_BASE}/projects/posts/${postId}`, {
        method: "PATCH",
        headers: { ...authHeaders(token), "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: newVisibility }),
      });

      if (!response.ok) throw new Error("Không thể cập nhật hiển thị bài viết");

      const updatedPost = await response.json();
      setPosts((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));
      setVisibilityModalPostId(null);
      showToast("Cập nhật hiển thị bài viết thành công", "success");
    } catch (error) {
      console.error("Update visibility error:", error);
      showToast("Lỗi khi cập nhật hiển thị bài viết", "error");
    } finally {
      setPostLoadingStates((prev) => ({ ...prev, [postId]: false }));
    }
  };

  // ✅ CẬP NHẬT: Đồng bộ comments_count vào state 'posts'
  const fetchComments = async (postId) => {
    try {
      const data = await listPostComments(postId);

      // Đồng bộ số lượng comment vào state 'posts'
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId ? { ...p, comments_count: data.length } : p
        )
      );

      setComments((prev) => ({ ...prev, [postId]: data || [] }));
    } catch (error) {
      console.error("Fetch comments error:", error);
      showToast("Lỗi khi tải bình luận", "error");
    }
  };

  // ✅ CẬP NHẬT: Cập nhật 'posts' state ngay sau khi comment
  const addComment = async (postId) => {
    if (!commentText.trim()) {
      showToast("Vui lòng nhập bình luận", "warning");
      return;
    }

    try {
      setPostLoadingStates((prev) => ({ ...prev, [postId]: true }));
      const newComment = await createPostComment(postId, { body: commentText });

      let newCommentsLength;

      setComments((prev) => {
        const newComments = [...(prev[postId] || []), newComment];
        newCommentsLength = newComments.length; // Lấy độ dài mới
        return { ...prev, [postId]: newComments };
      });

      // Cập nhật 'posts' state ngay lập tức với số lượng mới
      setPosts((postsPrev) =>
        postsPrev.map((p) =>
          p.id === postId ? { ...p, comments_count: newCommentsLength } : p
        )
      );

      setCommentText("");
      showToast("Thêm bình luận thành công", "success");
    } catch (error) {
      console.error("Add comment error:", error);
      showToast("Lỗi khi thêm bình luận", "error");
    } finally {
      setPostLoadingStates((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const createPost = async () => {
    if (!newPostData.title.trim() || !newPostData.body.trim()) {
      showToast("Vui lòng nhập đầy đủ Tiêu đề và Nội dung", "warning");
      return;
    }

    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) {
      showToast("Vui lòng đăng nhập", "warning");
      return;
    }

    try {
      setCreatingPost(true);
      const response = await fetch(
        `${API_BASE}/projects/${selectedProject.id}/posts`,
        {
          method: "POST",
          headers: {
            ...authHeaders(token),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPostData),
        }
      );

      if (!response.ok) throw new Error("Không thể tạo bài viết");

      const createdPost = await response.json();

      const postWithAuthor = {
        ...createdPost,
        author_name: user?.full_name || user?.username || "Người dùng",
      };

      setPosts((prev) => [postWithAuthor, ...prev]);
      setNewPostData({ title: "", body: "", visibility: "public" });
      showToast("✓ Tạo bài viết thành công!", "success");
    } catch (error) {
      console.error("Create post error:", error);
      showToast("Lỗi khi tạo bài viết: " + error.message, "error");
    } finally {
      setCreatingPost(false);
    }
  };

  // --- 6. PROJECT EDIT HANDLERS ---
  const uploadLogo = async () => {
    if (!logoFile) return selectedProject.logo_url;

    try {
      setUploadingLogo(true);
      const uploadResponse = await uploadToCloudinary(logoFile);
      return uploadResponse.url || uploadResponse;
    } catch (error) {
      console.error("Logo upload error:", error);
      throw new Error("Lỗi khi tải lên Logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const uploadBanner = async () => {
    if (!bannerFile)
      return selectedProject.team_image_url || selectedProject.team_image?.url;

    try {
      setUploadingBanner(true);
      const uploadResponse = await uploadToCloudinary(bannerFile);
      return uploadResponse.url || uploadResponse;
    } catch (error) {
      console.error("Banner upload error:", error);
      throw new Error("Lỗi khi tải lên Banner");
    } finally {
      setUploadingBanner(false);
    }
  };

  // ✅ LOGIC CẬP NHẬT PROJECT ĐÃ SỬA LỖI DỮ LIỆU
  const updateProjectInfo = async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) {
      showToast("Vui lòng đăng nhập", "warning");
      return;
    }

    try {
      setLoading(true);

      const normalizeUrl = (url) =>
        typeof url === "string" ? url : url?.toString?.() || null;

      let newLogoUrl = normalizeUrl(selectedProject.logo_url);
      if (logoFile) newLogoUrl = await uploadLogo();

      let newBannerUrl =
        normalizeUrl(selectedProject.team_image_url) ||
        normalizeUrl(selectedProject.team_image?.url);
      if (bannerFile) newBannerUrl = await uploadBanner();

      const payload = {
        name: editProjectData.name || selectedProject.name,
        description: editProjectData.description || selectedProject.description,
        logo_url: newLogoUrl,
        team_image_url: newBannerUrl,
      };

      const complexFieldsToExclude = [
        "logo",
        "team_image",
        "product_images",
        "stages",
        "sections",
        "meta",
        "posts_count",
        "followers_count",
        "current_stage",
        "current_stage_label",
        "is_deleted",
        "created_at",
        "updated_at",
        "founder_id",
        "profile_url",
      ];

      Object.keys(editProjectData).forEach((key) => {
        if (editProjectData[key] !== selectedProject[key]) {
          if (!complexFieldsToExclude.includes(key)) {
            if (
              typeof editProjectData[key] === "object" &&
              editProjectData[key] !== null
            ) {
              payload[key] = Array.isArray(editProjectData[key])
                ? editProjectData[key].join(", ")
                : "";
            } else {
              payload[key] = editProjectData[key];
            }
          }
        }
      });

      if (
        editProjectData.status &&
        editProjectData.status !== selectedProject.status
      ) {
        payload.status = editProjectData.status;
      }

      console.log("PATCH payload:", payload);

      const response = await fetch(
        `${API_BASE}/projects/${selectedProject.id}`,
        {
          method: "PATCH",
          headers: {
            ...authHeaders(token),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error Detail:", errorData.detail);
        throw new Error(errorData.detail || "Không thể cập nhật thông tin");
      }

      const updated = await response.json();
      setSelectedProject(updated);
      setProjects((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditingProject(false);
      setLogoFile(null);
      setLogoPreview(null);
      setBannerFile(null);
      setBannerPreview(null);
      showToast("✓ Cập nhật thông tin thành công!", "success");
    } catch (error) {
      console.error("Update project error:", error);
      showToast("❌ Lỗi khi cập nhật: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const startEditProject = () => {
    // Khởi tạo editProjectData từ selectedProject
    setEditProjectData({
      name: selectedProject.name || "",
      description: selectedProject.description || "",
      industry: selectedProject.industry || "",
      website_url: selectedProject.website_url || "",
      tagline: selectedProject.tagline || "",
      stage: selectedProject.stage || "y-tuong",
      pain_point: selectedProject.pain_point || "",
      solution: selectedProject.solution || "",
      product: selectedProject.product || "",
      customer_segment: selectedProject.customer_segment || "",
      customer_features: selectedProject.customer_features || "",
      market_size: selectedProject.market_size || "",
      market_area: selectedProject.market_area || "",
      business_model: selectedProject.business_model || "",
      revenue_method: selectedProject.revenue_method || "",
      distribution_channel: selectedProject.distribution_channel || "",
      partners: selectedProject.partners || "",
      cost_estimate: selectedProject.cost_estimate || "",
      capital_source: selectedProject.capital_source || "",
      revenue_goal: selectedProject.revenue_goal || "",
      member_count: selectedProject.member_count || 0,
      member_skills: selectedProject.member_skills || "",
      resources: selectedProject.resources || "",
      deployment_location: selectedProject.deployment_location || "",
      status: selectedProject.status || "Công bố",
    });
    setLogoFile(null);
    setLogoPreview(normalizeImageUrl(selectedProject.logo_url));
    setBannerFile(null);
    setBannerPreview(
      normalizeImageUrl(
        selectedProject.team_image_url || selectedProject.team_image?.url
      )
    );
    setEditingProject(true);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const updateProjectStatus = async (newStatus) => {
    if (!selectedProject) return;
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");
      const payload = {
        status: newStatus,
      };
      const response = await fetch(
        `${API_BASE}/projects/${selectedProject.id}`,
        {
          method: "PATCH",
          headers: {
            ...authHeaders(token),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Không thể cập nhật trạng thái");
      }
      const updatedProject = await response.json();

      setProjects((prev) =>
        prev.map((p) => (p.id === selectedProject.id ? updatedProject : p))
      );
      setSelectedProject(updatedProject);
      setStatusModalProjectId(null);
      showToast("Cập nhật trạng thái thành công", "success");
    } catch (error) {
      console.error("Update status error:", error);
      showToast("Lỗi khi cập nhật trạng thái: " + error.message, "error");
    }
  };

  // --- 7. FILTER & SORT LOGIC (useMemo) ---
  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (filterVisibility !== "all" && post.visibility !== filterVisibility)
          return false;
        if (
          searchTerm &&
          !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !post.body.toLowerCase().includes(searchTerm.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest")
          return new Date(b.created_at) - new Date(a.created_at);
        if (sortBy === "oldest")
          return new Date(a.created_at) - new Date(b.created_at);
        return 0;
      });
  }, [posts, filterVisibility, searchTerm, sortBy]);

  // --- 8. JSX RENDER ---
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
            <FontAwesomeIcon
              icon={faBullhorn}
              className="text-[#FFCE23] mr-3"
            />
            Diễn Đàn - Quản Lý Hồ Sơ
          </h1>
          <p className="text-gray-500 text-sm">
            Nơi bạn quản lý các hồ sơ và bài đăng đã công bố.
          </p>
        </div>

        {loading && !selectedProject ? (
          <LoadingState message="Đang tải danh sách hồ sơ..." />
        ) : !selectedProject ? (
          // --- Project List View ---
          <ProjectListView
            projects={projects}
            setSelectedProject={setSelectedProject}
            normalizeImageUrl={normalizeImageUrl}
          />
        ) : (
          // --- Project Detail & Post Management View ---
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Column 1: Project Info & Edit */}
            <div className="lg:col-span-1 lg:sticky lg:top-10 h-min mb-8 lg:mb-0">
              <ProjectDetailCard
                selectedProject={selectedProject}
                followers={followers}
                members={members}
                postsCount={posts.length}
                getDisplayStage={getDisplayStage}
                startEditProject={startEditProject}
                setSelectedProject={setSelectedProject}
                setStatusModalProjectId={setStatusModalProjectId}
                editingProject={editingProject}
                normalizeImageUrl={normalizeImageUrl}
                posts={posts}
              />
            </div>

            {/* Column 2 & 3: Post Management */}
            <div className="lg:col-span-2 space-y-8">
              <PostFilterAndCreate
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterVisibility={filterVisibility}
                setFilterVisibility={setFilterVisibility}
                newPostData={newPostData}
                setNewPostData={setNewPostData}
                createPost={createPost}
                creatingPost={creatingPost}
              />

              {filteredAndSortedPosts.length === 0 ? (
                <EmptyState message="Không tìm thấy bài đăng nào theo tiêu chí." />
              ) : (
                <PostList
                  posts={filteredAndSortedPosts}
                  likedPosts={likedPosts}
                  comments={comments}
                  postLoadingStates={postLoadingStates}
                  editingPostId={editingPostId}
                  editingPostData={editingPostData}
                  setEditingPostData={setEditingPostData}
                  deleteConfirm={deleteConfirm}
                  setDeleteConfirm={setDeleteConfirm}
                  user={user}
                  formatDate={formatDate}
                  getVisibilityIcon={getVisibilityIcon}
                  toggleLikePost={toggleLikePost}
                  setShowCommentsModal={setShowCommentsModal}
                  fetchComments={fetchComments}
                  startEditPost={startEditPost}
                  saveEditPost={saveEditPost}
                  setEditingPostId={setEditingPostId}
                  deletePost={deletePost}
                  setVisibilityModalPostId={setVisibilityModalPostId}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* --- MODALS & TOASTS --- */}
      {statusModalProjectId && (
        <StatusChangeModal
          selectedProject={selectedProject}
          setStatusModalProjectId={setStatusModalProjectId}
          updateProjectStatus={updateProjectStatus}
        />
      )}
      {visibilityModalPostId && (
        <VisibilityChangeModal
          postId={visibilityModalPostId}
          setVisibilityModalPostId={setVisibilityModalPostId}
          updatePostVisibility={updatePostVisibility}
          postLoadingStates={postLoadingStates}
        />
      )}
      {showCommentsModal && (
        <CommentsModal
          showCommentsModal={showCommentsModal}
          comments={comments}
          fetchComments={fetchComments}
          addComment={addComment}
          commentText={commentText}
          setCommentText={setCommentText}
          postLoadingStates={postLoadingStates}
          formatDate={formatDate}
          user={user}
          setShowCommentsModal={setShowCommentsModal}
        />
      )}

      {editingProject && (
        <ProjectEditModal
          selectedProject={selectedProject}
          editProjectData={editProjectData}
          setEditProjectData={setEditProjectData}
          updateProjectInfo={updateProjectInfo}
          setEditingProject={setEditingProject}
          logoPreview={logoPreview}
          handleLogoChange={handleLogoChange}
          bannerPreview={bannerPreview}
          handleBannerChange={handleBannerChange}
          uploadingLogo={uploadingLogo}
          uploadingBanner={uploadingBanner}
          stageMap={stageMap}
          normalizeImageUrl={normalizeImageUrl}
        />
      )}

      {toast.visible && <ToastNotification toast={toast} />}
      <Footer />
    </div>
  );
}

// ====================================================================
// --- SUB-COMPONENTS ---
// ====================================================================

const LoadingState = ({ message }) => (
  <div className="bg-white rounded-xl shadow-lg p-16 text-center border border-gray-200">
    <FontAwesomeIcon
      icon={faSpinner}
      className="text-5xl text-[#FFCE23] animate-spin mb-6"
    />
    <p className="text-gray-600 text-lg font-medium">{message}</p>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="bg-white rounded-xl shadow-lg p-16 text-center border border-gray-200">
    <p className="text-gray-500 text-lg font-medium">{message}</p>
  </div>
);

const ProjectListView = ({
  projects,
  setSelectedProject,
  normalizeImageUrl,
}) => (
  <div>
    {projects.length === 0 ? (
      <EmptyState message="Chưa có dự án nào được công bố. Vui lòng tạo dự án mới." />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="relative h-40 bg-gray-100">
              <img
                src={normalizeImageUrl(project.logo_url)}
                alt={project.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x160/F3F4F6/9CA3AF?text=Project+Image";
                }}
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                {project.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {project.description || "Chưa có mô tả"}
              </p>
              <button
                onClick={() => setSelectedProject(project)}
                className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <FontAwesomeIcon icon={faBriefcase} />
                Quản Lý Hồ Sơ
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ProjectDetailCard = ({
  selectedProject,
  followers,
  members,
  posts,
  getDisplayStage,
  startEditProject,
  setSelectedProject,
  setStatusModalProjectId,
  editingProject,
  normalizeImageUrl,
}) => {
  const displayLogoUrl = normalizeImageUrl(selectedProject.logo_url);
  const displayBannerUrl = normalizeImageUrl(
    selectedProject.team_image_url || selectedProject.team_image?.url
  );
  const postsCount = posts?.length || 0;

  const [deleteProjectConfirm, setDeleteProjectConfirm] = useState({
    show: false,
    confirmText: "",
  });
  const [deletingProject, setDeletingProject] = useState(false);

  const handleDeleteProject = async () => {
    if (
      !deleteProjectConfirm.confirmText ||
      deleteProjectConfirm.confirmText.toLowerCase() !== "delete"
    )
      return;
    setDeletingProject(true);
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE}/projects/${selectedProject.id}`,
        {
          method: "DELETE",
          headers: {
            ...authHeaders(token),
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Không thể xóa dự án");
      setSelectedProject(null);
    } catch (error) {
      alert(`Lỗi xóa dự án: ${error.message}`);
    } finally {
      setDeletingProject(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
      {/* Banner Section */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
        <img
          src={displayBannerUrl}
          alt="Banner dự án"
          className="w-full h-full object-cover opacity-80 mix-blend-multiply"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x400/3B82F6/BFDBFE?text=Project+Banner";
            e.target.classList.remove("opacity-80", "mix-blend-multiply");
          }}
        />

        {/* Back Button */}
        <button
          onClick={() => setSelectedProject(null)}
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-black bg-opacity-40 text-white text-sm font-semibold rounded-full hover:bg-opacity-60 transition-colors shadow-lg"
          title="Quay lại danh sách hồ sơ"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="hidden sm:inline">Quay lại</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 relative -mt-16">
        {/* Logo, Edit, Delete Button */}
        <div className="flex items-end justify-between mb-4">
          {/* Project Logo */}
          <div className="w-32 h-32 bg-white p-1 rounded-2xl shadow-lg flex-shrink-0 border border-gray-100 flex items-center justify-center">
            <img
              src={displayLogoUrl}
              alt={selectedProject.name}
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/120/E0E7FF/6366F1?text=Logo";
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={startEditProject}
              disabled={editingProject}
              className="flex items-center justify-center px-4 py-2 bg-[#FFCE23] text-gray-900 text-sm font-bold rounded-full hover:bg-[#FFE066] transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              title="Chỉnh sửa thông tin hồ sơ"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() =>
                setDeleteProjectConfirm({ show: true, confirmText: "" })
              }
              className="flex items-center justify-center px-4 py-2 bg-red-100 text-red-700 text-sm font-bold rounded-full hover:bg-red-200 transition-colors shadow-md mt-2"
              title="Xóa dự án"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>

        {/* Xác nhận xóa dự án */}
        {deleteProjectConfirm.show && (
          <div className="my-4 p-4 bg-red-50 border-2 border-red-400 rounded-xl flex flex-col gap-2">
            <span className="text-sm font-bold text-red-700">
              Gõ "DELETE" để xác nhận xóa dự án này:
            </span>
            <input
              type="text"
              value={deleteProjectConfirm.confirmText}
              onChange={(e) =>
                setDeleteProjectConfirm((prev) => ({
                  ...prev,
                  confirmText: e.target.value,
                }))
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:border-red-500 focus:ring-red-500"
            />
            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={() =>
                  setDeleteProjectConfirm({ show: false, confirmText: "" })
                }
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteProject}
                disabled={
                  deletingProject ||
                  deleteProjectConfirm.confirmText.toLowerCase() !== "delete"
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {deletingProject ? "Đang xóa..." : "Xác nhận xóa"}
              </button>
            </div>
          </div>
        )}

        {/* Project Name & Tagline */}
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-1">
            {selectedProject.name}
          </h2>
          <p className="text-base text-gray-600 italic line-clamp-2">
            {selectedProject.tagline || "Chưa có Slogan chính thức."}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6 border-b pb-6 border-gray-100 text-sm">
          {selectedProject.description ||
            "Mô tả chi tiết về dự án của bạn sẽ xuất hiện tại đây. Giới thiệu về mục tiêu, giá trị cốt lõi và những gì dự án đang hướng tới."}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <StatItem
            icon={faUsers}
            label="Người theo dõi"
            value={followers.length}
            color="text-blue-600"
          />
          <StatItem
            icon={faFileLines}
            label="Bài đăng"
            value={postsCount}
            color="text-green-600"
          />
          <StatItem
            icon={faBriefcase}
            label="Thành viên"
            value={members.length}
            color="text-purple-600"
          />
        </div>

        {/* Quick Info & Status */}
        <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
          <QuickInfoItem
            label="Ngành"
            value={selectedProject.industry || "Chưa cập nhật"}
            icon={faIndustry}
          />
          <QuickInfoItem
            label="Giai đoạn"
            value={getDisplayStage(selectedProject.stage)}
            icon={faBullhorn}
          />
          <QuickInfoItem
            label="Trạng thái"
            value={selectedProject.status || "Công bố"}
            icon={selectedProject.status === "Ẩn" ? faEyeSlash : faEye}
            valueColor={
              selectedProject.status === "Ẩn"
                ? "text-red-500"
                : "text-green-600"
            }
            onClick={() => setStatusModalProjectId(selectedProject.id)}
            isButton
          />
          {selectedProject.website_url && (
            <div className="pt-4 border-t border-gray-200">
              <a
                href={selectedProject.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <FontAwesomeIcon icon={faGlobe} className="text-blue-500" />
                Truy cập Website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PostFilterAndCreate = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filterVisibility,
  setFilterVisibility,
  newPostData,
  setNewPostData,
  createPost,
  creatingPost,
}) => (
  <div className="space-y-6">
    {/* Filter Section */}
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h4 className="text-lg font-bold text-gray-900 mb-4">
        Lọc và Sắp xếp Bài đăng
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm tiêu đề hoặc nội dung..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
        />
        <select
          value={filterVisibility}
          onChange={(e) => setFilterVisibility(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] appearance-none transition-colors"
        >
          <option value="all">Tất cả hiển thị</option>
          <option value="public">Công khai</option>
          <option value="private">Riêng tư</option>
          <option value="friends">Bạn bè</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] appearance-none transition-colors"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>
    </div>

    {/* Create Post Form */}
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#FFCE23] border-dashed">
      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
        <FontAwesomeIcon icon={faEdit} className="text-[#FFCE23]" />
        Tạo Bài Viết Mới
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Tiêu đề bài viết (ngắn gọn, hấp dẫn)..."
          value={newPostData.title}
          onChange={(e) =>
            setNewPostData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-semibold placeholder:font-normal focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <textarea
          placeholder="Nội dung chi tiết (cập nhật tiến độ, chia sẻ kinh nghiệm, kêu gọi hợp tác...)"
          value={newPostData.body}
          onChange={(e) =>
            setNewPostData((prev) => ({ ...prev, body: e.target.value }))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          rows={4}
        />
        <div className="flex justify-between items-center gap-4 pt-2">
          <div className="flex-1 max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Độ hiển thị
            </label>
            <select
              value={newPostData.visibility}
              onChange={(e) =>
                setNewPostData((prev) => ({
                  ...prev,
                  visibility: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] appearance-none"
            >
              <option value="public">Công khai</option>
              <option value="private">Riêng tư</option>
              <option value="friends">Bạn bè</option>
            </select>
          </div>
          <button
            onClick={createPost}
            disabled={
              creatingPost ||
              !newPostData.title.trim() ||
              !newPostData.body.trim()
            }
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-md"
          >
            {creatingPost ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <FontAwesomeIcon icon={faBullhorn} />
            )}
            {creatingPost ? "Đang Đăng..." : "Đăng Bài"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- 8.5. Post List ---
const PostList = ({
  posts,
  likedPosts,
  comments,
  postLoadingStates,
  editingPostId,
  editingPostData,
  setEditingPostData,
  deleteConfirm,
  setDeleteConfirm,
  user,
  formatDate,
  getVisibilityIcon,
  toggleLikePost,
  setShowCommentsModal,
  fetchComments,
  startEditPost,
  saveEditPost,
  setEditingPostId,
  deletePost,
  setVisibilityModalPostId,
}) => (
  <div className="space-y-6">
    {posts.map((post) => {
      const isEditing = editingPostId === post.id;
      const isLoading = postLoadingStates[post.id];
      const vis = getVisibilityIcon(post.visibility);

      return (
        <div
          key={post.id}
          className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 transition-shadow duration-300"
        >
          {/* Post Header & Actions */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-500 text-base"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {post.author_name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatDate(post.created_at)}</span>
                    <span className="text-gray-300">•</span>
                    <button
                      onClick={() => setVisibilityModalPostId(post.id)}
                      className={`flex items-center gap-1 ${vis.color} hover:text-opacity-80 transition-colors font-semibold`}
                    >
                      <FontAwesomeIcon icon={vis.icon} className="text-sm" />{" "}
                      {vis.text}
                    </button>
                  </div>
                </div>
              </div>

              {/* Title & Body (Edit/View) */}
              {isEditing ? (
                <input
                  type="text"
                  value={editingPostData.title}
                  onChange={(e) =>
                    setEditingPostData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full text-xl font-extrabold text-gray-900 mb-3 px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                  {post.title}
                </h3>
              )}
            </div>

            {/* Action Buttons (ĐÃ CẬP NHẬT) */}
            <PostActions
              post={post}
              isEditing={isEditing}
              isLoading={isLoading}
              startEditPost={startEditPost}
              saveEditPost={saveEditPost}
              setEditingPostId={setEditingPostId}
              deletePost={deletePost}
              deleteConfirm={deleteConfirm}
              setDeleteConfirm={setDeleteConfirm}
            />
          </div>

          {/* Post Content */}
          <div className="mb-4">
            {isEditing ? (
              <textarea
                value={editingPostData.body}
                onChange={(e) =>
                  setEditingPostData((prev) => ({
                    ...prev,
                    body: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="6"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap line-clamp-6">
                {post.body}
              </p>
            )}

            {/* Media (Simplified for design) */}
            {post.media && post.media.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {post.media.slice(0, 4).map((media, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-gray-100 rounded-lg overflow-hidden"
                  >
                    {/* Placeholder image/video icon */}
                    <img
                      src={
                        media.url ||
                        "https://via.placeholder.com/300x150/E0E0E0/999999?text=Media"
                      }
                      alt={`media-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interaction Bar */}
          {/* Interaction Bar */}
          <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleLikePost(post.id)}
                disabled={isLoading}
                className={`flex items-center gap-2 transition-all px-3 py-2 rounded-lg font-medium ${
                  likedPosts.has(post.id)
                    ? "text-red-500 bg-red-50 hover:bg-red-100"
                    : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                } disabled:opacity-50`}
                title="Thích bài viết"
              >
                <FontAwesomeIcon icon={faHeart} className="text-lg" />
                <span>
                  {Array.isArray(post.likes)
                    ? post.likes.length
                    : post.likes_count || 0}{" "}
                  Thích
                </span>
              </button>
              <button
                onClick={() => {
                  setShowCommentsModal(post.id);
                  if (!comments[post.id]) fetchComments(post.id);
                }}
                className="flex items-center gap-2 hover:text-blue-500 hover:bg-blue-50 transition-all px-3 py-2 rounded-lg text-gray-600 font-medium"
                title="Xem bình luận"
              >
                <FontAwesomeIcon icon={faComment} className="text-lg" />
                <span>
                  {Array.isArray(comments[post.id])
                    ? comments[post.id].length
                    : post.comments_count || 0}{" "}
                  Bình luận
                </span>
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

// ✅ LOGIC VÀ UI CHO NÚT HÀNH ĐỘNG VÀ XÁC NHẬN XÓA
const PostActions = ({
  post,
  isEditing,
  isLoading,
  startEditPost,
  setEditingPostId,
  deletePost,
  deleteConfirm,
  setDeleteConfirm,
  saveEditPost,
}) => {
  const isConfirmingDelete = deleteConfirm.postId === post.id;
  const isConfirmTextValid =
    deleteConfirm.confirmText.toLowerCase() === "delete";

  if (isLoading) {
    return (
      <div className="p-2">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-xl text-gray-400 animate-spin"
        />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => saveEditPost(post.id)}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          title="Lưu chỉnh sửa"
        >
          <FontAwesomeIcon icon={faCheck} /> Lưu
        </button>
        <button
          onClick={() => setEditingPostId(null)}
          className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors text-sm"
          title="Hủy"
        >
          <FontAwesomeIcon icon={faTimes} /> Hủy
        </button>
      </div>
    );
  }

  if (isConfirmingDelete) {
    return (
      <div className="flex flex-col gap-2 p-3 rounded-lg border-2 border-red-500 bg-red-50 w-full max-w-xs ml-auto">
        <p className="text-xs font-bold text-red-700">
          Gõ "DELETE" để xác nhận:
        </p>
        <input
          type="text"
          value={deleteConfirm.confirmText}
          onChange={(e) =>
            setDeleteConfirm((prev) => ({
              ...prev,
              confirmText: e.target.value,
            }))
          }
          className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm font-mono focus:border-red-500 focus:ring-red-500"
        />
        <div className="flex justify-end gap-2 mt-1">
          <button
            onClick={() => setDeleteConfirm({ postId: null, confirmText: "" })}
            className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors text-xs"
            title="Hủy xóa"
          >
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </button>
          <button
            onClick={() => deletePost(post.id)}
            disabled={!isConfirmTextValid}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 text-xs"
            title="Xác nhận xóa"
          >
            <FontAwesomeIcon icon={faTrash} /> Xóa
          </button>
        </div>
      </div>
    );
  }

  // Default actions: Sửa và Xóa
  return (
    <div className="flex gap-2 flex-shrink-0">
      <button
        onClick={() => startEditPost(post)}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
        title="Chỉnh sửa bài viết"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        // Khi bấm Xóa, chuyển sang chế độ xác nhận
        onClick={() => setDeleteConfirm({ postId: post.id, confirmText: "" })}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-red-600 rounded-lg transition-colors text-sm"
        title="Xóa bài viết"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

const StatItem = ({ icon, label, value, color }) => (
  <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center">
    <FontAwesomeIcon icon={icon} className={`text-2xl mb-2 ${color}`} />
    <p className="text-xl font-extrabold text-gray-900">{value}</p>
    <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
  </div>
);

const QuickInfoItem = ({
  label,
  value,
  icon,
  valueColor = "text-gray-900",
  onClick,
  isButton = false,
}) => (
  <div className="flex justify-between items-center text-sm">
    <div className="flex items-center gap-3 text-gray-500">
      <FontAwesomeIcon icon={icon} className="w-5 h-5 text-[#FFCE23]" />
      <span className="font-medium">{label}:</span>
    </div>
    {isButton ? (
      <button
        onClick={onClick}
        className={`font-semibold ${valueColor} hover:underline transition-colors`}
      >
        {value}
      </button>
    ) : (
      <span className={`font-semibold ${valueColor}`}>{value}</span>
    )}
  </div>
);

const ProjectEditModal = ({
  selectedProject,
  editProjectData,
  setEditProjectData,
  updateProjectInfo,
  setEditingProject,
  logoPreview,
  handleLogoChange,
  bannerPreview,
  handleBannerChange,
  uploadingLogo,
  uploadingBanner,
  stageMap,
  normalizeImageUrl,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-xl">
        <h3 className="text-2xl font-bold text-gray-900">
          Chỉnh sửa Hồ sơ: {selectedProject.name}
        </h3>
        <button
          onClick={() => setEditingProject(false)}
          className="text-gray-500 hover:text-red-600 text-xl"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>

      <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
        {/* Images Upload */}
        <div className="border p-5 rounded-xl bg-gray-50">
          <h4 className="font-bold text-lg mb-4 text-gray-800">
            Ảnh đại diện & Ảnh bìa
          </h4>
          <div className="space-y-6">
            {/* Banner */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Ảnh bìa (Banner)
              </label>
              <ImageUploadField
                id="banner"
                preview={
                  bannerPreview ||
                  normalizeImageUrl(
                    selectedProject.team_image_url ||
                      selectedProject.team_image?.url
                  )
                }
                onChange={handleBannerChange}
                isUploading={uploadingBanner}
                widthClass="w-full h-48"
              />
              <p className="text-xs text-gray-500 mt-2">Ảnh bìa hiện tại/mới</p>
            </div>
            {/* Logo */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Logo dự án
              </label>
              <ImageUploadField
                id="logo"
                preview={
                  logoPreview || normalizeImageUrl(selectedProject.logo_url)
                }
                onChange={handleLogoChange}
                isUploading={uploadingLogo}
                widthClass="w-32 h-32"
                isRound
              />
              <p className="text-xs text-gray-500 mt-2">
                Kích thước gợi ý: Vuông (300x300px)
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Tên dự án"
            name="name"
            data={editProjectData}
            setData={setEditProjectData}
            required
          />
          <InputField
            label="Tagline (Slogan)"
            name="tagline"
            data={editProjectData}
            setData={setEditProjectData}
          />
          <SelectField
            label="Giai đoạn"
            name="stage"
            data={editProjectData}
            setData={setEditProjectData}
            options={Object.entries(stageMap).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
          />
          <InputField
            label="Ngành"
            name="industry"
            data={editProjectData}
            setData={setEditProjectData}
          />
          <div className="md:col-span-2">
            <TextAreaField
              label="Mô tả"
              name="description"
              data={editProjectData}
              setData={setEditProjectData}
              rows={3}
              required
              autoResize
            />
          </div>
        </div>

        {/* Business & Market Section */}
        <div className="space-y-6 border-t pt-6 border-gray-200">
          <h4 className="font-bold text-lg text-gray-800">
            Chi tiết Kinh doanh & Thị trường
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextAreaField
              label="Vấn đề giải quyết"
              name="pain_point"
              data={editProjectData}
              setData={setEditProjectData}
              rows={2}
              autoResize
            />
            <TextAreaField
              label="Giải pháp của bạn"
              name="solution"
              data={editProjectData}
              setData={setEditProjectData}
              rows={2}
              autoResize
            />
            <TextAreaField
              label="Sản phẩm/Dịch vụ"
              name="product"
              data={editProjectData}
              setData={setEditProjectData}
              rows={2}
              autoResize
            />
            <TextAreaField
              label="Đối tượng khách hàng"
              name="customer_segment"
              data={editProjectData}
              setData={setEditProjectData}
              rows={2}
              autoResize
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Kích thước thị trường"
              name="market_size"
              data={editProjectData}
              setData={setEditProjectData}
              placeholder="VD: 100 tỷ USD"
            />
            <InputField
              label="Địa bàn hoạt động"
              name="market_area"
              data={editProjectData}
              setData={setEditProjectData}
              placeholder="VD: Toàn Việt Nam"
            />
            <InputField
              label="Website/URL"
              name="website_url"
              data={editProjectData}
              setData={setEditProjectData}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t bg-gray-50 flex justify-end gap-4 rounded-b-xl">
        <button
          onClick={() => setEditingProject(false)}
          className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
        </button>
        <button
          onClick={updateProjectInfo}
          disabled={
            uploadingLogo ||
            uploadingBanner ||
            !editProjectData.name ||
            !editProjectData.description
          }
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {uploadingLogo || uploadingBanner ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )}
          Lưu Cập Nhật
        </button>
      </div>
    </div>
  </div>
);

const ImageUploadField = ({
  id,
  preview,
  onChange,
  isUploading,
  widthClass,
  isRound = false,
}) => (
  <div className="relative group inline-block">
    <div
      className={`${widthClass} ${
        isRound ? "rounded-full" : "rounded-xl"
      } bg-gray-100 overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center`}
    >
      <img
        src={
          preview || "https://via.placeholder.com/150/E0E0E0/999999?text=Upload"
        }
        alt="Preview"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      <label
        htmlFor={id}
        className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        {isUploading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-white text-2xl animate-spin"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUpload}
            className="text-white text-2xl mb-1"
          />
        )}
        <p className="text-white text-xs mt-1">Chọn ảnh</p>
      </label>
    </div>
    <input
      type="file"
      id={id}
      accept="image/*"
      onChange={onChange}
      disabled={isUploading}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />
  </div>
);

const InputField = ({
  label,
  name,
  data,
  setData,
  placeholder,
  required = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold mb-2 text-gray-700"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      id={name}
      value={data[name] || ""}
      onChange={(e) => setData((prev) => ({ ...prev, [name]: e.target.value }))}
      placeholder={placeholder || ""}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      required={required}
    />
  </div>
);

const TextAreaField = ({
  label,
  name,
  data,
  setData,
  rows,
  required = false,
  autoResize = false,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [data[name]]);

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold mb-2 text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        ref={textareaRef}
        id={name}
        value={data[name] || ""}
        onChange={(e) =>
          setData((prev) => ({ ...prev, [name]: e.target.value }))
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
        style={{ overflow: "hidden" }}
        rows={rows}
        required={required}
      />
    </div>
  );
};

const SelectField = ({
  label,
  name,
  data,
  setData,
  options,
  required = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold mb-2 text-gray-700"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      value={data[name] || ""}
      onChange={(e) => setData((prev) => ({ ...prev, [name]: e.target.value }))}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const StatusChangeModal = ({
  selectedProject,
  setStatusModalProjectId,
  updateProjectStatus,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
      <h3 className="text-xl font-bold text-gray-900 mb-5 border-b pb-3">
        Thay đổi trạng thái
      </h3>
      <div className="space-y-4">
        <StatusOption
          status="Công bố"
          description="Hiển thị trên nền tảng"
          color="bg-green-500"
          onClick={() => updateProjectStatus("Công bố")}
          isActive={selectedProject?.status === "Công bố"}
        />
        <StatusOption
          status="Ẩn"
          description="Chỉ mình tôi thấy"
          color="bg-gray-400"
          onClick={() => updateProjectStatus("Ẩn")}
          isActive={selectedProject?.status === "Ẩn"}
        />
      </div>
      <button
        onClick={() => setStatusModalProjectId(null)}
        className="w-full mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
      >
        Đóng
      </button>
    </div>
  </div>
);

const StatusOption = ({ status, description, color, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 bg-gray-50 border rounded-xl transition-all text-left ${
      isActive
        ? "border-blue-500 ring-2 ring-blue-100"
        : "border-gray-200 hover:bg-gray-100"
    }`}
  >
    <div className={`w-4 h-4 ${color} rounded-full flex-shrink-0`}></div>
    <div>
      <p className="font-bold text-gray-900">
        {status}{" "}
        {isActive && <span className="text-blue-500 text-xs">(Hiện tại)</span>}
      </p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </button>
);

const VisibilityChangeModal = ({
  postId,
  setVisibilityModalPostId,
  updatePostVisibility,
  postLoadingStates,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
      <h3 className="text-xl font-bold text-gray-900 mb-5 border-b pb-3">
        Thay đổi hiển thị
      </h3>
      <div className="space-y-4">
        <VisibilityOption
          postId={postId}
          visibility="public"
          icon={faEye}
          text="Công khai"
          desc="Mọi người đều có thể xem"
          updatePostVisibility={updatePostVisibility}
          postLoadingStates={postLoadingStates}
        />
        <VisibilityOption
          postId={postId}
          visibility="friends"
          icon={faUsers}
          text="Bạn bè"
          desc="Chỉ bạn bè có thể xem"
          updatePostVisibility={updatePostVisibility}
          postLoadingStates={postLoadingStates}
        />
        <VisibilityOption
          postId={postId}
          visibility="private"
          icon={faEyeSlash}
          text="Riêng tư"
          desc="Chỉ bạn có thể xem"
          updatePostVisibility={updatePostVisibility}
          postLoadingStates={postLoadingStates}
        />
      </div>
      <button
        onClick={() => setVisibilityModalPostId(null)}
        className="w-full mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
      >
        Đóng
      </button>
    </div>
  </div>
);

const VisibilityOption = ({
  postId,
  visibility,
  icon,
  text,
  desc,
  updatePostVisibility,
  postLoadingStates,
}) => (
  <button
    onClick={() => updatePostVisibility(postId, visibility)}
    disabled={postLoadingStates[postId]}
    className="w-full flex items-center gap-4 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors disabled:opacity-50 text-left"
  >
    <FontAwesomeIcon
      icon={icon}
      className="text-gray-600 text-xl flex-shrink-0"
    />
    <div>
      <p className="font-bold text-gray-900">{text}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
    {postLoadingStates[postId] && (
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin text-blue-500 ml-auto"
      />
    )}
  </button>
);

const CommentsModal = ({
  showCommentsModal,
  comments,
  fetchComments,
  addComment,
  commentText,
  setCommentText,
  postLoadingStates,
  formatDate,
  user,
  setShowCommentsModal,
}) => {
  useEffect(() => {
    if (showCommentsModal && !comments[showCommentsModal]) {
      fetchComments(showCommentsModal);
    }
  }, [showCommentsModal, comments, fetchComments]);

  const commentList = comments[showCommentsModal] || [];
  const isLoading = postLoadingStates[showCommentsModal];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col h-[80vh]">
        <div className="sticky top-0 bg-white border-b p-5 flex items-center justify-between rounded-t-xl">
          <h3 className="text-xl font-bold text-gray-900">
            Bình luận ({commentList.length})
          </h3>
          <button
            onClick={() => setShowCommentsModal(null)}
            className="text-gray-500 hover:text-red-600 text-lg"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {isLoading && commentList.length === 0 ? (
            <div className="text-center py-10">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-2xl text-blue-500 animate-spin"
              />
            </div>
          ) : commentList.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              Hãy là người đầu tiên bình luận!
            </p>
          ) : (
            commentList.map((comment, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-600 text-xs"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">
                    {comment.author_name ||
                      comment.author?.full_name ||
                      "Người dùng"}
                  </p>
                  <p className="text-sm text-gray-700 mt-0.5 break-words">
                    {comment.body}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Input */}
        <div className="sticky bottom-0 bg-white border-t p-5 rounded-b-xl">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Viết bình luận..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && addComment(showCommentsModal)
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={() => addComment(showCommentsModal)}
              disabled={isLoading || !commentText.trim()}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                "Gửi"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToastNotification = ({ toast }) => {
  const bgColor =
    toast.type === "error"
      ? "bg-red-600"
      : toast.type === "success"
      ? "bg-green-600"
      : toast.type === "warning"
      ? "bg-yellow-600"
      : "bg-blue-600";

  return (
    <div
      className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg text-white font-semibold shadow-2xl transition-opacity duration-300 z-[100] ${bgColor}`}
    >
      {toast.message}
    </div>
  );
};
