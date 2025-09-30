import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";
function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // DEBUG
  console.log("Navbar - isLoggedIn:", isLoggedIn);
  console.log("Navbar - user:", user);
  console.log("Navbar - localStorage token:", localStorage.getItem("token"));
  console.log("Navbar - localStorage user:", localStorage.getItem("user"));

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
            <React.Fragment>
              <button className="bg-white border border-[#FFCE23] text-black font-semibold px-3 py-1 rounded-md text-sm hover:bg-[#FFF9E0] transition-all duration-200" onClick={handleRegister}>
                Đăng Ký
              </button>
              <Link to="/dang-nhap" className="bg-[#FFCE23] text-black font-semibold px-3 py-1 rounded-md text-sm hover:bg-[#FFE066] transition-all duration-200">
                Đăng Nhập
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/Profile" className="flex items-center font-semibold text-[#374151] mr-2 hover:text-[#FFCE23] transition-colors">
                <FontAwesomeIcon icon={faUserCircle} className="mr-1" />
                {user?.full_name || user?.email}
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </header>
  );
}


export default Navbar;
