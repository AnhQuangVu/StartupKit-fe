import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function ProfileManagement({ userType = 'startup', isLoggedIn = true }) {
  // State cho modal quản lý quyền truy cập
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Danh sách người dùng hiện tại (demo)
  const [accessUsers, setAccessUsers] = useState([
    { email: "an.nguyen@example.com", role: "owner" },
    { email: "dat.tran@example.com", role: "edit" },
    { email: "minh.le@example.com", role: "view" }
  ]);
  const [newUserEmail, setNewUserEmail] = useState("");

  // Danh sách hồ sơ (demo)
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Edutech Platform",
      description: "Nền tảng giáo dục trực tuyến",
      progress: 75,
      status: "Đang xác định mục tiêu"
    },
    {
      id: 2,
      name: "Fintech Solution",
      description: "Ứng dụng tài chính",
      progress: 60,
      status: "Đang xác định ý tưởng thị trường"
    }
  ]);

  // State để quản lý hồ sơ đang được chọn
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  
  // State để quản lý animation tiến trình
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Kích hoạt animation khi chọn hồ sơ mới
  useEffect(() => {
    setAnimateProgress(true);
    const timer = setTimeout(() => {
      setAnimateProgress(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [selectedProfile]);

  // State để quản lý từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm lọc hồ sơ theo từ khóa
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dữ liệu lịch sử chỉnh sửa hồ sơ (demo)
  const profileHistory = {
    "Edutech Platform": [
      { time: "2025-09-10 09:12", action: "Cập nhật tiến độ 75%" },
      { time: "2025-09-08 15:30", action: "Tạo hồ sơ" }
    ],
    "Fintech Solution": [
      { time: "2025-09-11 10:00", action: "Cập nhật tiến độ 60%" },
      { time: "2025-09-09 14:20", action: "Tạo hồ sơ" }
    ]
  };

  // Modal quản lý quyền truy cập
  const AccessModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-full">
        <h2 className="text-lg font-semibold mb-4">Quản lý quyền truy cập</h2>
        <div className="mb-4">
          <span className="block text-xs font-medium mb-2">Người dùng hiện tại</span>
          <div className="space-y-2">
            {accessUsers.map((user, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
                <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <span className="text-xs font-medium flex-1">{user.email}</span>
                <select
                  className="text-xs px-2 py-1 rounded border bg-white"
                  value={user.role}
                  onChange={e => {
                    const newRole = e.target.value;
                    setAccessUsers(users => users.map((u, i) => i === idx ? { ...u, role: newRole } : u));
                  }}
                >
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                  <option value="owner">Owner</option>
                </select>
                {/* Nút xoá user */}
                <button className="p-1 rounded hover:bg-red-100" title="Xoá người dùng" onClick={() => setAccessUsers(users => users.filter((_, i) => i !== idx))}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <span className="block text-xs font-medium mb-2">Mời người dùng mới</span>
          <div className="flex gap-2">
            <input
              type="email"
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
              placeholder="Nhập địa chỉ email..."
              value={newUserEmail}
              onChange={e => setNewUserEmail(e.target.value)}
            />
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-xs font-semibold px-3 rounded"
              onClick={() => {
                if (newUserEmail) {
                  setAccessUsers([...accessUsers, { email: newUserEmail, role: "view" }]);
                  setNewUserEmail("");
                }
              }}
            >Mời</button>
          </div>
        </div>
        <button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded py-2 mt-2"
          onClick={() => setShowAccessModal(false)}
        >Đóng</button>
      </div>
    </div>
  );

  // Modal lịch sử chỉnh sửa hồ sơ
  const HistoryModal = ({ profile }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] max-w-full">
        <h2 className="text-lg font-semibold mb-4">Lịch sử chỉnh sửa</h2>
        <div className="mb-4">
          <span className="block text-xs font-medium mb-2">{profile}</span>
          <ul className="text-xs space-y-2">
            {(profileHistory[profile] || []).map((h, i) => (
              <li key={i} className="flex flex-col">
                <span className="font-medium text-gray-700">{h.action}</span>
                <span className="text-gray-400">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded py-2 mt-2" onClick={() => setShowHistoryModal(false)}>Đóng</button>
      </div>
    </div>
  );

  // Modal xác nhận xoá hồ sơ
  const DeleteConfirmModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] max-w-full">
        <h2 className="text-lg font-semibold mb-4">Xác nhận xoá hồ sơ</h2>
        <p className="text-xs mb-4">Bạn có chắc muốn xoá hồ sơ này khỏi dự án?</p>
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded py-2" onClick={() => setShowDeleteModal(false)}>Huỷ</button>
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded py-2" onClick={() => {
            setShowDeleteModal(false);
            // Thực hiện xoá hồ sơ ở đây nếu cần
          }}>Xoá</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style jsx>{`
        @keyframes progress-bar {
          0% { width: 0; }
          100% { width: ${selectedProfile.progress}%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-progress-bar {
          animation: progress-bar 1s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
      <Navbar />
      <main className="flex-1 py-8">
        {showAccessModal && <AccessModal />}
        {showHistoryModal && <HistoryModal profile={showHistoryModal} />}
        {showDeleteModal && <DeleteConfirmModal />}
        <DashboardMenu isLoggedIn={isLoggedIn} />
        <DashboardHeader userType={userType} isLoggedIn={isLoggedIn} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-8">
          {/* Danh sách hồ sơ - 1/3 chiều rộng */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 h-fit" style={{ transform: 'translateX(20px)' }}>
            <h2 className="text-lg font-semibold mb-4">Danh sách hồ sơ</h2>
            
            {/* Nút thêm hồ sơ */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-md py-2 mb-4 flex items-center justify-center gap-2">
              <span className="text-lg">+</span>
              <span>Tạo hồ sơ mới</span>
            </button>
            
            {/* Ô tìm kiếm */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm hồ sơ..."
                className="w-full border border-gray-300 rounded-md py-2 px-3 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Danh sách các hồ sơ */}
            <div className="space-y-2">
              {filteredProfiles.map((profile) => (
                <div 
                  key={profile.id}
                  className={`p-3 rounded-md cursor-pointer transition-all ${
                    selectedProfile.id === profile.id 
                      ? "bg-yellow-50 border border-yellow-400" 
                      : "hover:bg-gray-50 border border-gray-100"
                  }`}
                  onClick={() => setSelectedProfile(profile)}
                >
                  <h3 className="font-medium text-sm">{profile.name}</h3>
                  <p className="text-xs text-gray-500">{profile.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chi tiết hồ sơ - 2/3 chiều rộng */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-3">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">Hồ sơ dự án</h2>
            </div>
            
            {selectedProfile && (
              <>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="border-r border-gray-200 pr-2">
                    <p className="text-xs text-gray-500 mb-0.5">Tên dự án</p>
                    <p className="font-medium text-sm">{selectedProfile.name}</p>
                  </div>
                  <div className="border-r border-gray-200 px-2">
                    <p className="text-xs text-gray-500 mb-0.5">Tiến độ</p>
                    <div className="flex items-center">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-1 overflow-hidden relative">
                        <div 
                          className={`h-1.5 bg-yellow-400 rounded-full transition-all duration-1000 ease-out ${
                            animateProgress ? "animate-progress-bar" : ""
                          }`} 
                          style={{ 
                            width: `${selectedProfile.progress}%`,
                            boxShadow: animateProgress ? '0 0 5px rgba(250, 204, 21, 0.7)' : 'none'
                          }}
                        ></div>
                        {animateProgress && (
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-70 animate-shimmer" 
                            style={{backgroundSize: '200% 100%'}}
                          ></div>
                        )}
                      </div>
                      <span 
                        className={`text-[10px] font-medium transition-all duration-500 ${
                          animateProgress ? 'text-yellow-600 scale-110' : ''
                        }`}
                      >
                        {selectedProfile.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="pl-2">
                    <p className="text-xs text-gray-500 mb-0.5">Trạng thái</p>
                    <p className="font-medium text-green-600 text-sm">{selectedProfile.status}</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-1 mb-3">
                  {/* Icon cái bút để mở modal quản lý quyền truy cập */}
                  <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600" onClick={() => setShowAccessModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Icon con mắt để xem lịch sử chỉnh sửa */}
                  <button className="p-1.5 rounded-md hover:bg-gray-100 text-blue-600" onClick={() => setShowHistoryModal(selectedProfile?.name)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-3H9V8h2v2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Icon thùng rác để xoá hồ sơ */}
                  <button className="p-1.5 rounded-md hover:bg-red-100 text-red-600" onClick={() => setShowDeleteModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {/* Thông tin chi tiết hồ sơ */}
                <div className="border-t border-gray-200 pt-2">
                  <h3 className="font-medium mb-2 text-sm">Thông tin chi tiết</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-0.5">Ngành nghề</label>
                      <p className="text-xs">Công nghệ giáo dục</p>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-0.5">Giai đoạn</label>
                      <p className="text-xs">Khởi đầu</p>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-0.5">Đối tượng khách hàng</label>
                      <p className="text-xs">Học sinh, sinh viên</p>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-0.5">Địa điểm</label>
                      <p className="text-xs">TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfileManagement;