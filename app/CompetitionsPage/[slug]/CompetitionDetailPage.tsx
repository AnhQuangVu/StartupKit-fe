import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Trophy,
  Users,
  MapPin,
  Clock,
  Zap,
  CheckCircle,
  ArrowRight,
  Loader2,
  Shield,
  FileText,
  Video,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const competitionData = {
  id: 1,
  name: "VietStartup 2024",
  organizer: "Bộ Khoa học và Công nghệ",
  banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
  deadline: "15/01/2025",
  prize: "500.000.000 VNĐ",
  participants: 234,
  location: "Hà Nội & TP.HCM",
  status: "open",
  description: `VietStartup 2024 là cuộc thi khởi nghiệp quốc gia quy mô lớn nhất năm, được tổ chức bởi Bộ Khoa học và Công nghệ nhằm tìm kiếm và hỗ trợ các dự án khởi nghiệp tiềm năng.

Cuộc thi dành cho tất cả các startup Việt Nam ở mọi lĩnh vực, từ giai đoạn ý tưởng đến Series A.`,
  rules: `1. Đối tượng tham gia: Startup Việt Nam, thành lập không quá 5 năm
2. Số lượng thành viên: Tối thiểu 2 người, tối đa 5 người
3. Mỗi startup chỉ được nộp 1 hồ sơ dự thi
4. Hồ sơ phải đầy đủ thông tin theo yêu cầu của BTC
5. Cam kết thông tin trung thực, chính xác`,
  timeline: [
    { date: "01/12/2024 - 15/01/2025", event: "Nhận hồ sơ đăng ký" },
    { date: "20/01/2025 - 31/01/2025", event: "Vòng Sơ khảo Online" },
    { date: "15/02/2025", event: "Công bố Top 20" },
    { date: "01/03/2025", event: "Vòng Chung kết tại Hà Nội" },
  ],
  judges: [
    { name: "TS. Nguyễn Văn A", title: "Chủ tịch Quỹ đầu tư ABC" },
    { name: "Bà Trần Thị B", title: "CEO Tập đoàn XYZ" },
    { name: "Ông Lê Văn C", title: "Founder & CEO StartupVN" },
  ],
  prizes: [
    { rank: "Giải Nhất", value: "200.000.000 VNĐ + Mentorship" },
    { rank: "Giải Nhì", value: "100.000.000 VNĐ + Mentorship" },
    { rank: "Giải Ba", value: "50.000.000 VNĐ + Mentorship" },
  ],
};

const userProjects = [
  {
    id: 1,
    name: "AI Commerce Platform",
    aiScore: 85,
    hasVideo: true,
    hasPitchDeck: true,
    verified: true,
  },
  {
    id: 2,
    name: "EduTech Solution",
    aiScore: 72,
    hasVideo: false,
    hasPitchDeck: true,
    verified: false,
  },
];

const CompetitionDetailPage = () => {
  const { id } = useParams();
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const selectedProjectData = userProjects.find(
    (p) => p.id.toString() === selectedProject
  );

  const handleSubmit = () => {
    if (!selectedProject || !isAgreed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitOpen(false);
      toast({
        title: "Nộp bài thành công! 🎉",
        description: "Hồ sơ của bạn đã được gửi đến Ban tổ chức",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={competitionData.banner}
            alt={competitionData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container mx-auto">
              <span className="px-3 py-1 bg-green-500 text-secondary-foreground text-xs font-bold rounded-full mb-3 inline-block">
                Đang mở đăng ký
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {competitionData.name}
              </h1>
              <p className="text-muted-foreground">
                Tổ chức bởi {competitionData.organizer}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="intro" className="space-y-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="intro">Giới thiệu</TabsTrigger>
                  <TabsTrigger value="rules">Thể lệ</TabsTrigger>
                  <TabsTrigger value="judges">Ban giám khảo</TabsTrigger>
                </TabsList>

                <TabsContent value="intro" className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Về cuộc thi
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {competitionData.description}
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Timeline
                    </h2>
                    <div className="space-y-4">
                      {competitionData.timeline.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-foreground">
                              {item.event}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Giải thưởng
                    </h2>
                    <div className="space-y-3">
                      {competitionData.prizes.map((prize, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-muted rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Trophy
                              className={`w-6 h-6 ${
                                index === 0
                                  ? "text-primary"
                                  : index === 1
                                  ? "text-gray-400"
                                  : "text-amber-600"
                              }`}
                            />
                            <span className="font-semibold text-foreground">
                              {prize.rank}
                            </span>
                          </div>
                          <span className="font-bold text-primary">
                            {prize.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rules">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Thể lệ cuộc thi
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {competitionData.rules}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="judges">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Ban giám khảo
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {competitionData.judges.map((judge, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-muted rounded-xl"
                        >
                          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary">
                            {judge.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">
                              {judge.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {judge.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground">Hạn nộp bài</div>
                    <div className="font-semibold text-foreground">
                      {competitionData.deadline}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Trophy className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground">Tổng giải thưởng</div>
                    <div className="font-semibold text-foreground">
                      {competitionData.prize}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground">Số đội đăng ký</div>
                    <div className="font-semibold text-foreground">
                      {competitionData.participants} đội
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground">Địa điểm</div>
                    <div className="font-semibold text-foreground">
                      {competitionData.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-secondary rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-bold text-secondary-foreground">
                      One-Click Submission
                    </div>
                    <div className="text-sm text-secondary-foreground/70">
                      Nộp bài chỉ trong 10 giây
                    </div>
                  </div>
                </div>
                <Button
                  variant="hero"
                  className="w-full gap-2"
                  onClick={() => setIsSubmitOpen(true)}
                >
                  Nộp bài dự thi
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-secondary-foreground/50 text-center">
                  Dữ liệu được lấy từ StartUp Kit của bạn
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* One-Click Submission Modal */}
      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              One-Click Submission
            </DialogTitle>
            <DialogDescription>
              Chọn dự án từ StartUp Kit để nộp bài dự thi
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Project Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Chọn dự án của bạn
              </label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dự án để nộp" />
                </SelectTrigger>
                <SelectContent>
                  {userProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      <div className="flex items-center gap-2">
                        <span>{project.name}</span>
                        {project.verified && (
                          <Shield className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preview */}
            {selectedProjectData && (
              <div className="bg-muted rounded-xl p-4 space-y-3">
                <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Thông tin sẽ được nộp
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tên dự án</span>
                    <span className="font-medium text-foreground">
                      {selectedProjectData.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Score</span>
                    <span className="font-medium text-primary">
                      {selectedProjectData.aiScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pitch Deck</span>
                    <span
                      className={`flex items-center gap-1 ${
                        selectedProjectData.hasPitchDeck
                          ? "text-green-500"
                          : "text-destructive"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      {selectedProjectData.hasPitchDeck ? "Đã có" : "Chưa có"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Video Demo</span>
                    <span
                      className={`flex items-center gap-1 ${
                        selectedProjectData.hasVideo
                          ? "text-green-500"
                          : "text-destructive"
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      {selectedProjectData.hasVideo ? "Đã có" : "Chưa có"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Agreement */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="agreement"
                checked={isAgreed}
                onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
              />
              <label
                htmlFor="agreement"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Tôi cam kết thông tin cung cấp là trung thực và chính xác. Tôi đã
                đọc và đồng ý với thể lệ cuộc thi.
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitOpen(false)}>
              Hủy
            </Button>
            <Button
              variant="hero"
              onClick={handleSubmit}
              disabled={!selectedProject || !isAgreed || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang nộp...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Xác nhận nộp bài
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CompetitionDetailPage;
