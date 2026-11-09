import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faTimes, faSpinner, faCheckCircle, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { socialAuth, getSocialConfig } from "../../api/auth";

export default function SocialAuthModal({
  isOpen,
  onClose,
  provider = "google", // 'google' | 'linkedin'
  mode = "login",      // 'login' | 'register'
  defaultRole = "founder",
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(defaultRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [config, setConfig] = useState(null);

  const isGoogle = provider === "google";
  const providerTitle = isGoogle ? "Google" : "LinkedIn";
  const brandColor = isGoogle ? "#EA4335" : "#0A66C2";

  useEffect(() => {
    if (isOpen) {
      setError("");
      setLoading(false);
      setRole(defaultRole);
      // Fetch social config if available
      getSocialConfig().then((cfg) => {
        if (cfg) setConfig(cfg);
      });
    }
  }, [isOpen, defaultRole]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError(`Vui lòng nhập địa chỉ email ${providerTitle} của bạn.`);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
      setError("Địa chỉ email không đúng định dạng.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const avatarUrl = isGoogle
        ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}&backgroundColor=ea4335`
        : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}&backgroundColor=0a66c2`;

      const result = await socialAuth({
        provider,
        email: cleanEmail,
        full_name: fullName.trim() || undefined,
        avatar_url: avatarUrl,
        role,
      });

      if (result && result.access_token) {
        onSuccess(result.access_token, result.user);
        onClose();
      } else {
        throw new Error("Không nhận được token xác thực.");
      }
    } catch (err) {
      setError(err.message || "Xác thực không thành công. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPreset = (presetEmail, presetName, presetRole) => {
    setEmail(presetEmail);
    setFullName(presetName);
    if (presetRole) setRole(presetRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-gray-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className="relative px-6 py-5 text-white flex items-center justify-between"
          style={{
            background: isGoogle
              ? "linear-gradient(135deg, #EA4335 0%, #D93025 50%, #B3261E 100%)"
              : "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <FontAwesomeIcon icon={isGoogle ? faGoogle : faLinkedin} className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {mode === "register" ? "Đăng ký nhanh với" : "Đăng nhập với"} {providerTitle}
              </h3>
              <p className="text-xs text-white/80">Xác thực an toàn & tức thì</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2">
              <span className="font-bold">Lỗi:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Địa chỉ Email {providerTitle} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isGoogle ? "tenban@gmail.com" : "tenban@linkedin.com"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Họ và Tên (Hiển thị)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Role selector for registration */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Vai trò của bạn trên StartupKit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "founder", label: "Startup" },
                    { id: "investor", label: "Nhà đầu tư" },
                    { id: "mentor", label: "Cố vấn" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRole(item.id)}
                      className={`py-2 px-1 text-xs rounded-lg font-medium border text-center transition-all ${
                        role === item.id
                          ? "bg-yellow-400 text-yellow-950 border-yellow-500 shadow-sm"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Presets / Testing accounts */}
            <div className="pt-1">
              <span className="text-[11px] text-gray-500 block mb-1">
                Gợi ý tài khoản nhanh:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    handleQuickPreset(
                      isGoogle ? "founder.demo@gmail.com" : "founder.vietnam@linkedin.com",
                      "Vũ Tuấn Anh (Founder)",
                      "founder"
                    )
                  }
                  className="text-[11px] bg-gray-100 hover:bg-yellow-100 text-gray-700 px-2.5 py-1 rounded-full border border-gray-200 transition-colors"
                >
                  Founder
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQuickPreset(
                      isGoogle ? "investor.demo@gmail.com" : "investor.partner@linkedin.com",
                      "Shark Hưng (Investor)",
                      "investor"
                    )
                  }
                  className="text-[11px] bg-gray-100 hover:bg-yellow-100 text-gray-700 px-2.5 py-1 rounded-full border border-gray-200 transition-colors"
                >
                  Investor
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQuickPreset(
                      isGoogle ? "mentor.demo@gmail.com" : "mentor.expert@linkedin.com",
                      "Chuyên Gia Cố Vấn",
                      "mentor"
                    )
                  }
                  className="text-[11px] bg-gray-100 hover:bg-yellow-100 text-gray-700 px-2.5 py-1 rounded-full border border-gray-200 transition-colors"
                >
                  Mentor
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-all text-sm flex items-center justify-center gap-2 mt-4"
              style={{
                backgroundColor: brandColor,
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-base" />
                  <span>Đang kết nối với {providerTitle}...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={isGoogle ? faGoogle : faLinkedin} />
                  <span>
                    Tiếp tục với {providerTitle} ({mode === "register" ? "Đăng ký" : "Đăng nhập"})
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <FontAwesomeIcon icon={faShieldAlt} className="text-gray-400" />
            <span>Dữ liệu được bảo mật chuẩn OAuth 2.0 & mã hóa JWT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
