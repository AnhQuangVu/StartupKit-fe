import React, { useState, useMemo, useEffect } from "react";
import StartupList from "../components/common/StartupList";
import CompetitionList from "../components/home/CompetitionList";
import InvestorList from "../components/common/InvestorList";
import MentorList from "../components/common/MentorList";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faEnvelope,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar isLoggedIn={isLoggedIn} user={user} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <header className="text-center mb-8">
          <div className="inline-block bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-md">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Khám Phá
            </h1>
            <p className="text-gray-600 mt-2">
              Tìm kiếm startup, sự kiện, nhà đầu tư và mentor phù hợp với bạn.
            </p>
          </div>
        </header>

        {/* search + filters compact */}
        <div className="mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm startup, sự kiện, nhà đầu tư..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => handleCategoryClick(c.key)}
                      className={`px-3 py-2 rounded-full text-sm font-medium ${
                        category === c.key
                          ? "bg-[#FFCE23] text-black"
                          : "bg-white text-gray-700 border border-gray-200"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    setStage("all");
                  }}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-200 text-center"
            >
              <div className="text-2xl font-bold text-gray-900">{s.number}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trends */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Xu hướng Khởi nghiệp 2025
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                {" "}
                <h4 className="font-semibold">AI & Automation</h4>
                <p className="text-sm text-gray-600">
                  AI trong SaaS và tự động hoá quy trình.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                {" "}
                <h4 className="font-semibold">Sustainability</h4>
                <p className="text-sm text-gray-600">
                  Năng lượng sạch & kinh doanh tuần hoàn.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                {" "}
                <h4 className="font-semibold">Healthtech & EduTech</h4>
                <p className="text-sm text-gray-600">
                  Chăm sóc sức khoẻ số & công nghệ giáo dục.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lists */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <StartupList columns={3} rows={4} />
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <CompetitionList />
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <InvestorList />
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <MentorList />
          </div>
        </section>

        {/* resources */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Tài nguyên hữu ích</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Hướng dẫn gọi vốn (checklist)",
                "Mẫu pitchdeck",
                "Hợp đồng mẫu",
                "Chương trình hỗ trợ sinh viên",
                "Danh sách quỹ",
                "Khu vực pháp lý",
                "Tài liệu phát triển sản phẩm",
                "Mạng lưới mentor",
              ].map((t, i) => (
                <a
                  key={i}
                  className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                  href="/coming-soon"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* newsletter CTA */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold">Nhận tin Khám Phá</h4>
              <p className="text-sm text-gray-600">
                Đăng ký để nhận cập nhật về sự kiện, quỹ và chương trình.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email của bạn"
                className="px-4 py-3 rounded-lg border border-gray-200 w-full md:w-72"
              />
              <button
                className="bg-[#FFCE23] text-black px-4 py-2 rounded-lg"
                disabled={subscribed}
              >
                {subscribed ? "Đã đăng ký" : "Đăng ký"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
