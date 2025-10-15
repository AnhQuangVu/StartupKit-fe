import React from "react";
import StartupList from "../components/common/StartupList";
import ProjectList from "../components/dashboard/ProjectList";
import MentorList from "../components/common/MentorList";
import InvestorList from "../components/common/InvestorList";
import CompetitionList from "../components/home/CompetitionList";
import SearchBox from "../components/common/SearchBox";

export default function Explore() {
  // Dummy data fallback
  const dummyStartups = [
    { id: 1, title: "Startup A", desc: "Mô tả ngắn gọn", tag: "Fintech", members: 5, raised: "$100k" },
    { id: 2, title: "Startup B", desc: "Mô tả ngắn gọn", tag: "Edtech", members: 3, raised: "$50k" },
  ];
  const dummyProjects = [
    { id: 1, title: "Dự án 1", stage: "Gọi vốn", raised: "$20k" },
    { id: 2, title: "Dự án 2", stage: "Ý tưởng", raised: "$5k" },
  ];
  const dummyMentors = [
    { id: 1, name: "Mentor A", expertise: "Marketing" },
    { id: 2, name: "Mentor B", expertise: "Finance" },
  ];
  const dummyInvestors = [
    { id: 1, name: "Investor A", field: "Fintech" },
    { id: 2, name: "Investor B", field: "Edtech" },
  ];
  const dummyCompetitions = [
    { id: 1, name: "Cuộc thi 1", date: "2025-11-01" },
    { id: 2, name: "Cuộc thi 2", date: "2025-12-01" },
  ];

  // Replace with real data if available
  const startups = dummyStartups; // TODO: fetch from API
  const projects = dummyProjects; // TODO: fetch from API
  const mentors = dummyMentors; // TODO: fetch from API
  const investors = dummyInvestors; // TODO: fetch from API
  const competitions = dummyCompetitions; // TODO: fetch from API

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Khám phá hệ sinh thái Startup</h1>
      <SearchBox />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Startup nổi bật</h2>
          <StartupList startups={startups} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Dự án tiềm năng</h2>
          <ProjectList projects={projects} />
        </section>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Mentor nổi bật</h2>
          <MentorList mentors={mentors} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Investor nổi bật</h2>
          <InvestorList investors={investors} />
        </section>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Sự kiện & Cuộc thi</h2>
        <CompetitionList competitions={competitions} />
      </div>
    </div>
  );
}
