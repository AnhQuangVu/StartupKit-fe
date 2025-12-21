'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Lightbulb, Briefcase, Flag, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "founder",
    icon: Rocket,
    title: "Founder",
    description: "Tôi có dự án khởi nghiệp và muốn tìm vốn/đồng đội",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "mentor",
    icon: Lightbulb,
    title: "Mentor",
    description: "Tôi là chuyên gia muốn chia sẻ kiến thức và kinh nghiệm",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "investor",
    icon: Briefcase,
    title: "Investor",
    description: "Tôi tìm kiếm cơ hội đầu tư vào các Startup tiềm năng",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "organizer",
    icon: Flag,
    title: "Organizer",
    description: "Tôi muốn tổ chức và quản lý các cuộc thi khởi nghiệp",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const OnboardingPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            StartUp<span className="text-primary">Kit</span>
          </span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Bạn tham gia StartUp Kit với vai trò gì?
          </h1>
          <p className="text-muted-foreground">
            Chọn vai trò phù hợp để chúng tôi cá nhân hóa trải nghiệm cho bạn
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                )}
              >
                {/* Check Icon */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", role.bgColor)}>
                    <Icon className={cn("w-7 h-7", role.color)} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                    <p className="text-muted-foreground text-sm">{role.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            className="min-w-64"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Tiếp tục
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Bạn có thể thay đổi vai trò sau trong phần Cài đặt
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;
