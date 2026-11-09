"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

interface Deal {
    id: string;
    name: string;
    founder: string;
    industry: string;
    stage: string;
    location: string;
    pitch: string;
    score: number;
    target: string;
    raised: string;
    pct: number;
    investors: number;
    logo?: string;
    logoColor: string;
}

const DEALS: Deal[] = [
    {
        id: "s1", name: "Coolmate", founder: "Phạm Chí Nhu", industry: "E-commerce", stage: "Series B",
        location: "Hà Nội", pitch: "Nền tảng mua sắm thời trang nam ứng dụng công nghệ D2C số 1 Việt Nam. Đạt $26M ARR, hơn 1.5 triệu khách hàng thân thiết và lợi nhuận ròng dương.",
        score: 98, target: "$5M", raised: "$3.8M", pct: 76, investors: 8, logoColor: "#111111",
    },
    {
        id: "s2", name: "Dat Bike", founder: "Nguyễn Bá Cảnh Sơn", industry: "CleanTech", stage: "Series B",
        location: "TP. Hồ Chí Minh", pitch: "Hãng xe máy điện hiệu suất cao tiên phong tại Đông Nam Á. Tầm hoạt động 200km/lần sạc, làm chủ công nghệ pin và hệ thống điều khiển động cơ tại Việt Nam.",
        score: 97, target: "$8M", raised: "$5.3M", pct: 66, investors: 14, logoColor: "#FF5722",
    },
    {
        id: "s3", name: "BuyMed (Thuocsi.vn)", founder: "Hoàng Nguyễn", industry: "Healthtech", stage: "Series B",
        location: "TP. Hồ Chí Minh", pitch: "Sàn thương mại điện tử dược phẩm B2B minh bạch phục vụ 35,000+ nhà thuốc & phòng khám trên 63 tỉnh thành toàn quốc.",
        score: 98, target: "$10M", raised: "$7.5M", pct: 75, investors: 11, logoColor: "#0F766E",
    },
    {
        id: "s4", name: "TopCV Vietnam", founder: "Trần Trung Hiếu", industry: "SaaS", stage: "Growth",
        location: "Hà Nội", pitch: "Hệ sinh thái HRTech & tuyển dụng ứng dụng AI thông minh kết nối 6 triệu ứng viên với hơn 200,000 doanh nghiệp hàng đầu tại Việt Nam.",
        score: 97, target: "$4M", raised: "$3.2M", pct: 80, investors: 6, logoColor: "#00B14F",
    },
    {
        id: "s5", name: "Kamereo", founder: "Taku Tanaka", industry: "Agritech", stage: "Series A",
        location: "TP. Hồ Chí Minh", pitch: "Chuỗi cung ứng thực phẩm B2B trực tiếp từ nông trại Đà Lạt đến hơn 3,000 nhà hàng, khách sạn và siêu thị với công nghệ quản lý tồn kho thời gian thực.",
        score: 94, target: "$2M", raised: "$1.4M", pct: 70, investors: 5, logoColor: "#3D6B35",
    },
    {
        id: "s6", name: "Selex Motors", founder: "TS. Nguyễn Hữu Phước Nguyên", industry: "CleanTech", stage: "Series A",
        location: "Hà Nội", pitch: "Hệ sinh thái xe máy điện & mạng lưới trạm đổi pin thông minh tự động 2 phút độc quyền cho các tập đoàn logistics lớn (Grab, Lazada, Shopee).",
        score: 96, target: "$3M", raised: "$2.1M", pct: 70, investors: 7, logoColor: "#2563EB",
    },
    {
        id: "s7", name: "Gimo", founder: "Nguyễn Anh Quân", industry: "Fintech", stage: "Series A",
        location: "Hà Nội", pitch: "Nền tảng nhận lương linh hoạt (EWA) và an sinh tài chính phục vụ 500,000+ người lao động tại hơn 100 nhà máy sản xuất FDI lớn trên toàn quốc.",
        score: 95, target: "$4.5M", raised: "$3.1M", pct: 69, investors: 8, logoColor: "#7C3AED",
    },
    {
        id: "s8", name: "MindX Technology School", founder: "Nguyễn Thị Thu Hà", industry: "Edtech", stage: "Series B",
        location: "Hà Nội", pitch: "Hệ sinh thái trường học đào tạo kỹ năng công nghệ chuẩn quốc tế với 40+ cơ sở toàn quốc và hơn 50,000 học viên tốt nghiệp.",
        score: 95, target: "$3.5M", raised: "$2.8M", pct: 80, investors: 6, logoColor: "#EA580C",
    },
    {
        id: "s9", name: "Cricket One", founder: "Đặng Cao Nam", industry: "Agritech", stage: "Series A",
        location: "Bình Phước", pitch: "Nhà sản xuất nguyên liệu protein bền vững từ dế đạt chuẩn chứng nhận EFSA Châu Âu xuất khẩu sang 12 quốc gia phát triển.",
        score: 93, target: "$2.5M", raised: "$1.8M", pct: 72, investors: 4, logoColor: "#854D0E",
    },
    {
        id: "s10", name: "ELSA Speak", founder: "Văn Đinh Hồng Vũ", industry: "Edtech", stage: "Series C",
        location: "TP. Hồ Chí Minh", pitch: "Trợ lý gia sư AI phát hiện lỗi phát âm tiếng Anh từng âm tiết theo thời gian thực phục vụ hơn 54 triệu người dùng tại 101 quốc gia.",
        score: 98, target: "$12M", raised: "$9.2M", pct: 77, investors: 15, logoColor: "#0284C7",
    },
    {
        id: "s11", name: "Finhay", founder: "Nghiêm Xuân Huy", industry: "Fintech", stage: "Series B",
        location: "Hà Nội", pitch: "Ứng dụng tích lũy và đầu tư tài chính thông minh phục vụ 2.7 triệu người dùng trẻ, sở hữu giấy phép chứng khoán chính thức.",
        score: 96, target: "$6M", raised: "$4.5M", pct: 75, investors: 9, logoColor: "#16A34A",
    },
    {
        id: "s12", name: "Haravan", founder: "Huỳnh Lâm Hồ", industry: "SaaS", stage: "Growth",
        location: "TP. Hồ Chí Minh", pitch: "Nền tảng thương mại điện tử đa kênh Omnichannel phục vụ 50,000+ doanh nghiệp bán lẻ, đối tác chiến lược cấp cao của Google và Meta.",
        score: 97, target: "$5M", raised: "$3.7M", pct: 74, investors: 8, logoColor: "#2563EB",
    },
];

function StartupLogo({ name, logo, color }: { name: string; logo?: string; color: string }) {
    if (logo) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={name} className="w-14 h-14 rounded-[10px] object-cover border border-[#EAEAEA]" />
        );
    }
    const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    return (
        <div
            className="w-14 h-14 rounded-[10px] flex items-center justify-center text-white text-[18px] font-black shrink-0 select-none"
            style={{ backgroundColor: color }}
        >
            {initials}
        </div>
    );
}

export default function DealsPage() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };
    const isVi = locale === "vi";

    const ALL_IND = isVi ? "Tất cả ngành" : "All Industries";
    const ALL_STG = isVi ? "Tất cả giai đoạn" : "All Stages";
    const INDUSTRIES = [ALL_IND, "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS", "Logistics", "CleanTech"];
    const STAGES = [ALL_STG, "Pre-seed", "Seed", "Series A", "Series B+"];

    const [search, setSearch] = useState("");
    const [industry, setIndustry] = useState(ALL_IND);
    const [stage, setStage] = useState(ALL_STG);

    const filteredDeals = DEALS.filter(d => {
        const q = search.toLowerCase();
        return (
            (d.name.toLowerCase().includes(q) || d.founder.toLowerCase().includes(q) || d.pitch.toLowerCase().includes(q) || d.industry.toLowerCase().includes(q)) &&
            (industry === ALL_IND || d.industry === industry) &&
            (stage === ALL_STG || d.stage === stage)
        );
    });

    const ui = {
        activeDeals: isVi ? "deal đang hoạt động" : "active deals",
        investorsActive: isVi ? "48 nhà đầu tư hoạt động tuần này" : "48 investors active this week",
        byFounder: isVi ? "bởi" : "by",
        raisedOf: isVi ? "đã gọi trên" : "raised of",
        committed: isVi ? "nhà đầu tư đã cam kết" : "investors committed",
        aiScore: isVi ? "Điểm AI" : "AI Score",
        viewDeal: isVi ? "Xem deal" : "View Deal",
    };

    return (
        <div className="pt-[80px] min-h-screen bg-white">
            <div className="border-b border-[#EAEAEA]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
                    <p className="text-[12px] font-bold text-[#888888] uppercase tracking-[0.12em] mb-3">
                        {dict.deals?.label ?? "Deal Marketplace"}
                    </p>
                    <h1 className="text-[40px] md:text-[52px] font-black text-[#111111] leading-tight mb-3">
                        {dict.deals?.title ?? "Investment Opportunities"}
                    </h1>
                    <p className="text-[16px] text-[#555555] max-w-[520px]">
                        {dict.deals?.sub ?? "Discover startups currently raising funding, scored and vetted by AI."}
                    </p>
                    <div className="flex items-center gap-6 mt-6">
                        <span className="flex items-center gap-2 text-[13px] text-[#555555]">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                            {filteredDeals.length} {ui.activeDeals}
                        </span>
                        <span className="text-[13px] text-[#555555]">{ui.investorsActive}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                <div className="flex flex-col gap-3 mb-10">
                    <input
                        type="text"
                        id="deal-search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder={dict.deals?.searchPlaceholder ?? "Search startups, founders, or industries…"}
                        className="w-full border border-[#EAEAEA] rounded-[8px] px-4 py-3 text-[14px] outline-none focus:border-[#111111] transition-colors bg-white"
                    />
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={industry}
                            onChange={e => setIndustry(e.target.value)}
                            className="border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[13px] font-medium outline-none focus:border-[#111111] bg-white text-[#111111] cursor-pointer"
                        >
                            {INDUSTRIES.map(o => <option key={o}>{o}</option>)}
                        </select>
                        <select
                            value={stage}
                            onChange={e => setStage(e.target.value)}
                            className="border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[13px] font-medium outline-none focus:border-[#111111] bg-white text-[#111111] cursor-pointer"
                        >
                            {STAGES.map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {filteredDeals.map((deal) => (
                        <article
                            key={deal.id}
                            className="border border-[#EAEAEA] rounded-[12px] p-6 hover:shadow-md hover:border-[#CCCCCC] transition-all group bg-white"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-5">
                                <div className="flex gap-4 flex-1">
                                    <StartupLogo name={deal.name} logo={deal.logo} color={deal.logoColor} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h2 className="text-[18px] font-bold text-[#111111]">{deal.name}</h2>
                                            <span className="text-[11px] font-bold bg-[#F0F0F0] text-[#555555] px-2 py-0.5 rounded-full">
                                                {deal.stage}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-[#888888] mb-3">
                                            {deal.industry} &middot; {deal.location} &middot; {ui.byFounder} {deal.founder}
                                        </p>
                                        <p className="text-[14px] text-[#444444] leading-relaxed line-clamp-2 mb-4">
                                            {deal.pitch}
                                        </p>

                                        <div className="mb-1 flex justify-between items-center">
                                            <span className="text-[13px] font-semibold text-[#111111]">
                                                {deal.raised} <span className="text-[#888888] font-normal">{ui.raisedOf}</span> {deal.target}
                                            </span>
                                            <span className="text-[13px] font-bold text-[#F4B400]">{deal.pct}%</span>
                                        </div>
                                        <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden mb-2">
                                            <div
                                                className="h-full bg-[#F4B400] rounded-full transition-all"
                                                style={{ width: `${deal.pct}%` }}
                                            />
                                        </div>
                                        <p className="text-[12px] text-[#888888]">
                                            {deal.investors} {ui.committed}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 md:ml-4 shrink-0">
                                    <div className="flex flex-col items-center bg-[#FFFBF0] border border-[#F4B400] rounded-[8px] px-4 py-2 text-center">
                                        <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wide">{ui.aiScore}</span>
                                        <span className="text-[24px] font-black text-[#F4B400] leading-none">{deal.score}</span>
                                        <span className="text-[10px] text-[#888888]">/100</span>
                                    </div>
                                    <Link
                                        href={`/${locale}/deals/${deal.id}`}
                                        className="bg-[#111111] text-white px-5 py-2.5 rounded-[8px] text-[13px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors whitespace-nowrap"
                                    >
                                        {ui.viewDeal} →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
