import { Users, Trophy, ArrowRight, Sparkles, Network, UserPlus, LayoutDashboard, Zap, BarChart, Lightbulb, Briefcase, Search, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Giải pháp theo <span className="text-gradient-gold">Đối tượng</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hệ sinh thái khép kín đáp ứng nhu cầu của mọi thành phần tham gia
          </p>
        </div>

        <Tabs defaultValue="founder" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto lg:h-14 mb-8 gap-2">
            <TabsTrigger value="founder" className="text-base lg:text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2">
              Dành cho Founder
            </TabsTrigger>
            <TabsTrigger value="mentor" className="text-base lg:text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2">
              Dành cho Mentor
            </TabsTrigger>
            <TabsTrigger value="investor" className="text-base lg:text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2">
              Dành cho Investor
            </TabsTrigger>
            <TabsTrigger value="organizer" className="text-base lg:text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2">
              Dành cho Organizer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="founder" className="animate-fade-in">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <Users className="w-4 h-4" /> Dành cho Founder
                  </div>
                  <h3 className="text-3xl font-bold">Bệ phóng Công nghệ cho Hành trình Gọi vốn</h3>
                  <p className="text-muted-foreground text-lg">
                    Bộ công cụ "Social & AI" mạnh mẽ giúp bạn viết Pitch Deck, tìm kiếm đồng đội và nộp hồ sơ thi đấu chỉ trong 1 giây.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0"><Sparkles className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">AI Pitch Writer & Auditor</div>
                        <div className="text-sm text-muted-foreground">Đóng vai nhà đầu tư khó tính, chấm điểm và chỉ ra lỗi logic.</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0"><Zap className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">One-Click Submission</div>
                        <div className="text-sm text-muted-foreground">Nộp hồ sơ sang StartUp Link chỉ trong 1 giây.</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0"><UserPlus className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">Team-up</div>
                        <div className="text-sm text-muted-foreground">Tìm kiếm Co-founder tài năng để hoàn thiện đội ngũ.</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted rounded-xl h-80 flex items-center justify-center border-2 border-dashed border-border">
                  <span className="text-muted-foreground">Minh họa Dashboard StartUp Kit</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mentor" className="animate-fade-in">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                    <Lightbulb className="w-4 h-4" /> Dành cho Mentor
                  </div>
                  <h3 className="text-3xl font-bold">Định vị Thương hiệu Chuyên gia</h3>
                  <p className="text-muted-foreground text-lg">
                    Xây dựng thương hiệu cá nhân uy tín. Thuật toán thông minh gợi ý kết nối bạn với các Startup phù hợp nhất.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0"><Briefcase className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">Hồ sơ Chuyên gia (Expert Profile)</div>
                        <div className="text-sm text-muted-foreground">Hiển thị rõ bộ kỹ năng, kinh nghiệm và lĩnh vực chuyên sâu.</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center shrink-0"><Network className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">Kết nối Có chọn lọc</div>
                        <div className="text-sm text-muted-foreground">Tránh tin nhắn rác, chỉ kết nối với Startup phù hợp.</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted rounded-xl h-80 flex items-center justify-center border-2 border-dashed border-border">
                  <span className="text-muted-foreground">Minh họa Dashboard Mentor</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="investor" className="animate-fade-in">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    <Search className="w-4 h-4" /> Dành cho Investor
                  </div>
                  <h3 className="text-3xl font-bold">Deal Sourcing Thông minh & Thẩm định rủi ro</h3>
                  <p className="text-muted-foreground text-lg">
                    Giải pháp Deal Flow tinh gọn nhờ cơ chế StartUp Passport. Nhận diện dự án tiềm năng qua "Huy hiệu xác thực".
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">StartUp Passport & Verified Badge</div>
                        <div className="text-sm text-muted-foreground">Bằng chứng dự án đã thắng giải, giảm thời gian Due Diligence.</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center shrink-0"><BarChart className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">Dữ liệu Tăng trưởng</div>
                        <div className="text-sm text-muted-foreground">Truy cập lịch sử hoạt động và chỉ số của Startup.</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted rounded-xl h-80 flex items-center justify-center border-2 border-dashed border-border">
                  <span className="text-muted-foreground">Minh họa Dashboard Investor</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="organizer" className="animate-fade-in">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                    <Trophy className="w-4 h-4" /> Dành cho Organizer
                  </div>
                  <h3 className="text-3xl font-bold">Số hóa Quy trình Tổ chức & Chấm thi</h3>
                  <p className="text-muted-foreground text-lg">
                    Vận hành cuộc thi chuyên nghiệp không giấy tờ. Tự động hóa từ thiết lập vòng thi đến chấm điểm.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0"><LayoutDashboard className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">Dashboard Quản lý tập trung</div>
                        <div className="text-sm text-muted-foreground">Thiết lập vòng thi, Rubric chấm điểm và quản lý hồ sơ.</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0"><Mail className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">Tự động hóa Email</div>
                        <div className="text-sm text-muted-foreground">Gửi thư mời giám khảo và thông báo thí sinh tự động.</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0"><BarChart className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold">Online Grading & Leaderboard</div>
                        <div className="text-sm text-muted-foreground">Chấm thi song song, xếp hạng realtime minh bạch.</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted rounded-xl h-80 flex items-center justify-center border-2 border-dashed border-border">
                  <span className="text-muted-foreground">Minh họa Dashboard StartUp Link</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        </div>
    </section>
  );
};

export default SolutionsSection;
