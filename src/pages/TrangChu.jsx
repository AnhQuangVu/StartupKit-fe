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
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <main className="flex-1">
        <Hero />
        <SearchBox />
        <StartupList />
        <CompetitionList />
        <InvestorList />
        <MentorList />
        {/* Nếu đã đăng nhập, hiển thị thông tin user */}
        {isLoggedIn && user && (
          <div className="text-center mt-4 text-lg font-semibold text-green-600">
            Xin chào, {user.full_name || user.email}!
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
