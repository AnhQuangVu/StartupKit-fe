"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

/**
 * /deals/[id] — Deal Detail Page
 * Shows full pitch, funding progress, team, and investor CTA.
 * Inherits Navbar + Footer from LocaleLayout.
 */
export default function DealDetail() {
    const { locale, id } = useParams() as { locale: Locale; id: string };
    const isVi = locale === "vi";
    const ui = {
        back: isVi ? "Quay lại Deals" : "Back to Deals",
        aiScore: isVi ? "Điểm AI" : "AI Score",
        byFounder: isVi ? "bởi" : "by",
        investNow: isVi ? "Đầu tư ngay" : "Invest Now",
        min: isVi ? "tối thiểu" : "min",
        followStartup: isVi ? "Theo dõi Startup" : "Follow Startup",
        bookMentor: isVi ? "Đặt Mentor cho Startup này" : "Book Mentor for this Startup",
        ofTarget: isVi ? "trên mục tiêu" : "of",
        target: isVi ? "mục tiêu" : "target",
        investorsCommitted: isVi ? "nhà đầu tư đã cam kết" : "investors committed",
        minTicket: isVi ? "Vé tối thiểu" : "Min. ticket",
        sections: {
            problem: isVi ? "Vấn đề" : "Problem",
            solution: isVi ? "Giải pháp" : "Solution",
            market: isVi ? "Cơ hội thị trường" : "Market Opportunity",
            traction: isVi ? "Traction" : "Traction",
            funds: isVi ? "Sử dụng vốn" : "Use of Funds",
            team: isVi ? "Đội ngũ" : "Team",
        },
        ctaTitle: isVi ? "Sẵn sàng đầu tư?" : "Ready to invest?",
        ctaDesc: isVi ? "Vé tối thiểu" : "Minimum ticket",
        successFee: isVi ? "phí thành công 10% khi hoàn tất vòng gọi vốn" : "10% success fee on funding close",
        investIn: isVi ? "Đầu tư vào" : "Invest in",
    };

    // Mock data — replace with API fetch by `id`
    interface DealTeamMember {
    name: string;
    role: string;
    bg?: string;
    bio?: string;
}

interface DealDetailItem {
    name: string;
    founder: string;
    industry: string;
    stage: string;
    location: string;
    seeking: string;
    raised: string;
    pct: number;
    investors: number;
    minTicket: string;
    score: number;
    logoColor: string;
    problem: string;
    solution: string;
    market: string;
    traction: string;
    use_of_funds: string;
    team: DealTeamMember[];
    highlights: string[];
}

    const DEALS_MAP: Record<string, DealDetailItem> = {
        s1: {
            name: "Coolmate",
            founder: "Phạm Chí Nhu",
            industry: "E-commerce",
            stage: "Series B",
            location: "Hà Nội, Việt Nam",
            seeking: "$5M",
            raised: "$3.8M",
            pct: 76,
            investors: 8,
            minTicket: "$50k",
            score: 98,
            logoColor: "#111111",
            problem: "Thị trường thời trang nam phân mảnh, chuỗi bán lẻ truyền thống tốn kém chi phí mặt bằng và trung gian khiến sản phẩm đội giá cao.",
            solution: "Mô hình D2C ứng dụng dữ liệu chuỗi cung ứng, tự động hoá hoàn tất đơn hàng và dịch vụ đổi trả 60 ngày miễn phí.",
            market: "Thị trường thời trang Việt Nam đạt $6.5 tỷ, phân khúc thương mại điện tử tăng trưởng trên 25%/năm.",
            traction: "$26M ARR, 1.5M khách hàng, lợi nhuận ròng dương, được đầu tư bởi Vertex Ventures & Kairous Capital.",
            use_of_funds: "45% Mở rộng dòng sản phẩm thể thao & phụ kiện · 35% Tiếp thị & Mở rộng thị trường Thái Lan · 20% Nâng cấp hạ tầng kho bãi",
            team: [
                { name: "Phạm Chí Nhu", role: "Co-founder & CEO", bg: "10 năm kinh nghiệm ngành dệt may & thương mại điện tử" },
                { name: "Nguyễn Hoài Xuân Lan", role: "Co-founder & CMO", bg: "Chuyên gia tiếp thị số & xây dựng thương hiệu" },
                { name: "Nguyễn Văn Hiệp", role: "CTO", bg: "Kiến trúc sư phần mềm ERP chuỗi cung ứng" },
            ],
            highlights: ["$26M ARR năm 2025", "1.5M khách hàng thân thiết", "Tỷ lệ mua lại 48%", "Đã đầu tư bởi Vertex Ventures"],
        },
        s2: {
            name: "Dat Bike",
            founder: "Nguyễn Bá Cảnh Sơn",
            industry: "CleanTech",
            stage: "Series B",
            location: "TP. Hồ Chí Minh, Việt Nam",
            seeking: "$8M",
            raised: "$5.3M",
            pct: 66,
            investors: 14,
            minTicket: "$100k",
            score: 97,
            logoColor: "#FF5722",
            problem: "250 triệu xe máy xăng tại Đông Nam Á xả thải lượng lớn khói bụi; xe điện hiện tại yếu, quãng đường ngắn và sạc chậm.",
            solution: "Tự nghiên cứu và sản xuất xe máy điện hiệu suất tương đương xe xăng 125cc, đi được 200km/lần sạc và sạc nhanh 20 phút.",
            market: "Thị trường xe máy Việt Nam đạt $4 tỷ hàng năm với 65 triệu xe đang lưu hành.",
            traction: "Huy động thành công hơn $15M từ Jungle Ventures & GSR Ventures; sở hữu nhà máy công nghệ cao tại Bình Dương.",
            use_of_funds: "50% Mở rộng công suất nhà máy sản xuất · 30% Mạng lưới trạm sạc siêu nhanh Dat Charge · 20% R&D thế hệ xe mới",
            team: [
                { name: "Nguyễn Bá Cảnh Sơn", role: "Founder & CEO", bg: "Cựu kỹ sư phần mềm Silicon Valley, giải quốc tế tin học" },
                { name: "Minh Tran", role: "VP Manufacturing", bg: "15 năm quản lý sản xuất ô tô xe máy" },
            ],
            highlights: ["$15M+ tổng vốn đã huy động", "Nhà máy sản xuất tại Bình Dương", "Tầm hoạt động 200km", "Sạc nhanh 20 phút đi 100km"],
        },
        s3: {
            name: "BuyMed (Thuocsi.vn)",
            founder: "Hoàng Nguyễn",
            industry: "Healthtech",
            stage: "Series B",
            location: "TP. Hồ Chí Minh, Việt Nam",
            seeking: "$10M",
            raised: "$7.5M",
            pct: 75,
            investors: 11,
            minTicket: "$150k",
            score: 98,
            logoColor: "#0F766E",
            problem: "Nhà thuốc truyền thống phải nhập hàng qua nhiều tầng trung gian, giá thuốc bị đẩy cao và rủi ro thuốc giả.",
            solution: "Sàn thương mại điện tử dược phẩm B2B với kho thuốc chuẩn GSP, giao hàng trong 24h và cam kết 100% nguồn gốc chính hãng.",
            market: "Thị trường phân phối dược phẩm Việt Nam quy mô $8 tỷ, tốc độ tăng trưởng 11% hàng năm.",
            traction: "35,000+ nhà thuốc & phòng khám hợp tác, $51.5M vốn gọi Series B dẫn dắt bởi Smilegate Investment.",
            use_of_funds: "40% Mở rộng mạng lưới kho vận GSP toàn quốc · 35% Đa dạng hóa danh mục thuốc độc quyền · 25% Công nghệ AI dự báo nhu cầu",
            team: [
                { name: "Hoàng Nguyễn", role: "Co-founder & CEO", bg: "Kinh nghiệm thương mại điện tử y tế" },
                { name: "Peter Nguyễn", role: "Co-founder & Chairman", bg: "Chuyên gia tài chính & đầu tư y tế" },
            ],
            highlights: ["35k nhà thuốc (50% cả nước)", "$51.5M Series B", "Kho vận đạt chuẩn GSP", "Giao hàng 24h trên 63 tỉnh"],
        },
        s4: {
            name: "TopCV Vietnam",
            founder: "Trần Trung Hiếu",
            industry: "SaaS",
            stage: "Growth",
            location: "Hà Nội, Việt Nam",
            seeking: "$4M",
            raised: "$3.2M",
            pct: 80,
            investors: 6,
            minTicket: "$50k",
            score: 97,
            logoColor: "#00B14F",
            problem: "Doanh nghiệp tốn hàng tuần sàng lọc ứng viên thủ công; tỷ lệ tuyển sai người gây thiệt hại hàng trăm triệu đồng.",
            solution: "Nền tảng HRTech tích hợp AI Smart Matching và Resume Parser tự động gợi ý ứng viên phù hợp với văn hóa và yêu cầu công việc.",
            market: "Thị trường tuyển dụng và phần mềm quản trị nhân sự HRTech Việt Nam trị giá hơn $400M.",
            traction: "6 triệu ứng viên đã đăng ký, 200,000+ nhà tuyển dụng doanh nghiệp, đối tác chiến lược của Mynavi Nhật Bản.",
            use_of_funds: "40% Nâng cấp mô hình AI đánh giá năng lực · 35% Mở rộng các giải pháp HR SaaS trọn gói · 25% Phát triển thị trường khu vực",
            team: [
                { name: "Trần Trung Hiếu", role: "Founder & CEO", bg: "Nhân tài Đất Việt, Forbes 30 Under 30" },
                { name: "Nguyễn Khắc Nhật", role: "CTO", bg: "Kiến trúc sư phần mềm & Big Data" },
            ],
            highlights: ["6M+ hồ sơ ứng viên", "200k+ doanh nghiệp", "Giải thưởng Nhân tài Đất Việt", "Đối tác chiến lược Mynavi"],
        },
    };

    const deal = DEALS_MAP[id] ?? DEALS_MAP.s1;

    const initials = deal.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

    return (
        <div className="pt-[80px] min-h-screen bg-white">
            <div className="max-w-[920px] mx-auto px-6 md:px-12 py-12">

                {/* Back */}
                <Link href={`/${locale}/deals`} className="inline-flex items-center gap-1.5 text-[13px] text-[#888888] hover:text-[#111111] transition-colors mb-8">
                    ← {ui.back}
                </Link>

                {/* ── Deal Header ─────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8 pt-2">
                    {/* Logo */}
                    <div
                        className="w-20 h-20 rounded-[14px] flex items-center justify-center text-white text-[28px] font-black shrink-0"
                        style={{ backgroundColor: deal.logoColor }}
                    >
                        {initials}
                    </div>
                    {/* Meta */}
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="text-[32px] font-black text-[#111111]">{deal.name}</h1>
                            <span className="bg-[#F0F0F0] text-[#555555] text-[12px] font-bold px-3 py-1 rounded-full">{deal.stage}</span>
                            <span className="bg-[#FFFBF0] border border-[#F4B400] text-[#F4B400] text-[12px] font-bold px-3 py-1 rounded-full">
                                {ui.aiScore} {deal.score}/100
                            </span>
                        </div>
                        <p className="text-[14px] text-[#888888] mb-4">
                            {deal.industry} &middot; {deal.location} &middot; {ui.byFounder} {deal.founder}
                        </p>
                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button className="bg-[#111111] text-white px-6 py-3 rounded-[8px] text-[14px] font-bold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                                {ui.investNow} — {ui.min} {deal.minTicket}
                            </button>
                            <button className="border border-[#EAEAEA] text-[#111111] px-5 py-3 rounded-[8px] text-[14px] font-semibold hover:border-[#111111] transition-colors">
                                {ui.followStartup}
                            </button>
                            <Link href={`/${locale}/market/mentors`} className="border border-[#EAEAEA] text-[#111111] px-5 py-3 rounded-[8px] text-[14px] font-semibold hover:border-[#111111] transition-colors">
                                {ui.bookMentor}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Highlights row */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {deal.highlights.map(h => (
                        <span key={h} className="bg-[#F9F9F9] border border-[#EAEAEA] text-[#333333] text-[12px] font-semibold px-3 py-1.5 rounded-full">
                            ✓ {h}
                        </span>
                    ))}
                </div>

                {/* ── Funding Progress Box ─────────────────────────────── */}
                <div className="border border-[#EAEAEA] rounded-[12px] p-6 mb-10 bg-[#FAFAFA]">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <span className="text-[28px] font-black text-[#111111]">{deal.raised}</span>
                            <span className="text-[14px] text-[#888888] ml-2">{ui.ofTarget} {deal.seeking} {ui.target}</span>
                        </div>
                        <span className="text-[24px] font-black text-[#F4B400]">{deal.pct}%</span>
                    </div>
                    <div className="h-3 bg-[#EBEBEB] rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-[#F4B400] rounded-full" style={{ width: `${deal.pct}%` }} />
                    </div>
                    <div className="flex gap-6 text-[13px] text-[#888888]">
                        <span>{deal.investors} {ui.investorsCommitted}</span>
                        <span>{ui.minTicket}: {deal.minTicket}</span>
                    </div>
                </div>

                {/* ── Pitch Sections ──────────────────────────────────── */}
                {[
                    { title: ui.sections.problem, content: deal.problem },
                    { title: ui.sections.solution, content: deal.solution },
                    { title: ui.sections.market, content: deal.market },
                    { title: ui.sections.traction, content: deal.traction },
                    { title: ui.sections.funds, content: deal.use_of_funds },
                ].map(sec => (
                    <div key={sec.title} className="mb-8">
                        <h2 className="text-[19px] font-bold text-[#111111] mb-3 pb-2 border-b border-[#F0F0F0]">{sec.title}</h2>
                        <p className="text-[15px] text-[#444444] leading-relaxed">{sec.content}</p>
                    </div>
                ))}

                {/* ── Team ────────────────────────────────────────────── */}
                <div className="mb-10">
                    <h2 className="text-[19px] font-bold text-[#111111] mb-4 pb-2 border-b border-[#F0F0F0]">{ui.sections.team}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {deal.team.map(member => (
                            <div key={member.name} className="border border-[#EAEAEA] rounded-[10px] p-5 bg-white">
                                <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-[14px] mb-3">
                                    {member.name[0]}
                                </div>
                                <h3 className="text-[15px] font-bold text-[#111111] mb-0.5">{member.name}</h3>
                                <p className="text-[12px] font-semibold text-[#F4B400] mb-1">{member.role}</p>
                                <p className="text-[12px] text-[#666666]">{member.bg}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Bottom CTA ──────────────────────────────────────── */}
                <div className="border border-[#F4B400] bg-[#FFFBF0] rounded-[12px] p-8 text-center">
                    <h3 className="text-[22px] font-black text-[#111111] mb-2">{ui.ctaTitle}</h3>
                    <p className="text-[14px] text-[#555555] mb-6">{ui.ctaDesc}: {deal.minTicket} · {ui.successFee}</p>
                    <button className="bg-[#111111] text-white px-10 py-4 rounded-[8px] text-[15px] font-bold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                        {ui.investIn} {deal.name}
                    </button>
                </div>

            </div>
        </div>
    );
}
