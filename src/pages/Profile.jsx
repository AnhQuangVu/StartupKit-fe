import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Hàm mã hóa HTML để chống XSS
function encodeHTML(str) {
  return str.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Profile() {
  const { user: authUser, isLoggedIn, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hoso");
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(authUser?.avatar_url || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: '', text: '' });
  
  // Khởi tạo formData từ authUser
  React.useEffect(() => {
    if (authUser) {
      setFormData({
        full_name: authUser.full_name || '',
        phone: authUser.phone || '',
        address: authUser.address || '',
        company: authUser.company || '',
        facebook: authUser.facebook || '',
        linkedin: authUser.linkedin || '',
      });
    }
  }, [authUser]);
  
  // Sử dụng encodeHTML khi nhập các trường input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: encodeHTML(value)
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
      // Sử dụng formData làm payload
      const payload = {...formData};
      
      // Nếu có avatar mới, xử lý upload ảnh trước
      let avatar_url = authUser.avatar_url;
      if (avatar) {
        const imageFormData = new FormData();
        imageFormData.append('file', avatar);
        
        try {
          const token = localStorage.getItem('token');
          const uploadResponse = await fetch('http://localhost:8000/upload-image/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: imageFormData
          });
          
          if (!uploadResponse.ok) {
            throw new Error('Không thể tải lên ảnh đại diện');
          }
          
          const imageData = await uploadResponse.json();
          avatar_url = imageData.url;
          payload.avatar_url = avatar_url;
        } catch (imageError) {
          console.error('Lỗi khi tải ảnh:', imageError);
          setUpdateMessage({
            type: 'error',
            text: 'Không thể tải lên ảnh đại diện. Vui lòng thử lại.'
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // Gọi API cập nhật hồ sơ
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/users/me', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.detail || 'Không thể cập nhật hồ sơ');
      }
      
      // Cập nhật thông tin user trong context
      if (updateUser) {
        updateUser({
          ...authUser,
          ...responseData,
          avatar_url
        });
      }
      
      setUpdateMessage({
        type: 'success',
        text: 'Cập nhật hồ sơ thành công!'
      });
      
      // Hiển thị toast message
      if (window.$) {
        window.$('<div class="my-toast">Cập nhật hồ sơ thành công!</div>')
          .appendTo('body').fadeIn().delay(2000).fadeOut();
      } else {
        var toast = document.createElement('div');
        toast.className = 'my-toast';
        toast.innerText = 'Cập nhật hồ sơ thành công!';
        toast.style.position = 'fixed';
        toast.style.top = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = '#333';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.zIndex = '9999';
        document.body.appendChild(toast);
        setTimeout(function(){ toast.remove(); }, 2000);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ:', error);
      setUpdateMessage({
        type: 'error',
        text: error.message || 'Có lỗi xảy ra khi cập nhật hồ sơ.'
      });
      
      // Hiển thị toast message lỗi
      if (window.$) {
        window.$('<div class="my-toast" style="background-color:#f44336;">Có lỗi xảy ra: ' + error.message + '</div>')
          .appendTo('body').fadeIn().delay(3000).fadeOut();
      } else {
        var toast = document.createElement('div');
        toast.className = 'my-toast';
        toast.innerText = 'Có lỗi xảy ra: ' + error.message;
        toast.style.position = 'fixed';
        toast.style.top = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = '#f44336';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.zIndex = '9999';
        document.body.appendChild(toast);
        setTimeout(function(){ toast.remove(); }, 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
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
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Avatar preview"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">Chọn ảnh</span>
                          )}
                        </div>
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files[0];
                          if (file) {
                            setAvatar(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setAvatarPreview(reader.result);
                            };
                            reader.readAsDataURL(file);
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
                      <span className="font-semibold text-gray-700 text-sm">
                        Email:
                      </span>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
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
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
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
                    <div className="pt-2">
                      <button
                        type="submit"
                        className={`bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#FFD600] transition-all text-xs ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật hồ sơ'}
                      </button>
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