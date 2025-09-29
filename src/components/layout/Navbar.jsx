import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png"; 

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Giả lập trạng thái đăng nhập, thay bằng logic thực tế của bạn
  const isLoggedIn = false;
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <header className="w-full bg-white shadow-md border-b border-gray-100 overflow-visible">
      <div className="flex items-center justify-between px-4 md:px-8 h-16 overflow-visible">
        {/* Logo với link về trang chủ */}

          <img
            src={logo}
            alt="Logo"
            className="h-12 md:h-16 w-auto object-contain origin-left cursor-pointer"
            style={{ transform: "scale(1.8) translateX(12px)" }}
          />


        {/* Desktop menu với highlight tab đang active */}
        <nav className="hidden md:flex gap-8 ml-auto text-[#374151] text-xs md:text-sm font-medium">
          <Link
            to="/dashboard"
            className={`cursor-pointer transition-colors duration-200 ${
              location.pathname === "/dashboard"
                ? "text-[#FFCE23] font-bold border-b-2 border-[#FFCE23]"
                : "hover:text-[#FFCE23]"
            }`}
          >
            Khởi tạo dự án
          </Link>
          <span
            className="cursor-pointer hover:text-[#FFCE23] transition-colors duration-200"
            onClick={() => window.location.href = '/coming-soon'}
          >
            Khám phá
          </span>
          <span
            className="cursor-pointer hover:text-[#FFCE23] transition-colors duration-200"
            onClick={() => window.location.href = '/coming-soon'}
          >
            Nền tảng của chúng tôi
          </span>
        </nav>

        {/* Desktop buttons hoặc icon người dùng */}
        <div className="hidden md:flex gap-3 ml-8 items-center">
          {!isLoggedIn ? (
            <>
              <button className="bg-white border border-[#FFCE23] text-black font-semibold px-3 py-1 rounded-md text-sm hover:bg-[#FFF9E0] transition-all duration-200" onClick={handleRegister}>
                Đăng Ký
              </button>
              <Link to="/dangnhap">
                <button className="bg-[#FFCE23] hover:bg-[#FFD600] text-black font-semibold px-3 py-1 rounded-md text-sm transition-all duration-200">
                  Đăng nhập
                </button>
              </Link>
            </>
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-[#374151] cursor-pointer" />
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setShowMenu((v) => !v)}
          aria-label="Mở menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect y="5" width="24" height="2" rx="1" fill="#374151" />
            <rect y="11" width="24" height="2" rx="1" fill="#374151" />
            <rect y="17" width="24" height="2" rx="1" fill="#374151" />
          </svg>
        </button>
      </div>
      {/* Mobile menu overlay */}
      {showMenu && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-2 text-[#374151] text-xs font-medium z-50">
          {/* Mobile menu với highlight tab active */}
          <Link
            to="/dashboard"
            className={`cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100 text-center ${
              location.pathname === "/dashboard"
                ? "text-[#FFCE23] font-bold"
                : "hover:text-[#FFCE23]"
            }`}
          >
            Khởi tạo dự án
          </Link>
          <span className="cursor-pointer hover:text-[#FFCE23] transition-colors duration-200 py-2 border-b border-gray-100 text-center">
            Khám phá
          </span>
          <span className="cursor-pointer hover:text-[#FFCE23] transition-colors duration-200 py-2 border-b border-gray-100 text-center">
            Nền tảng
          </span>
          <div className="flex flex-col gap-2 mt-3 items-center">
            {!isLoggedIn ? (
              <>
                <button className="bg-white border border-[#FFCE23] text-black font-semibold px-3 py-1 rounded-md text-xs hover:bg-[#FFF9E0] transition-all duration-200 w-full" onClick={handleRegister}>
                  Đăng Ký
                </button>
                <Link to="/dangnhap">
                  <button className="bg-[#FFCE23] hover:bg-[#FFD600] text-black font-semibold px-3 py-1 rounded-md text-xs transition-all duration-200 w-full">
                    Đăng nhập
                  </button>
                </Link>
              </>
            ) : (
              <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-[#374151] cursor-pointer" />
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
