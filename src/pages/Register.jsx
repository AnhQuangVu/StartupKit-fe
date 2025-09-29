import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faDollarSign, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "startup",
    company: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây
    console.log("Registration data:", formData);
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
                  className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-colors"
                  placeholder="Nhập tên đăng nhập"
                />
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
                      formData.userType === "startup"
                        ? "border-[#FFCE23] bg-[#FFF9E0]"
                        : "border-gray-200 hover:border-[#FFCE23]"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        userType: "startup",
                      }))
                    }
                  >
                    <input
                      type="radio"
                      name="userType"
                      value="startup"
                      checked={formData.userType === "startup"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-base mb-1">
                        <FontAwesomeIcon icon={faRocket} />
                      </div>
                      <div className="font-medium text-xs">Startup</div>
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.agreeTerms}
                className="w-full bg-[#FFCE23] hover:bg-[#FFD600] disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold py-2 px-4 rounded-md text-sm md:text-base transition-all duration-200"
              >
                Tạo tài khoản
              </button>

              {/* Login Link */}
              <div className="text-center text-xs text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  to="/dangnhap"
                  className="text-[#FFCE23] hover:underline font-medium"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;