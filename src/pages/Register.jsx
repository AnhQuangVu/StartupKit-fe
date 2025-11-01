// Đã loại bỏ hàm encodeHTML và safeInputChange
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faDollarSign,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo.png";
import { API_BASE, fetchWithTimeout } from "../config/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "founder", // Đổi mặc định thành founder
    company: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 2) return { score, label: "Yếu" };
    if (score === 3) return { score, label: "Trung bình" };
    return { score, label: "Mạnh" };
  };

  const validate = () => {
    const newErrors = {};
    const nameTrim = formData.userName.trim();
    const emailTrim = formData.email.trim();
    const pwd = formData.password;
    const pwd2 = formData.confirmPassword;
    if (!nameTrim) newErrors.userName = "Vui lòng nhập họ tên.";
    else if (nameTrim.length < 3)
      newErrors.userName = "Họ tên phải ít nhất 3 ký tự.";
    if (!emailTrim) newErrors.email = "Vui lòng nhập email.";
    else if (!/\S+@\S+\.\S+/.test(emailTrim))
      newErrors.email = "Email không hợp lệ.";
    if (!pwd) newErrors.password = "Vui lòng nhập mật khẩu.";
    else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(pwd))
      newErrors.password = "Mật khẩu tối thiểu 8 ký tự, gồm chữ và số.";
    if (!pwd2) newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu.";
    else if (pwd !== pwd2)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    const payload = {
      full_name: formData.userName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      password_confirm: formData.confirmPassword,
      role: formData.userType, // sẽ là founder nếu chọn founder
      company: formData.company?.trim() || undefined,
    };

    try {
      const t0 = performance.now();
      const response = await fetchWithTimeout(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        timeout: 12000,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        const t1 = performance.now();
        const ms = Math.round(t1 - t0);
        if (ms > 2000) {
          toast.info("Máy chủ phản hồi chậm khi đăng ký (" + ms + "ms)", {
            autoClose: 2500,
          });
        }
        setTimeout(() => {
          setIsSubmitting(false);
          navigate("/dang-nhap");
        }, 1500);
      } else {
        setIsSubmitting(false); // Cho phép bấm lại nếu lỗi
        const msg =
          data?.message ||
          (Array.isArray(data?.detail)
            ? data.detail.map((d) => d.msg).join(", ")
            : data?.detail) ||
          "Đăng ký thất bại. Vui lòng thử lại.";
        toast.error(msg);
        console.error("Lỗi đăng ký:", data);
      }
    } catch (error) {
      if (
        error?.message &&
        (error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError") ||
          error.message.includes("ERR_CONNECTION_REFUSED"))
      ) {
        toast.error(
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra API_BASE hoặc trạng thái máy chủ."
        );
      } else if (error?.name === "AbortError") {
        toast.error(
          "Máy chủ phản hồi quá lâu (timeout). Vui lòng thử lại sau."
        );
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main
        className="flex-1 flex items-center justify-center"
        style={{ background: "#fffbf0" }}
      >
        <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center">
          {/* Header */}
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-5"
            style={{ maxWidth: "180px", height: "auto" }} // Logo nhỏ lại
          />
          {/* Registration Form */}
          <div
            className="bg-white rounded-lg shadow-lg border p-7 max-w-xl w-full"
            style={{
              minWidth: "400px",
              maxWidth: "540px",
              marginTop: "-56px",
              borderTopWidth: "6px",
              borderBottomWidth: "6px",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Họ tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.userName}
                  className="w-full px-3 py-2 text-sm border  border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                  placeholder="Nhập họ tên"
                />
                {errors.userName && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.userName}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                  placeholder="Nhập địa chỉ email"
                />
                {errors.email && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Company/Organization (conditional) */}
              {(formData.userType === "investor" ||
                formData.userType === "mentor") && (
                <div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                    placeholder={
                      formData.userType === "investor"
                        ? "Tên quỹ đầu tư hoặc công ty"
                        : "Tên tổ chức bạn đang làm việc"
                    }
                  />
                </div>
              )}

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    className="w-full px-3 py-2 text-sm pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                    placeholder="Nhập mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-2 text-xs text-gray-600 hover:text-gray-800 z-10"
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
                {errors.password && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.password}
                  </div>
                )}
                {!errors.password && formData.password && (
                  <div className="mt-2">
                    {(() => {
                      const { score, label } = getPasswordStrength(
                        formData.password
                      );
                      const percent = Math.min(100, score * 20);
                      const color =
                        score <= 2
                          ? "bg-red-500"
                          : score === 3
                          ? "bg-yellow-500"
                          : "bg-green-600";
                      return (
                        <>
                          <div className="h-1.5 bg-gray-200 rounded">
                            <div
                              className={`h-1.5 ${color} rounded transition-all duration-300`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="text-[11px] text-gray-600 mt-1">
                            Độ mạnh mật khẩu: {label}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nhập lại mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.confirmPassword}
                    className="w-full px-3 py-2 text-sm pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                    placeholder="Nhập lại mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-2 top-2 text-xs text-gray-600 hover:text-gray-800 z-10"
                  >
                    {showConfirmPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* User Type Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Xác nhận vai trò:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                      formData.userType === "founder"
                        ? "border-[#FFCE23] bg-[#FFF9E0]"
                        : "border-gray-200 hover:border-[#FFCE23]"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        userType: "founder",
                      }))
                    }
                  >
                    <input
                      type="radio"
                      name="userType"
                      value="founder"
                      checked={formData.userType === "founder"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-base mb-1">
                        <FontAwesomeIcon icon={faRocket} />
                      </div>
                      <div className="font-medium text-xs">Founder</div>
                    </div>
                  </div>
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                      formData.userType === "investor"
                        ? "border-[#FFCE23] bg-[#FFF9E0]"
                        : "border-gray-200 hover:border-[#FFCE23]"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        userType: "investor",
                      }))
                    }
                  >
                    <input
                      type="radio"
                      name="userType"
                      value="investor"
                      checked={formData.userType === "investor"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-base mb-1">
                        <FontAwesomeIcon icon={faDollarSign} />
                      </div>
                      <div className="font-medium text-xs">Investor</div>
                    </div>
                  </div>
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                      formData.userType === "mentor"
                        ? "border-[#FFCE23] bg-[#FFF9E0]"
                        : "border-gray-200 hover:border-[#FFCE23]"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, userType: "mentor" }))
                    }
                  >
                    <input
                      type="radio"
                      name="userType"
                      value="mentor"
                      checked={formData.userType === "mentor"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-base mb-1">
                        <FontAwesomeIcon icon={faChalkboardTeacher} />
                      </div>
                      <div className="font-medium text-xs">Mentor</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="mt-1 w-4 h-4 text-[#FFCE23] border-gray-300 rounded focus:ring-[#FFCE23]"
                />
                <label htmlFor="agreeTerms" className="text-xs text-gray-600">
                  Tôi đồng ý với{" "}
                  <a href="#" className="text-[#FFCE23] hover:underline">
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-[#FFCE23] hover:underline">
                    Chính sách bảo mật
                  </a>{" "}
                  của StartupKit
                </label>
              </div>
              {errors.agreeTerms && (
                <div className="text-xs text-red-500 mt-1">
                  {errors.agreeTerms}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.agreeTerms || isSubmitting}
                className="w-full bg-[#FFCE23] hover:bg-[#FFD600] disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold py-2 px-4 rounded-md text-sm md:text-base transition-all duration-200"
              >
                Tạo tài khoản
              </button>

              {/* Login Link */}
              <div className="text-center text-xs text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  to="/dang-nhap"
                  className="text-[#FFCE23] hover:underline font-medium"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Register;
