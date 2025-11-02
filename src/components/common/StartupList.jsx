import { useState, useEffect } from "react";
// 💡 CẬP NHẬT: Thay thế import StartupCard bằng LightStartupCard
import LightStartupCard from "./StartupCard";
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

  // Mock data as fallback - KHÔNG THAY ĐỔI
  const getMockData = () => {
    return [
      {
        id: 1,
        logo_url: "https://picsum.photos/300/300?random=1",
        name: "TechFlow",
        description: "Nền tảng tự động hóa quy trình bằng AI, giúp doanh nghiệp tăng hiệu suất và giảm chi phí.",
        industry: "SaaS",
        members: 25,
        capital_source: "$2M",
        stage: 'production',
        website_url: "/projects/1",
        market_size: "2000000",
        customer_segment: "B2B, SMEs",
        deployment_location: "Hà Nội",
        team_image: { url: "https://picsum.photos/600/200?random=1" }
      },
      {
        id: 2,
        logo_url: "https://picsum.photos/300/300?random=2",
        name: "FinanceHub",
        description: "Giải pháp tài chính thông minh, tối ưu hóa dòng tiền cho doanh nghiệp vừa và nhỏ.",
        industry: "Fintech",
        members: 12,
        capital_source: "$500K",
        stage: 'beta',
        website_url: "https://financehub.com/project/2",
        market_size: "500000",
        customer_segment: "DNVVN",
        deployment_location: "TP.HCM",
        team_image: { url: "https://picsum.photos/600/200?random=2" }
      },
      // ... (Giữ nguyên các mục mock data khác và thêm các key mới cần thiết nếu thiếu)
      // Để đảm bảo LightStartupCard hoạt động, tôi sẽ thêm các key tương ứng
      {
             market_area: "Hà Nội",
      },
      {
        id: 4, logo_url: "https://picsum.photos/300/300?random=4", name: "HealthPlus", description: "Giải pháp y tế số, kết nối bệnh nhân với chuyên gia hàng đầu.", industry: "Healthtech", members: 30, capital_source: "$3M", website_url: "/projects/4", stage: 'launch', market_size: "3000000", customer_segment: "Bệnh nhân & Chuyên gia", deployment_location: "Singapore", team_image: { url: "https://picsum.photos/600/200?random=4" }
      },
      {
        id: 5, logo_url: "https://picsum.photos/300/300?random=5", name: "GreenTech", description: "Khởi nghiệp năng lượng xanh, phát triển công nghệ sạch cho tương lai.", industry: "Energy", members: 15, capital_source: "$800K", website_url: "/projects/5", stage: 'prototype', market_size: "800000", customer_segment: "Doanh nghiệp sản xuất", deployment_location: "Đà Nẵng", team_image: { url: "https://picsum.photos/600/200?random=5" }
      },
      {
        id: 6, logo_url: "https://picsum.photos/300/300?random=6", name: "StayConnect", description: "Nền tảng kết nối chỗ ở toàn cầu", industry: "Travel", members: 20, capital_source: "$1.5M", website_url: "/projects/6", stage: 'production', market_size: "1500000", customer_segment: "Du khách", deployment_location: "Quốc tế"
      },
      {
        id: 7, logo_url: "https://picsum.photos/300/300?random=7", name: "LinguaPro", description: "Ứng dụng học ngôn ngữ thông minh", industry: "Edtech", members: 18, capital_source: "$400K", website_url: "/projects/7", stage: 'beta', market_size: "400000", customer_segment: "Người học ngoại ngữ", deployment_location: "Châu Á"
      },
      {
             market_area: "TP.HCM",
      },
      {
        id: 9, logo_url: "https://picsum.photos/300/300?random=9", name: "ShopMaster", description: "Nền tảng thương mại điện tử cho SMEs", industry: "Ecommerce", members: 16, capital_source: "$600K", website_url: "/projects/9", stage: 'production', market_size: "600000", customer_segment: "SMEs", deployment_location: "Hà Nội"
      },
      {
        id: 10, logo_url: "https://picsum.photos/300/300?random=10", name: "TravelGo", description: "Đặt vé du lịch toàn cầu", industry: "Travel", members: 14, capital_source: "$900K", website_url: "/projects/10", stage: 'production', market_size: "900000", customer_segment: "Khách du lịch", deployment_location: "Toàn cầu"
      },
      {
        id: 11, logo_url: "https://picsum.photos/300/300?random=11", name: "RideNow", description: "Ứng dụng gọi xe thông minh", industry: "Mobility", members: 28, capital_source: "$2.5M", website_url: "/projects/11", stage: 'launch', market_size: "2500000", customer_segment: "Người dùng phương tiện", deployment_location: "TP.HCM"
      },
      {
        id: 12, logo_url: "https://picsum.photos/300/300?random=12", name: "Foodie", description: "Giao đồ ăn nhanh chóng", industry: "Foodtech", members: 11, capital_source: "$350K", website_url: "/projects/12", stage: 'alpha', market_size: "350000", customer_segment: "Khách hàng cá nhân", deployment_location: "Hà Nội"
      },
      {
        id: 13, logo_url: "https://picsum.photos/300/300?random=13", name: "MeetPro", description: "Giải pháp họp trực tuyến cho doanh nghiệp", industry: "SaaS", members: 24, capital_source: "$1.8M", website_url: "/projects/13", stage: 'production', market_size: "1800000", customer_segment: "B2B", deployment_location: "Quốc tế"
      },
      {
        id: 14, logo_url: "https://picsum.photos/300/300?random=14", name: "TeamSync", description: "Kết nối nhóm làm việc hiệu quả", industry: "Productivity", members: 19, capital_source: "$1.1M", website_url: "/projects/14", stage: 'beta', market_size: "1100000", customer_segment: "Đội nhóm", deployment_location: "Toàn cầu"
      },
      {
        id: 15, logo_url: "https://picsum.photos/300/300?random=15", name: "CryptoBase", description: "Nền tảng giao dịch tiền số", industry: "Fintech", members: 26, capital_source: "$2.2M", website_url: "/projects/15", stage: 'production', market_size: "2200000", customer_segment: "Nhà đầu tư crypto", deployment_location: "Singapore"
      },
      {
        id: 16, logo_url: "https://picsum.photos/300/300?random=16", name: "MusicWave", description: "Ứng dụng nghe nhạc thông minh", industry: "Entertainment", members: 17, capital_source: "$700K", website_url: "/projects/16", stage: 'alpha', market_size: "700000", customer_segment: "Người yêu nhạc", deployment_location: "Việt Nam"
      },
      {
        id: 17, logo_url: "https://picsum.photos/300/300?random=17", name: "BlogMaster", description: "Nền tảng chia sẻ kiến thức", industry: "Content", members: 13, capital_source: "$450K", website_url: "/projects/17", stage: 'launch', market_size: "450000", customer_segment: "Blogger & Độc giả", deployment_location: "Toàn quốc"
      },
      {
        id: 18, logo_url: "https://picsum.photos/300/300?random=18", name: "DesignHub", description: "Thiết kế cộng tác cho startup", industry: "Design", members: 21, capital_source: "$1.3M", website_url: "/projects/18", stage: 'production', market_size: "1300000", customer_segment: "Designer", deployment_location: "TP.HCM"
      },
      {
        id: 19, logo_url: "https://picsum.photos/300/300?random=19", name: "CodeBase", description: "Quản lý mã nguồn cho nhóm dev", industry: "Devtools", members: 29, capital_source: "$2.7M", website_url: "/projects/19", stage: 'production', market_size: "2700000", customer_segment: "Developer", deployment_location: "Quốc tế"
      },
      {
        id: 20, logo_url: "https://picsum.photos/300/300?random=20", name: "TaskFlow", description: "Quản lý dự án trực quan", industry: "Productivity", members: 10, capital_source: "$250K", website_url: "/projects/20", stage: 'y-tuong', market_size: "250000", customer_segment: "Quản lý dự án", deployment_location: "Hà Nội"
      },
    ];
  };

  const fetchPublishedProjects = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/public/projects/published`);
      
      if (!response.ok) throw new Error('Không thể lấy danh sách projects');
      
      const data = await response.json();
      
      let allProjects = [];
      if (Array.isArray(data)) {
        allProjects = data;
      } else if (data && data.items && Array.isArray(data.items)) {
        allProjects = data.items;
      }
      
      const sorted = allProjects.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
      
      // 💡 CẬP NHẬT: Transform data để phù hợp với props của LightStartupCard
      const transformed = sorted.map(p => ({
  id: p.id,
  logo_url: p.logo_url || `https://picsum.photos/300/300?random=${p.id}`,
  name: p.name,
  description: p.tagline || p.description || 'Khởi nghiệp sáng tạo',
  industry: p.industry || 'Startup',
  stage: p.stage || 'y-tuong',
  members: p.member_count || 0,
  website_url: `/projects/${p.id}`, 
  market_size: p.market_size || '0',
  customer_segment: p.customer_segment || 'N/A',
     market_area: p.market_area || p.deployment_location || 'N/A',
  team_image: p.team_image || null,
      }));
      
      if (transformed.length > 0) {
        setStartups(transformed);
      } else {
        setStartups(getMockData());
      }
    } catch (error) {
      console.error('Fetch projects error:', error);
      setStartups(getMockData());
    } finally {
      setLoading(false);
    }
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

  // Stage translation
  const translateStage = (stage) => {
    switch (stage) {
      case 'y-tuong': return 'Ý tưởng';
      case 'nghien-cuu-thi-truong': return 'Nghiên cứu thị trường';
      case 'hoan-thien-san-pham': return 'Hoàn thiện sản phẩm';
      case 'khao-sat': return 'Khảo sát';
      case 'launch': return 'Ra mắt/Tăng trưởng';
      default: return stage;
    }
  };

  return (
    <section className="w-full mt-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Các Startup Nổi Bật</h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">Khám phá những công ty sáng tạo đang tìm kiếm đối tác và cơ hội phát triển</p>
        </div>

        {/* Responsive grid - auto adjust columns on different screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-4">
          {visibleStartups.map((s) => (
            <div className="w-full" key={s.id}>
              <LightStartupCard
                name={s.name}
                description={s.description}
                industry={s.industry}
                market_size={s.market_size}
                website_url={s.website_url}
                logo_url={s.logo_url}
                customer_segment={s.customer_segment}
                market_area={s.market_area}
                stage={translateStage(s.stage)}
                members={s.members}
                team_image={s.team_image}
              />
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