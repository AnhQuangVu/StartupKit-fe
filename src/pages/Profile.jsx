import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRocket,
  faMapMarkerAlt,
  faGlobe,
  faBuilding,
  faIndustry,
  faCalendarAlt,
  faUsers,
  faTrophy,
  faFileAlt,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import { uploadToCloudinary } from "../utils/cloudinary";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_BASE, authHeaders, fetchWithTimeout } from "../config/api";

export default function Profile() {
  // Debug: log connect_goal every render

  const { user: authUser, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hoso");
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [formData, setFormData] = useState({});
  const [achievements, setAchievements] = useState([{ content: "", link: "" }]);
  const [startups, setStartups] = useState([
    {
      startup_name: "",
      industry: "",
      founded_year: "",
      team_size: "",
      mission: "",
    },
  ]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });
  useEffect(() => {
    if (!authUser) return;

    // ✅ FIX: Kiểm tra URL ở cả root (authUser.avatar_url) VÀ (authUser.profile.avatar_url)
    const effectiveAvatarUrl = authUser.avatar_url || authUser.profile?.avatar_url || "";
    const effectiveCoverUrl = authUser.cover_url || authUser.profile?.cover_url || "";

    const nextFormData = {
      full_name: authUser.full_name || "",
      avatar_url: effectiveAvatarUrl,
      cover_url: effectiveCoverUrl,
      bio: authUser.profile?.bio || "",
      website_url: authUser.profile?.website_url || "",
      location: authUser.profile?.location || "",
      phone: authUser.profile?.phone || "",
      address: authUser.profile?.address || "",
      company: authUser.profile?.company || "",
      facebook: authUser.profile?.facebook || "",
      linkedin: authUser.profile?.linkedin || "",
      role: authUser.profile?.role || "Founder",
      pitch_deck_url: authUser.profile?.pitch_deck_url || "",
      connect_goal:
        authUser.connect_goal ?? authUser.profile?.connect_goal ?? "",
    };

    setFormData(nextFormData);

    // achievements
    if (
      Array.isArray(authUser.profile?.achievements) &&
      authUser.profile.achievements.length > 0
    ) {
      setAchievements(
        authUser.profile.achievements.map((a) =>
          typeof a === "object" ? a : { content: a, link: "" }
        )
      );
    } else if (
      typeof authUser.profile?.achievements === "string" &&
      authUser.profile.achievements
    ) {
      setAchievements(
        authUser.profile.achievements
          .split("; ")
          .filter(Boolean)
          .map((a) => ({ content: a, link: "" }))
      );
    } else {
      setAchievements([{ content: "", link: "" }]);
    }

    if (
      Array.isArray(authUser.profile?.startups) &&
      authUser.profile.startups.length > 0
    ) {
      setStartups(authUser.profile.startups);
    } else {
      setStartups([
        {
          startup_name: "",
          industry: "",
          founded_year: "",
          team_size: "",
          mission: "",
        },
      ]);
    }

    // ✅ FIX: Cập nhật preview images bằng URL đã xác định
    setCoverPreview(effectiveCoverUrl);
    setAvatarPreview(effectiveAvatarUrl);
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-resize textarea: removes the corner resize handle and grows height with content
  const autoResizeEl = (el) => {
    if (!el) return;
    el.style.height = "auto";
    // add small extra so there's no accidental scrollbar
    el.style.height = `${el.scrollHeight}px`;
  };

  // Ensure existing textareas resize correctly when data loads or updates
  React.useEffect(() => {
    const els = document.querySelectorAll("textarea.auto-resize");
    els.forEach((t) => autoResizeEl(t));
  }, [formData.bio, startups, achievements, formData.connect_goal]);

  // Achievements handlers
  const handleAchievementChange = (idx, field, value) => {
    setAchievements((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };
  const addAchievement = () => {
    setAchievements((prev) => [...prev, { content: "", link: "" }]);
  };
  const removeAchievement = (idx) => {
    setAchievements((prev) => prev.filter((_, i) => i !== idx));
  };

  // Handle dynamic startup fields
  const handleStartupChange = (idx, e) => {
    const { name, value } = e.target;
    setStartups((prev) => {
      const updated = [...prev];
      updated[idx][name] = value;
      return updated;
    });
  };

  const addStartup = () => {
    setStartups((prev) => [
      ...prev,
      {
        startup_name: "",
        industry: "",
        founded_year: "",
        team_size: "",
        mission: "",
      },
    ]);
  };

  const removeStartup = (idx) => {
    setStartups((prev) => prev.filter((_, i) => i !== idx));
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
      payload.startups = startups;
      payload.achievements = achievements.filter(
        (a) => a.content.trim() !== "" || a.link.trim() !== ""
      );

      // Always send avatar_url and bio, even if only those fields are changed
      if (avatar) {
        const avatar_url = await uploadToCloudinary(avatar);
        payload.avatar_url =
          avatar_url ||
          authUser.avatar_url ||
          authUser.profile?.avatar_url ||
          "";
      } else {
        payload.avatar_url =
          formData.avatar_url ||
          authUser.avatar_url ||
          authUser.profile?.avatar_url ||
          "";
      }
      if (cover) {
        const cover_url = await uploadToCloudinary(cover);
        payload.cover_url =
          cover_url || authUser.cover_url || authUser.profile?.cover_url || "";
      } else {
        payload.cover_url =
          formData.cover_url ||
          authUser.cover_url ||
          authUser.profile?.cover_url ||
          "";
      }
      // Always send bio
      payload.bio = formData.bio || authUser.profile?.bio || "";

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
            headers: {
              ...authHeaders(token),
              "Content-Type": "application/json",
            },
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
                activeTab === "thongbao"
                  ? "bg-[#FFF9E0] text-[#FFCE23]"
                  : "bg-gray-50 text-gray-700 hover:bg-[#FFF9E0] hover:text-[#FFCE23]"
              }`}
              onClick={() => setActiveTab("thongbao")}
            >
              Quản lý thông báo
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
                  className="space-y-8 max-w-3xl mx-auto"
                  autoComplete="off"
                  onSubmit={handleUpdateProfile}
                >
                  {/* Cover + Avatar */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-40 w-full bg-gray-200">
                      <label
                        htmlFor="cover-upload"
                        className="absolute inset-0 cursor-pointer"
                      >
                        <img
                          src={
                            authUser.cover_url ||
                            coverPreview ||
                            authUser.profile?.cover_url ||
                            ""
                          }
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
                              reader.onloadend = () =>
                                setCoverPreview(reader.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <div className="absolute left-6 -bottom-16">
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer"
                        >
                          <img
                            src={
                              authUser.avatar_url ||
                              avatarPreview ||
                              authUser.profile?.avatar_url ||
                              ""
                            }
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
                                reader.onloadend = () =>
                                  setAvatarPreview(reader.result);
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
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <FontAwesomeIcon icon={faUser} color="#222" />
                            </span>
                            <input
                              name="full_name"
                              placeholder="Họ và tên Founder"
                              value={formData.full_name || ""}
                              onChange={handleInputChange}
                              className="border p-2 rounded pl-10 w-full"
                            />
                          </div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <FontAwesomeIcon
                                icon={faRocket}
                                color="#FFD600"
                              />
                            </span>
                            <input
                              name="role"
                              placeholder="Vai trò (Founder, CEO...)"
                              value={formData.role || ""}
                              onChange={handleInputChange}
                              className="border p-2 rounded pl-10 w-full"
                            />
                          </div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                color="#888"
                              />
                            </span>
                            <input
                              name="location"
                              placeholder="Địa điểm"
                              value={formData.location || ""}
                              onChange={handleInputChange}
                              className="border p-2 rounded pl-10 w-full"
                            />
                          </div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <FontAwesomeIcon icon={faGlobe} color="#FFD600" />
                            </span>
                            <input
                              name="website_url"
                              placeholder="Website cá nhân"
                              value={formData.website_url || ""}
                              onChange={handleInputChange}
                              className="border p-2 rounded pl-10 w-full"
                            />
                          </div>
                          <textarea
                            name="bio"
                            placeholder="Giới thiệu ngắn..."
                            value={formData.bio || ""}
                            onChange={handleInputChange}
                            onInput={(e) => autoResizeEl(e.target)}
                            className="border p-2 rounded sm:col-span-2 resize-none overflow-hidden auto-resize"
                          />
                        </div>
                      </div>

                      {/* Thông tin startup */}
                      <div className="mb-8 border-b pb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          <span className="inline-block mr-2 align-middle">
                            <FontAwesomeIcon icon={faBuilding} color="#222" />
                          </span>{" "}
                          Thông tin Startup
                        </h3>
                        {startups.map((startup, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative border rounded-lg p-4"
                          >
                            <button
                              type="button"
                              className="absolute right-2 top-2 text-xs text-red-500"
                              onClick={() => removeStartup(idx)}
                              disabled={startups.length === 1}
                            >
                              X
                            </button>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FontAwesomeIcon
                                  icon={faBuilding}
                                  color="#222"
                                />
                              </span>
                              <input
                                name="startup_name"
                                placeholder="Tên startup"
                                value={startup.startup_name}
                                onChange={(e) => handleStartupChange(idx, e)}
                                className="border p-2 rounded pl-10 w-full"
                              />
                            </div>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FontAwesomeIcon
                                  icon={faIndustry}
                                  color="#FFD600"
                                />
                              </span>
                              <input
                                name="industry"
                                placeholder="Lĩnh vực hoạt động"
                                value={startup.industry}
                                onChange={(e) => handleStartupChange(idx, e)}
                                className="border p-2 rounded pl-10 w-full"
                              />
                            </div>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  color="#888"
                                />
                              </span>
                              <input
                                type="number"
                                name="founded_year"
                                placeholder="Năm thành lập"
                                value={startup.founded_year}
                                onChange={(e) => handleStartupChange(idx, e)}
                                className="border p-2 rounded pl-10 w-full"
                              />
                            </div>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FontAwesomeIcon
                                  icon={faUsers}
                                  color="#FFD600"
                                />
                              </span>
                              <input
                                type="number"
                                name="team_size"
                                placeholder="Quy mô đội ngũ"
                                value={startup.team_size}
                                onChange={(e) => handleStartupChange(idx, e)}
                                className="border p-2 rounded pl-10 w-full"
                              />
                            </div>
                            <textarea
                              name="mission"
                              placeholder="Sứ mệnh / Giá trị cốt lõi"
                              value={startup.mission}
                              onChange={(e) => handleStartupChange(idx, e)}
                              onInput={(e) => autoResizeEl(e.target)}
                              className="border p-2 rounded sm:col-span-2 resize-none overflow-hidden auto-resize"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          className="mt-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded shadow"
                          onClick={addStartup}
                        >
                          + Thêm Startup
                        </button>
                      </div>

                      {/* Thành tựu */}
                      <div className="mb-8 border-b pb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          <span className="inline-block mr-2 align-middle">
                            <FontAwesomeIcon icon={faTrophy} color="#222" />
                          </span>{" "}
                          Thành tựu & Pitch Deck
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Achievements list */}
                          {achievements.map((ach, idx) => (
                            <div
                              key={idx}
                              className="relative bg-gray-50 rounded-lg border p-4 mb-4 flex flex-col gap-3 shadow-sm"
                            >
                              <div className="flex flex-row items-center gap-3">
                                <span className="text-yellow-500">
                                  <FontAwesomeIcon icon={faTrophy} />
                                </span>
                                <label className="font-medium text-gray-700 w-32">
                                  Thành tựu:
                                </label>
                                <input
                                  type="text"
                                  value={ach.content}
                                  onChange={(e) =>
                                    handleAchievementChange(
                                      idx,
                                      "content",
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Nội dung thành tựu #${idx + 1}`}
                                  className="border p-2 rounded w-full"
                                />
                                <button
                                  type="button"
                                  className="text-xs text-red-500 px-2"
                                  onClick={() => removeAchievement(idx)}
                                  disabled={achievements.length === 1}
                                >
                                  X
                                </button>
                              </div>
                              <div className="flex flex-row items-center gap-3">
                                <span className="text-gray-700">
                                  <FontAwesomeIcon icon={faFileAlt} />
                                </span>
                                <label className="font-medium text-gray-700 w-32">
                                  Link/Pitch deck:
                                </label>
                                <input
                                  type="text"
                                  value={ach.link}
                                  onChange={(e) =>
                                    handleAchievementChange(
                                      idx,
                                      "link",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Link video / pitch deck (tuỳ chọn)"
                                  className="border p-2 rounded w-full"
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="mt-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded shadow w-fit"
                            onClick={addAchievement}
                          >
                            + Thêm thành tựu
                          </button>
                        </div>
                      </div>

                      {/* Mục tiêu kết nối */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          <span className="inline-block mr-2 align-middle">
                            <FontAwesomeIcon icon={faBullseye} color="#222" />
                          </span>{" "}
                          Mục tiêu kết nối
                        </h3>
                        <div className="relative">
                          <span className="absolute left-3 top-3">
                            <FontAwesomeIcon
                              icon={faBullseye}
                              color="#FFD600"
                            />
                          </span>
                          <textarea
                            name="connect_goal"
                            placeholder="Nhà đầu tư, mentor, đối tác..."
                            value={formData?.connect_goal || ""}
                            onChange={handleInputChange}
                            onInput={(e) => autoResizeEl(e.target)}
                            className="border p-2 rounded pl-10 w-full resize-none overflow-hidden auto-resize"
                          />
                        </div>
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
                          onClick={() => {
                            // DEBUG: Log avatarPreview, coverPreview, formData

                            const publicFormData = {
                              ...formData,
                              avatar_url: avatarPreview || formData.avatar_url || "",
                              cover_url: coverPreview || formData.cover_url || ""
                            };
                            navigate("/public-profile/", {
                              state: {
                                formData: publicFormData,
                                achievements,
                                startups
                              }
                            });
                          }}
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
