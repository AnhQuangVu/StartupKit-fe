import React, { useState } from "react";
import { uploadToCloudinary } from "../utils/cloudinary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_BASE, authHeaders, fetchWithTimeout } from '../config/api';

export default function Profile() {
  const { user: authUser, isLoggedIn, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hoso");
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: '', text: '' });
  
  // Khởi tạo formData từ authUser và fetch dữ liệu user từ API khi vào trang
  React.useEffect(() => {
    if (authUser) {
      const avatarUrl = authUser.profile?.avatar_url;
      setFormData({
        full_name: authUser.full_name || '',
        avatar_url: avatarUrl || '',
        bio: authUser.profile?.bio || '',
        website_url: authUser.profile?.website_url || '',
        location: authUser.profile?.location || '',
        phone: authUser.profile?.phone || '',
        address: authUser.profile?.address || '',
        company: authUser.profile?.company || '',
        facebook: authUser.profile?.facebook || '',
        linkedin: authUser.profile?.linkedin || ''
      });
      // Không gán lại avatarPreview ở đây, chỉ khởi tạo giá trị mặc định khi tạo state
    }
  }, [authUser]);
  
  // Xử lý input change - KHÔNG encode HTML
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value // Giữ nguyên giá trị gốc
    }));
  };

  if (!authUser) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
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
  
  // Hàm xử lý cập nhật hồ sơ người dùng
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUpdateMessage({ type: '', text: '' });
    
    try {
      // Tạo payload phẳng cho backend
      let payload = { ...formData };
      if (avatar) {
        try {
          const avatar_url = await uploadToCloudinary(avatar);
          if (avatar_url && typeof avatar_url === 'string' && avatar_url.startsWith('http')) {
            payload.avatar_url = avatar_url;
          } else {
            payload.avatar_url = authUser.profile?.avatar_url || '';
          }
        } catch (imageError) {
          console.error('Image upload error:', imageError);
          setUpdateMessage({
            type: 'error',
            text: 'Không thể tải lên ảnh đại diện. Vui lòng thử lại.'
          });
          setIsSubmitting(false);
          payload.avatar_url = authUser.profile?.avatar_url || '';
        }
      }
      // Chuyển chuỗi rỗng thành null để khớp với lược đồ backend
      Object.keys(payload).forEach(key => {
        if (payload[key] === '') payload[key] = null;
      });

  // ...existing code...

      // Gọi API cập nhật hồ sơ
      const token = localStorage.getItem('token');
      const t0 = performance.now();
      const response = await fetchWithTimeout(`${API_BASE}/users/me`, {
        method: 'PATCH',
        headers: {
          ...authHeaders(token),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        timeout: 12000
      });
      
      const responseData = await response.json();
    // ...existing code...
      
      if (!response.ok) {
        throw new Error(responseData.detail || 'Không thể cập nhật hồ sơ');
      }
      const t1 = performance.now();
      const ms = Math.round(t1 - t0);
      if (ms > 2000) {
        showToast('Máy chủ xử lý cập nhật chậm (' + ms + 'ms)', 'success');
      }
      
      // Cập nhật thông tin user trong context
      if (updateUser) {
        // Sau khi cập nhật, gọi lại API lấy user mới nhất
        try {
          const token = localStorage.getItem("token");
          const userRes = await fetchWithTimeout(`${API_BASE}/users/me`, {
            method: "GET",
            headers: {
              ...authHeaders(token),
              "Content-Type": "application/json"
            },
            timeout: 8000
          });
          const userData = await userRes.json();
          updateUser(userData);
        } catch (err) {
          // Nếu lỗi thì vẫn dùng responseData
          updateUser(responseData);
        }
      }
      // Cập nhật formData với dữ liệu mới từ server
      setFormData({
        full_name: responseData.full_name || '',
        phone: responseData.profile?.phone || '',
        address: responseData.profile?.address || '',
        company: responseData.profile?.company || '',
        facebook: responseData.profile?.facebook || '',
        linkedin: responseData.profile?.linkedin || '',
        avatar_url: responseData.profile?.avatar_url || ''
      });
      const newAvatarUrl = responseData.profile?.avatar_url;
      setAvatarPreview(newAvatarUrl || '');
      
      // Reset avatar state
      setAvatar(null);
      
      setUpdateMessage({
        type: 'success',
        text: 'Cập nhật hồ sơ thành công!'
      });
      
      // Hiển thị toast message
      showToast('Cập nhật hồ sơ thành công!', 'success');
      
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ:', error);
      setUpdateMessage({
        type: 'error',
        text: (error?.name === 'AbortError') ? 'Máy chủ phản hồi quá lâu (timeout). Vui lòng thử lại.' : (error.message || 'Có lỗi xảy ra khi cập nhật hồ sơ.')
      });
      
      showToast((error?.name === 'AbortError') ? 'Máy chủ phản hồi quá lâu (timeout). Vui lòng thử lại.' : ('Có lỗi xảy ra: ' + error.message), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function để hiển thị toast
  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = 'my-toast';
    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.top = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = type === 'success' ? '#4CAF50' : '#f44336';
    toast.style.color = '#fff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto mt-10 p-10 bg-white rounded-lg shadow-lg">
          {/* Tabs dọc */}
          <div className="flex flex-col md:flex-row gap-10 mb-6">
            <div className="flex flex-col w-full md:w-1/4">
              <button
                className={`py-2 px-3 font-semibold text-xs text-left rounded transition-all duration-150 ${
                  activeTab === "hoso"
                    ? "bg-[#FFF9E0] text-[#FFCE23]"
                    : "bg-gray-50 text-gray-700 hover:bg-[#FFF9E0] hover:text-[#FFCE23]"
                }`}
                onClick={() => setActiveTab("hoso")}
              >
                Hồ sơ cá nhân
              </button>
              <button
                className={`py-2 px-3 font-semibold text-xs text-left rounded transition-all duration-150 mt-2 ${
                  activeTab === "baidang"
                    ? "bg-[#FFF9E0] text-[#FFCE23]"
                    : "bg-gray-50 text-gray-700 hover:bg-[#FFF9E0] hover:text-[#FFCE23]"
                }`}
                onClick={() => setActiveTab("baidang")}
              >
                Quản lý bài đăng
              </button>
              <button
                className="py-2 px-3 font-semibold text-xs text-left rounded mt-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
            {/* Tab content */}
            <div className="flex-1 min-h-[220px]">
              {activeTab === "hoso" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-[#FFCE23]">
                    Thông tin cá nhân
                  </h2>
                  {updateMessage.text && (
                    <div className={`mb-4 p-3 rounded text-sm ${
                      updateMessage.type === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {updateMessage.text}
                    </div>
                  )}
                  <form className="space-y-3 max-w-lg" autoComplete="off" onSubmit={handleUpdateProfile}>
                    <div className="flex flex-col items-center justify-center py-4">
                      <span className="font-semibold text-gray-700 text-sm mb-2">Ảnh cá nhân:</span>
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="w-28 h-28 rounded-full border-2 border-yellow-300 bg-gray-100 flex items-center justify-center shadow-lg overflow-hidden">
                          <img
                            src={avatarPreview || authUser.profile?.avatar_url || ''}
                            alt="Avatar preview"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files && e.target.files[0];
                          if (file) {
                            setAvatar(file);
                            // Hiển thị preview ngay khi chọn
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setAvatarPreview(reader.result);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            setAvatar(null);
                            setAvatarPreview("");
                          }
                        }}
                      />
                      <span className="text-xs text-gray-500 mt-2">Nhấn vào ô tròn để chọn ảnh</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Tên:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        name="full_name"
                        value={formData.full_name || ''}
                        onChange={handleInputChange}
                        placeholder="Nhập tên"
                      />
                    </div>
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">Chức danh/Bio:</span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          name="bio"
                          value={formData.bio || ''}
                          onChange={handleInputChange}
                          placeholder="Founder & CEO"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">Website:</span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          name="website_url"
                          value={formData.website_url || ''}
                          onChange={handleInputChange}
                          placeholder="https://startup.vn"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">Địa điểm:</span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          name="location"
                          value={formData.location || ''}
                          onChange={handleInputChange}
                          placeholder="Hà Nội"
                        />
                      </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Email:
                      </span>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1 bg-gray-100"
                        defaultValue={authUser?.email}
                        placeholder="Nhập email"
                        disabled
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Số điện thoại:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Địa chỉ liên hệ:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Vai trò:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1 bg-gray-100"
                        value={authUser?.role || ''}
                        disabled
                      />
                    </div>
                    {/* Các trường riêng cho từng vai trò */}
                    {authUser?.role === "startup" && (
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">
                          Tên Startup:
                        </span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          name="company"
                          value={formData.company || ''}
                          onChange={handleInputChange}
                          placeholder="Nhập tên startup"
                        />
                      </div>
                    )}
                    {authUser?.role === "investor" && (
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">
                          Tên quỹ/Công ty đầu tư:
                        </span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          name="company"
                          value={formData.company || ''}
                          onChange={handleInputChange}
                          placeholder="Nhập tên quỹ/công ty"
                        />
                      </div>
                    )}
                    {authUser?.role === "mentor" && (
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">
                          Công ty:
                        </span>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                          name="company"
                          value={formData.company || ''}
                          onChange={handleInputChange}
                          placeholder="Nhập tên công ty"
                        />
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        Facebook:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        name="facebook"
                        value={formData.facebook || ''}
                        onChange={handleInputChange}
                        placeholder="Link Facebook cá nhân"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm">
                        LinkedIn:
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                        name="linkedin"
                        value={formData.linkedin || ''}
                        onChange={handleInputChange}
                        placeholder="Link LinkedIn cá nhân"
                      />
                    </div>
                    <div className="pt-2 flex gap-2">
                      <button
                        type="submit"
                        className={`bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#FFD600] transition-all text-xs ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật hồ sơ'}
                      </button>
                      {/* Nút đăng tải hồ sơ lên nền tảng cho investor/mentor */}
                      {(authUser?.role === 'investor' || authUser?.role === 'mentor') && (
                        <button
                          type="button"
                          className="border border-yellow-400 bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-50 hover:border-yellow-500 transition-all text-xs flex items-center gap-2"
                          onClick={() => alert('Đăng tải hồ sơ lên nền tảng!')}
                        >
                          <FontAwesomeIcon icon={faUpload} className="text-yellow-400" />
                          Đăng tải hồ sơ lên nền tảng
                        </button>
                      )}
                    </div>
                  </form>
                </section>
              )}

              {activeTab === "baidang" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-[#FFCE23]">
                    Quản lý bài đăng
                  </h2>
                  <div className="text-gray-600 text-sm">
                    Bạn chưa có bài đăng nào.
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}