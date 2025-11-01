import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const PublicProfile = () => {
  const user = {
    avatar: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    name: "Nguyen Van A",
    username: "@nguyenvana",
    bio: "Founder | Đam mê khởi nghiệp | Đổi mới sáng tạo",
    location: "Hà Nội, Việt Nam",
    website: "https://startup.vn",
    cv: "CV_NguyenVanA.pdf",
    verified: true,
    approved: true,
    expertise: ["Fintech", "AI", "Blockchain"],
    goal: "Kết nối nhà đầu tư, phát triển dự án tầm cỡ khu vực",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 py-8 px-2">
        {/* Nút quay lại */}
        <div className="w-full max-w-xl mb-4 flex justify-start">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCE23] text-black font-semibold shadow hover:bg-yellow-300 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Quay lại
          </button>
        </div>
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
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
          <div className="pt-20 pb-8 px-8 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              {/* Đã bỏ badge Verified và Approved */}
            </div>
            <div className="text-gray-500 text-base">{user.username}</div>
            <p className="text-gray-700 text-base mb-2 mt-1">{user.bio}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {user.expertise.map((exp) => (
                <span key={exp} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">{exp}</span>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-2 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <i className="fa fa-map-marker text-blue-400" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <i className="fa fa-link text-blue-400" />
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-[#FFCE23] hover:underline font-semibold">{user.website.replace("https://", "")}</a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <i className="fa fa-file-pdf-o text-blue-400" />
                <a href={user.cv} target="_blank" rel="noopener noreferrer" className="text-[#FFCE23] hover:underline font-semibold">Tải CV</a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <i className="fa fa-bullseye text-blue-400" />
                <span>{user.goal}</span>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex gap-3 mt-2">
              <button className="px-5 py-2 rounded-full bg-[#FFCE23] text-black font-semibold shadow hover:bg-yellow-300 transition">Theo dõi</button>
              <button className="px-5 py-2 rounded-full bg-[#FFCE23] text-black font-semibold shadow hover:bg-yellow-300 transition">Kết nối</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default PublicProfile;
