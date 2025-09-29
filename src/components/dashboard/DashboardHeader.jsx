import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DashboardHeader = ({ userType = 'startup', isLoggedIn = false }) => {
  const [welcomeMessage, setWelcomeMessage] = useState({
    title: 'Chào mừng !',
    role: 'Nhà Khởi Nghiệp'
  });

  useEffect(() => {
    // Set welcome message based on user type
    switch(userType) {
      case 'investor':
        setWelcomeMessage({
          title: 'Chào mừng !',
          role: 'Nhà Đầu Tư'
        });
        break;
      case 'mentor':
        setWelcomeMessage({
          title: 'Chào mừng !',
          role: 'Mentor'
        });
        break;
      case 'startup':
      default:
        setWelcomeMessage({
          title: 'Chào mừng !',
          role: 'Nhà Khởi Nghiệp'
        });
        break;
    }
  }, [userType]);

  // Nếu người dùng chưa đăng nhập, không hiển thị gì cả
  if (!isLoggedIn) {
    return null;
  }

  const location = useLocation();
  const isWorkspaceTab = location.pathname === '/dashboard';

  return (
    <div
      className="flex flex-col md:flex-row justify-between items-center mb-8 px-8 gap-4"
      style={{ transform: 'translateX(20px)' }}
    >
      {/* Box chào mừng */}
      <div className="border border-yellow-400 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 rounded-lg px-5 py-3 shadow-sm">
        <span className="block text-base font-bold text-gray-900 mb-1">
          {welcomeMessage.title}
        </span>
        <span className="block text-sm text-gray-600">
          Bạn đang làm việc với tư cách{' '}
          <span className="font-semibold text-yellow-500">{welcomeMessage.role}</span>!
        </span>
      </div>

      {/* Nút thêm dự án chỉ hiển thị ở tab Không Gian Làm Việc */}
      {isWorkspaceTab && (
        <button
          className="mt-4 md:mt-0 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-4 py-1 rounded-md shadow transition text-sm flex items-center gap-2 mr-6"
          onClick={() => alert('Thêm dự án mới!')}
        >
          <span className="text-lg font-bold">+</span>
          Thêm Dự Án
        </button>
      )}
    </div>
  );
};

export default DashboardHeader;
