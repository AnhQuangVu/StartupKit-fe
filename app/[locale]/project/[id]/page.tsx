"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import AIScoreBadge from "@/components/ui/AIScoreBadge";

const PROJECTS: Record<string, {
    name: string; founder: string; industry: string; stage: string;
    score: number; location: string; teamSize: string; coverSeed: string; logoColor: string;
    tagline: string; description: string; vision: string;
    problem: string; solution: string; market: string; traction: string;
    team: { name: string; role: string; bg: string; avatarSeed: string }[];
    reviews: { mentor: string; score: number; comment: string; seed: string }[];
}> = {
    s1: {
        name: "Coolmate", founder: "Phạm Chí Nhu", industry: "E-commerce", stage: "Series B",
        score: 98, location: "Hà Nội", teamSize: "180 people", coverSeed: "coolmate", logoColor: "#111111",
        tagline: "Nền tảng mua sắm thời trang D2C ứng dụng công nghệ hàng đầu cho nam giới.",
        description: "Coolmate tiên phong mô hình thời trang D2C ứng dụng công nghệ tại Việt Nam, cung cấp tủ đồ cơ bản chất lượng cao, dịch vụ đổi trả 60 ngày miễn phí và trải nghiệm mua sắm trực tuyến vượt trội.",
        vision: "Trở thành thương hiệu thời trang công nghệ bền vững đại diện cho Việt Nam vươn ra khu vực Đông Nam Á.",
        problem: "Nam giới Việt Nam gặp khó khăn khi tìm kiếm trang phục cơ bản chất lượng tốt với giá hợp lý; các chuỗi bán lẻ truyền thống đội chi phí mặt bằng và trung gian lên tới 60%.",
        solution: "Mô hình D2C cắt bỏ toàn bộ khâu trung gian, ứng dụng hệ thống quản trị dữ liệu chuỗi cung ứng ERP tự động và dịch vụ khách hàng 100% hài lòng.",
        market: "Thị trường thời trang Việt Nam đạt quy mô $6.5 tỷ, trong đó phân khúc trực tuyến tăng trưởng hơn 25%/năm.",
        traction: "$26M ARR, hơn 1.5 triệu khách hàng thân thiết, tỷ lệ mua lại đạt 48%. Đã gọi vốn thành công từ Vertex Ventures & Kairous Capital.",
        team: [
            { name: "Phạm Chí Nhu", role: "CEO & Co-founder", bg: "Kinh nghiệm 10 năm ngành dệt may & D2C", avatarSeed: "phamchinhu" },
            { name: "Nguyễn Hoài Xuân Lan", role: "CMO & Co-founder", bg: "Chuyên gia tiếp thị số & xây dựng thương hiệu", avatarSeed: "xuanlan" },
            { name: "Nguyễn Văn Hiệp", role: "CTO", bg: "Kỹ sư kiến trúc hệ thống E-commerce & Supply Chain", avatarSeed: "vanhiep" },
        ],
        reviews: [
            { mentor: "Trần Trung Hiếu", score: 98, comment: "Khả năng tối ưu chuỗi cung ứng và giữ chân khách hàng của Coolmate là hình mẫu lý tưởng cho startup Việt Nam.", seed: "trantrunghieu" },
            { mentor: "Lê Hàn Tuệ Lâm", score: 98, comment: "Hiệu quả tài chính xuất sắc, unit economics bền vững và đội ngũ sáng lập có năng lực thực thi cực kỳ quyết liệt.", seed: "tuelam" },
        ],
    },
    s2: {
        name: "Dat Bike", founder: "Nguyễn Bá Cảnh Sơn", industry: "CleanTech", stage: "Series B",
        score: 97, location: "TP. Hồ Chí Minh", teamSize: "220 people", coverSeed: "datbike", logoColor: "#FF5722",
        tagline: "Xe máy điện công nghệ cao hiệu suất vượt trội thay thế xe xăng tại Đông Nam Á.",
        description: "Dat Bike là công ty công nghệ sản xuất xe máy điện hiệu suất cao với tầm hoạt động 200km/lần sạc và sạc nhanh 20 phút đi được 100km.",
        vision: "Chuyển đổi toàn bộ 250 triệu xe máy xăng tại Đông Nam Á sang xe máy điện thông minh.",
        problem: "Xe máy xăng là nguồn phát thải 70% khói bụi đô thị; các dòng xe điện truyền thống yếu, quãng đường ngắn dưới 60km và pin mau chai.",
        solution: "Tự nghiên cứu và làm chủ 80% công nghệ lõi (Pin, Bộ điều khiển động cơ Controller, Khung gầm) tại Việt Nam với công suất tương đương xe xăng 125cc.",
        market: "Việt Nam là thị trường xe máy lớn thứ 4 thế giới với 65 triệu xe đang lưu hành, doanh số hàng năm đạt $4 tỷ.",
        traction: "Đã gọi vốn hơn $15M từ Jungle Ventures & GSR Ventures; sở hữu nhà máy sản xuất hiện đại tại Bình Dương.",
        team: [
            { name: "Nguyễn Bá Cảnh Sơn", role: "Founder & CEO", bg: "Cựu kỹ sư phần mềm Silicon Valley, giải quốc tế tin học", avatarSeed: "canhson" },
            { name: "Minh Tran", role: "VP Manufacturing", bg: "15 năm quản lý sản xuất ô tô xe máy", avatarSeed: "minhtran" },
        ],
        reviews: [
            { mentor: "TS. Nguyễn Hữu Phước Nguyên", score: 97, comment: "Dat Bike là niềm tự hào về năng lực R&D phần cứng và sản xuất công nghệ cao của kỹ sư Việt Nam.", seed: "phuocnguyen" },
            { mentor: "Bùi Thành Đô", score: 96, comment: "Tốc độ cải tiến sản phẩm qua từng thế hệ rất ấn tượng, bắt đầu đạt điểm hòa vốn sản xuất.", seed: "thanhdo" },
        ],
    },
    s3: {
        name: "BuyMed (Thuocsi.vn)", founder: "Hoàng Nguyễn", industry: "Healthtech", stage: "Series B",
        score: 98, location: "TP. Hồ Chí Minh", teamSize: "450 people", coverSeed: "buymed", logoColor: "#0F766E",
        tagline: "Sàn thương mại điện tử phân phối dược phẩm B2B minh bạch lớn nhất Việt Nam.",
        description: "BuyMed giải quyết bài toán phân phối dược phẩm truyền thống phân mảnh bằng nền tảng thương mại điện tử B2B kết nối trực tiếp nhà sản xuất với nhà thuốc và phòng khám.",
        vision: "Xây dựng hạ tầng y tế số minh bạch và đáng tin cậy nhất Đông Nam Á.",
        problem: "Nhà thuốc truyền thống phải nhập hàng qua 3-5 tầng trung gian, nguy cơ thuốc giả và giá cả không minh bạch.",
        solution: "Sàn thương mại B2B với kho dược đạt chuẩn GSP, đảm bảo 100% nguồn gốc xuất xứ, giao hàng trong 24 giờ trên 63 tỉnh thành.",
        market: "Quy mô thị trường dược phẩm Việt Nam đạt $8 tỷ, tăng trưởng 11% hàng năm.",
        traction: "Phục vụ hơn 35,000 nhà thuốc (hơn 50% tổng số nhà thuốc toàn quốc), gọi vốn $51.5M Series B dẫn dắt bởi Smilegate Investment.",
        team: [
            { name: "Hoàng Nguyễn", role: "Co-founder & CEO", bg: "Kinh nghiệm thương mại điện tử y tế", avatarSeed: "hoangnguyen" },
            { name: "Peter Nguyễn", role: "Co-founder & Chairman", bg: "Chuyên gia tài chính & đầu tư y tế", avatarSeed: "peternguyen" },
        ],
        reviews: [
            { mentor: "Lê Hàn Tuệ Lâm", score: 98, comment: "Một trong những case study B2B Marketplace hiếm hoi đạt quy mô hàng chục triệu đô và tạo tác động xã hội lớn.", seed: "tuelam" },
        ],
    },
    s4: {
        name: "TopCV Vietnam", founder: "Trần Trung Hiếu", industry: "SaaS", stage: "Growth",
        score: 97, location: "Hà Nội", teamSize: "310 people", coverSeed: "topcv", logoColor: "#00B14F",
        tagline: "Hệ sinh thái nhân sự và nền tảng tuyển dụng thông minh ứng dụng AI số 1.",
        description: "TopCV cung cấp giải pháp toàn diện cho vòng đời nhân sự: từ tạo CV chuyên nghiệp, tuyển dụng ứng dụng AI matching đến quản trị nhân sự và đánh giá năng lực.",
        vision: "Trở thành đối tác đồng hành phát triển sự nghiệp trọn đời cho mọi nhân tài Việt Nam.",
        problem: "Doanh nghiệp tốn hàng tuần sàng lọc hàng nghìn CV thủ công; ứng viên khó tìm được công việc phù hợp với năng lực và văn hóa.",
        solution: "Thuật toán AI Resume Parser và Smart Matching chấm điểm độ tương thích giữa ứng viên và yêu cầu tuyển dụng với độ chính xác cao.",
        market: "Thị trường tuyển dụng và HR Tech tại Việt Nam trị giá hơn $400M với tốc độ số hóa mạnh mẽ.",
        traction: "Hơn 6 triệu người dùng, 200,000+ doanh nghiệp trả phí, Top 1 nền tảng tuyển dụng được yêu thích nhất.",
        team: [
            { name: "Trần Trung Hiếu", role: "Founder & CEO", bg: "Nhân tài Đất Việt, Forbes 30 Under 30", avatarSeed: "trantrunghieu" },
            { name: "Nguyễn Khắc Nhật", role: "CTO", bg: "Kiến trúc sư phần mềm & Big Data", avatarSeed: "khacnhat" },
        ],
        reviews: [
            { mentor: "Phạm Chí Nhu", score: 98, comment: "TopCV là đối tác nhân sự số 1 của Coolmate và hàng nghìn startup công nghệ tại Việt Nam.", seed: "phamchinhu" },
        ],
    },
};

const FALLBACK = PROJECTS.s1;

export default function ProjectDetail() {
    const { locale, id } = useParams() as { locale: Locale; id: string };
    const isVi = locale === "vi";
    const p = PROJECTS[id] ?? FALLBACK;
    const initials = p.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const ui = {
        back: isVi ? "Duyệt Startup" : "Browse Startups",
        by: isVi ? "bởi" : "by",
        connectStartup: isVi ? "Kết nối với Startup" : "Connect with Startup",
        requestIntro: isVi ? "Yêu cầu giới thiệu" : "Request Intro",
        overview: isVi ? "Tổng quan" : "Overview",
        vision: isVi ? "Tầm nhìn" : "Vision",
        problemSolution: isVi ? "Vấn đề & Giải pháp" : "Problem & Solution",
        problem: isVi ? "Vấn đề" : "Problem",
        solution: isVi ? "Giải pháp" : "Solution",
        marketTraction: isVi ? "Thị trường & Traction" : "Market & Traction",
        targetMarket: isVi ? "Thị trường mục tiêu" : "Target Market",
        traction: "Traction",
        team: isVi ? "Đội ngũ" : "Team",
        mentorEvals: isVi ? "Đánh giá từ Mentor" : "Mentor Evaluations",
        aiCredibility: isVi ? "Điểm tín nhiệm AI" : "AI Credibility Score",
        evaluatedBy: isVi ? "Được đánh giá bởi" : "Evaluated by",
        mentor: isVi ? "mentor" : "mentor",
        quickFacts: isVi ? "Thông tin nhanh" : "Quick Facts",
        industry: isVi ? "Ngành" : "Industry",
        stage: isVi ? "Giai đoạn" : "Stage",
        location: isVi ? "Địa điểm" : "Location",
        teamSize: isVi ? "Quy mô đội ngũ" : "Team Size",
        founder: isVi ? "Nhà sáng lập" : "Founder",
        interested: isVi ? "Quan tâm startup này?" : "Interested in this startup?",
        interestedSub: isVi ? "Kết nối trực tiếp hoặc yêu cầu giới thiệu qua mạng lưới của chúng tôi." : "Connect directly or request an introduction through our network.",
        connectNow: isVi ? "Kết nối ngay" : "Connect now",
    };

    return (
        <div className="pt-[72px] min-h-screen bg-white">
            {/* ── HERO ──────────────────────────────────────────────── */}
            <div className="relative w-full bg-[#F0F0F0]" style={{ paddingTop: "40%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`https://picsum.photos/seed/${p.coverSeed}proj/1200/480`}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 max-w-[960px] mx-auto px-6 md:px-12 pb-8">
                    <div className="flex items-end gap-4">
                        <div className="w-14 h-14 rounded-[10px] border-2 border-white flex items-center justify-center text-white text-[18px] font-black shrink-0 shadow-lg"
                            style={{ backgroundColor: p.logoColor }}>
                            {initials}
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h1 className="text-[28px] md:text-[36px] font-black text-white leading-tight">{p.name}</h1>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[11px] font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">{p.stage}</span>
                                <span className="text-[11px] font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">{p.industry}</span>
                                <span className="text-[11px] font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">📍 {p.location}</span>
                                <span className="text-[11px] font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">👥 {p.teamSize}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CONTENT ───────────────────────────────────────────── */}
            <div className="max-w-[960px] mx-auto px-6 md:px-12 py-10">
                <Link href={`/${locale}/market/startups`}
                    className="text-[13px] text-[#888888] hover:text-[#111111] transition-colors mb-8 inline-flex items-center gap-1">
                    ← {ui.back}
                </Link>

                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10 mt-4 border border-[#EAEAEA] rounded-[10px] p-6">
                    <div className="flex-1">
                        <p className="text-[18px] font-semibold text-[#111111] leading-snug mb-3">{p.tagline}</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <AIScoreBadge score={p.score} />
                            <span className="text-[12px] text-[#888888]">{ui.by} {p.founder}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                        <Link href={`/${locale}/deals/${id}`} className="bg-[#111111] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors whitespace-nowrap text-center">
                            {ui.connectStartup} →
                        </Link>
                        <button className="border border-[#EAEAEA] text-[#111111] px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:border-[#111111] transition-colors whitespace-nowrap">
                            {ui.requestIntro}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-3">{ui.overview}</h2>
                            <p className="text-[15px] text-[#444444] leading-relaxed mb-4">{p.description}</p>
                            <div className="bg-[#FFFBF0] border border-[#F4B400]/30 rounded-[8px] p-4">
                                <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-1">{ui.vision}</p>
                                <p className="text-[14px] text-[#444444] italic">{p.vision}</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{ui.problemSolution}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">{ui.problem}</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.problem}</p>
                                </div>
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5 bg-[#F9F9F9]">
                                    <p className="text-[11px] font-bold text-[#111111] uppercase tracking-wide mb-2">{ui.solution}</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.solution}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{ui.marketTraction}</h2>
                            <div className="space-y-4">
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">{ui.targetMarket}</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.market}</p>
                                </div>
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">{ui.traction}</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.traction}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{ui.team}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {p.team.map(member => (
                                    <div key={member.name} className="border border-[#EAEAEA] rounded-[8px] p-5 flex items-start gap-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`https://i.pravatar.cc/80?u=${member.avatarSeed}`}
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full object-cover border border-[#EAEAEA] shrink-0"
                                        />
                                        <div>
                                            <h3 className="text-[15px] font-bold text-[#111111] mb-0.5">{member.name}</h3>
                                            <p className="text-[12px] font-semibold text-[#F4B400] mb-1">{member.role}</p>
                                            <p className="text-[12px] text-[#666666]">{member.bg}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{ui.mentorEvals}</h2>
                            <div className="flex flex-col gap-4">
                                {p.reviews.map(r => (
                                    <div key={r.mentor} className="border border-[#EAEAEA] rounded-[8px] p-5 flex gap-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`https://i.pravatar.cc/64?u=${r.seed}`} alt={r.mentor}
                                            className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#EAEAEA]" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[14px] font-bold text-[#111111]">{r.mentor}</span>
                                                <span className="bg-[#FFFBF0] border border-[#F4B400] text-[#F4B400] text-[11px] font-bold px-2.5 py-0.5 rounded-full">{r.score}/100</span>
                                            </div>
                                            <p className="text-[13px] text-[#555555] italic">&ldquo;{r.comment}&rdquo;</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-5">
                        <div className="border border-[#EAEAEA] rounded-[10px] p-5">
                            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-3">{ui.aiCredibility}</p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-[48px] font-black text-[#F4B400] leading-none">{p.score}</span>
                                <span className="text-[16px] text-[#AAAAAA]">/ 100</span>
                            </div>
                            <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-[#F4B400] rounded-full" style={{ width: `${p.score}%` }} />
                            </div>
                            <p className="text-[12px] text-[#888888]">{ui.evaluatedBy} {p.reviews.length} {ui.mentor}{p.reviews.length !== 1 ? "s" : ""}</p>
                        </div>

                        <div className="border border-[#EAEAEA] rounded-[10px] p-5 space-y-3">
                            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">{ui.quickFacts}</p>
                            {[
                                { label: ui.industry, value: p.industry },
                                { label: ui.stage, value: p.stage },
                                { label: ui.location, value: p.location },
                                { label: ui.teamSize, value: p.teamSize },
                                { label: ui.founder, value: p.founder },
                            ].map(f => (
                                <div key={f.label} className="flex justify-between items-center text-[13px] border-t border-[#F5F5F5] pt-2">
                                    <span className="text-[#888888] font-medium">{f.label}</span>
                                    <span className="font-semibold text-[#111111]">{f.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#111111] rounded-[10px] p-5">
                            <p className="text-[13px] font-bold text-white mb-1">{ui.interested}</p>
                            <p className="text-[12px] text-white/60 mb-4">{ui.interestedSub}</p>
                            <Link href={`/${locale}/deals/${id}`} className="block text-center w-full bg-[#F4B400] text-[#111111] px-4 py-2.5 rounded-[8px] text-[13px] font-bold hover:bg-white transition-colors">
                                {ui.connectNow} →
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
