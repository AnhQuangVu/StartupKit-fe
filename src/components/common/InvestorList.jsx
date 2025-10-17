import { useState } from "react";
import ProfileCard from "./ProfileCard";

export default function InvestorList({ small = false }) {
  const investors = [
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "N. V. An",
      focus: "Công nghệ, SaaS",
      portfolioSize: "12 dự án, $3M",
      notableInvestments: ["TechFlow", "GreenTech"],
      contact: "an.nv@email.com",
      status: true,
      tag: "NĐT cá nhân",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "T. T. Bình",
      focus: "Y tế, Healthtech",
      portfolioSize: "8 dự án, $2M",
      notableInvestments: ["HealthPlus", "EduSpace"],
      contact: "binh.tt@email.com",
      status: true,
      tag: "NĐT cá nhân",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      name: "L. Q. Cường",
      focus: "Giáo dục, Edtech",
      portfolioSize: "6 dự án, $1.2M",
      notableInvestments: ["EduSpace", "LinguaPro"],
      contact: "cuong.lq@email.com",
      status: true,
      tag: "NĐT cá nhân",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      name: "P. M. Đức",
      focus: "Tài chính, Fintech",
      portfolioSize: "10 dự án, $2.5M",
      notableInvestments: ["FinanceHub", "Investly"],
      contact: "duc.pm@email.com",
      status: true,
      tag: "NĐT cá nhân",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "N. T. Hạnh",
      focus: "Năng lượng, Energy",
      portfolioSize: "7 dự án, $1.8M",
      notableInvestments: ["GreenTech", "StayConnect"],
      contact: "hanh.nt@email.com",
      status: true,
      tag: "NĐT cá nhân",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      name: "V. H. Long",
      focus: "Thương mại điện tử, Ecommerce",
      portfolioSize: "9 dự án, $2.2M",
      notableInvestments: ["ShopMaster", "TravelGo"],
      contact: "long.vh@email.com",
      status: true,
      tag: "NĐT cá nhân",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      name: "Đ. T. Mai",
      focus: "AI, Công nghệ",
      portfolioSize: "5 dự án, $1M",
      notableInvestments: ["TechFlow", "Foodie"],
      contact: "mai.dt@email.com",
      status: true,
      tag: "NĐT cá nhân",
      button: "Kết nối",
    },
    // Quỹ đầu tư dùng avatar placeholder
    {
      avatar: "https://unavatar.io/goldengateventures.com",
      name: "Golden Gate Ventures",
      focus: "Đa ngành, Seed & Series A",
      portfolioSize: "30 dự án, $50M",
      notableInvestments: ["TechFlow", "FinanceHub", "ShopMaster"],
      contact: "contact@goldengateventures.com",
      status: true,
      tag: "Quỹ đầu tư",
      button: "Kết nối",
    },
    {
      avatar: "https://unavatar.io/500.co",
      name: "500 Startups Vietnam",
      focus: "Seed, Series A, Đa ngành",
      portfolioSize: "40 dự án, $60M",
      notableInvestments: ["EduSpace", "HealthPlus", "GreenTech"],
      contact: "contact@500startups.com",
      status: true,
      tag: "Quỹ đầu tư",
      button: "Kết nối",
    },
    {
      avatar: "https://unavatar.io/vinacapital.com",
      name: "VinaCapital Ventures",
      focus: "Chiến lược, Series B, Đa ngành",
      portfolioSize: "25 dự án, $40M",
      notableInvestments: ["Investly", "StayConnect", "Foodie"],
      contact: "contact@vinacapital.com",
      status: true,
      tag: "Quỹ đầu tư",
      button: "Kết nối",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      name: "L. H. Phương",
      focus: "Edtech, SaaS",
      portfolioSize: "10 dự án, $5M",
      notableInvestments: ["EduSpace", "LinguaPro"],
      contact: "phuong.lh@email.com",
      status: true,
      tag: "NĐT thiên thần",
      button: "Kết nối",
    },
    {
      avatar: "https://unavatar.io/temasek.com",
      name: "Tech Growth Fund",
      focus: "AI, Deep Tech",
      portfolioSize: "50 dự án, $200M",
      notableInvestments: ["TechFlow", "DesignHub"],
      contact: "contact@techgrowthfund.com",
      status: true,
      tag: "Quỹ đầu tư",
      button: "Kết nối",
    },
  ];


  // Pagination logic (kept, but layout simplified)
  const ITEMS_PER_ROW = small ? 2 : 3;
  const ROWS = small ? 2 : 3;
  const ITEMS_PER_PAGE = ITEMS_PER_ROW * ROWS;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(investors.length / ITEMS_PER_PAGE);

  const visibleInvestors = investors.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section className="max-w-6xl mx-auto mt-10 text-center px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Nhà đầu tư & Quỹ đầu tư tiêu biểu</h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">Khám phá các nhà đầu tư cá nhân và quỹ đầu tư nổi bật</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-4 auto-rows-fr">
        {visibleInvestors.map((i, idx) => (
          <div className="h-full" key={idx}>
            <ProfileCard {...i} />
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
