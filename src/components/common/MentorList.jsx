import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

export default function MentorList() {
  const mentors = [
    {
      avatar: "https://randomuser.me/api/portraits/men/17.jpg",
      name: "V. Sơn",
      focus: "Pháp lý, Startup",
      notableInvestments: ["BlogMaster", "DesignHub"],
      status: true,
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      name: "H. Thu",
      focus: "Quản trị nhân sự",
      notableInvestments: ["TeamSync"],
      status: true,
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
      name: "T. Nam",
      focus: "Khởi nghiệp, Đổi mới sáng tạo",
      notableInvestments: ["TechFlow"],
      status: true,
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      name: "T. Lan",
  focus: "Tài chính, Đầu tư",
  notableInvestments: ["FinanceHub", "Investly"],
      status: true,
      tag: "Mentor",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      name: "P. Quang",
  focus: "Chiến lược sản phẩm, Quản lý dự án",
  notableInvestments: ["GreenTech", "TaskFlow"],
      status: true,
      tag: "Mentor",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/36.jpg",
      name: "H. Mai",
  focus: "Phát triển thị trường, Sales",
  notableInvestments: ["StayConnect", "Foodie"],
      status: true,
      tag: "Mentor",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
      name: "N. Dũng",
  focus: "Công nghệ, AI",
  notableInvestments: ["TechFlow", "MeetPro"],
      status: true,
      tag: "Mentor",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      name: "B. Hương",
  focus: "Vận hành, Quản trị",
  notableInvestments: ["TeamSync", "CreativePro"],
      status: true,
      tag: "Mentor",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/17.jpg",
      name: "V. Sơn",
  focus: "Pháp lý, Startup",
  notableInvestments: ["BlogMaster", "DesignHub"],
      status: true,
      tag: "Mentor",
      button: "Kết nối",
    },
  ];

  const ITEMS_PER_ROW = 3;
  const ROWS = 3;
  const ITEMS_PER_PAGE = ITEMS_PER_ROW * ROWS;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(mentors.length / ITEMS_PER_PAGE);

  const visibleMentors = mentors.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section className="max-w-6xl mx-auto mt-5 text-center px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Kết nối với Mentor
      </h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Xây dựng kết nối giá trị với những mentor giàu kinh nghiệm
      </p>
      <div className="flex flex-col gap-8 pb-4">
        {[...Array(ROWS)].map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-center">
            {visibleMentors
              .slice(rowIdx * ITEMS_PER_ROW, (rowIdx + 1) * ITEMS_PER_ROW)
              .map((m, idx) => (
                <ProfileCard key={rowIdx * ITEMS_PER_ROW + idx} {...m} />
              ))}
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {page > 0 && (
            <button
              className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-150 text-lg font-bold bg-white border-gray-200 text-gray-500 hover:bg-[#fff6e0] hover:border-[#fdc142] hover:text-[#fdc142]`}
              onClick={() => setPage(page - 1)}
              aria-label="Trang trước"
            >
              &#8592;
            </button>
          )}
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`w-9 h-9 flex items-center justify-center rounded-full border-2 mx-1 transition-all duration-150 text-base font-semibold ${
                idx === page
                  ? 'bg-[#fdc142] border-[#fdc142] text-white shadow-lg'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-[#fff6e0] hover:border-[#fdc142] hover:text-[#fdc142]'
              }`}
              onClick={() => setPage(idx)}
              aria-label={`Trang ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
          {page < totalPages - 1 && (
            <button
              className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-150 text-lg font-bold bg-white border-gray-200 text-gray-500 hover:bg-[#fff6e0] hover:border-[#fdc142] hover:text-[#fdc142]`}
              onClick={() => setPage(page + 1)}
              aria-label="Trang sau"
            >
              &#8594;
            </button>
          )}
        </div>
      )}
    </section>
  );
}
