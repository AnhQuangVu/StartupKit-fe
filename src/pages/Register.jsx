// Đã loại bỏ hàm encodeHTML và safeInputChange
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faDollarSign, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo.png";
import { API_BASE } from '../config/api';
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

  const validate = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "Vui lòng nhập họ tên.";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ.";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu.";
    else if (formData.password.length < 6) newErrors.password = "Mật khẩu phải ít nhất 6 ký tự.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
    if (!formData.agreeTerms) newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản.";
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
      full_name: formData.userName,
      email: formData.email,
      password: formData.password,
      password_confirm: formData.confirmPassword,
      role: formData.userType, // sẽ là founder nếu chọn founder
    };

    try {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/http://160.191.243.253:8003/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();


      if (response.ok) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setTimeout(() => {
          setIsSubmitting(false);
          navigate("/dang-nhap");
        }, 1500);
      } else {
        setIsSubmitting(false); // Cho phép bấm lại nếu lỗi
        toast.error(data.message || "Đăng ký thất bại. Vui lòng thử lại.");
        console.error("Lỗi đăng ký:", data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center" style={{ background: '#fffbf0' }}>
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
              minWidth: '400px',
              maxWidth: '540px',
              marginTop: '-56px',
              borderTopWidth: '6px',
              borderBottomWidth: '6px',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border  border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                    placeholder="Nhập họ tên"
                  />
                {errors.userName && <div className="text-xs text-red-500 mt-1">{errors.userName}</div>}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                  placeholder="Nhập địa chỉ email"
                />
                {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
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
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                    placeholder="Nhập mật khẩu"
                  />
                  {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                    placeholder="Nhập lại mật khẩu"
                  />
                  {errors.confirmPassword && <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>}
                </div>
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
                      <div className="font-medium text-xs">Nhà đầu tư</div>
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
              {errors.agreeTerms && <div className="text-xs text-red-500 mt-1">{errors.agreeTerms}</div>}

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