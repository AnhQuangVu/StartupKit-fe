import { useState, useEffect } from "react";
import StartupCard from "./StartupCard";
import { API_BASE } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function StartupList({ small = false, columns, rows }) {
  const { isLoggedIn } = useAuth();
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchPublishedProjects();
  }, []);

  const fetchPublishedProjects = async () => {
    try {
      setLoading(true);
      
      // Call correct public API endpoint - without query params
      const response = await fetch(`${API_BASE}/public/projects/published`);
      
      if (!response.ok) throw new Error('Không thể lấy danh sách projects');
      
      const data = await response.json();
      const allProjects = Array.isArray(data) ? data : [];
      
      console.log('📊 Raw data from API:', allProjects);
      
      // Debug: log chi tiết từng project
      allProjects.forEach(p => {
        console.log(`🔍 Full Project Data:`, p);
        console.table({
          name: p.name,
          industry: p.industry,
          stage: p.stage,
          member_count: p.member_count,
          capital_source: p.capital_source,
          logo_url: p.logo_url,
          description: p.description,
          tagline: p.tagline,
          website_url: p.website_url,
          created_at: p.created_at
        });
      });
      
      // Nếu endpoint `/public/projects/published` trả về, thì chính là published rồi!
      // Không cần filter, chỉ cần transform
      const sorted = allProjects.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
      
      // Transform to StartupCard format
      const transformed = sorted.map(p => ({
        id: p.id,
        img: p.logo_url || 'https://picsum.photos/300/300?random=' + p.id,
        title: p.name,
        desc: p.tagline || p.description || 'Khởi nghiệp sáng tạo',
        tag: p.industry || 'Startup',
        stage: p.stage,
        members: p.member_count || 0,
        raised: p.capital_source || 'N/A',
        link: `/projects/${p.id}`
      }));
      
      console.log('✅ Transformed data:', transformed);
      setStartups(transformed.length > 0 ? transformed : getMockData());
    } catch (error) {
      console.error('Fetch projects error:', error);
      // Fallback to mock data
      setStartups(getMockData());
    } finally {
      setLoading(false);
    }
  };

  // Mock data as fallback - with random images from picsum.photos
  const getMockData = () => {
    return [
      {
        id: 1,
        img: "https://picsum.photos/300/300?random=1",
        title: "TechFlow",
        desc: "Nền tảng tự động hóa quy trình bằng AI, giúp doanh nghiệp tăng hiệu suất và giảm chi phí.",
        tag: "SaaS",
        members: 25,
        raised: "$2M",
        badge: "Hot",
        link: "/projects/1",
      },
      {
        id: 2,
        img: "https://picsum.photos/300/300?random=2",
        title: "FinanceHub",
        desc: "Giải pháp tài chính thông minh, tối ưu hóa dòng tiền cho doanh nghiệp vừa và nhỏ.",
        tag: "Fintech",
        members: 12,
        raised: "$500K",
        badge: "Đề xuất",
        link: "/projects/2",
      },
      {
        id: 3,
        img: "https://picsum.photos/300/300?random=3",
        title: "EduSpace",
        desc: "Nền tảng học trực tuyến miễn phí, giúp hàng triệu học sinh tiếp cận tri thức.",
        tag: "Edtech",
        members: 8,
        raised: "$100K",
        badge: "Mới",
        link: "/projects/3",
      },
      {
        id: 4,
        img: "https://picsum.photos/300/300?random=4",
        title: "HealthPlus",
        desc: "Giải pháp y tế số, kết nối bệnh nhân với chuyên gia hàng đầu.",
        tag: "Healthtech",
        members: 30,
        raised: "$3M",
        badge: "Đang gọi vốn",
        link: "/projects/4",
      },
      {
        id: 5,
        img: "https://picsum.photos/300/300?random=5",
        title: "GreenTech",
        desc: "Khởi nghiệp năng lượng xanh, phát triển công nghệ sạch cho tương lai.",
        tag: "Energy",
        members: 15,
        raised: "$800K",
        badge: "Hot",
        link: "/projects/5",
      },
      {
        id: 6,
        img: "https://picsum.photos/300/300?random=6",
        title: "StayConnect",
        desc: "Nền tảng kết nối chỗ ở toàn cầu",
        tag: "Travel",
        members: 20,
        raised: "$1.5M",
        link: "/projects/6",
      },
      {
        id: 7,
        img: "https://picsum.photos/300/300?random=7",
        title: "LinguaPro",
        desc: "Ứng dụng học ngôn ngữ thông minh",
        tag: "Edtech",
        members: 18,
        raised: "$400K",
        link: "/projects/7",
      },
      {
        id: 8,
        img: "https://picsum.photos/300/300?random=8",
        title: "Investly",
        desc: "Đầu tư dễ dàng cho mọi người",
        tag: "Fintech",
        members: 22,
        raised: "$1.2M",
        link: "/projects/8",
      },
      {
        id: 9,
        img: "https://picsum.photos/300/300?random=9",
        title: "ShopMaster",
        desc: "Nền tảng thương mại điện tử cho SMEs",
        tag: "Ecommerce",
        members: 16,
        raised: "$600K",
        link: "/projects/9",
      },
      {
        id: 10,
        img: "https://picsum.photos/300/300?random=10",
        title: "TravelGo",
        desc: "Đặt vé du lịch toàn cầu",
        tag: "Travel",
        members: 14,
        raised: "$900K",
        link: "/projects/10",
      },
      {
        id: 11,
        img: "https://picsum.photos/300/300?random=11",
        title: "RideNow",
        desc: "Ứng dụng gọi xe thông minh",
        tag: "Mobility",
        members: 28,
        raised: "$2.5M",
        link: "/projects/11",
      },
      {
        id: 12,
        img: "https://picsum.photos/300/300?random=12",
        title: "Foodie",
        desc: "Giao đồ ăn nhanh chóng",
        tag: "Foodtech",
        members: 11,
        raised: "$350K",
        link: "/projects/12",
      },
      {
        id: 13,
        img: "https://picsum.photos/300/300?random=13",
        title: "MeetPro",
        desc: "Giải pháp họp trực tuyến cho doanh nghiệp",
        tag: "SaaS",
        members: 24,
        raised: "$1.8M",
        link: "/projects/13",
      },
      {
        id: 14,
        img: "https://picsum.photos/300/300?random=14",
        title: "TeamSync",
        desc: "Kết nối nhóm làm việc hiệu quả",
        tag: "Productivity",
        members: 19,
        raised: "$1.1M",
        link: "/projects/14",
      },
      {
        id: 15,
        img: "https://picsum.photos/300/300?random=15",
        title: "CryptoBase",
        desc: "Nền tảng giao dịch tiền số",
        tag: "Fintech",
        members: 26,
        raised: "$2.2M",
        link: "/projects/15",
      },
      {
        id: 16,
        img: "https://picsum.photos/300/300?random=16",
        title: "MusicWave",
        desc: "Ứng dụng nghe nhạc thông minh",
        tag: "Entertainment",
        members: 17,
        raised: "$700K",
        link: "/projects/16",
      },
      {
        id: 17,
        img: "https://picsum.photos/300/300?random=17",
        title: "BlogMaster",
        desc: "Nền tảng chia sẻ kiến thức",
        tag: "Content",
        members: 13,
        raised: "$450K",
        link: "/projects/17",
      },
      {
        id: 18,
        img: "https://picsum.photos/300/300?random=18",
        title: "DesignHub",
        desc: "Thiết kế cộng tác cho startup",
        tag: "Design",
        members: 21,
        raised: "$1.3M",
        link: "/projects/18",
      },
      {
        id: 19,
        img: "https://picsum.photos/300/300?random=19",
        title: "CodeBase",
        desc: "Quản lý mã nguồn cho nhóm dev",
        tag: "Devtools",
        members: 29,
        raised: "$2.7M",
        link: "/projects/19",
      },
      {
        id: 20,
        img: "https://picsum.photos/300/300?random=20",
        title: "TaskFlow",
        desc: "Quản lý dự án trực quan",
        tag: "Productivity",
        members: 10,
        raised: "$250K",
        link: "/projects/20",
      },
    ];
  };

  const ITEMS_PER_ROW = columns ?? (small ? 2 : 3);
  const ROWS = rows ?? (small ? 2 : 3);
  const ITEMS_PER_PAGE = ITEMS_PER_ROW * ROWS;
  const totalPages = Math.ceil(startups.length / ITEMS_PER_PAGE);

  const visibleStartups = startups.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <FontAwesomeIcon icon={faSpinner} className="text-4xl text-[#FFCE23] animate-spin mb-4" />
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <section className="w-full mt-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Các Startup Nổi Bật</h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">Khám phá những công ty sáng tạo đang tìm kiếm đối tác và cơ hội phát triển</p>
        </div>

        {/* Responsive grid - auto adjust columns on different screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-4">
          {visibleStartups.map((s, i) => (
            <div className="w-full" key={i}>
              <StartupCard small={small} {...s} />
            </div>
          ))}
        </div>

        {/* Hide pagination when small (compact mode) */}
        {!small && totalPages > 1 && (
          <div className="flex justify-center mt-6 sm:mt-8 gap-2 flex-wrap">
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
                className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-150 text-sm font-semibold ${
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
      </div>
    </section>
  );
}
