import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart, faComment, faUsers, faLink, faMapPin, faCalendar,
  faSpinner, faArrowLeft, faShare, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  // Project & UI State
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Fetch project details
  useEffect(() => {
    if (projectId) {
      fetchProjectDetail();
      fetchProjectFollowers();
      fetchProjectMembers();
      fetchProjectPosts();
    }
  }, [projectId]);

  // Set SEO meta tags
  useEffect(() => {
    if (project) {
      document.title = `${project.name} - Startup Detail | StartupKit`;
      
      // Set meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', project.tagline || project.description || 'Project detail page');
      }
      
      // Set OG tags for social sharing
      const updateMetaTag = (property, content) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      updateMetaTag('og:title', project.name);
      updateMetaTag('og:description', project.tagline || project.description);
      updateMetaTag('og:image', project.logo_url || '');
      updateMetaTag('og:url', window.location.href);
      updateMetaTag('og:type', 'website');
      
      // Schema.org structured data
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: project.name,
        description: project.tagline || project.description,
        logo: project.logo_url,
        url: project.website_url,
      };
      
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(structuredData);
    }
  }, [project]);

  const fetchProjectDetail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`https://cors-anywhere.herokuapp.com/http://160.191.243.253:8003/projects/${projectId}`, { headers });
      if (!response.ok) throw new Error('Không thể lấy thông tin project');
      const data = await response.json();
      console.log('Project data:', data); // DEBUG
      setProject(data);
    } catch (error) {
      console.error('Fetch project error:', error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectFollowers = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE}/projects/${projectId}/followers`, { headers });
      if (response.ok) {
        const data = await response.json();
        setFollowers(Array.isArray(data) ? data : []);
        // Check if current user is following
        if (isLoggedIn && user?.id && Array.isArray(data)) {
          const userIsFollowing = data.some(f => f.id === user.id);
          setIsFollowing(userIsFollowing);
        }
      }
    } catch (error) {
      console.error('Fetch followers error:', error);
    }
  };

  const fetchProjectMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE}/projects/${projectId}/members`, { headers });
      if (response.ok) {
        const data = await response.json();
        setMembers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Fetch members error:', error);
    }
  };

  const fetchProjectPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE}/projects/${projectId}/posts?limit=50`, { headers });
      if (response.ok) {
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Fetch posts error:', error);
    }
  };

  const toggleFollow = async () => {
    if (!isLoggedIn) {
      navigate('/dang-nhap');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      const endpoint = `${API_BASE}/projects/${projectId}/follow`;
      const method = isFollowing ? 'DELETE' : 'POST';

      console.log('📤 Toggle follow:', { currentIsFollowing: isFollowing, method, endpoint });

      const response = await fetch(endpoint, { method, headers });
      console.log('📥 Follow response:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Follow failed with status:', response.status);
        console.error('❌ Error response:', errorText);
        return;
      }

      // Cập nhật trực tiếp trạng thái ngay lập tức - không gọi fetchProjectFollowers
      // vì nó sẽ kiểm tra server và có thể set lại trạng thái cũ
      const newFollowingState = !isFollowing;
      console.log('✅ Toggling isFollowing from', isFollowing, 'to', newFollowingState);
      setIsFollowing(newFollowingState);
      
      // Cập nhật followers count mà không reset isFollowing
      setTimeout(() => {
        console.log('🔄 Fetching followers count...');
        updateFollowersCount();
      }, 500);
    } catch (error) {
      console.error('Toggle follow error:', error);
    }
  };

  // Hàm này chỉ cập nhật followers count, không thay đổi isFollowing
  const updateFollowersCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE}/projects/${projectId}/followers`, { headers });
      if (response.ok) {
        const data = await response.json();
        setFollowers(Array.isArray(data) ? data : []);
        console.log('✅ Updated followers count:', data.length);
      }
    } catch (error) {
      console.error('Update followers count error:', error);
    }
  };

  const handleLikePost = async (postId) => {
    if (!isLoggedIn) {
      navigate('/dang-nhap');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      const response = await fetch(`${API_BASE}/projects/posts/${postId}/like`, {
        method: 'POST',
        headers
      });

      if (response.ok) {
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          if (newSet.has(postId)) {
            newSet.delete(postId);
          } else {
            newSet.add(postId);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.error('Like post error:', error);
    }
  };

  const handleAddComment = async (postId) => {
    if (!isLoggedIn || !newComment.trim()) {
      navigate('/dang-nhap');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      const response = await fetch(`${API_BASE}/projects/posts/${postId}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ text: newComment })
      });

      if (response.ok) {
        setNewComment('');
        // Refresh comments
        const commentsRes = await fetch(`${API_BASE}/projects/posts/${postId}/comments`);
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(prev => ({
            ...prev,
            [postId]: commentsData
          }));
        }
      }
    } catch (error) {
      console.error('Add comment error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar isLoggedIn={isLoggedIn} user={user} />
        <div className="flex items-center justify-center h-screen">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-[#FFCE23] animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar isLoggedIn={isLoggedIn} user={user} />
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project không tồn tại</h1>
          <button onClick={() => navigate(-1)} className="text-[#FFCE23] hover:underline flex items-center gap-2 mx-auto">
            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: project.name,
    description: project.tagline || project.description,
    logo: project.logo_url,
    url: project.website_url,
    sameAs: [project.website_url],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Sales'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar isLoggedIn={isLoggedIn} user={user} />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#FFCE23] transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
          </button>

          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            {/* Banner Image */}
            <div className="relative h-48 bg-gradient-to-r from-[#FFCE23] to-[#fdc142] overflow-hidden">
              {project.team_image_url || project.team_image?.url || project.banner_url ? (
                <img
                  src={project.team_image_url || project.team_image?.url || project.banner_url}
                  alt={`${project.name} banner`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}
              {project.logo_url && (
                <img
                  src={project.logo_url}
                  alt={project.name}
                  className="absolute bottom-2 left-4 w-20 h-20 rounded-lg shadow-lg object-cover border-4 border-white"
                />
              )}
            </div>

            <div className="p-4 pt-16">
              <div className="flex justify-between items-start gap-4 mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{project.name}</h1>
                  {project.tagline && (
                    <p className="text-base text-gray-600 mb-3">{project.tagline}</p>
                  )}
                  <div className="flex gap-2 mb-3">
                    {project.industry && (
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        {project.industry}
                      </span>
                    )}
                    {project.status === 'published' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        <FontAwesomeIcon icon={faCheckCircle} /> Đã công bố
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={toggleFollow}
                    className={`px-5 py-2 text-sm rounded-lg font-semibold transition ${
                      isFollowing
                        ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                        : 'bg-[#FFCE23] text-black hover:bg-[#fdc142]'
                    }`}
                  >
                    {isFollowing ? 'Bỏ theo dõi' : 'Theo dõi'}
                  </button>
                  <button className="px-3 py-2 text-sm bg-white border-2 border-gray-200 rounded-lg hover:border-[#FFCE23] transition">
                    <FontAwesomeIcon icon={faShare} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{followers.length}</div>
                  <div className="text-xs text-gray-600">Người theo dõi</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{members.length}</div>
                  <div className="text-xs text-gray-600">Thành viên</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{posts.length}</div>
                  <div className="text-xs text-gray-600">Bài đăng</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{project.capital_source || 'N/A'}</div>
                  <div className="text-xs text-gray-600">Vốn</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About Section */}
              {project.description && (
                <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">Về Dự Án</h2>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{project.description}</p>
                  {project.website_url && (
                    <a
                      href={project.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#FFCE23] hover:text-[#fdc142] font-semibold text-sm"
                    >
                      <FontAwesomeIcon icon={faLink} /> Truy cập website
                    </a>
                  )}
                </div>
              )}

              {/* Project Details Section */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Chi Tiết Dự Án</h2>
                <div className="space-y-3">
                  {project.pain_point && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600">Vấn Đề Cần Giải Quyết</div>
                      <p className="text-sm text-gray-700 mt-1">{project.pain_point}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600">Giải Pháp</div>
                      <p className="text-sm text-gray-700 mt-1">{project.solution}</p>
                    </div>
                  )}
                  {project.product && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600">Sản Phẩm</div>
                      <p className="text-sm text-gray-700 mt-1">{project.product}</p>
                    </div>
                  )}
                  {project.customer_segment && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600">Đối Tượng Khách Hàng</div>
                      <p className="text-sm text-gray-700 mt-1">{project.customer_segment}</p>
                    </div>
                  )}
                  {project.market_size && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600">Kích Thước Thị Trường</div>
                      <p className="text-sm text-gray-700 mt-1">{project.market_size}</p>
                    </div>
                  )}
                  {project.business_model && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600">Mô Hình Kinh Doanh</div>
                      <p className="text-sm text-gray-700 mt-1">{project.business_model}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Posts Section */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Bài Đăng ({posts.length})</h2>

                {posts.length === 0 ? (
                  <p className="text-gray-500 text-center py-6 text-sm">Chưa có bài đăng nào</p>
                ) : (
                  <div className="space-y-3">
                    {posts.map(post => (
                      <div key={post.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex gap-3 mb-3">
                          {post.author?.avatar && (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{post.author?.name || 'Unknown'}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(post.created_at).toLocaleDateString('vi-VN')}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-base font-semibold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{post.body}</p>

                        {/* Post Actions */}
                        <div className="flex gap-4 mb-3 text-sm">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center gap-1 transition ${
                              likedPosts.has(post.id)
                                ? 'text-red-500'
                                : 'text-gray-500 hover:text-red-500'
                            }`}
                          >
                            <FontAwesomeIcon icon={faHeart} /> Thích
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition">
                            <FontAwesomeIcon icon={faComment} /> Bình luận
                          </button>
                        </div>

                        {/* Comments Section */}
                        {comments[post.id] && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Bình Luận</h4>
                            {Array.isArray(comments[post.id]) && comments[post.id].map(comment => (
                              <div key={comment.id} className="mb-2 pb-2 border-b last:border-b-0">
                                <div className="flex gap-2 mb-1">
                                  {comment.author?.avatar && (
                                    <img
                                      src={comment.author.avatar}
                                      alt={comment.author.name}
                                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-xs text-gray-900">{comment.author?.name}</div>
                                    <p className="text-xs text-gray-700">{comment.text}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Comment */}
                        {isLoggedIn && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Viết bình luận..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#FFCE23]"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="px-3 py-2 text-sm bg-[#FFCE23] text-black rounded-lg hover:bg-[#fdc142] transition font-semibold"
                            >
                              Gửi
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Team Section */}
              {members.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                  <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUsers} /> Thành Viên ({members.length})
                  </h3>
                  <div className="space-y-1">
                    {members.slice(0, 5).map(member => (
                      <div key={member.id} className="flex items-center gap-2">
                        {member.avatar && (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 truncate">{member.name}</div>
                          {member.role && (
                            <div className="text-xs text-gray-500 truncate">{member.role}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Section */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-base font-bold text-gray-900 mb-2">Thông Tin</h3>
                <div className="space-y-2">
                  {project.industry && (
                    <div>
                      <div className="text-xs text-gray-500 font-semibold">Lĩnh vực</div>
                      <div className="font-semibold text-sm text-gray-900">{project.industry}</div>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <div className="text-xs text-gray-500 font-semibold flex items-center gap-2">
                        <FontAwesomeIcon icon={faMapPin} /> Địa điểm
                      </div>
                      <div className="font-semibold text-sm text-gray-900">{project.location}</div>
                    </div>
                  )}
                  {project.published_at && (
                    <div>
                      <div className="text-xs text-gray-500 font-semibold flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendar} /> Ngày công bố
                      </div>
                      <div className="font-semibold text-sm text-gray-900">
                        {new Date(project.published_at).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
}
