import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import FeedbackButton from "../components/common/FeedbackButton";
import ChatBot from "../components/common/ChatBot";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faRocket,
  faGlobe,
  faChartLine,
  faUsers,
  faLightbulb,
  faHandshake,
  faUserTie,
  faBuilding,
  faSearch,
  faCheckCircle,
  faQuoteLeft,
  faStar,
  faBolt,
  faShield,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function TrangChu() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const navigate1 = useNavigate();
  const [homeQuery, setHomeQuery] = useState("");
  const trending = ["AI", "Fintech", "Edtech", "Prototype", "Ra mắt", "SaaS"];

  const handleHomeSearch = (e) => {
    e.preventDefault();
    const q = homeQuery.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    navigate(`/kham-pha${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleChipClick = (q) => {
    setHomeQuery(q);
    const params = new URLSearchParams();
    params.set("q", q);
    navigate(`/kham-pha?${params.toString()}`);
  };

  const statsTop = [
    {
      number: "4.000+",
      label: "Startup đang hoạt động",
      source: "Bộ KH&CN 2024",
      icon: faRocket,
    },
    {
      number: "Hạng 56",
      label: "Xếp hạng toàn cầu",
      source: "StartupBlink 2024",
      icon: faGlobe,
    },
    {
      number: "56 nghìn tỷ",
      label: "Vốn đầu tư 2024",
      source: "NIC Vietnam",
      icon: faChartLine,
    },
    {
      number: "77 triệu",
      label: "Người dùng Internet",
      source: "Statista",
      icon: faUsers,
    },
  ];

  const ecosystem = [
    { number: "1.400+", label: "Tổ chức hỗ trợ", icon: faBuilding },
    { number: "208", label: "Quỹ đầu tư VC", icon: faHandshake },
    { number: "35", label: "Accelerators", icon: faLightbulb },
    { number: "79", label: "Incubators", icon: faUserTie },
  ];

  const successStories = [
    {
      name: "Nguyễn Văn A",
      role: "CEO, TechFlow",
      quote:
        "StartupKit giúp tôi kết nối với nhà đầu tư phù hợp chỉ sau 2 tháng. Nền tảng thực sự hiệu quả!",
      achievement: "Gọi vốn thành công $500K",
      logo: "https://picsum.photos/80/80?random=101",
    },
    {
      name: "Trần Thị B",
      role: "Founder, FinanceHub",
      quote:
        "Chương trình mentorship 1-1 vô cùng chất lượng. Mentor giúp tôi định hướng chiến lược rõ ràng.",
      achievement: "Tăng trưởng 300% sau 6 tháng",
      logo: "https://picsum.photos/80/80?random=102",
    },
    {
      name: "Lê Văn C",
      role: "Co-founder, EduSpace",
      quote:
        "Từ ý tưởng đến MVP chỉ trong 3 tháng nhờ hệ sinh thái hỗ trợ toàn diện từ StartupKit.",
      achievement: "10K+ người dùng đầu tiên",
      logo: "https://picsum.photos/80/80?random=103",
    },
  ];

  const whyChoose = [
    {
      icon: faBolt,
      title: "Nhanh chóng & Hiệu quả",
      desc: "Kết nối với nhà đầu tư và mentor trong vòng 48 giờ",
    },
    {
      icon: faShield,
      title: "Đáng tin cậy",
      desc: "Hơn 1000+ startup đã tin tưởng và thành công",
    },
    {
      icon: faUsers,
      title: "Cộng đồng chất lượng",
      desc: "Kết nối với founder, investor, mentor hàng đầu VN",
    },
  ];

  const faqs = [
    {
      q: "StartupKit là gì?",
      a: "StartupKit là nền tảng kết nối startup với nhà đầu tư, mentor và các nguồn lực cần thiết để phát triển doanh nghiệp.",
    },
    {
      q: "Tôi cần chuẩn bị gì để tham gia?",
      a: "Bạn chỉ cần có ý tưởng rõ ràng, đội ngũ cam kết và sẵn sàng học hỏi. Chúng tôi sẽ hỗ trợ phần còn lại.",
    },
    {
      q: "Chi phí sử dụng như thế nào?",
      a: "Đăng ký miễn phí. Các gói cao cấp với tính năng nâng cao bắt đầu từ 1.5M/tháng.",
    },
    {
      q: "Mất bao lâu để kết nối với nhà đầu tư?",
      a: "Trung bình 2-4 tuần tùy thuộc vào chất lượng hồ sơ và mức độ phù hợp với quỹ.",
    },
    {
      q: "Tôi có thể tìm mentor trong lĩnh vực cụ thể không?",
      a: "Có, chúng tôi có mạng lưới mentor đa dạng từ Fintech, Edtech, Healthtech đến SaaS và nhiều lĩnh vực khác.",
    },
  ];

  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar isLoggedIn={isLoggedIn} user={user} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero (kept small to fit header) */}
        <Hero small />

        {/* Global Search Bar moved into Hero - placeholder section removed */}

        {/* Intro + Top Stats */}
        <section className="mt-8 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Hệ sinh thái <span className="text-[#FFCE23]">Khởi nghiệp</span>{" "}
              Việt Nam
            </h2>
            <p className="mt-3 text-gray-700">
              Kết nối mentor, nhà đầu tư và chương trình thực chiến giúp rút
              ngắn lộ trình tới MVP.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsTop.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md border border-gray-200 transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xl flex-shrink-0">
                    <FontAwesomeIcon icon={s.icon} />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-extrabold text-[#FFCE23]">
                      {s.number}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {s.label}
                    </div>
                    <div className="text-xs text-gray-500">{s.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem quick row */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ecosystem.map((e, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-amber-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={e.icon} />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {e.number}
                    </div>
                    <div className="text-xs text-gray-600">{e.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Student insights */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">
                Quan tâm & Thực tế
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Nhiều sinh viên quan tâm khởi nghiệp nhưng cần mentorship, vốn
                và kết nối khách hàng đầu tiên.
              </p>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">
                Nỗi Đau Thường Gặp
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Hạn chế vốn seed/angel</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Thiếu mentorship & go-to-market</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Khó tuyển dụng & giữ chân nhân lực</span>
                </li>
              </ul>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">
                Cơ Hội & Hướng Đi
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Ưu tiên mobile-first, SaaS cho SMEs, Fintech, EdTech & hợp tác
                pilot với doanh nghiệp.
              </p>
            </article>
          </div>
          <div className="mt-6 text-center">
            <button
              className="inline-flex items-center gap-3 bg-[#FFCE23] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 shadow-sm transition-all"
              onClick={() => (window.location.href = "https://dean1665.vn/")}
            >
              Tìm hiểu chương trình cho sinh viên
            </button>
          </div>
        </section>

        {/* Value cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="mb-4 w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h4 className="font-bold text-gray-900 mb-3">Dành cho Founder</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Tạo hồ sơ startup chuyên nghiệp</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Kết nối với quỹ & mentor</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="mb-4 w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <h4 className="font-bold text-gray-900 mb-3">
                Dành cho Nhà Đầu Tư
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Khám phá startup chất lượng</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Deal flow được xác thực</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="mb-4 w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <h4 className="font-bold text-gray-900 mb-3">Dành cho Mentor</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Chia sẻ kinh nghiệm</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Tham gia chương trình mentor & workshop</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Challenges grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Vốn", desc: "Kết nối quỹ VC & angel" },
              { title: "Mentorship", desc: "Mạng lưới mentor chất lượng" },
              { title: "Nhân lực", desc: "Tiếp cận nguồn nhân lực CNTT" },
            ].map((c, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="text-xl font-bold text-[#FFCE23] mb-2">
                  {c.title}
                </div>
                <p className="text-sm text-gray-700">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose StartupKit */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
              Tại sao chọn <span className="text-[#FFCE23]">StartupKit</span>?
            </h2>
            <p className="text-gray-700">
              Giải pháp toàn diện cho hành trình khởi nghiệp của bạn
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mx-auto mb-4">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
              Câu hỏi <span className="text-[#FFCE23]">Thường gặp</span>
            </h2>
            <p className="text-gray-700">
              Giải đáp nhanh những thắc mắc phổ biến
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-gray-500 transition-transform ${openFaq === idx ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#FFCE23] to-[#FFD600] rounded-xl p-8 text-center shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
              Sẵn sàng bắt đầu hành trình khởi nghiệp?
            </h3>
            <p className="text-gray-800 mb-6">
              Tham gia cộng đồng, tìm mentor và gọi vốn nhanh hơn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="px-6 py-3 bg-black text-[#FFCE23] rounded-md font-semibold"
                onClick={() => !isLoggedIn && navigate("/register")}
              >
                Đăng ký ngay
              </button>
              <button
                className="px-6 py-3 bg-white text-black rounded-md border"
                onClick={() => navigate("/kham-pha")}
              >
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ChatBot />
      {/* Feedback Button */}
      <FeedbackButton formLink="https://forms.gle/2eGMUWPXxKD8ZXnx6" />
    </div>
  );
}
