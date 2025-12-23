import { FileText, Lightbulb, TrendingUp, Video, BarChart3 } from "lucide-react";

const InsightsSection = () => {
  const insights = [
    {
      icon: BarChart3,
      title: "[Báo cáo] Bản đồ Khởi nghiệp Việt Nam 2025",
      desc: "Báo cáo độc quyền dựa trên dữ liệu thực tế từ 10.000 hồ sơ. Phân tích sâu sự dịch chuyển dòng vốn vào AI và GreenTech, cung cấp cái nhìn toàn cảnh về định giá và khẩu vị đầu tư năm 2025.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Lightbulb,
      title: "[Góc chuyên gia] Giải mã Pitch Deck",
      desc: "Dựa trên 50.000 lượt thẩm định, AI đã chỉ ra 5 lỗi sai phổ biến nhất khiến Startup mất điểm. Bài viết cung cấp giải pháp cụ thể để tối ưu hóa Pitch Deck và mô hình tài chính.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: TrendingUp,
      title: "[Case Study] Hành trình từ Zero đến Hero",
      desc: "Phân tích Deep-dive lộ trình của 3 Quán quân StartUp Link. Học cách họ tận dụng công nghệ để tìm Co-founder, tối ưu sản phẩm và gọi vốn thành công Series A chỉ sau 6 tháng.",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <section id="resources" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold mb-4">Kiến thức & Xu hướng Khởi nghiệp Mới nhất</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((item, index) => (
            <div key={index} className="flex gap-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                 <item.icon className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                 <p className="text-muted-foreground">{item.desc}</p>
              </div>
           </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default InsightsSection;