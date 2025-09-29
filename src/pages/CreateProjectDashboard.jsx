import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import CreateProject from "./CreateProject";

function CreateProjectDashboard({ userType = "startup", isLoggedIn = true }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <DashboardMenu isLoggedIn={isLoggedIn} />
        <DashboardHeader userType={userType} isLoggedIn={isLoggedIn} />
        {/* Hiển thị nội dung chỉ khi đã đăng nhập */}
        {isLoggedIn && (
          <div className="px-4 md:px-8 max-w-[2000px] mx-auto -mt-8">
            <CreateProject />

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default CreateProjectDashboard;
