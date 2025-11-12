import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faBuilding,
  faMapMarkerAlt,
  faUser,
  faLink,
  faAlignLeft,
  faChartLine,
  faCheckCircle,
  faRocket,
  faTrophy,
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";

export default function ProfileCard({
  // User basic info
  avatar,
  avatar_url,
  banner,
  cover_url,
  name,
  full_name,
  role,

  // Mentor/Founder specific
  title,
  company,
  current_position,

  // Common info
  bio,
  location,
  focus,
  expertise_areas,

  // Links
  website_url,
  community_link,

  // Achievements
  achievements,

  // Startup info (for founders)
  startups,

  // UI props
  status,
  is_active,
  button,
  small = false,
  onClick
}) {
  // Normalize data
  const displayAvatar = avatar || avatar_url;
  const displayBanner = banner || cover_url;
  const displayName = name || full_name;
  const displayTitle = title || company || current_position;
  const displayStatus = status !== undefined ? status : is_active;
  const displayWebsite = website_url || community_link;
  const displayFocus = focus || (Array.isArray(expertise_areas) ? expertise_areas.join(', ') : expertise_areas);
  const primaryStartup = Array.isArray(startups) && startups.length > 0 ? startups[0] : null;

  return (
    <div
      className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer hover:-translate-y-2' : ''} ${small ? 'max-w-sm' : 'w-full'} flex flex-col`}
      onClick={onClick}
      style={{ minHeight: small ? '400px' : '520px' }}
    >
      {/* Banner with gradient overlay */}
      <div className={`relative w-full ${small ? 'h-24' : 'h-32'} overflow-hidden`}>
        {displayBanner ? (
          <img
            src={displayBanner}
            alt="banner"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${role === 'mentor'
            ? 'from-gray-600 via-gray-700 to-gray-800'
            : 'from-gray-600 via-gray-700 to-gray-800'
            }`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTEwIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0xMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptLTMwIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0tMTAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bS0xMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          </div>
        )}

        {/* Role badge */}
        {role && (
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xl backdrop-blur-md border ${role === 'mentor'
              ? 'bg-gray-700/90 text-white border-gray-400/30'
              : 'bg-gray-700/90 text-white border-gray-400/30'
              }`}>
              <FontAwesomeIcon icon={role === 'mentor' ? faUserTie : faRocket} className="text-sm" />
              {role === 'mentor' ? 'Mentor' : 'Founder'}
            </span>
          </div>
        )}
      </div>

      {/* Avatar - positioned outside banner */}
      <div className="relative px-6 flex-1 flex flex-col">
        <div className={`${small ? '-mt-10' : '-mt-12'} mb-4`}>
          <div className={`${small ? 'w-20 h-20' : 'w-24 h-24'} rounded-2xl border-4 border-white bg-white shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faUserTie} className="text-gray-400 text-3xl" />
              </div>
            )}
          </div>
        </div>

        {/* Name and Title Section */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className={`font-bold ${small ? 'text-lg' : 'text-xl'} text-gray-900 leading-tight`}>
              {displayName || 'Chưa có tên'}
            </h3>
            {displayStatus && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-lg flex-shrink-0 mt-0.5"
                title="Đang hoạt động"
              />
            )}
          </div>

          {/* Company/Organization */}
          {displayTitle && (
            <p className="text-sm text-gray-700 flex items-start gap-2 mb-2">
              <FontAwesomeIcon icon={faBuilding} className="text-gray-600 text-xs mt-0.5" />
              <span className="font-medium whitespace-nowrap">
                {role === 'mentor' ? 'Công ty/Tổ chức:' : 'Vị trí:'}
              </span>
              <span className="text-gray-900 font-medium">{displayTitle}</span>
            </p>
          )}

          {/* Location */}
          {location && (
            <p className="text-sm text-gray-700 flex items-start gap-2 mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600 text-xs mt-0.5" />
              <span className="font-medium whitespace-nowrap">Địa điểm:</span>
              <span className="text-gray-900">{location}</span>
            </p>
          )}

          {/* Role */}
          <p className="text-sm text-gray-700 flex items-start gap-2 mb-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-600 text-xs mt-0.5" />
            <span className="font-medium whitespace-nowrap">Vai trò:</span>
            <span className="text-gray-900 font-medium capitalize">{role === 'mentor' ? 'Mentor' : 'Founder'}</span>
          </p>

          {/* Website/Community Link */}
          {displayWebsite && (
            <p className="text-sm text-gray-700 flex items-start gap-2 mb-2">
              <FontAwesomeIcon icon={faLink} className="text-gray-600 text-xs mt-0.5" />
              <span className="font-medium whitespace-nowrap">
                {role === 'mentor' ? 'Link cộng đồng:' : 'Website:'}
              </span>
              <a
                href={displayWebsite.startsWith('http') ? displayWebsite : `https://${displayWebsite}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline break-all"
                onClick={(e) => e.stopPropagation()}
              >
                {displayWebsite}
              </a>
            </p>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <div className="mb-4 border-t pt-3">
            <p className="text-sm font-medium text-gray-700 mb-1.5 flex items-start gap-2">
              <FontAwesomeIcon icon={faAlignLeft} className="text-gray-600 text-xs mt-0.5" />
              <span>Giới thiệu bản thân:</span>
            </p>
            <p className="text-sm text-gray-600 leading-relaxed" style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '3.6em',
              lineHeight: '1.2em'
            }}>
              {bio}
            </p>
          </div>
        )}

        {/* Focus/Expertise - Prominent Display */}
        {displayFocus && (
          <div className={`rounded-xl p-3 mb-4 ${role === 'mentor'
            ? 'bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200'
            : 'bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200'
            }`}
            style={{ minHeight: '70px' }}
          >
            <div className="flex items-start gap-2.5">
              <FontAwesomeIcon
                icon={role === 'mentor' ? faLightbulb : faChartLine}
                className={`${role === 'mentor' ? 'text-gray-700' : 'text-gray-700'} text-base mt-0.5 flex-shrink-0`}
              />
              {role === 'mentor' ? (
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wide mb-1 text-gray-700">
                    Chuyên môn
                  </div>
                  <div className="text-sm font-medium leading-relaxed text-gray-900">
                    {displayFocus}
                  </div>
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-700">Lĩnh vực: </span>
                  <span className="text-sm font-medium leading-relaxed text-gray-900">{displayFocus}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Primary Startup (Founder) */}
        {role === 'founder' && primaryStartup && (
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-3.5 mb-4" style={{ minHeight: '70px' }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faRocket} className="text-gray-700 text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-0.5 truncate">
                  {primaryStartup.startup_name || primaryStartup.name}
                </div>
                {primaryStartup.industry && (
                  <div className="text-xs font-medium text-gray-600 truncate">
                    {primaryStartup.industry}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Achievements (Mentor) */}
        {role === 'mentor' && achievements && achievements.length > 0 && (
          <div className="mb-4" style={{ minHeight: '70px' }}>
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faTrophy} className="text-amber-500 text-sm" />
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Thành tích</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {achievements.slice(0, 3).map((ach, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1.5 bg-white border border-amber-200 text-amber-800 rounded-lg text-xs font-medium shadow-sm hover:shadow-md transition-shadow"
                  title={typeof ach === 'string' ? ach : ach.content}
                >
                  {typeof ach === 'string' ? ach : ach.content}
                </span>
              ))}
              {achievements.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1.5 text-gray-600 text-xs font-medium">
                  +{achievements.length - 3} khác
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        {button && (
          <div className="mt-auto pt-2">
            <button
              className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 mb-6 ${role === 'mentor'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-amber-500 hover:to-amber-600 text-white'
                : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white'
                }`}
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
            >
              {button}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}