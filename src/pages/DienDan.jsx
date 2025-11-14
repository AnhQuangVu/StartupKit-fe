import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faEllipsisH,
  faImage,
  faSmile,
  faGlobe,
  faEdit,
  faTrash,
  faX,
  faVideo,
  faFileAlt,
  faBriefcase,
  faMapMarkerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Dữ liệu mẫu fix cứng
const MOCK_USER = {
  id: 1,
  name: "Nguyễn Văn A",
  avatar: "https://i.pravatar.cc/150?img=1",
  cover: "https://picsum.photos/800/300?random=cover",
  role: "founder",
  bio: "Founder & CEO tại StartupXYZ",
  location: "Hà Nội, Việt Nam",
};

const MOCK_POSTS = [
  {
    id: 1,
    author_id: 1,
    author_name: "Nguyễn Văn A",
    author_avatar: "https://i.pravatar.cc/150?img=1",
    author_role: "founder",
    content:
      "Hôm nay thật là một ngày tuyệt vời! Dự án của chúng tôi đã đạt được nhiều tiến triển đáng kể. Cảm ơn cả team đã cố gắng! 🎉",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes_count: 24,
    comments_count: 5,
    visibility: "public",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    id: 2,
    author_id: 2,
    author_name: "Trần Thị B",
    author_avatar: "https://i.pravatar.cc/150?img=2",
    author_role: "mentor",
    content:
      "Ai có kinh nghiệm về React hooks không? Mình đang gặp vấn đề với useEffect. Cần support gấp! 😅",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes_count: 12,
    comments_count: 8,
    visibility: "public",
  },
  {
    id: 3,
    author_id: 3,
    author_name: "Lê Văn C",
    author_avatar: "https://i.pravatar.cc/150?img=3",
    author_role: "investor",
    content:
      "Meeting vừa rồi thật productive! Chúng ta đã có nhiều ý tưởng hay cho sprint tiếp theo.",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likes_count: 45,
    comments_count: 12,
    visibility: "public",
    image: "https://picsum.photos/600/400?random=2",
  },
];

const MOCK_COMMENTS = {
  1: [
    {
      id: 1,
      author_name: "Phạm Thị D",
      author_avatar: "https://i.pravatar.cc/150?img=4",
      author_role: "mentor",
      content: "Chúc mừng team! 🎊",
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: 2,
      author_name: "Hoàng Văn E",
      author_avatar: "https://i.pravatar.cc/150?img=5",
      author_role: "investor",
      content: "Tuyệt vời quá! Tiếp tục phát huy nhé!",
      created_at: new Date(Date.now() - 30 * 60 * 1000),
    },
  ],
};

const MOCK_NEWS = [
  {
    id: 1,
    title: "Startup Việt gọi vốn thành công 10 triệu USD",
    source: "VnExpress",
    time: "2 giờ trước",
    image: "https://picsum.photos/100/100?random=news1",
  },
  {
    id: 2,
    title: "Công nghệ AI đang thay đổi ngành giáo dục",
    source: "TechCrunch",
    time: "5 giờ trước",
    image: "https://picsum.photos/100/100?random=news2",
  },
  {
    id: 3,
    title: "Xu hướng đầu tư vào Fintech 2024",
    source: "Forbes",
    time: "1 ngày trước",
    image: "https://picsum.photos/100/100?random=news3",
  },
  {
    id: 4,
    title: "Top 10 startup nổi bật năm 2024",
    source: "VnExpress",
    time: "3 giờ trước",
    image: "https://picsum.photos/100/100?random=news4",
  },
  {
    id: 5,
    title: "Cách xây dựng team hiệu quả",
    source: "Harvard Business",
    time: "6 giờ trước",
    image: "https://picsum.photos/100/100?random=news5",
  },
];

const MOCK_ADS = [
  {
    id: 1,
    title: "Khóa học Startup 2024",
    description: "Học cách xây dựng startup từ A-Z",
    sponsor: "StartupSchool.vn",
    image: "https://picsum.photos/300/150?random=ad1",
  },
  {
    id: 2,
    title: "Gọi vốn thành công",
    description: "Kết nối với nhà đầu tư hàng đầu",
    sponsor: "InvestorHub",
    image: "https://picsum.photos/300/150?random=ad2",
  },
  {
    id: 3,
    title: "Công cụ quản lý dự án",
    description: "Tối ưu hiệu suất làm việc nhóm",
    sponsor: "ProjectPro",
    image: "https://picsum.photos/300/150?random=ad3",
  },
  {
    id: 4,
    title: "Marketing cho Startup",
    description: "Chiến lược marketing hiệu quả",
    sponsor: "MarketingPro",
    image: "https://picsum.photos/300/150?random=ad4",
  },
  {
    id: 5,
    title: "Tư vấn pháp lý",
    description: "Giải pháp pháp lý toàn diện",
    sponsor: "LegalTech",
    image: "https://picsum.photos/300/150?random=ad5",
  },
];

// Role Badge Component
const RoleBadge = ({ role }) => {
  const roleConfig = {
    founder: {
      label: "Founder",
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: "🚀",
    },
    mentor: {
      label: "Mentor",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: "👨‍🏫",
    },
    investor: {
      label: "Investor",
      color: "bg-green-100 text-green-700 border-green-200",
      icon: "💼",
    },
  };

  const config = roleConfig[role] || roleConfig.founder;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

// Create Post Dialog Component
const CreatePostDialog = ({ isOpen, onClose, onSubmit, user }) => {
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (postContent.trim() || postImage) {
      onSubmit({
        content: postContent,
        image: imagePreview,
      });
      setPostContent("");
      setPostImage(null);
      setImagePreview(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Tạo bài viết</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FontAwesomeIcon icon={faX} className="text-xl" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <div className="flex items-center gap-2">
                <RoleBadge role={user.role} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={`${user.name} ơi, bạn đang nghĩ gì thế?`}
            className="w-full px-3 py-2 text-[15px] border-none outline-none resize-none min-h-[120px]"
            autoFocus
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full rounded-lg"
              />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setPostImage(null);
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}
        </div>

        {/* Add to post */}
        <div className="px-4 py-3 border-t border-b">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              Thêm vào bài viết
            </span>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-green-500 text-xl"
                />
              </label>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FontAwesomeIcon
                  icon={faVideo}
                  className="text-red-500 text-xl"
                />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FontAwesomeIcon
                  icon={faSmile}
                  className="text-yellow-500 text-xl"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-4">
          <button
            onClick={handleSubmit}
            disabled={!postContent.trim() && !postImage}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DienDan() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [showCommentsModal, setShowCommentsModal] = useState(null);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [commentText, setCommentText] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [showMenu, setShowMenu] = useState(null);
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };

  const createPost = ({ content, image }) => {
    const newPost = {
      id: Date.now(),
      author_id: MOCK_USER.id,
      author_name: MOCK_USER.name,
      author_avatar: MOCK_USER.avatar,
      author_role: MOCK_USER.role,
      content: content,
      created_at: new Date(),
      likes_count: 0,
      comments_count: 0,
      visibility: "public",
      image: image,
    };

    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              likes_count: likedPosts.has(postId)
                ? p.likes_count - 1
                : p.likes_count + 1,
            }
          : p
      )
    );

    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const addComment = (postId) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author_name: MOCK_USER.name,
      author_avatar: MOCK_USER.avatar,
      author_role: MOCK_USER.role,
      content: commentText,
      created_at: new Date(),
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts(
      posts.map((p) =>
        p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p
      )
    );

    setCommentText("");
  };

  const deletePost = (postId) => {
    setPosts(posts.filter((p) => p.id !== postId));
    setShowMenu(null);
  };

  const updatePost = (postId) => {
    setPosts(
      posts.map((p) =>
        p.id === postId ? { ...p, content: editingContent } : p
      )
    );
    setEditingPostId(null);
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      {/* Main Content - 3 Column Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Profile */}
          <aside className="lg:col-span-3 space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6">
              {/* Cover Image - Clickable */}
              <div
                onClick={goToProfile}
                className="relative h-24 bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer hover:opacity-95 transition-opacity"
              >
                <img
                  src={MOCK_USER.cover}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Avatar - Clickable */}
              <div className="relative px-4 pb-4">
                <div className="flex justify-center -mt-10 mb-2">
                  <div
                    onClick={goToProfile}
                    className="relative cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <img
                      src={MOCK_USER.avatar}
                      alt={MOCK_USER.name}
                      className="w-20 h-20 rounded-full border-4 border-white object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3
                    onClick={goToProfile}
                    className="font-bold text-gray-900 text-lg mb-1 cursor-pointer hover:underline"
                  >
                    {MOCK_USER.name}
                  </h3>
                  <div className="flex justify-center mb-2">
                    <RoleBadge role={MOCK_USER.role} />
                  </div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center justify-center gap-1">
                    <FontAwesomeIcon icon={faBriefcase} className="text-xs" />
                    {MOCK_USER.bio}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-xs"
                    />
                    {MOCK_USER.location}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-2 text-center">
                  <div>
                    <p className="text-xl font-bold text-gray-900">142</p>
                    <p className="text-xs text-gray-500">Bài viết</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">1.2K</p>
                    <p className="text-xs text-gray-500">Kết nối</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Center - Feed */}
          <div className="lg:col-span-6 space-y-4">
            {/* Create Post Trigger */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={MOCK_USER.avatar}
                  alt={MOCK_USER.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <button
                  onClick={() => setShowCreatePostDialog(true)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-left text-gray-500 transition-colors"
                >
                  Bắt đầu bài đăng
                </button>
              </div>

              <div className="flex items-center justify-around pt-3 border-t">
                <button
                  onClick={() => setShowCreatePostDialog(true)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center"
                >
                  <FontAwesomeIcon icon={faVideo} className="text-red-500" />
                  <span className="text-sm font-semibold text-gray-600">
                    Video
                  </span>
                </button>
                <button
                  onClick={() => setShowCreatePostDialog(true)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center"
                >
                  <FontAwesomeIcon icon={faImage} className="text-green-500" />
                  <span className="text-sm font-semibold text-gray-600">
                    Ảnh
                  </span>
                </button>
                <button
                  onClick={() => setShowCreatePostDialog(true)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center"
                >
                  <FontAwesomeIcon icon={faFileAlt} className="text-blue-500" />
                  <span className="text-sm font-semibold text-gray-600">
                    Viết bài
                  </span>
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Post Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author_avatar}
                          alt={post.author_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">
                              {post.author_name}
                            </p>
                            <RoleBadge role={post.author_role} />
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span>{formatDate(post.created_at)}</span>
                            <span>•</span>
                            <FontAwesomeIcon
                              icon={faGlobe}
                              className="text-gray-500"
                            />
                          </div>
                        </div>
                      </div>

                      {post.author_id === MOCK_USER.id && (
                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowMenu(showMenu === post.id ? null : post.id)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faEllipsisH}
                              className="text-gray-600"
                            />
                          </button>

                          {showMenu === post.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowMenu(null)}
                              />
                              <div className="absolute right-0 top-10 z-20 bg-white border rounded-lg shadow-lg py-2 w-48">
                                <button
                                  onClick={() => {
                                    setEditingPostId(post.id);
                                    setEditingContent(post.content);
                                    setShowMenu(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3"
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                  Chỉnh sửa bài viết
                                </button>
                                <button
                                  onClick={() => deletePost(post.id)}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 text-red-600"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                  Xóa bài viết
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Post Content */}
                    {editingPostId === post.id ? (
                      <div className="space-y-2 mb-3">
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updatePost(post.id)}
                            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditingPostId(null)}
                            className="px-4 py-1.5 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-800 text-[15px] leading-relaxed mb-3">
                        {post.content}
                      </p>
                    )}

                    {/* Post Image */}
                    {post.image && editingPostId !== post.id && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full rounded-lg mb-3 cursor-pointer hover:opacity-95 transition-opacity"
                      />
                    )}
                  </div>

                  {/* Stats */}
                  <div className="px-4 pb-2 flex items-center justify-between text-sm text-gray-500 border-b">
                    <button className="hover:underline">
                      {post.likes_count > 0 && (
                        <>
                          <span className="text-red-500">❤️</span>{" "}
                          {post.likes_count}
                        </>
                      )}
                    </button>
                    <button className="hover:underline">
                      {post.comments_count > 0 &&
                        `${post.comments_count} bình luận`}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="px-2 py-1 flex items-center justify-around">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors ${
                        likedPosts.has(post.id)
                          ? "text-red-500 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      <span className="text-[15px] font-medium">Thích</span>
                    </button>

                    <button
                      onClick={() => setShowCommentsModal(post.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                    >
                      <FontAwesomeIcon icon={faComment} />
                      <span className="text-[15px] font-medium">Bình luận</span>
                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                      <FontAwesomeIcon icon={faShare} />
                      <span className="text-[15px] font-medium">Chia sẻ</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - News & Ads (Scrollable) */}
          <aside className="lg:col-span-3 space-y-4">
            {/* News Section */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                📰 Tin tức nổi bật
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {MOCK_NEWS.map((news) => (
                  <div
                    key={news.id}
                    className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                        {news.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advertisement Section */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  💼 Được tài trợ
                </h3>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {MOCK_ADS.map((ad) => (
                  <div
                    key={ad.id}
                    className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors border-b last:border-b-0"
                  >
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                        {ad.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1 line-clamp-1">
                        {ad.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {ad.sponsor}
                        </span>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
                          Xem →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Create Post Dialog */}
      <CreatePostDialog
        isOpen={showCreatePostDialog}
        onClose={() => setShowCreatePostDialog(false)}
        onSubmit={createPost}
        user={MOCK_USER}
      />

      {/* Comments Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[85vh]">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Bình luận ({comments[showCommentsModal]?.length || 0})
              </h3>
              <button
                onClick={() => setShowCommentsModal(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faX} className="text-xl" />
              </button>
            </div>

            <div className="flex-1 p-5 space-y-4 overflow-y-auto">
              {!comments[showCommentsModal] ||
              comments[showCommentsModal].length === 0 ? (
                <p className="text-gray-500 text-center py-12">
                  Hãy là người đầu tiên bình luận! 💬
                </p>
              ) : (
                comments[showCommentsModal].map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <img
                      src={comment.author_avatar}
                      alt={comment.author_name}
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-2xl px-4 py-2.5">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {comment.author_name}
                          </p>
                          <RoleBadge role={comment.author_role} />
                        </div>
                        <p className="text-[15px] text-gray-800">
                          {comment.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 px-3 mt-1.5">
                        <button className="text-xs text-gray-500 hover:underline font-semibold">
                          Thích
                        </button>
                        <button className="text-xs text-gray-500 hover:underline font-semibold">
                          Trả lời
                        </button>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-5 border-t">
              <div className="flex gap-3">
                <img
                  src={MOCK_USER.avatar}
                  alt={MOCK_USER.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Viết bình luận..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && addComment(showCommentsModal)
                    }
                    className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                  />
                  <button
                    onClick={() => addComment(showCommentsModal)}
                    disabled={!commentText.trim()}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
