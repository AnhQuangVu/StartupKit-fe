"use client";
import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, Trophy, Users, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";

const competitions = [
  {
    id: 1,
    name: "VietStartup 2024",
    organizer: "Bộ KH&CN",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    deadline: "15/01/2025",
    prize: "500.000.000 VNĐ",
    participants: 234,
    status: "open",
    sector: "all",
  },
  {
    id: 2,
    name: "Hackathon HCMC 2025",
    organizer: "SHTP",
    banner: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800",
    deadline: "20/01/2025",
    prize: "200.000.000 VNĐ",
    participants: 156,
    status: "open",
    sector: "tech",
  },
  {
    id: 3,
    name: "Fintech Innovation Challenge",
    organizer: "VIB Bank",
    banner: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    deadline: "01/02/2025",
    prize: "300.000.000 VNĐ",
    participants: 89,
    status: "open",
    sector: "fintech",
  },
  {
    id: 4,
    name: "EdTech Startup Contest",
    organizer: "FPT University",
    banner: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    deadline: "10/12/2024",
    prize: "150.000.000 VNĐ",
    participants: 78,
    status: "closed",
    sector: "edtech",
  },
];

const CompetitionsPage = () => {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredCompetitions = competitions.filter((comp) => {
    const matchSearch = comp.name.toLowerCase().includes(search.toLowerCase());
    const matchSector = sector === "all" || comp.sector === sector;
    const matchStatus = status === "all" || comp.status === status;
    return matchSearch && matchSector && matchStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cuộc thi <span className="text-gradient-gold">Khởi nghiệp</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tham gia các cuộc thi để nhận giải thưởng và xây dựng StartUp Passport của bạn
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm cuộc thi..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Lĩnh vực" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả lĩnh vực</SelectItem>
                  <SelectItem value="tech">Công nghệ</SelectItem>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="edtech">Edtech</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="open">Đang mở</SelectItem>
                  <SelectItem value="closed">Đã đóng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Competition Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.map((competition) => (
              <div
                key={competition.id}
                className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={competition.banner}
                    alt={competition.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        competition.status === "open"
                          ? "bg-green-500 text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {competition.status === "open" ? "Đang mở" : "Đã đóng"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {competition.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tổ chức: {competition.organizer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Hạn: {competition.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{competition.participants}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-primary">
                    <Trophy className="w-5 h-5" />
                    <span className="font-bold">{competition.prize}</span>
                  </div>

                  <Link href={`/competitions/${competition.id}`}>
                    <Button
                      className="w-full gap-2"
                      disabled={competition.status === "closed"}
                    >
                      {competition.status === "open" ? "Xem chi tiết" : "Đã kết thúc"}
                      {competition.status === "open" && (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCompetitions.length === 0 && (
            <div className="text-center py-16">
              <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">
                Không tìm thấy cuộc thi
              </h3>
              <p className="text-muted-foreground">
                Thử thay đổi bộ lọc để xem thêm kết quả
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompetitionsPage;
