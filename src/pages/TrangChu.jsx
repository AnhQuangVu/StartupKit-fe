import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import SearchBox from "../components/common/SearchBox";
import StartupList from "../components/common/StartupList";
import CompetitionList from "../components/home/CompetitionList";
import InvestorList from "../components/common/InvestorList";
import MentorList from "../components/common/MentorList";
import Footer from "../components/layout/Footer";

export default function TrangChu() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SearchBox />
        <StartupList />
        <CompetitionList />
        <InvestorList />
        <MentorList />
      </main>
      <Footer />
    </div>
  );
}
