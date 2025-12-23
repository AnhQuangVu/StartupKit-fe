import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Nhờ AI Auditor, tôi phát hiện ra lỗ hổng lớn trong mô hình doanh thu. Sau khi sửa đổi và đạt huy hiệu Verified từ cuộc thi Startup Wheel trên hệ thống, tôi đã nhận được cam kết đầu tư từ 2 Shark chỉ sau 1 tuần. StartUp Kit thực sự là người bạn đồng hành không thể thiếu.",
      author: "Nguyễn Văn A",
      role: "CEO TechFood",
      badge: "Founder"
    },
    {
      content: "StartUp Passport giúp tôi tiết kiệm 70% thời gian lọc hồ sơ rác. Tôi chỉ tập trung vào các dự án có Verified Badge vì biết chắc chắn năng lực của họ đã được kiểm chứng qua thực chiến. Đây là công cụ Deal Sourcing hiệu quả nhất tôi từng dùng.",
      author: "Trần Minh",
      role: "Partner tại VSV Capital",
      badge: "Investor"
    },
    {
      content: "Việc quản lý 500 đội thi chưa bao giờ dễ dàng đến thế. Tính năng Chấm thi trực tuyến giúp chúng tôi loại bỏ hoàn toàn giấy tờ và công tác tổng hợp điểm thủ công. Báo cáo minh bạch từ hệ thống giúp chúng tôi ghi điểm tuyệt đối với nhà tài trợ.",
      author: "BTC UniHack",
      role: "Nhà tổ chức",
      badge: "Organizer"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Cộng đồng nói gì về <span className="text-primary">StartUp Kit</span></h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-muted/30 p-8 rounded-2xl border border-border relative">
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />
              <p className="text-muted-foreground mb-6 relative z-10 pt-4 italic">"{item.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                  {item.author[0]}
                </div>
                <div>
                  <div className="font-bold text-foreground">{item.author}</div>
                  <div className="text-sm text-muted-foreground">{item.role}</div>
                </div>
                {item.badge && (
                   <span className="ml-auto px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                     {item.badge}
                   </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default TestimonialsSection;