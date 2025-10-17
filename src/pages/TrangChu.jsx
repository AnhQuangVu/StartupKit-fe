import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import SearchBox from "../components/common/SearchBox";
import CompetitionList from "../components/home/CompetitionList";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faRocket, 
  faGlobe, 
  faChartLine, 
  faUsers,
  faLightbulb,
  faHandshake,
  faUserTie,
  faSackDollar,
  faChalkboardUser,
  faPeopleGroup,
  faBullseye,
  faFileContract,
  faGaugeHigh,
  faBuilding,
  faBriefcase,
  faGraduationCap,
  faLaptopCode
} from "@fortawesome/free-solid-svg-icons";

export default function TrangChu() {
  const { isLoggedIn, user } = useAuth();

  // Top highlight stats
  const statsTop = [
    { number: "4.000+", label: "Startup đang hoạt động", source: "Bộ KH&CN 2024", icon: faRocket },
    { number: "Hạng 56", label: "Thế giới", source: "StartupBlink 2024", icon: faGlobe },
    { number: "56 nghìn tỷ", label: "Vốn đầu tư năm 2024", source: "NIC Vietnam", icon: faChartLine },
    { number: "77 triệu", label: "Người dùng Internet", source: "Statista", icon: faUsers },
  ];

  // Ecosystem small stats
  const statsEcosystem = [
    { number: "1.400+", label: "Tổ chức hỗ trợ", source: "Bộ KH&CN", icon: faBuilding },
    { number: "208", label: "Quỹ đầu tư VC", source: "Bộ KH&CN", icon: faBriefcase },
    { number: "35", label: "Accelerators", source: "Bộ KH&CN", icon: faGaugeHigh },
    { number: "79", label: "Incubators", source: "Bộ KH&CN", icon: faLightbulb },
    { number: "170+", label: "Trường ĐH tham gia", source: "Bộ KH&CN", icon: faGraduationCap },
    { number: "50K+", label: "Cử nhân CNTT/năm", source: "Bộ GD&ĐT", icon: faLaptopCode },
  ];

  // Achievements / badges (store icon refs, render with consistent color)
  const achievements = [
    {
      iconRef: faRocket,
      number: "4.000+",
      label: "Startup đang hoạt động",
      desc: "Theo số liệu mới nhất từ Bộ KH&CN",
      detail: "Cập nhật tháng 1/2024",
    },
    {
      iconRef: faGlobe,
      number: "Hạng 56",
      label: "Thế giới",
      desc: "Xếp hạng toàn cầu về số lượng startup",
      detail: "Nguồn: StartupBlink 2024",
    },
    {
      iconRef: faChartLine,
      number: "56 nghìn tỷ",
      label: "Vốn đầu tư năm 2024",
      desc: "Dự báo tổng vốn đầu tư vào các startup",
      detail: "Nguồn: NIC Vietnam",
    },
    {
      iconRef: faUsers,
      number: "77 triệu",
      label: "Người dùng Internet",
      desc: "Thị trường tiềm năng cho các sản phẩm công nghệ",
      detail: "Nguồn: Statista",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Lớp nền với hoạ tiết */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#3b82f618_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        <div className="absolute top-[-100px] left-[-60px] w-[320px] h-[320px] rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 opacity-25 blur-3xl"></div>
        <div className="absolute top-[35%] right-[8%] w-[280px] h-[280px] rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 opacity-22 blur-3xl"></div>
        <div className="absolute bottom-[-80px] left-[15%] w-[260px] h-[260px] rounded-full bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-500 opacity-20 blur-2xl"></div>
        <div className="absolute top-[50%] left-[5%] w-[180px] h-[180px] rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500 opacity-18 blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40"></div>
      </div>

      <div className="relative z-10">
        <Navbar isLoggedIn={isLoggedIn} user={user} />
        <main className="flex-1">
          <Hero small />
          {/* Stats Section - Số liệu nổi bật */}
          <section className="py-16 px-4 max-w-7xl mx-auto">
            {/* Tiêu đề chính */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Hệ Sinh Thái <span className="text-[#FFCE23]">Khởi Nghiệp</span> Việt Nam
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Kết nối sinh viên với mentor, nguồn vốn và chương trình thực chiến để rút ngắn thời gian tới MVP
              </p>
            </div>

            {/* Top Stats Grid - Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statsTop.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-yellow-200 hover:border-[#FFCE23] group relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 text-gray-900 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FontAwesomeIcon icon={stat.icon} className="text-5xl" />
                  </div>
                  <div className="relative text-center">
                    <div className="text-5xl font-bold text-[#FFCE23] mb-3 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-800 font-semibold text-lg mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 italic">
                      {stat.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ecosystem Stats - Grid nhỏ hơn */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Cơ Sở Hạ Tầng <span className="text-[#FFCE23]">Hệ Sinh Thái</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statsEcosystem.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-yellow-300 text-center group"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={stat.icon} className="text-xl text-gray-900" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#FFCE23] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-700 font-medium mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-400 italic">
                      {stat.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white via-gray-50 to-blue-50 border border-gray-200 rounded-xl shadow-md px-6 py-4 flex flex-col items-center min-w-[200px] max-w-[240px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <span className="text-3xl mb-2 text-gray-900">
                    <FontAwesomeIcon icon={item.iconRef} />
                  </span>
                  <span className="text-2xl font-bold text-gray-700 mb-1">{item.number}</span>
                  <span className="text-base font-semibold text-gray-600 mb-1">{item.label}</span>
                  <span className="text-xs text-gray-500 italic mb-1">{item.desc}</span>
                  {item.detail && (
                    <span className="text-xs text-gray-400 mt-1">{item.detail}</span>
                  )}
                </div>
              ))}
            </div>

            {/* NEW: Student Startup Insights (mới bổ sung) */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Góc Nhìn Sinh Viên <span className="text-[#FFCE23]">Khởi Nghiệp</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-3">Quan tâm & Thực tế</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Nhiều sinh viên thể hiện mong muốn khởi nghiệp; tuy nhiên tỉ lệ chuyển thành doanh nghiệp hoạt động thấp do hạn chế vốn và kinh nghiệm.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Ý định khởi nghiệp: nhiều khảo sát trường cho thấy 30–60% sinh viên quan tâm (tùy khảo sát).</li>
                    <li>• Thời gian đến MVP: thường vài tuần → vài tháng khi có mentor & tài trợ.</li>
                    <li>• Nhu cầu: mentorship, không gian làm việc, micro-grant, kết nối khách hàng đầu tiên.</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-3">Nỗi Đau Thường Gặp</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Hạn chế vốn seed/angel, chi phí sinh hoạt.</li>
                    <li>• Thiếu mentorship về business, pháp lý, go‑to‑market.</li>
                    <li>• Tuyển dụng kỹ sư & giữ chân nhân lực khi chưa trả lương cạnh tranh.</li>
                    <li>• Khó tìm early adopters/khách hàng đầu tiên.</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-3">Cơ Hội & Hướng Đi</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Ưu tiên mobile‑first, SaaS cho SMEs, Fintech, EdTech, Agritech.</li>
                    <li>• Hợp tác với doanh nghiệp truyền thống để pilot/POC.</li>
                    <li>• Chương trình incubation 3 tháng: mentor weekly + seed micro‑grant + demo day.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button className="bg-[#FFCE23] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all">
                  Tìm hiểu chương trình cho sinh viên
                </button>
              </div>
            </div>

            {/* Value Proposition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Card 1: Cho Founder */}
              <div className="bg-white rounded-2xl p-8 border-2 border-yellow-200 hover:border-[#FFCE23] transition-all duration-300 hover:shadow-xl group">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-6 transition-transform duration-300">
                  <FontAwesomeIcon icon={faLightbulb} className="text-4xl text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  Dành cho <span className="text-[#FFCE23]">Founder</span>
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Tạo hồ sơ startup chuyên nghiệp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Kết nối với 208 quỹ VC & investor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Tiếp cận 1.400+ tổ chức hỗ trợ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Tham gia 35 chương trình accelerator</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Cho Investor */}
              <div className="bg-white rounded-2xl p-8 border-2 border-yellow-200 hover:border-[#FFCE23] transition-all duration-300 hover:shadow-xl group">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-6 transition-transform duration-300">
                  <FontAwesomeIcon icon={faHandshake} className="text-4xl text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  Dành cho <span className="text-[#FFCE23]">Nhà Đầu Tư</span>
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Khám phá 4.000+ startup tiềm năng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Deal flow chất lượng được xác thực</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Phân tích thị trường 56 nghìn tỷ vốn VC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Kết nối ecosystem hạng 56 toàn cầu</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Cho Mentor */}
              <div className="bg-white rounded-2xl p-8 border-2 border-yellow-200 hover:border-[#FFCE23] transition-all duration-300 hover:shadow-xl group">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-6 transition-transform duration-300">
                  <FontAwesomeIcon icon={faUserTie} className="text-4xl text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  Dành cho <span className="text-[#FFCE23]">Mentor</span>
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Chia sẻ kinh nghiệm với founder trẻ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Kết nối với 170+ trường đại học</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Tham gia 79 chương trình ươm tạo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCE23] font-bold">✓</span>
                    <span>Tạo impact trong ecosystem hạng 5 ĐNA</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Key Challenges Section */}
            <div className="bg-gradient-to-br from-gray-50 to-yellow-50 rounded-2xl p-8 mb-12 border-2 border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                🎯 Chúng Tôi Giải Quyết <span className="text-[#FFCE23]">Nỗi Đau</span> Gì?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                  <FontAwesomeIcon icon={faSackDollar} className="text-3xl text-gray-900 mb-3" />
                  <h4 className="font-bold text-gray-800 mb-2">Khó tiếp cận vốn</h4>
                  <p className="text-sm text-gray-600">Kết nối trực tiếp với 208 quỹ VC & angel investors</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                  <FontAwesomeIcon icon={faChalkboardUser} className="text-3xl text-gray-900 mb-3" />
                  <h4 className="font-bold text-gray-800 mb-2">Thiếu mentorship</h4>
                  <p className="text-sm text-gray-600">Hệ thống mentor từ 1.400+ tổ chức hỗ trợ</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                  <FontAwesomeIcon icon={faPeopleGroup} className="text-3xl text-gray-900 mb-3" />
                  <h4 className="font-bold text-gray-800 mb-2">Khó tuyển nhân sự</h4>
                  <p className="text-sm text-gray-600">Tiếp cận 50K+ cử nhân CNTT mỗi năm</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                  <FontAwesomeIcon icon={faBullseye} className="text-3xl text-gray-900 mb-3" />
                  <h4 className="font-bold text-gray-800 mb-2">Khó tìm khách hàng đầu tiên</h4>
                  <p className="text-sm text-gray-600">Kết nối với 77M+ người dùng Internet VN</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                  <FontAwesomeIcon icon={faFileContract} className="text-3xl text-gray-900 mb-3" />
                  <h4 className="font-bold text-gray-800 mb-2">Thủ tục pháp lý phức tạp</h4>
                  <p className="text-sm text-gray-600">Hỗ trợ từ chuyên gia & accelerators</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                  <FontAwesomeIcon icon={faGaugeHigh} className="text-3xl text-gray-900 mb-3" />
                  <h4 className="font-bold text-gray-800 mb-2">Tốc độ đến MVP</h4>
                  <p className="text-sm text-gray-600">Rút ngắn thời gian với chương trình thực chiến</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#FFCE23] to-[#FFD600] rounded-2xl p-10 text-center shadow-2xl mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                Sẵn sàng bắt đầu hành trình khởi nghiệp? 🚀
              </h3>
              <p className="text-lg mb-6 text-gray-800 font-medium">
                Tham gia hệ sinh thái startup <span className="font-bold">hạng 56 toàn cầu</span> ngay hôm nay
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-black text-[#FFCE23] px-8 py-4 rounded-xl font-bold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                  Đăng ký ngay
                </button>
                <button className="border-3 border-black bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 text-lg">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          </section>

          {/* Explore lists section đã chuyển sang trang KhámPhá.jsx */}
        </main>
        <Footer />
      </div>
    </div>
  );
}