import React, { useState, useEffect } from "react";
import { uploadToCloudinary } from "../utils/cloudinary";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_BASE, authHeaders, fetchWithTimeout } from "../config/api";

export default function Profile() {
  const { user: authUser, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hoso");
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (authUser) {
      setFormData({
        full_name: authUser.full_name || "",
        avatar_url: authUser.profile?.avatar_url || "",
        cover_url: authUser.profile?.cover_url || "",
        bio: authUser.profile?.bio || "",
        website_url: authUser.profile?.website_url || "",
        location: authUser.profile?.location || "",
        phone: authUser.profile?.phone || "",
        address: authUser.profile?.address || "",
        company: authUser.profile?.company || "",
        facebook: authUser.profile?.facebook || "",
        linkedin: authUser.profile?.linkedin || "",
        role: authUser.profile?.role || "Founder",
        startup_name: authUser.profile?.startup_name || "",
        industry: authUser.profile?.industry || "",
        founded_year: authUser.profile?.founded_year || "",
        mission: authUser.profile?.mission || "",
        achievements: authUser.profile?.achievements || "",
        team_size: authUser.profile?.team_size || "",
        startup_website: authUser.profile?.startup_website || "",
        startup_facebook: authUser.profile?.startup_facebook || "",
        startup_linkedin: authUser.profile?.startup_linkedin || "",
        pitch_deck_url: authUser.profile?.pitch_deck_url || "",
        connect_goal: authUser.profile?.connect_goal || "",
      });
      setCoverPreview(authUser.profile?.cover_url || "");
      setAvatarPreview(authUser.profile?.avatar_url || "");
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const showToast = (message, type = "success") => {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.top = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = type === "success" ? "#4CAF50" : "#f44336";
    toast.style.color = "#fff";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "9999";
    toast.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUpdateMessage({ type: "", text: "" });

    try {
      let payload = { ...formData };

      if (avatar) {
        const avatar_url = await uploadToCloudinary(avatar);
        payload.avatar_url = avatar_url || authUser.profile?.avatar_url || "";
      }
      if (cover) {
        const cover_url = await uploadToCloudinary(cover);
        payload.cover_url = cover_url || authUser.profile?.cover_url || "";
      }

      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const token = localStorage.getItem("token");
      const response = await fetchWithTimeout(`${API_BASE}/users/me`, {
        method: "PATCH",
        headers: { ...authHeaders(token), "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        timeout: 12000,
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.detail || "Lỗi cập nhật");

      if (updateUser) {
        try {
          const userRes = await fetchWithTimeout(`${API_BASE}/users/me`, {
            method: "GET",
            headers: { ...authHeaders(token), "Content-Type": "application/json" },
            timeout: 8000,
          });
          const userData = await userRes.json();
          updateUser(userData);
        } catch {
          updateUser(responseData);
        }
      }

      showToast("Cập nhật hồ sơ thành công!", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authUser) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-600">Đang tải thông tin...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="flex flex-col w-full md:w-1/4">
            <button
              className={`py-2 px-3 font-semibold text-xs text-left rounded ${
                activeTab === "hoso"
                  ? "bg-[#FFF9E0] text-[#FFCE23]"
                  : "bg-gray-50 text-gray-700 hover:bg-[#FFF9E0] hover:text-[#FFCE23]"
              }`}
              onClick={() => setActiveTab("hoso")}
            >
              Hồ sơ cá nhân
            </button>
            <button
              className={`py-2 px-3 font-semibold text-xs text-left rounded mt-2 ${
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

          {/* Content */}
          <div className="flex-1">
            {activeTab === "hoso" && (
              <section>
                <form
                  className="space-y-8 max-w-xl mx-auto"
                  autoComplete="off"
                  onSubmit={handleUpdateProfile}
                >
                  {/* Cover + Avatar */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-40 w-full bg-gray-200">
                      <label htmlFor="cover-upload" className="absolute inset-0 cursor-pointer">
                        <img
                          src={coverPreview || ""}
                          alt="cover"
                          className="w-full h-full object-cover"
                        />
                        <input
                          id="cover-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setCover(file);
                              const reader = new FileReader();
                              reader.onloadend = () => setCoverPreview(reader.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <div className="absolute left-6 -bottom-16">
                        <label htmlFor="avatar-upload" className="cursor-pointer">
                          <img
                            src={avatarPreview || ""}
                            alt="avatar"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                          />
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setAvatar(file);
                                const reader = new FileReader();
                                reader.onloadend = () => setAvatarPreview(reader.result);
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="pt-20 pb-8 px-8">
                      {/* Thông tin cá nhân */}
                      <div className="mb-8 border-b pb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          👤 Thông tin cá nhân
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input name="full_name" placeholder="Họ và tên Founder" value={formData.full_name || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <input name="role" placeholder="Vai trò (Founder, CEO...)" value={formData.role || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <input name="location" placeholder="Địa điểm" value={formData.location || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <input name="website_url" placeholder="Website cá nhân" value={formData.website_url || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <textarea name="bio" placeholder="Giới thiệu ngắn..." value={formData.bio || ""} onChange={handleInputChange} className="border p-2 rounded sm:col-span-2" />
                        </div>
                      </div>

                      {/* Thông tin startup */}
                      <div className="mb-8 border-b pb-6">
                        <h3 className="text-lg font-bold text-purple-700 mb-4">
                          🚀 Thông tin Startup
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input name="startup_name" placeholder="Tên startup" value={formData.startup_name || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <input name="industry" placeholder="Lĩnh vực hoạt động" value={formData.industry || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <input name="founded_year" placeholder="Năm thành lập" value={formData.founded_year || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <input name="team_size" placeholder="Quy mô đội ngũ" value={formData.team_size || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <textarea name="mission" placeholder="Sứ mệnh / Giá trị cốt lõi" value={formData.mission || ""} onChange={handleInputChange} className="border p-2 rounded sm:col-span-2" />
                        </div>
                      </div>

                      {/* Thành tựu */}
                      <div className="mb-8 border-b pb-6">
                        <h3 className="text-lg font-bold text-green-700 mb-4">
                          🏆 Thành tựu & Pitch Deck
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          <textarea name="achievements" placeholder="Các thành tựu nổi bật..." value={formData.achievements || ""} onChange={handleInputChange} className="border p-2 rounded" />
                          <input name="pitch_deck_url" placeholder="Link video / pitch deck" value={formData.pitch_deck_url || ""} onChange={handleInputChange} className="border p-2 rounded" />
                        </div>
                      </div>

                      {/* Mục tiêu kết nối */}
                      <div>
                        <h3 className="text-lg font-bold text-yellow-700 mb-4">🤝 Mục tiêu kết nối</h3>
                        <textarea name="connect_goal" placeholder="Nhà đầu tư, mentor, đối tác..." value={formData.connect_goal || ""} onChange={handleInputChange} className="border p-2 rounded w-full" />
                      </div>

                      <div className="flex gap-3 mt-8">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`px-5 py-2 rounded-full bg-[#FFCE23] text-black font-semibold shadow hover:bg-yellow-300 transition ${
                            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                        >
                          {isSubmitting ? "Đang cập nhật..." : "Lưu thay đổi"}
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate("/public-profile")}
                          className="px-5 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold shadow hover:bg-gray-300 transition"
                        >
                          Xem hồ sơ công khai
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
