import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import InvestorStats from "../components/investor/InvestorStats";
import InvestorContactList from "../components/investor/InvestorContactList";
import InvestorEventsList from "../components/investor/InvestorEventsList";
import InvestorProjectSuggestions from "../components/investor/InvestorProjectSuggestions";
import MentorStats from "../components/mentor/MentorStats";
import MentorContactList from "../components/mentor/MentorContactList";
import MentorConsultingBoard from "../components/mentor/MentorConsultingBoard";
import MentorReview from "../components/mentor/MentorReview";
import ProjectList from "../components/dashboard/ProjectList";
import PriorityTasks from "../components/dashboard/PriorityTasks";
import EventsList from "../components/dashboard/EventsList";
import RecentActivity from "../components/dashboard/RecentActivity";

import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard({ userType: propUserType, isLoggedIn: propIsLoggedIn }) {
  // Lấy trạng thái đăng nhập và vai trò thực tế từ AuthContext
  const { isLoggedIn, user } = useAuth();
  // Đọc query param ?role=... từ URL nếu muốn override
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userType = params.get('role') || (user?.role || 'startup');
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <DashboardMenu isLoggedIn={isLoggedIn} userType={userType} />
        <DashboardHeader userType={userType} isLoggedIn={isLoggedIn} />

        {/* Hiển thị nội dung dashboard theo phân quyền */}
        {isLoggedIn ? (
          <>
            {userType === 'startup' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-8">
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <ProjectList />
                </div>
                <div className="space-y-6 order-1 lg:order-2">
                  <PriorityTasks />
                  <EventsList />
                  <RecentActivity />
                </div>
              </div>
            )}
            {userType === 'mentor' && (
              <div className="max-w-8xl px-2 md:px-6 ml-[25px]">
                <div className="w-full">
                  <MentorStats />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="w-full">
                    <MentorContactList />
                  </div>
                  <div className="w-full">
                    <EventsList userType="mentor" />
                  </div>
                </div>
                <div className="w-full">
                  <MentorConsultingBoard />
                </div>
                <div className="w-full">
                  <MentorReview />
                </div>
              </div>
            )}
            {userType === 'investor' && (
              <div className="px-8 md:px-12">
                <InvestorStats />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <InvestorContactList />
                  <InvestorEventsList />
                </div>
                <InvestorProjectSuggestions />
              </div>
            )}
            {userType === 'admin' && (
              <div className="px-4 md:px-8">
                <h2 className="text-xl font-bold mb-4">Chào admin!</h2>
                <ProjectList />
                <PriorityTasks />
                <EventsList />
                <RecentActivity />
                {/* Admin có thể quản lý toàn bộ hệ thống */}
              </div>
            )}
          </>
        ) : (
          <div className="px-4 md:px-8 text-center mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Chào mừng bạn đến với Startup Kit</h2>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 w-full text-left">
                  <p className="font-medium">Thông báo</p>
                  <p className="mt-1">Chức năng "Tìm kiếm kết nối" đang trong giai đoạn phát triển. Vui lòng đăng nhập để sử dụng các chức năng khác.</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Đăng nhập để trải nghiệm đầy đủ các tính năng của Startup Kit, 
                bao gồm quản lý dự án, tạo hồ sơ, và nhiều tính năng hữu ích khác.
              </p>
              <a
                href="/dang-nhap"
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-md shadow transition inline-block"
                aria-label="Đăng nhập"
              >
                Đăng nhập
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
