import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Profile() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // DEBUG
  console.log("Profile - isLoggedIn:", isLoggedIn);
  console.log("Profile - user:", user);

  // Redirect nếu chưa đăng nhập
  React.useEffect(() => {
    if (!isLoggedIn) {
      console.log("Chưa đăng nhập, chuyển hướng về /dangnhap");
      navigate("/dangnhap");
    }
  }, [isLoggedIn, navigate]);

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} user={user} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600">Đang tải thông tin...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Render nội dung profile
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-[#FFCE23]">
            Thông tin {user.role === "startup" ? "Startup" : user.role === "investor" ? "Nhà đầu tư" : "Mentor"}
          </h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <span className="font-semibold text-gray-700">Tên:</span>
              <p className="text-gray-900 mt-1">{user.full_name}</p>
            </div>
            <div className="border-b pb-3">
              <span className="font-semibold text-gray-700">Email:</span>
              <p className="text-gray-900 mt-1">{user.email}</p>
            </div>
            <div className="border-b pb-3">
              <span className="font-semibold text-gray-700">Vai trò:</span>
              <p className="text-gray-900 mt-1 capitalize">{user.role}</p>
            </div>
            {user.company && (
              <div className="border-b pb-3">
                <span className="font-semibold text-gray-700">
                  {user.role === "investor" ? "Quỹ/Công ty:" : user.role === "mentor" ? "Tổ chức:" : "Công ty:"}
                </span>
                <p className="text-gray-900 mt-1">{user.company}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200"
          >
            Đăng xuất
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}