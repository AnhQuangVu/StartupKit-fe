import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faImage } from "@fortawesome/free-solid-svg-icons";

export default function DienDan() {
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Mẫu dữ liệu bài viết (sau này sẽ được lấy từ API)
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: 'Chúng tôi vừa phát triển xong tính năng mới cho ứng dụng. Rất mong nhận được phản hồi từ cộng đồng!',
      author: 'John Doe',
      avatar: 'https://via.placeholder.com/40',
      timestamp: new Date('2025-10-22T10:30:00'),
      image: null
    },
    {
      id: 2,
      content: 'Chia sẻ kinh nghiệm về việc xây dựng MVP cho startup giai đoạn đầu. Theo kinh nghiệm của tôi, cần tập trung vào...',
      author: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40',
      timestamp: new Date('2025-10-22T09:15:00'),
      image: 'https://via.placeholder.com/600x400'
    }
  ]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: Date.now(),
        content: newPost,
        author: 'Current User', // Sẽ lấy từ context auth sau
        avatar: 'https://via.placeholder.com/40',
        timestamp: new Date(),
        image: selectedImage
      };

      setPosts([newPostObj, ...posts]);
      setNewPost('');
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Form đăng bài */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Đăng bài mới</h2>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Chia sẻ điều gì đó với cộng đồng..."
            className="w-full p-4 border rounded-lg mb-4 min-h-[120px] resize-none"
          />
          
          {selectedImage && (
            <div className="mb-4 relative">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="max-h-60 rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
              <FontAwesomeIcon icon={faImage} className="mr-2" />
              Thêm ảnh
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
            <button
              onClick={handleSubmitPost}
              disabled={!newPost.trim()}
              className={`px-6 py-2 rounded-lg ${
                newPost.trim() 
                  ? 'bg-[#FFCE23] hover:bg-[#FFE066] text-black font-semibold' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Đăng bài
            </button>
          </div>
        </div>

        {/* Danh sách bài đăng */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-sm text-gray-500">
                    <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                    {post.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="rounded-lg max-h-96 w-full object-cover mb-4"
                />
              )}
              
              <div className="flex items-center text-sm text-gray-500 mt-4 pt-4 border-t">
                <button className="hover:text-[#FFCE23] transition-colors">
                  Thích
                </button>
                <span className="mx-2">•</span>
                <button className="hover:text-[#FFCE23] transition-colors">
                  Bình luận
                </button>
                <span className="mx-2">•</span>
                <button className="hover:text-[#FFCE23] transition-colors">
                  Chia sẻ
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}