import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config/api';
// Thêm lại import mock data (đảm bảo đường dẫn chính xác)
import getMockData from '../components/common/StartupList.jsx'; 
import { listPostComments, createPostComment } from '../api/posts'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart, faComment, faUsers, faLink, faMapPin, faCalendar,
    faSpinner, faArrowLeft, faShare, faCheckCircle, faInfoCircle, faClipboardList, faNewspaper
} from '@fortawesome/free-solid-svg-icons';


// =================================================================
// 1. CUSTOM HOOK: useProjectDetails (Logic Gọi API & State)
// =================================================================

function useProjectDetails(projectId) {
    const { user, isLoggedIn } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [followers, setFollowers] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [members, setMembers] = useState([]);
    const [posts, setPosts] = useState([]);

    const fetchProjectDetail = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await fetch(`${API_BASE}/projects/${projectId}`, { headers });
            if (!response.ok) throw new Error('Không thể lấy thông tin project');
                        const data = await response.json();
                        // Map avatar/banner fields to avatar_url and cover_url if needed
                        let mapped = { ...data };
                        if (!mapped.avatar_url && (mapped.avatar || mapped.profile?.avatar_url)) {
                            mapped.avatar_url = mapped.avatar || mapped.profile?.avatar_url || "";
                        }
                        if (!mapped.cover_url && (mapped.cover || mapped.profile?.cover_url)) {
                            mapped.cover_url = mapped.cover || mapped.profile?.cover_url || "";
                        }
                        setProject(mapped);
        } catch (error) {
            console.error('Fetch project error:', error);
            // Logic Fallback Mock Data
            try {
                const mockList = typeof getMockData === 'function' ? getMockData() : [];
                // Sử dụng đúng cấu trúc mock, không đổi tên field
                const found = mockList.find(p => String(p.id) === String(projectId));
                if (found) { setProject(found); } else { setProject(null); }
            } catch (err) { setProject(null); }
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const fetchProjectFollowers = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await fetch(`${API_BASE}/projects/${projectId}/followers`, { headers });
            if (response.ok) {
                const data = await response.json();
                setFollowers(Array.isArray(data) ? data : []);
                if (isLoggedIn && user?.id && Array.isArray(data)) {
                    const userIsFollowing = data.some(f => f.id === user.id);
                    setIsFollowing(userIsFollowing);
                }
            }
        } catch (error) { console.error('Fetch followers error:', error); }
    }, [projectId, isLoggedIn, user?.id]);
    
    const updateFollowersCount = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await fetch(`${API_BASE}/projects/${projectId}/followers`, { headers });
            if (response.ok) {
                const data = await response.json();
                setFollowers(Array.isArray(data) ? data : []);
            }
        } catch (error) { console.error('Update followers count error:', error); }
    }, [projectId]);

    const fetchProjectMembers = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await fetch(`${API_BASE}/projects/${projectId}/members`, { headers });
            if (response.ok) {
                const data = await response.json();
                setMembers(Array.isArray(data) ? data : []);
            }
        } catch (error) { console.error('Fetch members error:', error); }
    }, [projectId]);

    const fetchProjectPosts = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await fetch(`${API_BASE}/projects/${projectId}/posts?limit=50`, { headers });
            if (response.ok) {
                const data = await response.json();
                const mapped = (Array.isArray(data) ? data : []).map(p => ({
                    ...p,
                    author_name: 
                        p.author?.full_name || p.author?.fullName || p.author?.name || p.author?.username || p.author?.email || 'Người dùng'
                }));
                setPosts(mapped);
            }
        } catch (error) { console.error('Fetch posts error:', error); }
    }, [projectId]);

    useEffect(() => {
        if (projectId) {
            fetchProjectDetail();
            fetchProjectFollowers();
            fetchProjectMembers();
            fetchProjectPosts();
        }
    }, [projectId, fetchProjectDetail, fetchProjectFollowers, fetchProjectMembers, fetchProjectPosts]);

    return {
        project, loading, followers, members, posts, isFollowing, setIsFollowing, updateFollowersCount, fetchProjectPosts
    };
}


// =================================================================
// 2. COMPONENTS CON (UI) - ĐÃ SỬA LỖI KHỞI TẠO
// =================================================================

// ProjectHeader: (Không phụ thuộc vào component UI khác)
const ProjectHeader = ({ project, followers, members, posts, isFollowing, toggleFollow }) => {
    
    const bannerUrl = project.team_image_url || project.team_image?.url || project.banner_url;

    const StatsItem = ({ value, label }) => (
        <div className="flex flex-col items-center justify-center p-3 border-r border-gray-100 last:border-r-0">
            <div className="text-xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            {/* Banner Image Area */}
            <div className="relative h-60 bg-gradient-to-r from-[#FFCE23] to-[#fdc142] overflow-hidden">
                {bannerUrl ? (
                    <img
                        src={bannerUrl}
                        alt={`${project.name} banner`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : null}
                
                {/* Overlay để chứa Logo và Tên */}
                <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] flex items-end p-6">
                    <div className="flex items-center gap-4 w-full">
                        {/* Logo */}
                        {project.logo_url && (
                            <img
                                src={project.logo_url}
                                alt={project.name}
                                className="w-24 h-24 rounded-2xl shadow-2xl object-cover border-4 border-white flex-shrink-0"
                            />
                        )}
                        {/* Title & Tags */}
                        <div className="flex flex-col text-white">
                            <h1 className="text-3xl font-bold drop-shadow-lg">{project.name}</h1>
                            {project.tagline && (
                                <p className="text-base font-medium drop-shadow mb-2">{project.tagline}</p>
                            )}
                            <div className="flex gap-2">
                                {project.industry && (
                                    <span className="inline-block px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold shadow-sm">
                                        {project.industry}
                                    </span>
                                )}
                                {project.status === 'published' && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold shadow-sm">
                                        <FontAwesomeIcon icon={faCheckCircle} /> Đã công bố
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions & Stats Row */}
            <div className="p-6 flex justify-between items-center bg-white border-t border-gray-100">
                
                {/* Stats */}
                <div className="flex divide-x divide-gray-200 rounded-lg border border-gray-200">
                    <StatsItem value={followers.length} label="Người theo dõi" />
                    <StatsItem value={members.length} label="Thành viên" />
                    <StatsItem value={posts.length} label="Bài đăng" />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={toggleFollow}
                        className={`px-6 py-2.5 text-sm rounded-xl font-bold transition shadow-md ${
                            isFollowing
                                ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                                : 'bg-[#FFCE23] text-black hover:bg-[#fdc142]'
                        }`}
                    >
                        {isFollowing ? 'Bỏ theo dõi' : 'Theo dõi'}
                    </button>
                    <button className="px-3 py-2.5 text-sm bg-white border-2 border-gray-300 rounded-xl hover:border-[#FFCE23] transition shadow-sm">
                        <FontAwesomeIcon icon={faShare} className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// =================================================================
// SIDEBAR COMPONENTS
// =================================================================

// TeamSection (Cần được định nghĩa trước ProjectSidebar)
const TeamSection = ({ members }) => (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 border-b pb-2">
            <FontAwesomeIcon icon={faUsers} className="text-blue-500" /> Thành Viên ({members.length})
        </h3>
        <div className="space-y-3 pt-2">
            {members.slice(0, 5).map(member => (
                <div key={member.id} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition">
                    {member.avatar && (
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
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
);

// InfoSection (Cần được định nghĩa trước ProjectSidebar)
const InfoSection = ({ project }) => {
    const InfoItem = ({ icon, title, content }) => {
        if (!content || (typeof content === 'string' && content.trim() === 'N/A')) return null;
        return (
            <div>
                <div className="text-xs text-gray-500 font-semibold flex items-center gap-2 mb-0.5">
                    {icon && <FontAwesomeIcon icon={icon} />} {title}
                </div>
                <div className="font-semibold text-sm text-gray-900 break-words">{content}</div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 border-b pb-2">
                <FontAwesomeIcon icon={faInfoCircle} className="text-amber-500" /> Thông Tin
            </h3>
            <div className="space-y-3 pt-2">
                <InfoItem icon={faLink} title="Website" content={project.website_url ? <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{project.website_url}</a> : 'N/A'} />
                <InfoItem title="Lĩnh vực" content={project.industry} />
                <InfoItem icon={faMapPin} title="Địa điểm" content={project.location} />
                <InfoItem icon={faCalendar} title="Ngày công bố" content={project.published_at ? new Date(project.published_at).toLocaleDateString('vi-VN') : 'N/A'} />
            </div>
        </div>
    );
};

// ProjectSidebar (Sử dụng TeamSection và InfoSection)
const ProjectSidebar = ({ project, members }) => {
    return (
        <div className="lg:col-span-1">
            {members.length > 0 && <TeamSection members={members} />}
            <InfoSection project={project} />
        </div>
    );
};

// =================================================================
// MAIN CONTENT COMPONENTS
// =================================================================

// ProjectDetailsContent (Phải định nghĩa trước ProjectAboutAndDetails và ProjectContentTabs)
const ProjectDetailsContent = ({ project }) => {
    const DetailItem = ({ title, content }) => {
        if (!content) return null;
        return (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm font-semibold text-gray-600 mb-1">{title}</div>
                <p className="text-sm text-gray-800">{content}</p>
            </div>
        );
    };
    return (
        <div className="space-y-3">
            <DetailItem title="Vấn Đề Cần Giải Quyết" content={project.pain_point} />
            <DetailItem title="Giải Pháp" content={project.solution} />
            <DetailItem title="Sản Phẩm" content={project.product} />
            <DetailItem title="Đối Tượng Khách Hàng" content={project.customer_segment} />
            <DetailItem title="Kích Thước Thị Trường" content={project.market_size} />
            <DetailItem title="Mô Hình Kinh Doanh" content={project.business_model} />
        </div>
    );
};

// ProjectAboutAndDetails (Phải định nghĩa trước ProjectContentTabs)
const ProjectAboutAndDetails = ({ project }) => {
    return (
        <>
            {/* Tác giả (Founder) */}
            {project.founder && (
                <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    {project.founder.avatar && (
                        <img src={project.founder.avatar} alt={project.founder.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-200" />
                    )}
                    <div>
                        <div className="font-bold text-lg text-gray-900">{project.founder.name}</div>
                        {project.founder.role && <div className="text-sm text-gray-600">{project.founder.role}</div>}
                        {project.founder.bio && <div className="text-xs text-gray-500 mt-1">{project.founder.bio}</div>}
                    </div>
                </div>
            )}
            {project.description && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 text-base leading-relaxed">{project.description}</p>
                    {project.website_url && (
                        <a
                            href={project.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#FFCE23] hover:text-[#fdc142] font-semibold text-sm mt-3"
                        >
                            <FontAwesomeIcon icon={faLink} /> Truy cập website
                        </a>
                    )}
                </div>
            )}
            <ProjectDetailsContent project={project} />
        </>
    );
};


// PostsSection và PostItem (Phải định nghĩa trước ProjectContentTabs)
const PostItem = ({ post, isLoggedIn, likedPosts, handleLikePost, comments, setComments, handleAddComment, likedUsers }) => {
    const [commentInput, setCommentInput] = useState('');
    const [showComments, setShowComments] = useState(false);

    const loadComments = useCallback(async (postId) => {
        if (!comments[postId]) {
            try {
                const commentsData = await listPostComments(postId);
                setComments(prev => ({ ...prev, [postId]: commentsData }));
            } catch (error) { console.error('Load comments error:', error); }
        }
        setShowComments(prev => !prev);
    }, [comments, setComments]);

    const commentCount = Array.isArray(comments[post.id]) ? comments[post.id].length : 0;
    const likeCount = Array.isArray(likedUsers[post.id]) ? likedUsers[post.id].length : 0;

    return (
        <div className="border-b pb-4 last:border-b-0">
            <div className="flex gap-3 mb-3">
                {post.author?.avatar_url && (<img src={post.author.avatar_url} alt={post.author_name} className="w-10 h-10 rounded-full object-cover" />)}
                <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">{post.author_name}</div>
                    <div className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString('vi-VN')}</div>
                </div>
            </div>

            <h3 className="text-base font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-700 mb-3 line-clamp-3">{post.body}</p>

            <div className="flex gap-4 mb-3 text-sm">
                <button onClick={() => handleLikePost(post.id)} className={`flex items-center gap-1 transition ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}>
                    <FontAwesomeIcon icon={faHeart} /> Thích
                    <span className="ml-1">{likeCount}</span>
                </button>
                <button onClick={() => loadComments(post.id)} className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition">
                    <FontAwesomeIcon icon={faComment} /> Bình luận
                    <span className="ml-1">{commentCount}</span>
                </button>
            </div>

            {showComments && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Bình Luận</h4>
                    {Array.isArray(comments[post.id]) && comments[post.id].length > 0 ? (
                        comments[post.id].map(comment => (
                            <div key={comment.id} className="mb-2 pb-2 border-b last:border-b-0">
                                <div className="flex gap-2 mb-1">
                                    {comment.author?.avatar_url && (<img src={comment.author.avatar_url} alt={comment.author.full_name || comment.author.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />)}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-xs text-gray-900">{comment.author?.full_name || comment.author?.username}</div>
                                        <p className="text-xs text-gray-700">{comment.body}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (<p className="text-xs text-gray-500">Chưa có bình luận nào.</p>)}
                    
                    {isLoggedIn && (
                        <div className="flex gap-2 mt-4">
                            <input
                                type="text"
                                placeholder="Viết bình luận..."
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#FFCE23]"
                            />
                            <button
                                onClick={() => { handleAddComment(post.id, commentInput); setCommentInput(''); }}
                                className="px-3 py-2 text-sm bg-[#FFCE23] text-black rounded-lg hover:bg-[#fdc142] transition font-semibold"
                            >
                                Gửi
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
const PostsSection = ({ posts, isLoggedIn, user, fetchProjectPosts }) => {
    const navigate = useNavigate();
    const [comments, setComments] = useState({});
    const [likedPosts, setLikedPosts] = useState(new Set()); 
    const [likedUsers, setLikedUsers] = useState({}); 

    const handleLikePost = async (postId) => { /* ... */ };
    const handleAddComment = async (postId, body) => { /* ... */ };

    return (
        <>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Bài Đăng ({posts.length})</h2>
            {posts.length === 0 ? (
                <p className="text-gray-500 text-center py-6 text-sm">Chưa có bài đăng nào</p>
            ) : (
                <div className="space-y-4">
                    {posts.map(post => (
                        <PostItem 
                            key={post.id} 
                            post={post}
                            isLoggedIn={isLoggedIn}
                            likedPosts={likedPosts}
                            handleLikePost={handleLikePost}
                            comments={comments}
                            setComments={setComments}
                            handleAddComment={handleAddComment}
                            likedUsers={likedUsers}
                        />
                    ))}
                </div>
            )}
        </>
    );
};


// ProjectContentTabs (Sử dụng các component đã định nghĩa)
const ProjectContentTabs = ({ project, posts, isLoggedIn, user, fetchProjectPosts }) => {
    const [activeTab, setActiveTab] = useState('about');
    
    const tabs = [
        // Các component này đã được định nghĩa ở trên
        { id: 'about', label: 'Tổng quan', icon: faInfoCircle, component: ProjectAboutAndDetails, props: { project } },
        { id: 'details', label: 'Chi tiết', icon: faClipboardList, component: ProjectDetailsContent, props: { project } },
        { id: 'posts', label: `Bài đăng (${posts.length})`, icon: faNewspaper, component: PostsSection, props: { posts, isLoggedIn, user, fetchProjectPosts } },
    ];
    
    const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;
    const ActiveProps = tabs.find(t => t.id === activeTab)?.props || {};

    return (
        <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6 bg-white rounded-xl shadow-sm p-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-all duration-200 rounded-lg ${
                            activeTab === tab.id
                                ? 'bg-[#FFCE23] text-black shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <FontAwesomeIcon icon={tab.icon} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-xl p-6">
                {ActiveComponent ? <ActiveComponent {...ActiveProps} /> : null}
            </div>
        </div>
    );
};


// =================================================================
// 3. COMPONENT CHÍNH: ProjectDetailPage
// =================================================================

export default function ProjectDetailPage() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();
    
    const { 
        project, loading, followers, members, posts, isFollowing, setIsFollowing, updateFollowersCount, fetchProjectPosts
    } = useProjectDetails(projectId);

    // Logic Toggle Follow (Định nghĩa ngay trong component chính)
    const toggleFollow_logic = async () => {
        if (!isLoggedIn) { navigate('/dang-nhap'); return; }
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
            const endpoint = `${API_BASE}/projects/${projectId}/follow`;
            const method = isFollowing ? 'DELETE' : 'POST';
            const response = await fetch(endpoint, { method, headers });
            
            if (response.ok) {
                const newFollowingState = !isFollowing;
                setIsFollowing(newFollowingState);
                setTimeout(() => { updateFollowersCount(); }, 500);
            } else { console.error('Follow failed with status:', response.status); }
        } catch (error) { console.error('Toggle follow error:', error); }
    };
    
    // Logic SEO (Giữ nguyên)
    useEffect(() => {
        if (project) {
            document.title = `${project.name} - Startup Detail | StartupKit`;
            // ... (Phần logic SEO/Meta tags/Structured Data)
        }
    }, [project]);


    // Render Loading và Not Found
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
    
    // Render Trang
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
                <ProjectHeader 
                    project={project}
                    followers={followers}
                    members={members}
                    posts={posts}
                    isFollowing={isFollowing}
                    toggleFollow={toggleFollow_logic} // Sử dụng hàm đã định nghĩa
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content (Tabs) */}
                    <ProjectContentTabs 
                        project={project}
                        posts={posts} 
                        isLoggedIn={isLoggedIn}
                        user={user}
                        fetchProjectPosts={fetchProjectPosts}
                    />
                    
                    {/* Sidebar (Team + Info) */}
                    <ProjectSidebar project={project} members={members} />
                </div>
            </main>

            <Footer />
        </div>
    );
}