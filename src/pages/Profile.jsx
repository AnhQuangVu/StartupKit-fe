import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Profile() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hoso");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto mt-10 p-10 bg-white rounded-lg shadow-lg">
          {/* Tabs dọc */}
          <div className="flex flex-col md:flex-row gap-10 mb-6">
            <div className="flex flex-col w-full md:w-1/4">
              <button
                className={`py-2 px-3 font-semibold text-xs text-left rounded transition-all duration-150 ${
                  activeTab === "hoso"
                    ? "bg-[#FFF9E0] text-[#FFCE23]"
                    : "bg-gray-50 text-gray-700 hover:bg-[#FFF9E0] hover:text-[#FFCE23]"
                }`}
                onClick={() => setActiveTab("hoso")}
              >
                Hồ sơ cá nhân
              </button>
              <button
                className={`py-2 px-3 font-semibold text-xs text-left rounded transition-all duration-150 mt-2 ${
                  activeTab === "baidang"
                    ? "bg-[#FFF9E0] text-[#FFCE23]"
                    : "bg-gray-50 text-gray-700 hover:bg-[#FFF9E0] hover:text-[#FFCE23]"
                }`}
                onClick={() => setActiveTab("baidang")}
              >
                Quản lý bài đăng
              </button>
              <button
                className="py-2 px-3 font-semibold text-xs text-left rounded mt-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
            {/* Tab content */}
            <div className="flex-1 min-h-[220px]">
              {activeTab === "hoso" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-[#FFCE23]">
                    Thông tin cá nhân
                  </h2>
                  <form className="space-y-3 max-w-lg" autoComplete="off">
                    <div className="flex flex-col items-center justify-center py-4">
                      <span className="font-semibold text-gray-700 text-sm mb-2">Ảnh cá nhân:</span>
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="w-28 h-28 rounded-full border-2 border-yellow-300 bg-gray-100 flex items-center justify-center shadow-lg overflow-hidden">
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Avatar preview"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">Chọn ảnh</span>
                          )}
                        </div>
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files[0];
                          setAvatar(file);
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setAvatarPreview(reader.result);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            setAvatarPreview(null);
                          }
                        }}
                      />
                      <span className="text-xs text-gray-500 mt-2">Nhấn vào ô tròn để chọn ảnh</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Tên:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        defaultValue={user.full_name}
                        placeholder="Nhập tên"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Email:
                      </span>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        defaultValue={user.email}
                        placeholder="Nhập email"
                        disabled
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Số điện thoại:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        defaultValue={user.phone}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Địa chỉ liên hệ:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        defaultValue={user.address}
                        placeholder="Nhập địa chỉ"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Vai trò:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        value={user.role}
                        disabled
                      />
                    </div>
                    {/* Các trường riêng cho từng vai trò */}
                    {user.role === "startup" && (
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">
                          Tên công ty khởi nghiệp:
                        </span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          defaultValue={user.company}
                          placeholder="Nhập tên công ty"
                        />
                      </div>
                    )}
                    {user.role === "investor" && (
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">
                          Tên quỹ/Công ty đầu tư:
                        </span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          defaultValue={user.company}
                          placeholder="Nhập tên quỹ/công ty"
                        />
                      </div>
                    )}
                    {user.role === "mentor" && (
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">
                          Tổ chức/Đơn vị:
                        </span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          defaultValue={user.company}
                          placeholder="Nhập tổ chức"
                        />
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Facebook:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        defaultValue={user.facebook}
                        placeholder="Link Facebook cá nhân"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        LinkedIn:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        defaultValue={user.linkedin}
                        placeholder="Link LinkedIn cá nhân"
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#FFD600] transition-all text-xs"
                      >
                        Cập nhật hồ sơ
                      </button>
                    </div>
                  </form>
                </section>
              )}

              {activeTab === "baidang" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-[#FFCE23]">
                    Quản lý bài đăng
                  </h2>
                  <div className="text-gray-600 text-sm">
                    Bạn chưa có bài đăng nào.
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}