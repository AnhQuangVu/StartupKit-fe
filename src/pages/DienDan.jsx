import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faComment, faSpinner, faEye, faEyeSlash, faEdit, faTrash, 
  faX, faCheck, faTimes, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { API_BASE, authHeaders } from '../config/api';
import { useAuth } from '../context/AuthContext';

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
    }
  }, [selectedProject]);

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      
      // API công khai - không cần token
      const response = await fetch(`${API_BASE}/projects/users/${user.id}/projects?skip=0&limit=50`);

      if (!response.ok) {
        console.error('Response status:', response.status);
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error('Không thể lấy danh sách hồ sơ');
      }
      
      const data = await response.json();
      const projectList = Array.isArray(data) ? data : [];
      
      // Sort theo created_at mới nhất phía trước
      const sortedProjects = projectList.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
      
      setProjects(sortedProjects || []);
    } catch (error) {
      console.error('Fetch user projects error:', error);
      showToast('Lỗi khi tải danh sách hồ sơ', 'error');
    } finally {
      setLoading(false);
    }
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
      const data = await response.json();
      setPosts(data || []);
    } catch (error) {
      console.error('Fetch posts error:', error);
      showToast('Lỗi khi tải bài đăng', 'error');
    } finally {
      setLoading(false);
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
    setEditingPostData({ title: post.title, body: post.body });
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

  // Fetch comments
  const fetchComments = async (postId) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE}/projects/posts/${postId}/comments`, {
        headers: authHeaders(token),
      });

      if (!response.ok) throw new Error('Không thể lấy bình luận');
      
      const data = await response.json();
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
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      
      setPostLoadingStates(prev => ({ ...prev, [postId]: true }));

      const response = await fetch(`${API_BASE}/projects/posts/${postId}/comments`, {
        method: 'POST',
        headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentText }),
      });

      if (!response.ok) throw new Error('Không thể thêm bình luận');
      
      const newComment = await response.json();
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
                    {project.logo_url && (
                      <img src={project.logo_url} alt={project.name} 
                           className="w-full h-32 object-cover rounded-lg mb-4" />
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>📝 {project.posts_count || 0} bài</span>
                      <span>👥 {project.followers_count || 0} theo dõi</span>
                    </div>
                    <button className="mt-4 w-full px-4 py-2 bg-[#FFCE23] hover:bg-[#FFE066] text-black font-semibold rounded-lg transition-colors">
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
            {/* Back Button & Project Header */}
            <div className="mb-6 flex items-center justify-between">
              <button onClick={() => {
                setSelectedProject(null);
                setPosts([]);
                setEditingPostId(null);
                setShowCommentsModal(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors">
                <FontAwesomeIcon icon={faArrowLeft} />
                Quay lại
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>
            </div>

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
                  <div key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {editingPostId === post.id ? (
                          <input
                            type="text"
                            value={editingPostData.title}
                            onChange={(e) => setEditingPostData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full text-xl font-bold text-gray-900 mb-2 px-3 py-1 border border-[#FFCE23] rounded-lg"
                          />
                        ) : (
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                        )}
                        <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1">
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
                          </span>
                          <span>•</span>
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {editingPostId === post.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEditPost(post.id)}
                            disabled={postLoadingStates[post.id]}
                            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            onClick={() => setEditingPostId(null)}
                            className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      ) : deleteConfirmPostId === post.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => deletePost(post.id)}
                            disabled={postLoadingStates[post.id]}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                          >
                            <FontAwesomeIcon icon={faCheck} /> Xác nhận
                          </button>
                          <button
                            onClick={() => setDeleteConfirmPostId(null)}
                            className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <FontAwesomeIcon icon={faTimes} /> Hủy
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditPost(post)}
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <FontAwesomeIcon icon={faEdit} /> Sửa
                          </button>
                          <button
                            onClick={() => setDeleteConfirmPostId(post.id)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <FontAwesomeIcon icon={faTrash} /> Xóa
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Post Content */}
                    {editingPostId === post.id ? (
                      <textarea
                        value={editingPostData.body}
                        onChange={(e) => setEditingPostData(prev => ({ ...prev, body: e.target.value }))}
                        className="w-full px-3 py-2 border border-[#FFCE23] rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFCE23]"
                        rows="4"
                      />
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
                    <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                      <div className="flex items-center gap-6 flex-wrap">
                        <button
                          onClick={() => toggleLikePost(post.id)}
                          disabled={postLoadingStates[post.id]}
                          className={`flex items-center gap-2 transition-colors ${
                            likedPosts.has(post.id) ? 'text-red-500 font-semibold' : 'hover:text-red-500'
                          }`}
                        >
                          <FontAwesomeIcon icon={faHeart} className="text-lg" />
                          <span>{post.likes_count || 0}</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowCommentsModal(post.id);
                            if (!comments[post.id]) {
                              fetchComments(post.id);
                            }
                          }}
                          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                        >
                          <FontAwesomeIcon icon={faComment} />
                          <span>{(comments[post.id] || []).length}</span>
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
                <p className="text-gray-500 text-center">Chưa có bình luận nào</p>
              ) : (
                (comments[showCommentsModal] || []).map((comment, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">{comment.author_id}</p>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(comment.created_at)}</p>
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