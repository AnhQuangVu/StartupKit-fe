import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { API_BASE } from "../config/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding, faTrophy, faBullseye, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const PublicProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchFounder() {
      if (id) {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const response = await fetch(`${API_BASE}/public/users/${id}`, { headers });
          if (response.ok) {
            const data = await response.json();
            setUser({
              avatar: data.avatar || "",
              cover: data.cover || "",
              name: data.name || "",
              role: data.role || "",
              bio: data.bio || "",
              location: data.location || "",
              website: data.website || "",
              phone: data.phone || "",
              address: data.address || "",
              company: data.company || "",
              facebook: data.facebook || "",
              linkedin: data.linkedin || "",
              achievements: data.achievements || "",
              achievementLinks: Array.isArray(data.achievementLinks) ? data.achievementLinks : [],
              pitch_deck_url: data.pitch_deck_url || "",
              startups: Array.isArray(data.startups) && data.startups.length > 0 ? data.startups : [],
              goal: data.goal || "",
              // Mentor specific fields (backend flattened them already)
              currentPosition: data.current_position || "",
              expertiseAreas: Array.isArray(data.expertise_areas) ? data.expertise_areas : [],
              yearsOfExperience: data.years_of_experience || "",
              industries: Array.isArray(data.industries) ? data.industries : [],
              investmentRange: data.investment_range || "",
              preferredStage: Array.isArray(data.preferred_stage) ? data.preferred_stage : [],
              previousCompanies: Array.isArray(data.previous_companies) ? data.previous_companies : [],
              linkedinUrl: data.linkedin_url || "",
              calendlyUrl: data.calendly_url || "",
              isActive: data.is_active || false,
            });
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else if (state.formData) {
        // fallback: lấy từ location.state nếu có
        setUser({
          avatar: state.formData?.avatar_url || "",
          cover: state.formData?.cover_url || "",
          name: state.formData?.full_name || "",
          role: state.formData?.role || "",
          bio: state.formData?.bio || "",
          location: state.formData?.location || "",
          website: state.formData?.website_url || "",
          phone: state.formData?.phone || "",
          address: state.formData?.address || "",
          company: state.formData?.company || "",
          facebook: state.formData?.facebook || "",
          linkedin: state.formData?.linkedin || "",
          achievements: Array.isArray(state.achievements)
            ? state.achievements.map(a => a.content).filter(Boolean).join(", ")
            : "",
          achievementLinks: Array.isArray(state.achievements)
            ? state.achievements.map(a => a.link).filter(Boolean)
            : [],
          pitch_deck_url: state.formData?.pitch_deck_url || "",
          startups: Array.isArray(state.startups) && state.startups.length > 0
            ? state.startups
            : [],
          goal: state.formData?.connect_goal || "",
        });
        setLoading(false);
      }
    }
    fetchFounder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1 py-8 px-2">
          <div className="text-xl text-gray-500">Đang tải thông tin...</div>
        </div>
        <Footer />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1 py-8 px-2">
          <div className="text-xl text-gray-500">Không tìm thấy thông tin người dùng.</div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 py-8 px-2">
        {/* Nút quay lại */}
        <div className="w-full max-w-4xl mb-6 flex justify-start">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFCE23] text-black font-semibold shadow hover:bg-yellow-400 transition duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Quay lại
          </button>
        </div>
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Cover/banner */}
          <div className="relative h-40 w-full bg-gray-200">
            {user.cover && (
              <img src={user.cover} alt="cover" className="w-full h-full object-cover" />
            )}
            {/* Avatar */}
            {user.avatar && (
              <div className="absolute left-6 -bottom-16">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                />
              </div>
            )}
          </div>
          {/* Profile info */}
          <div className="pt-20 pb-10 px-8 flex flex-col gap-10">
            {/* 👤 Thông tin cá nhân */}
            <div className="rounded-xl border bg-white shadow-sm p-7 mb-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-700 mr-2" /> Thông tin cá nhân
                </h3>
                <button className="px-4 py-2 bg-[#FFCE23] text-black rounded-full font-semibold shadow hover:bg-[#fdc142] transition">Kết nối</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px]">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">
                    {user.role === 'mentor' ? 'Họ và tên Mentor:' : 'Họ và tên Founder:'}
                  </span>
                  <span className="font-semibold text-black">{user.name}</span>
                </div>

                {/* Tiêu đề/Định vị - chỉ hiện cho Mentor */}
                {user.role === 'mentor' && user.company && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-2">Công ty/Tổ chức:</span>
                    <span className="text-black">{user.company}</span>
                  </div>
                )}

                {/* Vị trí hiện tại - cho Mentor */}
                {user.role === 'mentor' && user.currentPosition && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-2">Vị trí công việc:</span>
                    <span className="text-black">{user.currentPosition}</span>
                  </div>
                )}

                {/* Chuyên môn - cho Mentor */}
                {user.role === 'mentor' && user.expertiseAreas && user.expertiseAreas.length > 0 && (
                  <div className="flex items-start sm:col-span-2">
                    <span className="font-medium text-gray-700 mr-2">Chuyên môn:</span>
                    <span className="text-black">{Array.isArray(user.expertiseAreas) ? user.expertiseAreas.join(', ') : user.expertiseAreas}</span>
                  </div>
                )}

                {/* Kinh nghiệm - cho Mentor */}
                {user.role === 'mentor' && user.yearsOfExperience && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-2">Số năm kinh nghiệm:</span>
                    <span className="text-black">{user.yearsOfExperience} năm</span>
                  </div>
                )}

                {/* Lĩnh vực - cho Mentor */}
                {user.role === 'mentor' && user.industries && user.industries.length > 0 && (
                  <div className="flex items-start sm:col-span-2">
                    <span className="font-medium text-gray-700 mr-2">Lĩnh vực quan tâm:</span>
                    <span className="text-black">{Array.isArray(user.industries) ? user.industries.join(', ') : user.industries}</span>
                  </div>
                )}

                {/* Công ty trước đây - cho Mentor */}
                {user.role === 'mentor' && user.previousCompanies && user.previousCompanies.length > 0 && (
                  <div className="flex items-start sm:col-span-2">
                    <span className="font-medium text-gray-700 mr-2">Kinh nghiệm làm việc:</span>
                    <span className="text-black">{Array.isArray(user.previousCompanies) ? user.previousCompanies.join(', ') : user.previousCompanies}</span>
                  </div>
                )}

                {/* Investment Range - cho Mentor/Investor */}
                {user.role === 'mentor' && user.investmentRange && (
                  <div className="flex items-center sm:col-span-2">
                    <span className="font-medium text-gray-700 mr-2">Mức đầu tư quan tâm:</span>
                    <span className="text-black">{user.investmentRange}</span>
                  </div>
                )}

                {/* Preferred Stage - cho Mentor/Investor */}
                {user.role === 'mentor' && user.preferredStage && user.preferredStage.length > 0 && (
                  <div className="flex items-start sm:col-span-2">
                    <span className="font-medium text-gray-700 mr-2">Giai đoạn ưu tiên:</span>
                    <span className="text-black">{Array.isArray(user.preferredStage) ? user.preferredStage.join(', ') : user.preferredStage}</span>
                  </div>
                )}

                {/* LinkedIn - cho Mentor */}
                {user.role === 'mentor' && user.linkedinUrl && (
                  <div className="flex items-center sm:col-span-2">
                    <span className="font-medium text-gray-700 mr-2">🔗 LinkedIn:</span>
                    <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-normal">
                      {user.linkedinUrl.replace("https://", "").replace("http://", "")}
                    </a>
                  </div>
                )}

                {/* Calendly - cho Mentor */}
                {user.role === 'mentor' && user.calendlyUrl && (
                  <div className="flex items-center sm:col-span-2">
                    <span className="font-medium text-gray-700 mr-2">📅 Đặt lịch hẹn:</span>
                    <a href={user.calendlyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-normal">
                      {user.calendlyUrl.replace("https://", "").replace("http://", "")}
                    </a>
                  </div>
                )}

                {/* Địa điểm - cho cả Mentor và Founder */}
                {user.location && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-2">
                      {user.role === 'mentor' ? 'Địa điểm:' : 'Địa điểm:'}
                    </span>
                    <span className="text-black">{user.location}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Vai trò:</span>
                  <span className="text-black capitalize">{user.role === 'mentor' ? 'Mentor' : 'Founder'}</span>
                </div>

                {user.website && (
                  <div className="flex items-center sm:col-span-2">
                    <span className="font-medium text-gray-700 mr-2">
                      {user.role === 'mentor' ? '🔗 Link cộng đồng:' : 'Website cá nhân:'}
                    </span>
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-normal">
                      {user.website.replace("https://", "").replace("http://", "")}
                    </a>
                  </div>
                )}

                <div className="sm:col-span-2 mt-2">
                  <span className="font-medium text-gray-700 mr-2">
                    {user.role === 'mentor' ? '📝 Giới thiệu bản thân:' : 'Giới thiệu ngắn:'}
                  </span>
                  <span className="text-black">{user.bio}</span>
                </div>
              </div>
            </div>

            {/* 🚀 Thông tin Startup - chỉ hiển thị cho Founder */}
            {user.role !== 'mentor' && (
              <div className="rounded-xl border bg-white shadow-sm p-7 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faBuilding} className="text-gray-700 mr-2" /> Thông tin Startup
                </h3>
                {user.startups && user.startups.length > 0 ? (
                  user.startups.map((startup, idx) => (
                    <div key={idx} className="rounded-lg border bg-gray-50 p-5 mb-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px]">
                        <div className="flex items-center"><span className="font-medium text-gray-700 mr-2">Tên startup:</span><span className="font-semibold text-black">{startup.startup_name}</span></div>
                        <div className="flex items-center"><span className="font-medium text-gray-700 mr-2">Lĩnh vực hoạt động:</span><span className="text-black">{startup.industry}</span></div>
                        <div className="flex items-center"><span className="font-medium text-gray-700 mr-2">Năm thành lập:</span><span className="text-black">{startup.founded_year}</span></div>
                        <div className="flex items-center"><span className="font-medium text-gray-700 mr-2">Quy mô đội ngũ:</span><span className="text-black">{startup.team_size}</span></div>
                        <div className="sm:col-span-2 mt-2"><span className="font-medium text-gray-700 mr-2">Sứ mệnh / Giá trị cốt lõi:</span><span className="text-black">{startup.mission}</span></div>
                        <div className="sm:col-span-2 flex gap-4 mt-2">
                          {startup.website && <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-normal"><FontAwesomeIcon icon={faGlobe} className="text-gray-700 mr-1" />Website</a>}
                          {startup.facebook && <a href={startup.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-normal"><FontAwesomeIcon icon={faFacebook} className="text-gray-700 mr-1" />Facebook</a>}
                          {startup.linkedin && <a href={startup.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-normal"><FontAwesomeIcon icon={faLinkedin} className="text-gray-700 mr-1" />LinkedIn</a>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">Chưa có startup nào được khai báo.</div>
                )}
              </div>
            )}

            {/* 🏆 Thành tựu & Pitch Deck */}
            <div className="rounded-xl border bg-white shadow-sm p-7 mb-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faTrophy} className="text-gray-700 mr-2" />
                {user.role === 'mentor' ? 'Thành tích nổi bật' : 'Thành tựu & Pitch Deck'}
              </h3>
              <div className="text-[15px] mb-2">
                <span className="font-medium text-gray-700">Các thành tựu nổi bật:</span> <span className="text-black">{user.achievements}</span>
                {user.achievementLinks.length > 0 && (
                  <ul className="mt-2 ml-2 list-disc text-blue-700">
                    {user.achievementLinks.map((link, idx) => (
                      <li key={idx}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline font-normal">{link}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* 🤝 Mục tiêu kết nối */}
            {user.goal && (
              <div className="rounded-xl border bg-white shadow-sm p-7 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faBullseye} className="text-gray-700 mr-2" />
                  {user.role === 'mentor' ? 'Mục tiêu kết nối / Lĩnh vực hỗ trợ' : 'Mục tiêu kết nối'}
                </h3>
                <div className="text-[15px]">
                  <span className="font-medium text-gray-700">
                    {user.role === 'mentor' ? 'Tôi có thể hỗ trợ:' : 'Tìm kiếm:'}
                  </span>
                  <span className="text-black ml-2">{user.goal}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default PublicProfile;
