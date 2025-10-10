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
  <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <main className="flex-1">

          <Hero small />

  <section className="home-search mb-9 scale-[0.85] origin-top">
          <SearchBox small />
        </section>
  <section className="home-startuplist mb-9 scale-[0.85] origin-top">
          <StartupList small />
        </section>
  <section className="home-competition mb-9 scale-[0.85] origin-top">
          <CompetitionList small />
        </section>
  <section className="home-investor mb-9 scale-[0.85] origin-top">
          <InvestorList small />
        </section>
  <section className="home-mentor mb-9 scale-[0.85] origin-top">
          <MentorList small />
        </section>
      </main>
      <Footer />
    </div>
  );
}
