import { useState } from "react";
import StartupCard from "./StartupCard";

export default function StartupList({ small = false, columns, rows }) {
  const startups = [
    {
      img: "https://logo.clearbit.com/stripe.com",
      title: "TechFlow",
      desc: "Nền tảng tự động hóa quy trình bằng AI, giúp doanh nghiệp tăng hiệu suất và giảm chi phí.",
      tag: "SaaS",
      members: 25,
      raised: "$2M",
      badge: "Hot",
      link: "https://stripe.com",
    },
    {
      img: "https://logo.clearbit.com/wise.com",
      title: "FinanceHub",
      desc: "Giải pháp tài chính thông minh, tối ưu hóa dòng tiền cho doanh nghiệp vừa và nhỏ.",
      tag: "Fintech",
      members: 12,
      raised: "$500K",
      badge: "Đề xuất",
      link: "https://wise.com",
    },
    {
      img: "https://logo.clearbit.com/khanacademy.org",
      title: "EduSpace",
      desc: "Nền tảng học trực tuyến miễn phí, giúp hàng triệu học sinh tiếp cận tri thức.",
      tag: "Edtech",
      members: 8,
      raised: "$100K",
      badge: "Mới",
      link: "https://khanacademy.org",
    },
    {
      img: "https://logo.clearbit.com/healthline.com",
      title: "HealthPlus",
      desc: "Giải pháp y tế số, kết nối bệnh nhân với chuyên gia hàng đầu.",
      tag: "Healthtech",
      members: 30,
      raised: "$3M",
      badge: "Đang gọi vốn",
      link: "https://healthline.com",
    },
    {
      img: "https://logo.clearbit.com/tesla.com",
      title: "GreenTech",
      desc: "Khởi nghiệp năng lượng xanh, phát triển công nghệ sạch cho tương lai.",
      tag: "Energy",
      members: 15,
      raised: "$800K",
      badge: "Hot",
      link: "https://tesla.com",
    },
    {
      img: "https://logo.clearbit.com/airbnb.com",
      title: "StayConnect",
      desc: "Nền tảng kết nối chỗ ở toàn cầu",
      tag: "Travel",
    },
    {
      img: "https://logo.clearbit.com/duolingo.com",
      title: "LinguaPro",
      desc: "Ứng dụng học ngôn ngữ thông minh",
      tag: "Edtech",
    },
    {
      img: "https://logo.clearbit.com/robinhood.com",
      title: "Investly",
      desc: "Đầu tư dễ dàng cho mọi người",
      tag: "Fintech",
    },
    // Dữ liệu mẫu bổ sung
    {
      img: "https://logo.clearbit.com/shopify.com",
      title: "ShopMaster",
      desc: "Nền tảng thương mại điện tử cho SMEs",
      tag: "Ecommerce",
    },
    {
      img: "https://logo.clearbit.com/booking.com",
      title: "TravelGo",
      desc: "Đặt vé du lịch toàn cầu",
      tag: "Travel",
    },
    {
      img: "https://logo.clearbit.com/uber.com",
      title: "RideNow",
      desc: "Ứng dụng gọi xe thông minh",
      tag: "Mobility",
    },
    {
      img: "https://logo.clearbit.com/foodpanda.com",
      title: "Foodie",
      desc: "Giao đồ ăn nhanh chóng",
      tag: "Foodtech",
    },
    {
      img: "https://logo.clearbit.com/zoom.us",
      title: "MeetPro",
      desc: "Giải pháp họp trực tuyến cho doanh nghiệp",
      tag: "SaaS",
    },
    {
      img: "https://logo.clearbit.com/slack.com",
      title: "TeamSync",
      desc: "Kết nối nhóm làm việc hiệu quả",
      tag: "Productivity",
    },
    {
      img: "https://logo.clearbit.com/coinbase.com",
      title: "CryptoBase",
      desc: "Nền tảng giao dịch tiền số",
      tag: "Fintech",
    },
    {
      img: "https://logo.clearbit.com/spotify.com",
      title: "MusicWave",
      desc: "Ứng dụng nghe nhạc thông minh",
      tag: "Entertainment",
    },
    {
      img: "https://logo.clearbit.com/medium.com",
      title: "BlogMaster",
      desc: "Nền tảng chia sẻ kiến thức",
      tag: "Content",
    },
    {
      img: "https://logo.clearbit.com/figma.com",
      title: "DesignHub",
      desc: "Thiết kế cộng tác cho startup",
      tag: "Design",
    },
    {
      img: "https://logo.clearbit.com/github.com",
      title: "CodeBase",
      desc: "Quản lý mã nguồn cho nhóm dev",
      tag: "Devtools",
    },
    {
      img: "https://logo.clearbit.com/trello.com",
      title: "TaskFlow",
      desc: "Quản lý dự án trực quan",
      tag: "Productivity",
    },
    {
      img: "https://logo.clearbit.com/adobe.com",
      title: "CreativePro",
      desc: "Giải pháp sáng tạo cho doanh nghiệp",
      tag: "Design",
    },
    {
      img: "https://logo.clearbit.com/booking.com",
      title: "StayMaster",
      desc: "Đặt phòng khách sạn toàn cầu",
      tag: "Travel",
    },
  ];


  // Pagination logic (kept, but layout simplified)
  // Pagination logic (kept, but when small=true we show a compact subset and no pagination)
  // allow explicit override via props; otherwise fall back to small/default behavior
  const ITEMS_PER_ROW = columns ?? (small ? 2 : 3);
  const ROWS = rows ?? (small ? 2 : 3);
  const ITEMS_PER_PAGE = ITEMS_PER_ROW * ROWS;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(startups.length / ITEMS_PER_PAGE);

  const visibleStartups = startups.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section className="max-w-6xl mx-auto mt-8 text-center px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Các Startup Nổi Bật</h2>
      <p className="text-gray-500 mb-8 text-xs md:text-base">Khám phá những công ty sáng tạo đang tìm kiếm đối tác và cơ hội phát triển</p>

      {/* Single responsive grid for consistent layout */}
      <div
        className={`pb-4 auto-rows-fr grid gap-${small ? '6' : '8'}`}
        style={{
          gridTemplateColumns: `repeat(${ITEMS_PER_ROW}, minmax(0, 1fr))`,
          gap: '1.5rem',
        }}
      >
        {visibleStartups.map((s, i) => (
          <div className="h-full" key={i}>
            <StartupCard small={small} {...s} />
          </div>
        ))}
      </div>

      {/* Hide pagination when small (compact mode) */}
      {!small && totalPages > 1 && (
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
