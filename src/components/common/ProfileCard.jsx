import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faMapMarkerAlt, faBriefcase, faLink, faChartLine, faStar, faEnvelope, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function ProfileCard({ avatar, name, focus, notableInvestments, status, contact, button, small = false }) {
  return (
  <div className={`${small ? 'p-3' : 'p-5'} bg-white border border-gray-200 rounded-xl shadow-lg w-full h-full flex flex-col gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 relative`}>
      <div className="flex gap-4 items-center">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 object-cover rounded-lg border flex-shrink-0"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 mb-1 truncate flex items-center gap-2">
            {name}
            {status && (
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" title="Đang hoạt động" />
            )}
          </h3>
          {focus && (
            <div className="flex items-center gap-1 text-xs text-gray-700 mb-1">
              <FontAwesomeIcon icon={faChartLine} />
              <span className="font-semibold">Lĩnh vực:</span> {focus}
            </div>
          )}
          {notableInvestments && notableInvestments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-700 mb-1 flex-wrap">
              <FontAwesomeIcon icon={faStar} />
              <span className="font-semibold">Khoản đầu tư nổi bật:</span>
              {notableInvestments.map((inv, idx) => (
                <a key={idx} href={`https://www.google.com/search?q=${encodeURIComponent(inv)}`} target="_blank" rel="noopener noreferrer" className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full border border-yellow-200 mx-1 inline-block">{inv}</a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-2 justify-end">
        {contact && (() => {
          // do not display gmail addresses for privacy per UX requirement
          const c = String(contact || "").trim();

        })()}
        {button && (
          <button className={`${small ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} bg-[#fdc142] hover:bg-yellow-400 text-black font-semibold rounded-full shadow transition`}>
            {button}
          </button>
        )}
      </div>
    </div>
  );
}