import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUsers, faGlobe, faBriefcase, faMapPin, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function StartupCard({ img, title, desc, tag, stage, members, raised, link, location, growth, small = false }) {
  // Map stage to Vietnamese friendly name
  const stageMap = {
    'y-tuong': '(ý tưởng)',
    'nghien-cuu-thi-truong': '(nghiên cứu thị trường)',
    'hoan-thien-san-pham': '(hoàn thiện sản phẩm)',
    'khao-sat': '(khảo sát)',
    'launch': '(ra mắt)',
    'prototype': 'Prototype',
    'alpha': 'Alpha',
    'beta': 'Beta',
    'production': 'Đã ra mắt',
  };
  
  const stageName = stage ? stageMap[stage] || stage : null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 w-full overflow-hidden flex flex-col h-full">
      {/* Image Section - Top */}
      <div className="relative w-full h-40 bg-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300/E0E0E0/999999?text=Logo'; }}
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-2.5 p-3">
        {/* Title */}
        <div>
          {link ? (
            link.startsWith("/") ? (
              <Link to={link} className="text-sm font-bold text-gray-900 hover:text-[#fdc142] transition line-clamp-2">
                {title}
              </Link>
            ) : (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-900 hover:text-[#fdc142] transition line-clamp-2">
                {title}
              </a>
            )
          ) : (
            <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{title}</h3>
          )}
        </div>

        {/* Description */}
        {desc && <p className="text-xs text-gray-600 line-clamp-1">{desc}</p>}

        {/* Tags & Badges */}
        <div className="flex flex-wrap gap-1 items-center">
          {/* Industry Tag */}
          {tag && (
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
              {tag}
            </span>
          )}
          
          {/* Stage Badge */}
          {stageName && (
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs font-medium border border-amber-200 inline-flex items-center gap-0.5">
              <FontAwesomeIcon icon={faBriefcase} className="text-[10px]" />
              {stageName}
            </span>
          )}

          {/* Location */}
          {location && (
            <span className="text-gray-600 px-2 py-0.5 rounded text-xs inline-flex items-center gap-0.5 bg-gray-50 border border-gray-200">
              <FontAwesomeIcon icon={faMapPin} className="text-[10px] text-gray-500" />
              {location}
            </span>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-1 text-xs">
          {members > 0 && (
            <span className="flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded border border-gray-200 text-gray-700">
              <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
              {members}
            </span>
          )}
          {raised && raised !== 'N/A' && (
            <span className="flex items-center gap-0.5 bg-green-50 px-2 py-1 rounded text-green-700 font-medium border border-green-200">
              💰 {raised}
            </span>
          )}
          {growth && (
            <span className="flex items-center gap-0.5 bg-blue-50 px-2 py-1 rounded text-blue-700 border border-blue-200">
              📈 {growth}
            </span>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-3 pb-3">
        {link ? (
          link.startsWith("/") ? (
            <Link 
              to={link} 
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#fdc142] hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-sm transition text-xs"
            >
              <span>Kết nối</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
            </Link>
          ) : (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#fdc142] hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-sm transition text-xs"
            >
              <span>Kết nối</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
            </a>
          )
        ) : (
          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#fdc142] hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-sm transition text-xs">
            <span>Kết nối</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
          </button>
        )}
      </div>
    </div>
  );
}