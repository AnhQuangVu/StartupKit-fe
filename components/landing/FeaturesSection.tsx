import { Brain, Shield, CheckCircle, AlertTriangle, Trophy, Medal } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Pitch Auditor",
      description:
        "AI được huấn luyện trên hàng nghìn Pitch Deck thành công. Nó 'đọc hiểu' tư duy kinh doanh, phân tích tính logic giữa Vấn đề - Giải pháp, và đưa ra các cảnh báo đỏ (Red Flags) về rủi ro mô hình.",
      visual: (
        <div className="bg-secondary text-secondary-foreground rounded-xl p-6 space-y-4">
          {/* Score Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Điểm AI Audit</div>
                <div className="text-3xl font-bold text-primary">85<span className="text-lg">/100</span></div>
              </div>
            </div>
            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full">
              Đạt chuẩn
            </div>
          </div>
          
          {/* Progress Sections */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Vấn đề & Giải pháp</span>
                <span className="text-green-400">92%</span>
              </div>
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-green-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Thị trường mục tiêu</span>
                <span className="text-primary">78%</span>
              </div>
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-primary rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mô hình kinh doanh</span>
                <span className="text-orange-400">65%</span>
              </div>
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-orange-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-accent/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-orange-400 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Cần bổ sung: Dự báo doanh thu 3 năm</span>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Đã đạt: Mô tả vấn đề rõ ràng</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Shield,
      title: "StartUp Passport",
      description:
        "Cơ sở dữ liệu niềm tin (Trust Database). Kết quả thi đấu được đồng bộ và mã hóa thành 'Huy hiệu Verified'. Dữ liệu được khóa (Lock) tạo nên hồ sơ năng lực 'bất biến' và minh bạch tuyệt đối.",
      visual: (
        <div className="bg-card border-2 border-border rounded-xl p-6 space-y-4">
          {/* Passport Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg">
              TH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-foreground">TechHub Vietnam</span>
                <span className="px-2 py-0.5 bg-green-500 text-secondary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  VERIFIED
                </span>
              </div>
              <div className="text-sm text-muted-foreground">AI/ML • Seed Stage</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">Thành tích đã xác thực</div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-muted rounded-lg p-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Giải Nhất - VietStartup 2024</div>
                  <div className="text-xs text-muted-foreground">Xác thực bởi StartUp Link</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-lg p-3">
                <div className="w-8 h-8 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                  <Medal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Top 10 - Hackathon HCMC</div>
                  <div className="text-xs text-muted-foreground">Xác thực bởi StartUp Link</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Dữ liệu không thể chỉnh sửa - Đảm bảo trung thực</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sức mạnh từ AI và <span className="text-gradient-gold">Cơ chế Xác thực</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Lớp công nghệ lõi tạo nên lợi thế cạnh tranh độc tôn
          </p>
        </div>

        {/* Features */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
              </div>

              {/* Visual */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                {feature.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
