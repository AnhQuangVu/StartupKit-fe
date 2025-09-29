import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Register = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "startup",
    company: "",
    interests: [],
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng ký tài khoản - StartupKit";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Đăng ký tài khoản StartupKit để tạo hồ sơ startup, kết nối nhà đầu tư và tìm kiếm mentor.";
    document.head.appendChild(metaDescription);
    return () => document.head.removeChild(metaDescription);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "interests") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (currentSlide === 0) {
      if (!formData.userName) newErrors.userName = "Vui lòng nhập tên đăng nhập";
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Vui lòng nhập email hợp lệ";
    }
    if (currentSlide === 1) {
      if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
      if (formData.password.length < 6)
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Mật khẩu không khớp";
    }
    if (currentSlide === 2) {
      if ((formData.userType === "investor" || formData.userType === "mentor") && !formData.company)
        newErrors.company = "Vui lòng nhập tên công ty/tổ chức";
    }
    if (currentSlide === 3) {
      if (formData.interests.length === 0)
        newErrors.interests = "Vui lòng chọn ít nhất một lĩnh vực quan tâm";
    }
    if (currentSlide === 4) {
      if (!formData.agreeTerms)
        newErrors.agreeTerms = "Vui lòng đồng ý với điều khoản dịch vụ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Giả lập gửi dữ liệu (thay bằng API call thực tế)
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/dangnhap");
      }, 1500);
    }
  };

  const nextSlide = () => {
    if (validateForm()) {
      setCurrentSlide((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const isSlideValid = () => {
    if (currentSlide === 0) {
      return formData.userName && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    }
    if (currentSlide === 1) {
      return (
        formData.password &&
        formData.password.length >= 6 &&
        formData.password === formData.confirmPassword
      );
    }
    if (currentSlide === 2) {
      if (["investor", "mentor"].includes(formData.userType)) {
        return !!formData.company;
      }
      return true;
    }
    if (currentSlide === 3) {
      return formData.interests.length > 0;
    }
    if (currentSlide === 4) {
      return formData.agreeTerms;
    }
    return true;
  };

  const slides = [
    <div key="slide1" className="space-y-6">
      <div>
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
          Tên đăng nhập <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          required
          aria-describedby="userName-error"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-all"
          placeholder="Nhập tên đăng nhập"
        />
        {errors.userName && <p id="userName-error" className="text-sm text-red-500 mt-1">{errors.userName}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          aria-describedby="email-error"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-all"
          placeholder="Nhập địa chỉ email"
        />
        {errors.email && <p id="email-error" className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>
    </div>,

    <div key="slide2" className="space-y-6">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Mật khẩu <span className="text-red-500">*</span>
        </label>
        <input
          type="password" // Bỏ icon mắt, chỉ dùng type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          aria-describedby="password-error"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-all"
          placeholder="Nhập mật khẩu"
        />
        {errors.password && <p id="password-error" className="text-sm text-red-500 mt-1">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Xác nhận mật khẩu <span className="text-red-500">*</span>
        </label>
        <input
          type="password" // Bỏ icon mắt, chỉ dùng type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          aria-describedby="confirmPassword-error"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-all"
          placeholder="Nhập lại mật khẩu"
        />
        {errors.confirmPassword && <p id="confirmPassword-error" className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
      </div>
    </div>,

    <div key="slide3" className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
          Chọn vai trò <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["startup", "investor", "mentor"].map((type) => (
            <div
              key={type}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 flex flex-col items-center ${
                formData.userType === type
                  ? "border-[#FFCE23] bg-[#FFF3CD] shadow-md"
                  : "border-gray-200 hover:border-[#FFCE23] hover:shadow-md"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, userType: type }))}
              role="radio"
              aria-checked={formData.userType === type}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, userType: type }))}
            >
              <input
                type="radio"
                name="userType"
                value={type}
                checked={formData.userType === type}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="text-2xl mb-2">
                {type === "startup" ? "🚀" : type === "investor" ? "💰" : "👨‍🏫"}
              </div>
              <div className="font-medium text-sm">
                {type === "startup" ? "Startup" : type === "investor" ? "Nhà đầu tư" : "Mentor"}
              </div>
            </div>
          ))}
        </div>
      </div>
      {(formData.userType === "investor" || formData.userType === "mentor") && (
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Tên công ty/tổ chức <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
            aria-describedby="company-error"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23] transition-all"
            placeholder={
              formData.userType === "investor"
                ? "Tên quỹ đầu tư hoặc công ty"
                : "Tên tổ chức bạn đang làm việc"
            }
          />
          {errors.company && <p id="company-error" className="text-sm text-red-500 mt-1">{errors.company}</p>}
        </div>
      )}
    </div>,

    <div key="slide4" className="space-y-6">
      <p className="text-sm text-gray-600 text-center mb-4">Chọn các lĩnh vực bạn quan tâm (chọn ít nhất một):</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { value: "funding", label: "Gọi vốn" },
          { value: "mentorship", label: "Tìm mentor" },
          { value: "product_dev", label: "Phát triển sản phẩm" },
          { value: "marketing", label: "Marketing và bán hàng" },
          { value: "networking", label: "Kết nối đối tác" },
        ].map((interest) => (
          <div key={interest.value} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={interest.value}
              name="interests"
              value={interest.value}
              checked={formData.interests.includes(interest.value)}
              onChange={handleInputChange}
              className="w-5 h-5 text-[#FFCE23] border-gray-300 rounded focus:ring-[#FFCE23]"
              aria-describedby="interests-error"
            />
            <label htmlFor={interest.value} className="text-sm text-gray-700">
              {interest.label}
            </label>
          </div>
        ))}
      </div>
      {errors.interests && <p id="interests-error" className="text-sm text-red-500 mt-1 text-center">{errors.interests}</p>}
    </div>,

    <div key="slide5" className="space-y-6">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="agreeTerms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleInputChange}
          required
          className="w-5 h-5 text-[#FFCE23] border-gray-300 rounded focus:ring-[#FFCE23] mt-1"
          aria-describedby="agreeTerms-error"
        />
        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
          Tôi đồng ý với{" "}
          <a href="/terms" className="text-[#FFCE23] hover:underline">
            Điều khoản dịch vụ
          </a>{" "}
          và{" "}
          <a href="/privacy" className="text-[#FFCE23] hover:underline">
            Chính sách bảo mật
          </a>{" "}
          của StartupKit
        </label>
      </div>
      {errors.agreeTerms && <p id="agreeTerms-error" className="text-sm text-red-500 mt-1">{errors.agreeTerms}</p>}
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !formData.agreeTerms}
          onClick={handleSubmit}
          className="w-full bg-[#FFCE23] hover:bg-[#FFC107] text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200"
        >
          {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
        </button>
      </div>
    </div>,
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FFF9E6] to-[#FFF3CD]">
      <main className="flex-1 flex items-center justify-center py-2 px-4"> {/* Giảm py-8 thành py-2 để dịch form lên trên */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <div className="text-center mb-2"> {/* Giảm mb-4 thành mb-2 để dịch input lên gần logo hơn */}
              <img src={logo} alt="StartupKit Logo" className="mx-auto w-40 h-auto" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {slides[currentSlide]}
            </form>
            <div className="flex justify-between mt-6">
              {currentSlide > 0 && (
                <button
                  type="button"
                  onClick={prevSlide}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200"
                  aria-label="Quay lại bước trước"
                >
                  Quay lại
                </button>
              )}
              {currentSlide < slides.length - 1 ? (
                <button
                  type="button"
                  onClick={nextSlide}
                  disabled={!isSlideValid()}
                  className="bg-[#FFCE23] hover:bg-[#FFC107] text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200 ml-auto"
                  aria-label="Tiếp tục đến bước tiếp theo"
                >
                  Tiếp theo
                </button>
              ) : null}
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Đã có tài khoản?{" "}
              <Link to="/dangnhap" className="text-[#FFCE23] hover:underline font-medium">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;