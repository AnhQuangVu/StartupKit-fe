import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Brain,
  Save,
  Upload,
  AlertTriangle,
  CheckCircle,
  Loader2,
  FileText,
  Video,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProjectEditorPage = () => {
  const [isAiLoading, setIsAiLoading] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditScore, setAuditScore] = useState<number | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "AI Commerce Platform",
    tagline: "",
    sector: "fintech",
    stage: "seed",
    description: "",
    problem: "",
    solution: "",
    market: "",
    businessModel: "",
    team: "",
    pitchDeck: null as File | null,
    videoDemo: "",
  });

  const handleAiRewrite = async (field: string) => {
    setIsAiLoading(field);
    // Simulate AI processing
    setTimeout(() => {
      setIsAiLoading(null);
      toast({
        title: "AI đã viết lại nội dung",
        description: "Nội dung đã được cải thiện theo chuẩn nhà đầu tư",
      });
    }, 2000);
  };

  const handleAudit = async () => {
    setIsAuditing(true);
    setAuditScore(null);
    // Simulate AI auditing
    setTimeout(() => {
      setIsAuditing(false);
      setAuditScore(85);
      toast({
        title: "Hoàn thành kiểm tra AI",
        description: "Hồ sơ của bạn đạt 85/100 điểm",
      });
    }, 3000);
  };

  const handleSave = () => {
    toast({
      title: "Đã lưu hồ sơ",
      description: "Các thay đổi đã được lưu thành công",
    });
  };

  const AiButton = ({ field }: { field: string }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-2 top-8 text-primary hover:text-primary/80 gap-1"
      onClick={() => handleAiRewrite(field)}
      disabled={isAiLoading === field}
    >
      {isAiLoading === field ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4" />
      )}
      AI Rewrite
    </Button>
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hồ sơ Dự án</h1>
            <p className="text-muted-foreground">
              Xây dựng hồ sơ chuẩn nhà đầu tư với AI hỗ trợ
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Lưu nháp
            </Button>
            <Button variant="hero" onClick={handleAudit} disabled={isAuditing} className="gap-2">
              {isAuditing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Brain className="w-4 h-4" />
              )}
              AI Audit
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="problem">Vấn đề</TabsTrigger>
                <TabsTrigger value="market">Thị trường</TabsTrigger>
                <TabsTrigger value="finance">Tài chính</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên dự án *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="VD: AI Commerce Platform"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        value={formData.tagline}
                        onChange={(e) =>
                          setFormData({ ...formData, tagline: e.target.value })
                        }
                        placeholder="VD: Thương mại điện tử thông minh"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sector">Lĩnh vực *</Label>
                      <Select
                        value={formData.sector}
                        onValueChange={(value) =>
                          setFormData({ ...formData, sector: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn lĩnh vực" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="edtech">Edtech</SelectItem>
                          <SelectItem value="healthtech">Healthtech</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="ai">AI/ML</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stage">Giai đoạn *</Label>
                      <Select
                        value={formData.stage}
                        onValueChange={(value) =>
                          setFormData({ ...formData, stage: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giai đoạn" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">Idea</SelectItem>
                          <SelectItem value="preseed">Pre-seed</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="seriesA">Series A</SelectItem>
                          <SelectItem value="seriesB">Series B+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="description">Mô tả dự án *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Mô tả ngắn gọn về dự án của bạn (100-200 từ)"
                      className="min-h-32"
                    />
                    <AiButton field="description" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="problem" className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div className="space-y-2 relative">
                    <Label htmlFor="problem">Vấn đề *</Label>
                    <Textarea
                      id="problem"
                      value={formData.problem}
                      onChange={(e) =>
                        setFormData({ ...formData, problem: e.target.value })
                      }
                      placeholder="Vấn đề mà khách hàng đang gặp phải là gì? Tại sao nó quan trọng?"
                      className="min-h-40"
                    />
                    <AiButton field="problem" />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="solution">Giải pháp *</Label>
                    <Textarea
                      id="solution"
                      value={formData.solution}
                      onChange={(e) =>
                        setFormData({ ...formData, solution: e.target.value })
                      }
                      placeholder="Sản phẩm/dịch vụ của bạn giải quyết vấn đề như thế nào? USP là gì?"
                      className="min-h-40"
                    />
                    <AiButton field="solution" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="market" className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div className="space-y-2 relative">
                    <Label htmlFor="market">Thị trường mục tiêu *</Label>
                    <Textarea
                      id="market"
                      value={formData.market}
                      onChange={(e) =>
                        setFormData({ ...formData, market: e.target.value })
                      }
                      placeholder="TAM, SAM, SOM? Khách hàng mục tiêu là ai?"
                      className="min-h-40"
                    />
                    <AiButton field="market" />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="team">Đội ngũ *</Label>
                    <Textarea
                      id="team"
                      value={formData.team}
                      onChange={(e) =>
                        setFormData({ ...formData, team: e.target.value })
                      }
                      placeholder="Giới thiệu về team: Kinh nghiệm, thành tích, vai trò"
                      className="min-h-32"
                    />
                    <AiButton field="team" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="finance" className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div className="space-y-2 relative">
                    <Label htmlFor="businessModel">Mô hình kinh doanh *</Label>
                    <Textarea
                      id="businessModel"
                      value={formData.businessModel}
                      onChange={(e) =>
                        setFormData({ ...formData, businessModel: e.target.value })
                      }
                      placeholder="Cách bạn kiếm tiền? Nguồn doanh thu? Unit Economics?"
                      className="min-h-40"
                    />
                    <AiButton field="businessModel" />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Pitch Deck (PDF)</Label>
                      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Kéo thả file hoặc click để upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, tối đa 20MB
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="videoDemo">Video Demo (URL)</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="videoDemo"
                            value={formData.videoDemo}
                            onChange={(e) =>
                              setFormData({ ...formData, videoDemo: e.target.value })
                            }
                            placeholder="https://youtube.com/watch?v=..."
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Auditor Sidebar */}
          <div className="space-y-6">
            <div className="bg-secondary text-secondary-foreground rounded-xl p-6 space-y-4 sticky top-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">AI Auditor</h3>
                  <p className="text-sm text-secondary-foreground/70">
                    Điểm chất lượng hồ sơ
                  </p>
                </div>
              </div>

              {auditScore !== null ? (
                <>
                  <div className="text-center py-4">
                    <div className="text-5xl font-bold text-primary">
                      {auditScore}<span className="text-2xl">/100</span>
                    </div>
                    <p className="text-sm text-secondary-foreground/70 mt-1">
                      {auditScore >= 80
                        ? "Đạt chuẩn nhà đầu tư"
                        : auditScore >= 60
                        ? "Cần cải thiện"
                        : "Chưa đạt chuẩn"}
                    </p>
                  </div>

                  <div className="h-3 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all duration-1000"
                      style={{ width: `${auditScore}%` }}
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Mô tả vấn đề rõ ràng</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Giải pháp logic, khớp với vấn đề</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>Cần bổ sung: Dự báo doanh thu 3 năm</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>Thiếu thông tin về đội ngũ</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondary-foreground/70 text-sm">
                    Nhấn "AI Audit" để kiểm tra hồ sơ của bạn
                  </p>
                </div>
              )}

              <Button
                variant="hero"
                className="w-full gap-2"
                onClick={handleAudit}
                disabled={isAuditing}
              >
                {isAuditing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang kiểm tra...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    {auditScore !== null ? "Kiểm tra lại" : "Bắt đầu kiểm tra"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectEditorPage;
