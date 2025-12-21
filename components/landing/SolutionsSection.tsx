import { Users, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionsSection = () => {
  const solutions = [
    {
      icon: Users,
      title: "StartUp Kit",
      subtitle: "Mạng xã hội khởi nghiệp",
      description:
        "Nền tảng kết nối Founder, Mentor và Investor. Xây dựng hồ sơ chuẩn vốn với AI, nhận hỗ trợ từ cộng đồng chuyên gia.",
      features: [
        "Hồ sơ Startup theo chuẩn nhà đầu tư",
        "AI viết lại mô tả chuyên nghiệp",
        "Kết nối Mentor 1-1",
        "Tìm kiếm Co-founder",
      ],
      cta: "Khám phá Kit",
      highlight: false,
    },
    {
      icon: Trophy,
      title: "StartUp Link",
      subtitle: "Nền tảng SaaS cuộc thi",
      description:
        "Quản lý cuộc thi & hackathon chuyên nghiệp. Nộp bài 1 chạm, chấm điểm tự động, xếp hạng realtime.",
      features: [
        "One-Click Submission",
        "Chấm điểm trực tuyến",
        "Leaderboard realtime",
        "Export báo cáo PDF",
      ],
      cta: "Tổ chức ngay",
      highlight: true,
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hai giải pháp, <span className="text-gradient-gold">một hệ sinh thái</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Kết hợp sức mạnh của mạng xã hội khởi nghiệp và nền tảng quản lý cuộc thi 
            để tạo ra trải nghiệm liền mạch cho Startup.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
                solution.highlight
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card border-2 border-border hover:border-primary/50"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  solution.highlight
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <solution.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{solution.title}</h3>
                  <p className={`text-sm font-medium ${solution.highlight ? "text-primary" : "text-primary"}`}>
                    {solution.subtitle}
                  </p>
                </div>

                <p className={solution.highlight ? "text-secondary-foreground/80" : "text-muted-foreground"}>
                  {solution.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full ${solution.highlight ? "bg-primary" : "bg-primary"}`} />
                      <span className={solution.highlight ? "text-secondary-foreground/90" : "text-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={solution.highlight ? "hero" : "outline"}
                  className="w-full mt-4 group/btn"
                >
                  {solution.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Decorative */}
              {solution.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    HOT
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
