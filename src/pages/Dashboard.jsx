import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ProjectList from "../components/dashboard/ProjectList";
import PriorityTasks from "../components/dashboard/PriorityTasks";
import EventsList from "../components/dashboard/EventsList";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard({ userType = 'startup', isLoggedIn = true }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <DashboardMenu isLoggedIn={isLoggedIn} />
        <DashboardHeader userType={userType} isLoggedIn={isLoggedIn} />

        {/* Hiển thị nội dung dashboard chỉ khi đã đăng nhập */}
        {isLoggedIn && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-8">
            {/* Project List - 2/3 chiều rộng */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <ProjectList />
            </div>
            {/* Sidebar Components - 1/3 chiều rộng */}
            <div className="space-y-6 order-1 lg:order-2">
              <PriorityTasks />
              <EventsList />
              <RecentActivity />
            </div>
          </div>
        )}

        {/* Nội dung hiển thị khi chưa đăng nhập */}
        {!isLoggedIn && (
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
              <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-md shadow transition">
                Đăng nhập
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
