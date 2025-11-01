import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding, faTrophy, faBullseye, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const PublicProfile = () => {
  const user = {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    cover: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    name: "Trần Minh Quang",
    username: "@tranminhquang",
    bio: "Founder | Đổi mới sáng tạo | Đam mê AI & Fintech",
    location: "TP. Hồ Chí Minh, Việt Nam",
    website: "https://quangstartup.com",
    phone: "0987654321",
    address: "456 Đường Sáng Tạo, Quận 1, TP.HCM",
    company: "Quang Holdings",
    facebook: "https://facebook.com/tranminhquang",
    linkedin: "https://linkedin.com/in/tranminhquang",
    achievements: "Giải nhất Hackathon 2024, Top 5 Startup Châu Á 2025",
    pitch_deck_url: "https://pitchdeck.com/quangstartup",
    startup_website: "https://ai4life.vn",
    startup_facebook: "https://facebook.com/ai4life",
    startup_linkedin: "https://linkedin.com/company/ai4life",
    cv: "CV_TranMinhQuang.pdf",
    verified: true,
    approved: true,
    expertise: ["AI", "Fintech", "Edtech", "Blockchain"],
    goal: "Kết nối nhà đầu tư, mở rộng thị trường quốc tế",
    startups: [
      {
        startup_name: "AI4Life",
        industry: "AI",
        founded_year: "2021",
        team_size: "15",
        mission: "Ứng dụng AI vào chăm sóc sức khoẻ",
        website: "https://ai4life.vn",
        facebook: "https://facebook.com/ai4life",
        linkedin: "https://linkedin.com/company/ai4life"
      },
      {
        startup_name: "FintechPro",
        industry: "Fintech",
        founded_year: "2019",
        team_size: "20",
        mission: "Đổi mới tài chính cho doanh nghiệp nhỏ",
        website: "https://fintechpro.vn",
        facebook: "https://facebook.com/fintechpro",
        linkedin: "https://linkedin.com/company/fintechpro"
      },
      {
        startup_name: "EduNext",
        industry: "Edtech",
        founded_year: "2023",
        team_size: "8",
        mission: "Nâng cao chất lượng giáo dục qua công nghệ",
        website: "https://edunext.vn",
        facebook: "https://facebook.com/edunext",
        linkedin: "https://linkedin.com/company/edunext"
      }
    ]
  };

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
            <img src={user.cover} alt="cover" className="w-full h-full object-cover" />
            {/* Avatar */}
            <div className="absolute left-6 -bottom-16">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-white"
              />
            </div>
          </div>
          {/* Profile info */}
            <div className="pt-20 pb-10 px-8 flex flex-col gap-10">
              {/* 👤 Thông tin cá nhân */}
              <div className="rounded-xl border bg-white shadow-sm p-7 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-700 mr-2" /> Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px]">
                  <div className="flex items-center"><span className="font-medium text-gray-700 mr-2">Họ và tên Founder:</span><span className="font-semibold text-black">{user.name}</span></div>
                  <div className="flex items-center"><span className="font-medium text-gray-700 mr-2">Vai trò:</span><span className="text-black">Founder</span></div>
                  <div className="flex items-center"><span className="font-medium text-gray-700 mr-2">Địa điểm:</span><span className="text-black">{user.location}</span></div>
                  <div className="flex items-center"><span className="font-medium text-gray-700 mr-2">Website cá nhân:</span><a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-normal">{user.website.replace("https://", "")}</a></div>
                  <div className="sm:col-span-2 mt-2"><span className="font-medium text-gray-700 mr-2">Giới thiệu ngắn:</span><span className="text-black">{user.bio}</span></div>
                </div>
              </div>

              {/* 🚀 Thông tin Startup */}
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

              {/* 🏆 Thành tựu & Pitch Deck */}
              <div className="rounded-xl border bg-white shadow-sm p-7 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faTrophy} className="text-gray-700 mr-2" /> Thành tựu & Pitch Deck
                </h3>
                <div className="text-[15px] mb-2"><span className="font-medium text-gray-700">Các thành tựu nổi bật:</span> <span className="text-black">{user.achievements}</span></div>
                <div className="text-[15px]"><span className="font-medium text-gray-700">Link video / pitch deck:</span> <a href={user.pitch_deck_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-normal">{user.pitch_deck_url}</a></div>
              </div>

              {/* 🤝 Mục tiêu kết nối */}
              <div className="rounded-xl border bg-white shadow-sm p-7 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faBullseye} className="text-gray-700 mr-2" /> Mục tiêu kết nối
                </h3>
                <div className="text-[15px]"><span className="font-medium text-gray-700">Nhà đầu tư, mentor, đối tác:</span> <span className="text-black">{user.goal}</span></div>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default PublicProfile;
