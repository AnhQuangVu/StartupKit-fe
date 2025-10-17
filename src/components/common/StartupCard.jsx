import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUsers, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

export default function StartupCard({ img, title, desc, tag, stage, members, raised, onPublish, link, small = false }) {
  return (
    <div className={`${small ? 'p-3' : 'p-5'} bg-white border border-gray-200 rounded-xl shadow-lg w-full h-full flex flex-col gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 relative`}>
      <div className="flex gap-4 items-center">
        <img
          src={img}
          alt={title}
          className="w-16 h-16 object-cover rounded-lg border flex-shrink-0"
        />
        <div className="flex flex-col flex-1 min-w-0">
          {/* title links to provided external or internal link when available */}
          {link ? (
            link.startsWith("/") ? (
              <Link to={link} className={`${small ? 'text-md' : 'text-lg'} font-bold text-gray-900 mb-1 truncate hover:text-[#fdc142] transition cursor-pointer text-left`}>{title}</Link>
            ) : (
              <a href={link} target="_blank" rel="noopener noreferrer" className={`${small ? 'text-md' : 'text-lg'} font-bold text-gray-900 mb-1 truncate hover:text-[#fdc142] transition cursor-pointer text-left`}>{title}</a>
            )
          ) : (
            <h3 className={`${small ? 'text-md' : 'text-lg'} font-bold text-gray-900 mb-1 truncate hover:text-[#fdc142] transition cursor-pointer text-left`}>{title}</h3>
          )}
          <p className={`${small ? 'text-xs' : 'text-sm'} text-gray-500 mb-1 truncate`}>{desc}</p>
          <div className="flex gap-2 mt-1">
            <span className="bg-blue-50 text-black px-2 py-1 rounded-full text-xs font-semibold border border-blue-100">{tag}</span>
          </div>
        </div>
      </div>
      {/* Thông tin thêm */}
      <div className="flex gap-4 mt-3 text-xs text-gray-600">
        <span className="bg-gray-50 px-2 py-1 rounded-full flex items-center gap-1">
          <FontAwesomeIcon icon={faUsers} /> {members ? `${members} thành viên` : "Chưa có thông tin thành viên"}
        </span>
        <span className="bg-gray-50 px-2 py-1 rounded-full flex items-center gap-1">
          <FontAwesomeIcon icon={faMoneyBillWave} /> {raised ? `Đã gọi vốn: ${raised}` : "Chưa có thông tin gọi vốn"}
        </span>
      </div>
      {/* CTA */}
      <div className="flex justify-end mt-4 gap-2">
        {link ? (
          link.startsWith("/") ? (
            <Link to={link} className={`${small ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} bg-[#fdc142] hover:bg-yellow-400 text-black font-semibold rounded-full shadow transition inline-flex items-center justify-center`}>Xem chi tiết</Link>
          ) : (
            <a href={link} target="_blank" rel="noopener noreferrer" className={`${small ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} bg-[#fdc142] hover:bg-yellow-400 text-black font-semibold rounded-full shadow transition inline-flex items-center justify-center`}>Xem chi tiết</a>
          )
        ) : (
          <button className={`${small ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} bg-[#fdc142] hover:bg-yellow-400 text-black font-semibold rounded-full shadow transition`}>Xem chi tiết</button>
        )}
        {typeof onPublish === 'function' && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full text-sm shadow transition flex items-center gap-2"
            onClick={onPublish}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Đăng tải lên nền tảng
          </button>
        )}
      </div>
    </div>
  );
}

