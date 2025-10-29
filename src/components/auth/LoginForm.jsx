import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { API_BASE, fetchWithTimeout } from '../../config/api';
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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
      console.log("Login response:", data); // DEBUG

      if (tokenRes.ok && data.access_token) {
        // Gọi API lấy thông tin user
        const tUser0 = performance.now();
        const userRes = await fetchWithTimeout(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${data.access_token}` },
          timeout: 8000,
        });
        const user = await userRes.json();
        const tUser1 = performance.now();
        console.log("User info:", user); // DEBUG

        // Lưu vào context
        login(data.access_token, user);
        toast.success("Đăng nhập thành công! Chào mừng bạn.");
        // Thông báo nếu server phản hồi chậm
        const tokenMs = Math.round(t1 - t0);
        const userMs = Math.round(tUser1 - tUser0);
        const totalMs = Math.round(tUser1 - t0);
        if (tokenMs > 2000 || userMs > 2000) {
          console.warn(`Login slow: token ${tokenMs}ms, user ${userMs}ms, total ${totalMs}ms`);
          toast.info("Máy chủ đang phản hồi chậm. Vui lòng kiên nhẫn hoặc thử lại sau.", { autoClose: 3000 });
        }
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const msg = Array.isArray(data.detail)
          ? data.detail.map((d) => d.msg).join(", ")
          : data.detail || data.message || "Đăng nhập thất bại. Vui lòng thử lại.";
        toast.error(msg);
        setFormError("");
      }
    } catch (error) {
      if (error?.message && (
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError') ||
        error.message.includes('ERR_CONNECTION_REFUSED')
      )) {
        toast.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra API_BASE hoặc trạng thái máy chủ.");
      } else if (error?.name === 'AbortError') {
        toast.error("Máy chủ phản hồi quá lâu (timeout). Vui lòng thử lại sau.");
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
      setFormError("");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50 px-2">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        {/* Logo thay cho tiêu đề */}
        <div className="flex justify-center mb-7">
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: "150px", height: "auto" }}
          />
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
        {/* Error message đã chuyển sang toast, không hiện dưới input */}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              aria-required="true"
              aria-invalid={!!errorEmail}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
            />
            {errorEmail && (
              <div className="mt-1 text-xs text-red-500">{errorEmail}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
            <input
                type="password"
              name="current-password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
              aria-required="true"
              aria-invalid={!!errorPassword}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
            />
            </div>
            {errorPassword && (
              <div className="mt-1 text-xs text-red-500">{errorPassword}</div>
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
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg bg-white hover:bg-yellow-50 transition-all shadow-sm text-xs">
            <FontAwesomeIcon
              icon={faGoogle}
              className="w-5 h-5 text-gray-700"
            />
            <span className="font-medium text-gray-700">
              Đăng nhập với Google
            </span>
          </button>

          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg bg-white hover:bg-yellow-50 transition-all shadow-sm text-xs">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="w-5 h-5 text-gray-700"
            />
            <span className="font-medium text-gray-700">
              Đăng nhập với LinkedIn
            </span>
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
