import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/const/route";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Hệ sinh thái Khởi nghiệp Toàn diện & Thông minh Tiên phong tại Việt Nam
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              PHÓNG Ý TƯỞNG,
              <br />
              <span className="text-primary">HƯỚNG TƯƠNG LAI</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Chào mừng bạn đến với StartUp Kit Ecosystem – nền tảng chuyển đổi số "All-in-One" dành riêng cho cộng đồng khởi nghiệp Việt. Với sự hỗ trợ của <strong className="text-foreground">AI</strong> trong việc chuẩn hóa hồ sơ và cơ chế <strong className="text-foreground">StartUp Passport</strong> xác thực năng lực minh bạch, chúng tôi rút ngắn khoảng cách giữa Ý tưởng và Vốn đầu tư.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="default" size="lg" className="group" asChild>
                <Link href={ROUTES.REGISTER}>
                  Tạo hồ sơ ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group" asChild>
                <Link href="#competitions">
                  <Play className="w-5 h-5" />
                  Tổ chức cuộc thi
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="relative bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground">
                    startupkit.com
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-4">
                {/* Profile Card */}
                <div className="bg-muted rounded-xl p-4 flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl">
                    VN
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">VNPay Startup</span>
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-600 text-xs font-semibold rounded-full">
                        ✓ Verified
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">Fintech • Series A</div>
                  </div>
                </div>

                {/* AI Score */}
                <div className="bg-secondary text-secondary-foreground rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">AI Pitch Score</span>
                    <span className="text-2xl font-bold text-primary">85/100</span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-gold rounded-full" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Hồ sơ đạt chuẩn nhà đầu tư • 3 điểm cần cải thiện
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-foreground">12</div>
                    <div className="text-xs text-muted-foreground">Kết nối</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-foreground">3</div>
                    <div className="text-xs text-muted-foreground">Cuộc thi</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-primary">🏆 2</div>
                    <div className="text-xs text-muted-foreground">Giải thưởng</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg animate-float font-semibold text-sm">
              +15% tăng trưởng
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border-2 border-border px-4 py-2 rounded-lg shadow-lg animate-float font-medium text-sm" style={{ animationDelay: "3s" }}>
              🚀 Pitch Deck đã nộp
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
