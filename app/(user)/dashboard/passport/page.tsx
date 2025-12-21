import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Shield, Trophy, Calendar, ExternalLink, Edit } from "lucide-react";
import Link from "next/link";

const achievements = [
  {
    id: 1,
    title: "Giải Nhất",
    competition: "VietStartup 2024",
    date: "15/12/2024",
    badge: "🥇",
    verified: true,
  },
  {
    id: 2,
    title: "Top 10",
    competition: "Hackathon HCMC",
    date: "01/11/2024",
    badge: "🏆",
    verified: true,
  },
  {
    id: 3,
    title: "Giải Khuyến khích",
    competition: "Innovation Challenge",
    date: "15/08/2024",
    badge: "🎖️",
    verified: true,
  },
];

const PassportPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">StartUp Passport</h1>
            <p className="text-muted-foreground">
              Hộ chiếu khởi nghiệp xác thực năng lực dự án của bạn
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Chia sẻ Passport
          </Button>
        </div>

        {/* Passport Card */}
        <div className="bg-card border-2 border-border rounded-2xl overflow-hidden">
          {/* Passport Header */}
          <div className="bg-secondary p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar/Logo */}
              <div className="w-24 h-24 bg-gradient-to-br from-gold-dark to-gold rounded-2xl flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-xl">
                AI
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-secondary-foreground">
                    AI Commerce Platform
                  </h2>
                  <span className="px-3 py-1 bg-green-500 text-secondary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    VERIFIED
                  </span>
                </div>
                <p className="text-secondary-foreground/70 mb-4">
                  Fintech • Seed Stage • Founded 2023
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-secondary-foreground/70">
                  <span>Founder: Vũ Quang Anh</span>
                  <span>•</span>
                  <span>AI Score: 85/100</span>
                  <span>•</span>
                  <span>{achievements.length} thành tích</span>
                </div>
              </div>

              {/* Edit Button */}
              <Link href="/dashboard/project/edit">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa
                </Button>
              </Link>
            </div>
          </div>

          {/* Achievements */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">
                Thành tích đã xác thực
              </h3>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-4 bg-muted rounded-xl"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-3xl">
                    {achievement.badge}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">
                        {achievement.title}
                      </span>
                      {achievement.verified && (
                        <Shield className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.competition}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {achievement.date}
                    </div>
                    <p className="text-xs text-green-500 mt-1">
                      Xác thực bởi StartUp Link
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Notice */}
            <div className="mt-6 p-4 bg-muted rounded-xl flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Dữ liệu không thể chỉnh sửa:</strong>{" "}
                Thành tích được xác thực tự động từ hệ thống StartUp Link để đảm bảo tính trung thực.
              </p>
            </div>
          </div>
        </div>

        {/* No Achievements Yet */}
        {achievements.length === 0 && (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">
              Chưa có thành tích
            </h3>
            <p className="text-muted-foreground mb-4">
              Tham gia các cuộc thi để nhận huy hiệu xác thực
            </p>
            <Link href="/competitions">
              <Button>Khám phá cuộc thi</Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PassportPage;
