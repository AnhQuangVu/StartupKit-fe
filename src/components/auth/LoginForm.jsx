import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { API_BASE, fetchWithTimeout } from '../../config/api';
import { useAuth } from "../../context/AuthContext";
import SocialAuthModal from "./SocialAuthModal";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [socialProvider, setSocialProvider] = useState("google");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOpenSocial = (provider) => {
    setSocialProvider(provider);
    setSocialModalOpen(true);
  };

  const handleSocialSuccess = (token, user) => {
    login(token, user);
    toast.success(`Đăng nhập thành công với ${socialProvider === 'google' ? 'Google' : 'LinkedIn'}! Chào mừng ${user?.full_name || 'bạn'}.`);
    setTimeout(() => {
      navigate("/");
    }, 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double-submit
    let valid = true;
    const emailTrim = email.trim();
    const passwordVal = password; // don't trim passwords silently; compare as-is

    // Email validation
    if (!emailTrim) {
      setErrorEmail("Vui lòng nhập email.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailTrim)) {
      setErrorEmail("Email không hợp lệ.");
      valid = false;
    } else {
      setErrorEmail("");
    }

    // Password validation
    if (!passwordVal) {
      setErrorPassword("Vui lòng nhập mật khẩu.");
      valid = false;
    } else if (passwordVal.length < 6) {
      setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự.");
      valid = false;
    } else {
      setErrorPassword("");
    }

    if (!valid) {
      // Build inline error summary without relying on possibly stale state
      const errs = [];
      if (!emailTrim) errs.push("Vui lòng nhập email.");
      else if (!/\S+@\S+\.\S+/.test(emailTrim)) errs.push("Email không hợp lệ.");
      if (!passwordVal) errs.push("Vui lòng nhập mật khẩu.");
      else if (passwordVal.length < 6) errs.push("Mật khẩu phải có ít nhất 6 ký tự.");
      if (errs.length) toast.error(errs.join("\n"));
      setFormError("");
      return;
    }

    setFormError("");
    try {
      setLoading(true);
      const t0 = performance.now();
      const tokenRes = await fetchWithTimeout(`${API_BASE}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        body: new URLSearchParams({ username: emailTrim, password: passwordVal }),
        timeout: 10000, // 10s timeout for slow servers
      });
      const t1 = performance.now();
      const data = await tokenRes.json();

      if (tokenRes.ok && data.access_token) {
        // Gọi API lấy thông tin user
        const tUser0 = performance.now();
        const userRes = await fetchWithTimeout(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${data.access_token}` },
          timeout: 8000,
        });
        const user = await userRes.json();
        const tUser1 = performance.now();

        // Lưu vào context
        login(data.access_token, user);
        toast.success("Đăng nhập thành công! Chào mừng bạn.");
        // Thông báo nếu server phản hồi chậm
        const tokenMs = Math.round(t1 - t0);
        const userMs = Math.round(tUser1 - tUser0);
        const totalMs = Math.round(tUser1 - t0);
        if (tokenMs > 2000 || userMs > 2000) {
          toast.info("Máy chủ đang phản hồi chậm. Vui lòng kiên nhẫn hoặc thử lại sau.", { autoClose: 3000 });
        }
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // Hiển thị lỗi từ backend nếu có
        const msg = data?.detail || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
        setFormError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = "Lỗi kết nối máy chủ hoặc máy chủ phản hồi quá lâu. Vui lòng thử lại sau.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Social Auth Modal */}
      <SocialAuthModal
        isOpen={socialModalOpen}
        onClose={() => setSocialModalOpen(false)}
        provider={socialProvider}
        mode="login"
        onSuccess={handleSocialSuccess}
      />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="StartupKit Logo" className="h-10 w-auto" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">
          Đăng Nhập
        </h2>
        <p className="text-xs text-center text-gray-500 mb-6">
          Chào mừng bạn quay lại với nền tảng StartupKit
        </p>

        {/* Thông báo lỗi tổng quát */}
        {formError && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2.5">
            {formError}
          </div>
        )}

        {/* Thông báo thành công tổng quát */}
        {successMsg && (
          <div className="mb-4 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg p-2.5">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorEmail) setErrorEmail("");
              }}
              placeholder="tenban@email.com"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                errorEmail
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-400 focus:border-transparent"
              }`}
            />
            {errorEmail && (
              <p className="text-[11px] text-red-500 mt-1">{errorEmail}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorPassword) setErrorPassword("");
              }}
              placeholder="••••••••"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                errorPassword
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-400 focus:border-transparent"
              }`}
            />
            {errorPassword && (
              <p className="text-[11px] text-red-500 mt-1">{errorPassword}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end pt-1">
            <a
              href="#"
              className="text-xs text-yellow-500 font-medium hover:underline transition-all"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-2 rounded-lg shadow-md transition-all text-sm ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-yellow-500 hover:to-yellow-400'
            }`}
          >
            {loading ? 'Đang đăng nhập…' : 'Đăng Nhập'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-2 text-xs text-gray-400">Hoặc</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Social login */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleOpenSocial("google")}
            className="flex items-center justify-center gap-2.5 w-full border border-gray-300 py-2.5 rounded-lg bg-white hover:bg-red-50 hover:border-red-200 transition-all shadow-sm text-xs font-medium text-gray-700"
          >
            <FontAwesomeIcon
              icon={faGoogle}
              className="w-4 h-4 text-[#EA4335]"
            />
            <span>Đăng nhập với Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenSocial("linkedin")}
            className="flex items-center justify-center gap-2.5 w-full border border-gray-300 py-2.5 rounded-lg bg-white hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm text-xs font-medium text-gray-700"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="w-4 h-4 text-[#0A66C2]"
            />
            <span>Đăng nhập với LinkedIn</span>
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-xs mt-8 text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-yellow-500 font-semibold hover:underline transition-all"
          >
            Đăng Ký
          </Link>
        </p>
      </div>
    </div>
  );
}
