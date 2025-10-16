import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import SearchBox from "../components/common/SearchBox";
import StartupList from "../components/common/StartupList";
import CompetitionList from "../components/home/CompetitionList";
import InvestorList from "../components/common/InvestorList";
import MentorList from "../components/common/MentorList";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

export default function TrangChu() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Lớp nền với hoạ tiết */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Grid pattern nhẹ */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Dot pattern nhẹ */}
        <div className="absolute inset-0 bg-[radial-gradient(#80808020_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        
        {/* Vòng tròn xanh-teal-lục với animation */}
        <div className="absolute top-[40%] left-[60%] w-[260px] h-[260px] rounded-full bg-gradient-to-br from-blue-300 via-teal-300 to-green-300 opacity-30 blur-2xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        
        {/* Vòng tròn hồng-tím-xanh nhỏ */}
        <div className="absolute bottom-[-100px] right-[-60px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 opacity-28 blur-2xl animate-[pulse_5s_ease-in-out_infinite]"></div>
        
        {/* Vòng tròn vàng nhỏ góc phải trên */}
        <div className="absolute top-[60px] right-[40px] w-[120px] h-[120px] rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 opacity-28 blur-xl"></div>
        
        {/* Vòng tròn xanh nhỏ góc trái dưới */}
        <div className="absolute bottom-[60px] left-[40px] w-[100px] h-[100px] rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 opacity-25 blur-xl"></div>
        
        {/* Vòng tròn tím nhỏ giữa màn hình */}
        <div className="absolute top-[55%] left-[30%] w-[80px] h-[80px] rounded-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 opacity-25 blur-xl"></div>
        
        {/* Vòng tròn gradient bổ sung */}
        <div className="absolute top-[35%] left-[5%] w-[140px] h-[140px] rounded-full bg-gradient-to-br from-indigo-200 via-blue-200 to-cyan-200 opacity-22 blur-2xl"></div>
        <div className="absolute top-[75%] right-[12%] w-[100px] h-[100px] rounded-full bg-gradient-to-br from-rose-200 via-pink-200 to-fuchsia-200 opacity-20 blur-xl"></div>
        
        {/* Các hình trang trí geometric */}
        <div className="absolute top-[20%] right-[15%] w-[160px] h-[160px] border-2 border-blue-300/25 rounded-full"></div>
        <div className="absolute top-[22%] right-[17%] w-[120px] h-[120px] border-2 border-purple-300/25 rounded-full"></div>
        
        {/* Vòng tròn đơn thêm */}
        <div className="absolute top-[48%] right-[8%] w-[90px] h-[90px] border-2 border-teal-300/20 rounded-full"></div>
        <div className="absolute bottom-[25%] left-[25%] w-[70px] h-[70px] border-2 border-pink-300/20 rounded-full"></div>
        

        

        
        {/* Hình vuông xoay */}
        <div className="absolute top-[70%] right-[25%] w-[80px] h-[80px] border-2 border-teal-300/25 rotate-45"></div>
        
        {/* Hình vuông xoay thêm */}
        <div className="absolute top-[12%] left-[35%] w-[60px] h-[60px] border-2 border-yellow-300/20 rotate-12"></div>
        <div className="absolute bottom-[40%] right-[18%] w-[50px] h-[50px] border-2 border-purple-300/18 -rotate-12"></div>
        
        {/* Đường line trang trí */}
        <div className="absolute top-[28%] left-[45%] w-[100px] h-[2px] bg-gradient-to-r from-transparent via-blue-300/25 to-transparent rotate-45"></div>
        <div className="absolute bottom-[35%] right-[40%] w-[80px] h-[2px] bg-gradient-to-r from-transparent via-purple-300/25 to-transparent -rotate-45"></div>
        
        {/* Wave pattern ở cuối trang */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px]">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1200,64 L1200,120 L0,120 Z" fill="url(#wave-gradient)" opacity="0.15"></path>
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        

        

        
        {/* Gradient overlay nhẹ hơn để hiện các hoạ tiết rõ hơn */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10">
        <Navbar isLoggedIn={isLoggedIn} user={user} />
        <main className="flex-1">
          <Hero small />
          <section className="home-search mb-4 scale-[0.85] origin-top">
            <SearchBox small />
          </section>
          <section className="home-startuplist mb-2 scale-[0.85] origin-top">
            <StartupList small />
          </section>
          <section className="home-competition mb-2 scale-[0.85] origin-top">
            <CompetitionList small />
          </section>
          <section className="home-investor mb-2 scale-[0.85] origin-top">
            <InvestorList small />
          </section>
          <section className="home-mentor mb-2 scale-[0.85] origin-top">
            <MentorList small />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}