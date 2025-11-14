import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookmarkIcon, ArrowTopRightOnSquareIcon, UsersIcon } from '@heroicons/react/24/outline';

// Component con để hiển thị thông tin metadata
const MetaItem = ({ title, value }) => {
  if (!value) return null;
  return (
    // Thay đổi nền từ tối sang trắng/xám nhạt
    <div className="flex flex-col text-xs p-2 rounded-xl bg-white border border-gray-200 shadow-sm">
      <span className="text-gray-500 font-medium mb-0.5">{title}</span>
      <span className="text-gray-900 font-bold line-clamp-1">{value}</span>
    </div>
  );
};


export default function LightStartupCard({ 
  name, 
  description, 
  industry, 
  market_size, 
  website_url, 
  logo_url, 
  customer_segment,
  market_area,
  stage,
  members = 0,
  team_image,
}) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const getHeaderColor = (industry) => {
    switch (industry) {
      case 'Fintech': return 'bg-blue-500 text-white';
      case 'Edtech': return 'bg-green-500 text-white';
      case 'Healthtech': return 'bg-purple-500 text-white';
      case 'SaaS': return 'bg-orange-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  const headerClasses = getHeaderColor(industry);
  const linkPath = website_url && website_url.startsWith("/") ? website_url : null;
  const externalLink = website_url && !website_url.startsWith("/") ? website_url : null;

  const formatMarketSize = (sizeStr) => {
    const size = parseInt(sizeStr);
    if (isNaN(size) || size === 0) return 'N/A';
    if (size >= 1000000) return `$${(size / 1000000).toFixed(1)}M`;
    if (size >= 1000) return `$${(size / 1000).toFixed(1)}K`;
    return `$${size}`;
  };

  // Card content (không gồm nút CTA)
  const cardContent = (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-amber-400 transition duration-300">
      {/* Banner + Avatar */}
      <div className="relative">
        {/* Always render banner container to preserve layout. Show image if available, otherwise a neutral placeholder */}
        <div className="w-full h-36 bg-gray-100 flex items-center justify-center overflow-hidden">
          {team_image?.url ? (
            <img
              src={team_image.url}
              alt="Ảnh banner"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
              <span className="text-sm">Banner chưa có</span>
            </div>
          )}
        </div>
        {/* Avatar - đè lên Banner, căn giữa */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 z-10">
          <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden flex items-center justify-center border-4 border-white shadow-xl">
            <img
              src={logo_url || 'https://via.placeholder.com/96/FFFFFF/000000?text=Logo'}
              alt={name}
              className="w-full h-full object-contain"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/96/FFFFFF/000000?text=Logo'; }}
            />
          </div>
        </div>
      </div>

      {/* Tên và ngành - dưới banner */}
      <div className="flex flex-col items-center mt-14 mb-2">
        <h1 className="text-xl font-bold tracking-tight line-clamp-1 text-gray-900">{name || "Tên startup"}</h1>
        <p className="text-sm font-medium opacity-90 line-clamp-1 text-gray-500 mt-1">{industry || "Ngành chung"}</p>
      </div>

      {/* Nội dung card */}
      <div className="px-6 pb-6 pt-2 flex flex-col gap-5">
        {/* Mô tả */}
        <div className="text-gray-900">
          <h3 className="text-md font-semibold mb-1 text-amber-600">Mô tả:</h3>
          <p className="text-sm text-gray-700 line-clamp-3">
            {description || "Chưa có mô tả."}
          </p>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetaItem title="Quy mô thị trường" value={formatMarketSize(market_size)} />
          <MetaItem title="Phân khúc khách hàng" value={customer_segment || 'Toàn cầu'} />
          <MetaItem title="Giai đoạn" value={stage || 'Ý tưởng'} />
          <MetaItem title="Địa điểm triển khai" value={market_area || 'Chưa rõ'} />
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-sm font-semibold pt-3 border-t border-gray-200">
          {members > 0 && (
            <span className="flex items-center gap-1 text-purple-600">
              <UsersIcon className="w-4 h-4" />
              {members} thành viên
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Card clickable area
  const handleCardClick = (e) => {
    if (linkPath) {
      e.preventDefault();
      if (!isLoggedIn) {
        navigate('/dang-nhap');
      } else {
        navigate(linkPath);
      }
    }
  };

  return (
    <div className="max-w-md w-full font-sans relative">
      {linkPath ? (
        <a href={linkPath} className="block group" onClick={handleCardClick}>
          {cardContent}
        </a>
      ) : externalLink ? (
        <a href={externalLink} target="_blank" rel="noopener noreferrer" className="block group">
          {cardContent}
        </a>
      ) : (
        <div>{cardContent}</div>
      )}
      {/* Bookmark Button - nằm ngoài clickable area */}
      <button className="absolute top-4 right-4 p-3 rounded-xl text-gray-600 border border-gray-300 hover:bg-gray-100 transition duration-150 z-20" title="Lưu startup">
        <BookmarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}