import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/layout/Footer";
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
} from "@fortawesome/free-solid-svg-icons";

export default function TrangChu() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const navigate1 = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar isLoggedIn={isLoggedIn} user={user} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero (kept small to fit header) */}
        <Hero small />

        {/* Intro + Top Stats */}
        <section className="mt-8 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Hệ sinh thái <span className="text-[#FFCE23]">Khởi nghiệp</span>{" "}
              Việt Nam
            </h2>
            <p className="mt-3 text-gray-600">
              Kết nối mentor, nhà đầu tư và chương trình thực chiến giúp rút
              ngắn lộ trình tới MVP.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsTop.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[#FFCE23]">
                      {s.number}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {s.label}
                    </div>
                    <div className="text-xs text-gray-400">{s.source}</div>
                  </div>
                  <div className="text-gray-300 text-3xl">
                    <FontAwesomeIcon icon={s.icon} />
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
                className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100"
              >
                <div className="text-xl text-gray-500 mb-2">
                  <FontAwesomeIcon icon={e.icon} />
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {e.number}
                </div>
                <div className="text-sm text-gray-600">{e.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Student insights */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">
                Quan tâm & Thực tế
              </h3>
              <p className="text-sm text-gray-600">
                Nhiều sinh viên quan tâm khởi nghiệp nhưng cần mentorship, vốn
                và kết nối khách hàng đầu tiên.
              </p>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">
                Nỗi Đau Thường Gặp
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Hạn chế vốn seed/angel</li>
                <li>• Thiếu mentorship & go-to-market</li>
                <li>• Khó tuyển dụng & giữ chân nhân lực</li>
              </ul>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">
                Cơ Hội & Hướng Đi
              </h3>
              <p className="text-sm text-gray-600">
                Ưu tiên mobile-first, SaaS cho SMEs, Fintech, EdTech & hợp tác
                pilot với doanh nghiệp.
              </p>
            </article>
          </div>
          <div className="mt-6 text-center">
            <button
              className="inline-flex items-center gap-3 bg-[#FFCE23] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400"
              onClick={() => (window.location.href = "https://dean1665.vn/")}
            >
              Tìm hiểu chương trình cho sinh viên
            </button>
          </div>
        </section>

        {/* Value cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4 text-3xl text-gray-700">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h4 className="font-semibold mb-3">Dành cho Founder</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Tạo hồ sơ startup chuyên nghiệp</li>
                <li>• Kết nối với quỹ & mentor</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4 text-3xl text-gray-700">
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <h4 className="font-semibold mb-3">Dành cho Nhà Đầu Tư</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Khám phá startup chất lượng</li>
                <li>• Deal flow được xác thực</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4 text-3xl text-gray-700">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <h4 className="font-semibold mb-3">Dành cho Mentor</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Chia sẻ kinh nghiệm</li>
                <li>• Tham gia chương trình mentor & workshop</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Challenges grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-2xl font-bold text-[#FFCE23]">Vốn</div>
              <p className="text-sm text-gray-600 mt-2">
                Kết nối quỹ VC & angel
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-2xl font-bold text-[#FFCE23]">
                Mentorship
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Mạng lưới mentor chất lượng
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-2xl font-bold text-[#FFCE23]">Nhân lực</div>
              <p className="text-sm text-gray-600 mt-2">
                Tiếp cận nguồn nhân lực CNTT
              </p>
            </div>
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
    </div>
  );
}
