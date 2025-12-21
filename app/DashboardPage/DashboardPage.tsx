import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Trophy,
  Eye,
  Plus,
  ArrowRight,
  Brain,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Lượt xem hồ sơ",
    value: "1,234",
    change: "+12%",
    icon: Eye,
    trend: "up",
  },
  {
    label: "Kết nối mới",
    value: "56",
    change: "+8%",
    icon: Users,
    trend: "up",
  },
  {
    label: "Cuộc thi tham gia",
    value: "3",
    change: "0",
    icon: Trophy,
    trend: "neutral",
  },
  {
    label: "AI Score trung bình",
    value: "85",
    change: "+5",
    icon: Brain,
    trend: "up",
  },
];

const recentProjects = [
  {
    id: 1,
    name: "AI Commerce Platform",
    stage: "Seed",
    aiScore: 85,
    verified: true,
    updatedAt: "2 ngày trước",
  },
  {
    id: 2,
    name: "EduTech Solution",
    stage: "Pre-seed",
    aiScore: 72,
    verified: false,
    updatedAt: "1 tuần trước",
  },
];

const upcomingCompetitions = [
  {
    id: 1,
    name: "VietStartup 2024",
    deadline: "15/01/2025",
    prize: "500.000.000 VNĐ",
    status: "open",
  },
  {
    id: 2,
    name: "Hackathon HCMC",
    deadline: "20/01/2025",
    prize: "200.000.000 VNĐ",
    status: "open",
  },
];

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Chào mừng trở lại, <span className="text-primary">Quang Anh</span>! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Dưới đây là tổng quan hoạt động của bạn trong tuần
            </p>
          </div>
          <Link to="/dashboard/project/edit">
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Tạo dự án mới
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    stat.trend === "up"
                      ? "text-green-500"
                      : stat.trend === "down"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Dự án của tôi</h2>
              <Link
                to="/dashboard/projects"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-4 p-4 bg-muted rounded-xl"
                >
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">
                    {project.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground truncate">
                        {project.name}
                      </span>
                      {project.verified && (
                        <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.stage} • Cập nhật {project.updatedAt}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {project.aiScore}/100
                    </div>
                    <div className="text-xs text-muted-foreground">AI Score</div>
                  </div>
                </div>
              ))}
              <Link to="/dashboard/project/edit">
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Tạo dự án mới
                </Button>
              </Link>
            </div>
          </div>

          {/* Upcoming Competitions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Cuộc thi sắp tới</h2>
              <Link
                to="/competitions"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingCompetitions.map((competition) => (
                <div
                  key={competition.id}
                  className="p-4 bg-muted rounded-xl space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {competition.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Hạn nộp: {competition.deadline}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-600 text-xs font-semibold rounded-full">
                      Đang mở
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        {competition.prize}
                      </span>
                    </div>
                    <Link to={`/competitions/${competition.id}`}>
                      <Button variant="outline" size="sm">
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Audit CTA */}
        <div className="bg-secondary rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary-foreground">
                Kiểm tra hồ sơ với AI Auditor
              </h3>
              <p className="text-secondary-foreground/70">
                Để AI phân tích và đánh giá hồ sơ của bạn trước khi gửi cho nhà đầu tư
              </p>
            </div>
          </div>
          <Link to="/dashboard/project/edit">
            <Button variant="hero" size="lg" className="gap-2 whitespace-nowrap">
              Audit ngay
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
