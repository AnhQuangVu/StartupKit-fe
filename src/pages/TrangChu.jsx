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
        <Hero small />
        <SearchBox small />
        <StartupList small />
        <CompetitionList small />
        <InvestorList small />
        <MentorList small />
      </main>
      <Footer />
    </div>
  );
}
