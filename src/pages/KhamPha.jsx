import StartupList from "../components/common/StartupList";
import CompetitionList from "../components/home/CompetitionList";
import InvestorList from "../components/common/InvestorList";
import MentorList from "../components/common/MentorList";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

export default function KhamPha() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <main className="flex-1">
        <section className="px-4 max-w-7xl mx-auto mb-8 mt-8">
          <div className="grid gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Khởi nghiệp — Danh sách nổi bật</h3>
              <StartupList small />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Cuộc thi & Sự kiện</h3>
              <CompetitionList small />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Nhà đầu tư</h3>
              <InvestorList small />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Mentor</h3>
              <MentorList small />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
