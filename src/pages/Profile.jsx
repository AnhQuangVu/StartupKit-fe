import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Profile() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hoso");



  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600">Đang tải thông tin...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
          {/* Tabs */}
          <div className="flex space-x-0 border-b mb-6">
            <button
              className={`px-6 py-2 font-semibold text-sm border-b-2 transition-all duration-150 ${
                activeTab === "hoso"
                  ? "border-[#FFCE23] text-[#FFCE23] bg-white"
                  : "border-transparent text-gray-600 hover:text-[#FFCE23] bg-gray-50"
              }`}
              onClick={() => setActiveTab("hoso")}
            >
              Hồ sơ
            </button>
            <button
              className={`px-6 py-2 font-semibold text-sm border-b-2 transition-all duration-150 ${
                activeTab === "baidang"
                  ? "border-[#FFCE23] text-[#FFCE23] bg-white"
                  : "border-transparent text-gray-600 hover:text-[#FFCE23] bg-gray-50"
              }`}
              onClick={() => setActiveTab("baidang")}
            >
              Quản lý bài đăng
            </button>
            <button
              className="ml-auto px-4 py-2 font-semibold text-sm text-red-500 hover:text-red-600"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "hoso" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#FFCE23]">
                Thông tin cá nhân
              </h2>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <span className="font-semibold text-gray-700">Tên:</span>
                  <p className="text-gray-900 mt-1">{user.full_name}</p>
                </div>
                <div className="border-b pb-3">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <p className="text-gray-900 mt-1">{user.email}</p>
                </div>
                <div className="border-b pb-3">
                  <span className="font-semibold text-gray-700">Vai trò:</span>
                  <p className="text-gray-900 mt-1 capitalize">{user.role}</p>
                </div>
                {user.company && (
                  <div className="border-b pb-3">
                    <span className="font-semibold text-gray-700">
                      {user.role === "investor"
                        ? "Quỹ/Công ty:"
                        : user.role === "mentor"
                        ? "Tổ chức:"
                        : "Công ty:"}
                    </span>
                    <p className="text-gray-900 mt-1">{user.company}</p>
                  </div>
                )}
                {/* Thêm form bổ sung hồ sơ ở đây nếu muốn */}
                <div className="pt-4">
                  <button className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#FFD600] transition-all">
                    Bổ sung hồ sơ
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "baidang" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#FFCE23]">
                Quản lý bài đăng
              </h2>
              {/* Nội dung quản lý bài đăng, ví dụ: danh sách bài đăng, nút tạo mới, ... */}
              <div className="text-gray-600">Bạn chưa có bài đăng nào.</div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}