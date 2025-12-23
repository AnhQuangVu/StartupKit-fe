import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/const/route";

const CTASection = () => {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Sẵn sàng đưa dự án của bạn lên tầm cao mới?</h2>
        <p className="text-lg font-medium max-w-2xl mx-auto mb-12 opacity-90">
          Gia nhập ngay hệ sinh thái khởi nghiệp số 1 Việt Nam để kết nối với những con người ưu tú nhất.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
          <Button className="bg-primary text-black hover:bg-primary/90 h-12 px-8 text-lg font-bold" asChild>
              <Link href={ROUTES.REGISTER}>Tôi là Founder - Tạo hồ sơ</Link>
          </Button>
          <Button variant="outline" className="bg-white text-black border-white hover:bg-gray-100 h-12 px-8 text-lg" asChild>
              <Link href={ROUTES.REGISTER}>Tôi là Mentor - Đăng ký</Link>
          </Button>
          <Button variant="outline" className="bg-transparent text-white border-primary hover:bg-primary/10 h-12 px-8 text-lg" asChild>
              <Link href={ROUTES.REGISTER}>Tôi là Investor - Tìm Deal</Link>
          </Button>
          <Button variant="ghost" className="text-white hover:text-primary hover:bg-white/10 h-12 px-8 text-lg" asChild>
              <Link href="#">Tôi là Organizer - Liên hệ tư vấn</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
export default CTASection;