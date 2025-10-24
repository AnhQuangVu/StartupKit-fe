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
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-full overflow-hidden hover:border-amber-200 p-4 flex flex-col">
      {/* Top Section: Image + Info (Horizontal) */}
      <div className="flex gap-4 mb-4">
        {/* Image Section - Left */}
        <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-200">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/96/E0E0E0/999999?text=Logo'; }}
          />
        </div>

        {/* Info Section - Right */}
        <div className="flex-1 flex flex-col gap-2 justify-start">
          {/* Title */}
          <div>
            {link ? (
              link.startsWith("/") ? (
                <Link to={link} className="text-lg font-bold text-gray-900 hover:text-amber-600 transition line-clamp-1 block text-left">
                  {title}
                </Link>
              ) : (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-gray-900 hover:text-amber-600 transition line-clamp-1 block text-left">
                  {title}
                </a>
              )
            ) : (
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1 text-left">{title}</h3>
            )}
          </div>

          {/* Description */}
          {desc && <p className="text-xs text-gray-600 line-clamp-1 text-left">{desc}</p>}

          {/* Tags */}
          <div className="flex flex-wrap gap-1 items-start justify-start">
            {tag && (
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                {tag}
              </span>
            )}
            
            {stageName && (
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-0.5">
                <FontAwesomeIcon icon={faBriefcase} className="text-xs" />
                {stageName}
              </span>
            )}

            {location && (
              <span className="text-gray-700 px-2 py-0.5 rounded-full text-xs inline-flex items-center gap-0.5 bg-gray-100">
                <FontAwesomeIcon icon={faMapPin} className="text-xs text-gray-600" />
                {location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        {members > 0 && (
          <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">
            <FontAwesomeIcon icon={faUsers} className="text-purple-600 text-xs" />
            {members}
          </span>
        )}
        {raised && raised !== 'N/A' && (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
            💰 {raised}
          </span>
        )}
        {growth && (
          <span className="flex items-center gap-1 bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-full font-medium">
            📈 {growth}
          </span>
        )}
      </div>

      {/* CTA Button */}
      <div>
        {link ? (
          link.startsWith("/") ? (
            <Link 
              to={link} 
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <span>Kết nối</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          ) : (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <span>Kết nối</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </a>
          )
        ) : (
          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm">
            <span>Kết nối</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>
        )}
      </div>
    </div>
  );
}