import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faPlusCircle,
  faGlobe,
  faLayerGroup,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className="w-full bg-white shadow-md border-b border-gray-100">
      <div className="flex items-center justify-between px-4 md:px-8 h-16 relative z-50">
        {/* Logo với link về trang chủ - Giữ nguyên kích thước */}
        <img
          src={logo}
          alt="Logo"
          className="h-12 md:h-16 w-auto object-contain origin-left cursor-pointer"
          style={{ transform: "scale(1.8) translateX(12px)" }}
          onClick={() => navigate("/")}
        />

        {/* Hamburger menu cho mobile */}
        <button
          className="md:hidden text-[#374151] text-xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
        </button>

        {/* Desktop menu với highlight tab đang active */}
        <nav className="hidden md:flex gap-8 ml-auto text-[#374151] text-xs md:text-sm font-medium">
          <Link
            to="/dashboard"
            className={`cursor-pointer transition-colors duration-200 flex items-center ${
              [
                "/dashboard",
                "/profile-management",
                "/create-project",
                "/connections",
                "/dashboard",
                "/mentor-projects",
                "/events",
                "/connections",
                "/dashboard",
                "/investor-projects",
                "/events",
                "/connections",
              ].includes(location.pathname)
                ? "text-[#FFCE23] font-bold border-b-2 border-[#FFCE23]"
                : "hover:text-[#FFCE23]"
            }`}
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            Khởi tạo dự án
          </Link>
          {isLoggedIn && (
            <Link
              to="/dien-dan"
              className={`cursor-pointer transition-colors duration-200 flex items-center ${
                location.pathname.startsWith("/dien-dan")
                  ? "text-[#FFCE23] font-bold border-b-2 border-[#FFCE23]"
                  : "hover:text-[#FFCE23]"
              }`}
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              Diễn đàn
            </Link>
          )}
          <Link
            to="/kham-pha"
            className={`cursor-pointer transition-colors duration-200 flex items-center ${
              location.pathname.startsWith("/kham-pha")
                ? "text-[#FFCE23] font-bold border-b-2 border-[#FFCE23]"
                : "hover:text-[#FFCE23]"
            }`}
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
            Khám phá
          </Link>
          <Link
            to="/platform"
            className={`cursor-pointer transition-colors duration-200 flex items-center ${
              location.pathname.startsWith("/platform")
                ? "text-[#FFCE23] font-bold border-b-2 border-[#FFCE23]"
                : "hover:text-[#FFCE23]"
            }`}
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
            Nền tảng của chúng tôi
          </Link>
        </nav>

        {/* Desktop buttons hoặc icon người dùng */}
        <div className="hidden md:flex gap-3 ml-8 items-center">
          {!isLoggedIn ? (
            <>
              <button
                className="bg-white border border-[#FFCE23] text-black font-semibold px-3 py-1 rounded-md text-sm hover:bg-[#FFF9E0] transition-all duration-200"
                onClick={handleRegister}
              >
                Đăng Ký
              </button>
              <Link
                to="/dang-nhap"
                className="bg-[#FFCE23] text-black font-semibold px-3 py-1 rounded-md text-sm hover:bg-[#FFE066] transition-all duration-200"
              >
                Đăng Nhập
              </Link>
            </>
          ) : (
            <Link
              to="/Profile"
              className="flex items-center mr-2 hover:text-[#FFCE23] transition-colors"
              onClick={closeMenu}
            >
              <FontAwesomeIcon
                icon={faIdBadge}
                className={`w-5 h-5 ${
                  location.pathname.startsWith("/Profile")
                    ? "text-[#FFCE23] font-bold border-b-2 border-[#FFCE23]"
                    : "hover:text-[#FFCE23]"
                } flex items-center`}
              />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {showMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 text-[#374151] text-sm font-medium">
            <Link
              to="/dashboard"
              className={`py-2 border-b border-gray-200 cursor-pointer transition-colors duration-200 flex items-center ${
                [
                  "/dashboard",
                  "/profile-management",
                  "/create-project",
                  "/connections",
                  "/dashboard",
                  "/mentor-projects",
                  "/events",
                  "/connections",
                  "/dashboard",
                  "/investor-projects",
                  "/events",
                  "/connections",
                ].includes(location.pathname)
                  ? "text-[#FFCE23] font-bold"
                  : "hover:text-[#FFCE23]"
              }`}
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Khởi tạo dự án
            </Link>
            {isLoggedIn && (
              <Link
                to="/dien-dan"
                className={`py-2 border-b border-gray-200 cursor-pointer transition-colors duration-200 flex items-center ${
                  location.pathname.startsWith("/dien-dan")
                    ? "text-[#FFCE23] font-bold"
                    : "hover:text-[#FFCE23]"
                }`}
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                Diễn đàn
              </Link>
            )}
            <Link
              to="/kham-pha"
              className={`py-2 border-b border-gray-200 cursor-pointer transition-colors duration-200 flex items-center ${
                location.pathname.startsWith("/kham-pha")
                  ? "text-[#FFCE23] font-bold"
                  : "hover:text-[#FFCE23]"
              }`}
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              Khám phá
            </Link>
            <Link
              to="/platform"
              className={`py-2 border-b border-gray-200 cursor-pointer transition-colors duration-200 flex items-center ${
                location.pathname.startsWith("/platform")
                  ? "text-[#FFCE23] font-bold"
                  : "hover:text-[#FFCE23]"
              }`}
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
              Nền tảng của chúng tôi
            </Link>
            {!isLoggedIn ? (
              <>
                <button
                  className="py-2 w-full text-left bg-white border-b border-gray-200 border-[#FFCE23] text-black font-semibold rounded-md text-sm hover:bg-[#FFF9E0] transition-all duration-200 mt-2"
                  onClick={() => {
                    handleRegister();
                    closeMenu();
                  }}
                >
                  Đăng Ký
                </button>
                <Link
                  to="/dang-nhap"
                  className="py-2 w-full text-left bg-[#FFCE23] text-black font-semibold rounded-md text-sm hover:bg-[#FFE066] transition-all duration-200 mt-1"
                  onClick={closeMenu}
                >
                  Đăng Nhập
                </Link>
              </>
            ) : (
              <Link
                to="/Profile"
                className={`py-2 border-b border-gray-200 cursor-pointer transition-colors duration-200 flex items-center ${
                  location.pathname.startsWith("/Profile")
                    ? "text-[#FFCE23] font-bold"
                    : "hover:text-[#FFCE23]"
                }`}
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faIdBadge} className="mr-2 w-5 h-5" />
                Hồ sơ
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
