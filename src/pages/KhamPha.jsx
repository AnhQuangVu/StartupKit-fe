import React, { useState, useMemo } from "react";
import StartupList from "../components/common/StartupList";
import CompetitionList from "../components/home/CompetitionList";
import InvestorList from "../components/common/InvestorList";
import MentorList from "../components/common/MentorList";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faEnvelope, faBolt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function KhamPha() {
  const { isLoggedIn, user } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [stage, setStage] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // lightweight categories for filters
  const categories = [
    { key: "all", label: "Tất cả" },
    { key: "tech", label: "Công nghệ" },
    { key: "agri", label: "Nông nghiệp" },
    { key: "fin", label: "Fintech" },
    { key: "edu", label: "Edtech" },
  ];

  // Debounced/filtering can be added later; for now keep simple
  const handleSearchChange = (e) => setQuery(e.target.value);
  const handleCategoryClick = (k) => setCategory(k);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    // stub subscribe action - in future call API
    setSubscribed(true);
  };

  // show a quick stats summary (static for now)
  const stats = useMemo(
    () => [
      { number: "4.000+", label: "Startup tại Việt Nam" },
      { number: "150+", label: "Nhà đầu tư & Quỹ" },
      { number: "300+", label: "Sự kiện/năm" },
      { number: "$2.1B", label: "Vốn đầu tư (2024)" },
    ],
    []
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Khám Phá</h1>
            <p className="text-gray-600 mt-2">Tìm kiếm startup, sự kiện, nhà đầu tư và mentor phù hợp với bạn.</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FontAwesomeIcon icon={faSearch} /></span>
                <input
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm theo tên, từ khoá, hoặc lĩnh vực"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm bg-white"
                />
              </div>
              <button
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md"
                onClick={() => setQuery("")}
                title="Xóa tìm kiếm"
              >
                <FontAwesomeIcon icon={faFilter} />
                Lọc
              </button>
            </div>

            <div className="flex gap-2">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => handleCategoryClick(c.key)}
                  className={`px-3 py-2 rounded-full text-sm font-medium border ${
                    category === c.key ? "bg-[#FFCE23] border-[#FFCE23] text-black" : "bg-white border-gray-200 text-gray-700"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">{s.number}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>



          {/* Trends 2025 */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faBolt} className="text-[#FFCE23]" />
              Xu hướng Khởi nghiệp 2025
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="font-semibold text-gray-800 mb-2">AI & Automation</div>
                <div className="text-sm text-gray-600">Tăng cường ứng dụng AI trong SaaS, tự động hóa quy trình kinh doanh và phân tích dữ liệu.</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="font-semibold text-gray-800 mb-2">Sustainability & CleanTech</div>
                <div className="text-sm text-gray-600">Giải pháp năng lượng sạch, tiết kiệm tài nguyên và mô hình kinh doanh tuần hoàn đang thu hút đầu tư.</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="font-semibold text-gray-800 mb-2">Healthtech & EduTech</div>
                <div className="text-sm text-gray-600">Sản phẩm chăm sóc sức khoẻ số và công nghệ giáo dục tiếp tục mở rộng thị trường tại Việt Nam.</div>
              </div>
            </div>
          </section>

          {/* Featured startups (child component includes its own heading) */}
          <section className="mb-10">
            <StartupList columns={3} rows={4} />
          </section>

          {/* Events (child component includes its own heading) */}
          <section className="mb-10">
            <CompetitionList small />
          </section>

          {/* Investors (child component includes its own heading) */}
          <section className="mb-10">
            <InvestorList small />
          </section>

          {/* Mentors (child component includes its own heading) */}
          <section className="mb-8">
            <MentorList small />
          </section>

          {/* Resources */}
          <section className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Tài nguyên hữu ích</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">
                Hướng dẫn gọi vốn cho startup (checklist)
              </a>
              <a className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">
                Mẫu pitchdeck chuẩn cho nhà đầu tư
              </a>
              <a className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">
                Hợp đồng mẫu và lưu ý pháp lý
              </a>
              <a className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">
                Chương trình hỗ trợ sinh viên 2025
              </a>
              <a className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">
                Danh sách quỹ đầu tư hoạt động tại Việt Nam
              </a>
              <a className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">
                Khu vực pháp lý & đăng ký doanh nghiệp cho startup
              </a>
              <a className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">
                Tài liệu phát triển sản phẩm và validation thị trường
              </a>
              <a className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">
                Mạng lưới mentor & cố vấn doanh nghiệp
              </a>
            </div>
          </section>

          {/* Newsletter */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold">Nhận tin Khám Phá</h4>
                <p className="text-gray-600 text-sm">Đăng ký để nhận cập nhật về sự kiện, quỹ và chương trình dành cho sinh viên.</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="px-4 py-3 rounded-lg border border-gray-200 shadow-sm w-full md:w-72"
                />
                <button className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded-lg" disabled={subscribed}>
                  {subscribed ? "Đã đăng ký" : "Đăng ký"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
