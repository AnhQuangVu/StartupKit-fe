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
    return Array.from({ length: 20 }, (_, i) => {
      const id = i + 1;
      return {
        id,
        logo_url: `https://picsum.photos/300/300?random=${id}`,
        name: [
          "TechFlow", "FinanceHub", "HealthPlus", "GreenTech", "StayConnect", "LinguaPro", "ShopMaster", "TravelGo", "RideNow", "Foodie",
          "MeetPro", "TeamSync", "CryptoBase", "MusicWave", "BlogMaster", "DesignHub", "CodeBase", "TaskFlow", "EduPro", "BizConnect"
        ][i] || `Startup ${id}`,
        description: `Mô tả dự án ${id} - demo startup sáng tạo lĩnh vực ${[
          "AI", "Fintech", "Healthtech", "Energy", "Travel", "Edtech", "Ecommerce", "Mobility", "Foodtech", "SaaS",
          "Productivity", "Crypto", "Entertainment", "Content", "Design", "Devtools", "Education", "Business", "Logistics", "HR"
        ][i] || "Khởi nghiệp"}.`,
        industry: [
          "SaaS", "Fintech", "Healthtech", "Energy", "Travel", "Edtech", "Ecommerce", "Mobility", "Foodtech", "SaaS",
          "Productivity", "Crypto", "Entertainment", "Content", "Design", "Devtools", "Education", "Business", "Logistics", "HR"
        ][i] || "Startup",
        members: 10 + i * 2,
        capital_source: `$${(i + 1) * 100}K`,
        stage: ["production", "beta", "launch", "prototype", "alpha", "y-tuong"][i % 6],
        website_url: `/projects/${id}`,
        market_size: `${(i + 1) * 100000}`,
        customer_segment: [
          "B2B, SMEs", "DNVVN", "Bệnh nhân & Chuyên gia", "Doanh nghiệp sản xuất", "Du khách", "Người học ngoại ngữ", "SMEs", "Khách du lịch", "Người dùng phương tiện", "Khách hàng cá nhân",
          "B2B", "Đội nhóm", "Nhà đầu tư crypto", "Người yêu nhạc", "Blogger & Độc giả", "Designer", "Developer", "Quản lý dự án", "Học sinh", "Doanh nghiệp"
        ][i] || "Khách hàng demo",
        deployment_location: [
          "Hà Nội", "TP.HCM", "Singapore", "Đà Nẵng", "Quốc tế", "Châu Á", "Hà Nội", "Toàn cầu", "TP.HCM", "Hà Nội",
          "Quốc tế", "Toàn cầu", "Singapore", "Việt Nam", "Toàn quốc", "TP.HCM", "Quốc tế", "Hà Nội", "TP.HCM", "Hà Nội"
        ][i] || "Việt Nam",
        team_image: { url: `https://picsum.photos/600/200?random=${id}` },
        founder: {
          id: 100 + id,
          name: `Founder ${id}`,
          avatar: `https://picsum.photos/100/100?random=${100 + id}`,
          role: "Founder & CEO",
          bio: `Founder dự án ${id}, chuyên gia lĩnh vực ${[
            "AI", "Fintech", "Healthtech", "Energy", "Travel", "Edtech", "Ecommerce", "Mobility", "Foodtech", "SaaS",
            "Productivity", "Crypto", "Entertainment", "Content", "Design", "Devtools", "Education", "Business", "Logistics", "HR"
          ][i] || "Khởi nghiệp"}.`,
          email: `founder${id}@startup.com`,
          phone: `+84 91234${1000 + id}`,
          linkedin: `https://linkedin.com/in/founder${id}`,
          facebook: `https://facebook.com/founder${id}`
        },
        followers: 1000 + id * 10,
        created_at: `2025-10-${(id % 28) + 1}T09:00:00Z`,
        updated_at: `2025-11-${(id % 28) + 1}T10:00:00Z`,
        tags: ["Demo", "Startup", [
          "AI", "Fintech", "Healthtech", "Energy", "Travel", "Edtech", "Ecommerce", "Mobility", "Foodtech", "SaaS",
          "Productivity", "Crypto", "Entertainment", "Content", "Design", "Devtools", "Education", "Business", "Logistics", "HR"
        ][i] || "Khởi nghiệp"],
        achievements: [
          { content: `Giải thưởng demo ${id}`, link: `https://award.com/startup${id}` },
          { content: `Top ${id} Startup Việt Nam 2025`, link: `https://startupaward.vn/startup${id}` }
        ]
      };
    });
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