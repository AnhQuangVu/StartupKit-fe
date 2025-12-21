import { Brain, Shield, Zap, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Pitch Auditor",
      description:
        "AI đóng vai nhà đầu tư, chấm điểm hồ sơ của bạn trên thang 100 và cảnh báo các lỗi logic trước khi công khai.",
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
        "Hộ chiếu khởi nghiệp xác thực năng lực dự án. Huy hiệu Verified được cấp tự động khi đạt giải tại các cuộc thi.",
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
                <div className="text-2xl">🥇</div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Giải Nhất - VietStartup 2024</div>
                  <div className="text-xs text-muted-foreground">Xác thực bởi StartUp Link</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-lg p-3">
                <div className="text-2xl">🥈</div>
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
    {
      icon: Zap,
      title: "One-Click Submission",
      description:
        "Nộp bài dự thi siêu tốc. Hệ thống tự động trích xuất dữ liệu từ StartUp Kit - chỉ cần 1 click xác nhận.",
      visual: (
        <div className="bg-muted rounded-xl p-6 space-y-4">
          {/* Selection */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">Chọn dự án để nộp</div>
            <div className="bg-card border-2 border-primary rounded-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                AI
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">AI Commerce Platform</div>
                <div className="text-xs text-muted-foreground">Cập nhật 2 ngày trước</div>
              </div>
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Auto-filled Preview */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Tự động điền từ Kit
            </div>
            <div className="bg-card rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tên dự án</span>
                <span className="text-foreground font-medium">AI Commerce Platform</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pitch Deck</span>
                <span className="text-green-500 font-medium">✓ Đã có</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Video Demo</span>
                <span className="text-green-500 font-medium">✓ Đã có</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Score</span>
                <span className="text-primary font-medium">85/100</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-gradient-gold text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity group">
            <Zap className="w-5 h-5" />
            Xác nhận nộp bài
            <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center text-xs text-muted-foreground">
            Chỉ mất 10 giây • Không cần nhập lại thông tin
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-medium text-foreground">Tính năng Signature</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Công nghệ <span className="text-gradient-gold">độc quyền</span> chỉ có tại StartUp Kit
          </h2>
          <p className="text-lg text-muted-foreground">
            Ba tính năng giúp Startup tiết kiệm thời gian, nâng cao uy tín và 
            tăng cơ hội gọi vốn thành công.
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
