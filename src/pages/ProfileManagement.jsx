  // Hàm mã hóa HTML để chống XSS
  function encodeHTML(str) {
    return str.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Sử dụng encodeHTML khi nhập các trường input
  const safeInputChange = e => {
    setNewUserEmail(encodeHTML(e.target.value));
  };
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_BASE, authHeaders } from '../config/api';
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function ProfileManagement({ userType = 'startup', isLoggedIn = true }) {
  const navigate = useNavigate();
  // Stage mapping
  const stageMap = {
    'y-tuong': '(ý tưởng)',
    'nghien-cuu-thi-truong': '(nghiên cứu thị trường)',
    'hoan-thien-san-pham': '(hoàn thiện sản phẩm)',
    'khao-sat': '(khảo sát)',
    'launch': '(ra mắt)',
  };
  
  const getDisplayStage = (stage) => {
    return stageMap[stage] || stage || "";
  };

  // State cho modal quản lý quyền truy cập
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Danh sách người dùng hiện tại (demo)
  const [accessUsers, setAccessUsers] = useState([
    // { email: "an.nguyen@example.com", role: "owner" },
    // { email: "dat.tran@example.com", role: "edit" },
    // { email: "minh.le@example.com", role: "view" }
  ]);
  const [newUserEmail, setNewUserEmail] = useState("");

  // Danh sách hồ sơ từ API
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch project list from API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/projects?skip=0&limit=50`, {
          headers: {
            ...authHeaders(token),
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error("Không thể tải danh sách dự án");
        const data = await res.json();
        // Đảm bảo dữ liệu là mảng
        const projects = Array.isArray(data) ? data : [data];
        setProfiles(projects);
        setSelectedProfile(projects[0] || null);
      } catch (err) {
        setError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  
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
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  
  // Hàm tìm kiếm dự án - chỉ sử dụng lọc cục bộ, không gọi API search
  const searchProjects = async (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    setSearchLoading(true);
    try {
      // Sử dụng tìm kiếm cục bộ thay vì gọi API để tránh lỗi 422
      const term_lower = term.toLowerCase();
      const results = profiles.filter(profile => {
        return (
          (profile?.name || '').toLowerCase().includes(term_lower) ||
          (profile?.tagline || '').toLowerCase().includes(term_lower) ||
          (profile?.description || '').toLowerCase().includes(term_lower) ||
          (profile?.industry || '').toLowerCase().includes(term_lower) ||
          (profile?.stage || '').toLowerCase().includes(term_lower) ||
          (profile?.pain_point || '').toLowerCase().includes(term_lower) ||
          (profile?.solution || '').toLowerCase().includes(term_lower) ||
          (profile?.product || '').toLowerCase().includes(term_lower)
        );
      });
      setSearchResults(results);
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };
  
  // Effect để debounce tìm kiếm
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout) clearTimeout(searchTimeout);
    
    // Set new timeout
    const timeout = setTimeout(() => {
      searchProjects(searchTerm);
    }, 300); // Giảm xuống 300ms cho tìm kiếm cục bộ
    
    setSearchTimeout(timeout);
    
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [searchTerm, profiles]); // Thêm profiles vào dependencies để cập nhật kết quả khi profiles thay đổi

  // Thông báo về các trường được tìm kiếm
  const searchInfo = "";
  
  // Sử dụng kết quả tìm kiếm hoặc danh sách gốc
  const filteredProfiles = searchTerm.trim() ? searchResults : profiles;

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
              onChange={safeInputChange}
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
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded py-2" onClick={async () => {
            setShowDeleteModal(false);
            if (!selectedProfile) return;
              try {
              const token = localStorage.getItem("token");
              const res = await fetch(`${API_BASE}/projects/${selectedProfile.id}`, {
                method: "DELETE",
                headers: {
                  ...authHeaders(token),
                  "Content-Type": "application/json"
                }
              });
              if (!res.ok) {
                const err = await res.json();
                toast.error(err.detail || "Xoá hồ sơ thất bại");
                return;
              }
              // Xoá thành công, cập nhật lại danh sách hồ sơ
              setProfiles(prev => prev.filter(p => p.id !== selectedProfile.id));
              setSelectedProfile(null);
              toast.success("Đã xoá hồ sơ thành công");
            } catch (e) {
              toast.error("Lỗi khi xoá hồ sơ");
            }
          }}>Xoá</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <style>{`
        @keyframes progress-bar {
          0% { width: 0; }
          100% { width: ${selectedProfile?.progress ?? 0}%; }
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
  <main className="flex-1 py-0">
        {showAccessModal && <AccessModal />}
        {showHistoryModal && <HistoryModal profile={showHistoryModal} />}
        {showDeleteModal && <DeleteConfirmModal />}
        <div className="mt-7">
          <DashboardMenu isLoggedIn={isLoggedIn} />
        </div>
        <DashboardHeader userType={userType} isLoggedIn={isLoggedIn} />


  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-8 -mt-4">
          {/* Danh sách hồ sơ - 1/3 chiều rộng */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 h-fit" style={{ transform: 'translateX(20px)' }}>
            <h2 className="text-lg font-semibold mb-4">Danh sách dự án</h2>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-md py-2 mb-4 flex items-center justify-center gap-2" onClick={() => window.location.href = '/create-project'}>
              <span className="text-lg">+</span>
              <span>Tạo dự án mới</span>
            </button>

            {/* Loading and error states */}
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <svg className="animate-spin h-6 w-6 text-yellow-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span className="text-xs text-gray-500">Đang tải danh sách dự án...</span>
              </div>
            ) : error ? (
              <div className="text-xs text-red-500 text-center py-4">{error}</div>
            ) : (
              <>
                {/* Ô tìm kiếm */}
                <div className="relative mb-4">
                  <div className="mb-1">
                    <span className="text-xs text-gray-500">{searchInfo}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm dự án..."
                    className="w-full border border-gray-300 rounded-md py-2 px-3 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    title={searchInfo}
                  />
                  {searchLoading ? (
                    <div className="absolute right-2.5 top-2.5">
                      <svg className="animate-spin h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                    </div>
                  ) : (
                    <svg 
                      className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </div>
                {/* Danh sách các dự án */}
                <div className="space-y-2">
                  {searchLoading ? (
                    <div className="flex justify-center items-center py-4">
                      <span className="text-xs text-gray-500">Đang tìm kiếm...</span>
                    </div>
                  ) : filteredProfiles.length === 0 ? (
                    <div className="text-xs text-gray-400 text-center py-4">
                      {searchTerm.trim() ? "Không tìm thấy dự án nào phù hợp." : "Không có dự án nào."}
                    </div>
                  ) : (
                    filteredProfiles.map((profile) => (
                      <div 
                        key={profile.id}
                        className={`p-3 rounded-md cursor-pointer transition-all ${
                          selectedProfile?.id === profile.id 
                            ? "bg-yellow-50 border border-yellow-400" 
                            : "hover:bg-gray-50 border border-gray-100"
                        }`}
                        onClick={() => {
                          // Khi click vào dự án mới mới đặt selected profile
                          setSelectedProfile(profile);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {profile.logo_url && (
                            <img src={profile.logo_url} alt="Logo" className="h-8 w-8 object-contain rounded" />
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{profile.name}</h3>
                            <p className="text-xs text-gray-500">{profile.tagline}</p>
                          </div>
                        </div>
                        {/* Bỏ hiển thị ID dự án */}
                        <div className="text-[10px] text-gray-400">Giai đoạn: {getDisplayStage(profile.stage)} | Ngày tạo: {profile.created_at ? new Date(profile.created_at).toLocaleDateString('vi-VN') : ""}</div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>

          {/* Chi tiết hồ sơ - 2/3 chiều rộng */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-lg p-6 flex flex-col" style={{ maxHeight: '450px', minHeight: '300px', overflowY: 'auto' }}>
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-800">Chi tiết dự án</h2>
            </div>
            {selectedProfile ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-gray-500">Tên dự án</span>
                      <div className="font-semibold text-base text-gray-900">{selectedProfile.name || ""}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Slogan</span>
                      <div className="text-sm text-gray-700">{selectedProfile.tagline || ""}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Giai đoạn </span>
                      <span className="inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">{getDisplayStage(selectedProfile.stage)}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Website </span>
                      {selectedProfile.website_url ? (
                        <a href={selectedProfile.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline break-all">{selectedProfile.website_url}</a>
                      ) : (
                        <span className="text-xs text-gray-400">Chưa có website</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-gray-500">Logo </span>
                      {selectedProfile.logo_url ? (
                        <img src={selectedProfile.logo_url} alt="Logo" className="h-16 w-16 object-contain rounded border" />
                      ) : (
                        <span className="text-xs text-gray-400">Chưa có logo</span>
                      )}
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Ngày tạo</span>
                      <div className="text-xs text-gray-700">{selectedProfile.created_at ? new Date(selectedProfile.created_at).toLocaleString('vi-VN') : ""}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Ngày cập nhật</span>
                      <div className="text-xs text-gray-700">{selectedProfile.updated_at ? new Date(selectedProfile.updated_at).toLocaleString('vi-VN') : ""}</div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs text-gray-500">Mô tả</span>
                    <div className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 rounded p-3 border mt-1">{selectedProfile.description || ""}</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-auto">
                  <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-1 text-xs" style={{minWidth: 'unset'}} onClick={() => {
                    // Chuyển sang CreateProject bước 2 (Tạo hồ sơ) với dữ liệu project
                    navigate("/create-project", {
                      state: {
                        step: 1, // Bước 2: Tạo hồ sơ (value=1)
                        project: selectedProfile
                      }
                    });
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    Xem hồ sơ
                  </button>
                  <button className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 flex items-center gap-1 text-xs" style={{minWidth: 'unset'}} onClick={() => setShowHistoryModal(selectedProfile?.name)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-3H9V8h2v2z" clipRule="evenodd" />
                    </svg>
                    Lịch sử
                  </button>
                  <button className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 flex items-center gap-1 text-xs" style={{minWidth: 'unset'}} onClick={() => setShowDeleteModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Xoá
                  </button>
                </div>
              </>
            ) : (
              <div className="text-xs text-gray-400 text-center py-8">Chọn một dự án để xem chi tiết.</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfileManagement;