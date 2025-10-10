import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

export default function StartupCard({ img, title, desc, tag, stage, members, raised, badge }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-full max-w-md flex flex-col gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 relative">
      {/* Badge nổi bật */}
      {badge && (
        <span className="absolute top-4 right-4 bg-[#fdc142] text-white text-xs px-3 py-1 rounded-full font-bold shadow">{badge}</span>
      )}
      <div className="flex gap-4 items-center">
        <img
          src={img}
          alt={title}
          className="w-16 h-16 object-cover rounded-lg border flex-shrink-0"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 mb-1 truncate hover:text-[#fdc142] transition cursor-pointer text-left">{title}</h3>
          <p className="text-sm text-gray-500 mb-1 truncate">{desc}</p>
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
      <div className="flex justify-end mt-4">
        <button className="bg-[#fdc142] hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full text-sm shadow transition">Xem chi tiết</button>
      </div>
    </div>
  );
}

