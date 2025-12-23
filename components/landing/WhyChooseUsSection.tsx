import { Database, Layers, Globe, Lock } from "lucide-react";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: Database,
      title: "Dẫn đầu về Dữ liệu",
      desc: "Mọi quyết định kết nối, gợi ý hay đầu tư trên hệ thống đều dựa trên dữ liệu thực tế (Data-driven), không phải cảm tính."
    },
    {
      icon: Layers,
      title: "Hệ sinh thái Khép kín",
      desc: "Founder không cần dùng 5 công cụ rời rạc. Toàn bộ vòng đời Startup vận hành trơn tru trên một dòng chảy dữ liệu duy nhất."
    },
    {
      icon: Globe,
      title: "Chuẩn mực Quốc tế",
      desc: "Khung hồ sơ và tiêu chí chấm điểm được xây dựng dựa trên chuẩn của các Quỹ đầu tư mạo hiểm hàng đầu."
    },
    {
      icon: Lock,
      title: "Bảo mật & An toàn",
      desc: "Cam kết bảo vệ an toàn tuyệt đối cho tài sản trí tuệ (IP) và dữ liệu nhạy cảm với cơ chế mã hóa cấp cao."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">4 Giá trị Cốt lõi tạo nên sự <span className="text-primary">Khác biệt</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <div key={index} className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default WhyChooseUsSection;