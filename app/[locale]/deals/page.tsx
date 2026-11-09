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
        id: "s1", name: "AgriBot Vietnam", founder: "Nguyễn Văn Minh", industry: "Agritech", stage: "Seed",
        location: "Hà Nội", pitch: "AI-driven crop monitoring for Vietnam's 10M rice farmers. Reduces crop loss by 30% via IoT sensors and real-time mobile recommendations.",
        score: 94, target: "$500k", raised: "$280k", pct: 56, investors: 5, logoColor: "#3D6B35",
    },
    {
        id: "s4", name: "PayEase", founder: "Trần Thị Lan", industry: "Fintech", stage: "Series A",
        location: "TP. Hồ Chí Minh", pitch: "B2B payment automation that cuts reconciliation time by 90% for mid-size enterprises across SEA. $1.74M ARR with 118% NRR.",
        score: 97, target: "$2M", raised: "$1.35M", pct: 68, investors: 12, logoColor: "#1A3A5C",
    },
    {
        id: "s3", name: "MediConnect", founder: "BS. Lê Hoàng", industry: "Healthtech", stage: "Seed",
        location: "Đà Nẵng", pitch: "Telemedicine platform connecting rural Vietnamese patients with certified urban specialists across 45 satellite clinics.",
        score: 91, target: "$800k", raised: "$360k", pct: 45, investors: 7, logoColor: "#7B2D8B",
    },
    {
        id: "s7", name: "LogiSmart Green", founder: "Đặng Quốc Khánh", industry: "Logistics", stage: "Seed",
        location: "TP. Hồ Chí Minh", pitch: "AI route & backhaul matching platform for commercial trucking and cold-chain logistics. 1,400+ trucks connected.",
        score: 92, target: "$900k", raised: "$450k", pct: 50, investors: 6, logoColor: "#0F766E",
    },
    {
        id: "s9", name: "SolarGrid VN", founder: "Hoàng Gia Bảo", industry: "CleanTech", stage: "Series A",
        location: "Bình Dương", pitch: "Zero-capex rooftop solar & AI battery EMS helping industrial factories cut peak electricity tariffs by 28%.",
        score: 93, target: "$2.5M", raised: "$1.5M", pct: 60, investors: 9, logoColor: "#B45309",
    },
    {
        id: "s8", name: "CyberSafe Shield", founder: "Vũ Hoàng Nam", industry: "SaaS", stage: "Seed",
        location: "Hà Nội", pitch: "Autonomous AI SOC-as-a-Service for SEA Fintech & SMEs. 24/7 automated vulnerability isolation and Decree 13 compliance.",
        score: 90, target: "$600k", raised: "$240k", pct: 40, investors: 4, logoColor: "#3730A3",
    },
    {
        id: "s2", name: "EduPath AI", founder: "Phạm Anh Tuấn", industry: "Edtech", stage: "Pre-seed",
        location: "Hà Nội", pitch: "Personalized K-12 curriculum that adapts in real-time using AI. Piloting in 18 schools in Hanoi with 91% student engagement rate.",
        score: 88, target: "$250k", raised: "$110k", pct: 44, investors: 3, logoColor: "#C05621",
    },
    {
        id: "s6", name: "HealthScore", founder: "Bùi Minh Châu", industry: "Healthtech", stage: "Seed",
        location: "TP. Hồ Chí Minh", pitch: "Preventive diagnostics using smartphone camera and AI. Detects 14 biomarkers via a 90-second skin scan — no lab required.",
        score: 89, target: "$600k", raised: "$210k", pct: 35, investors: 5, logoColor: "#9B2335",
    },
    {
        id: "s12", name: "VoiceFlow Care", founder: "Trịnh Quang Huy", industry: "SaaS", stage: "Seed",
        location: "Hà Nội", pitch: "Vietnamese dialect-aware conversational AI agents for banking & aviation handling 1.2M customer calls/month.",
        score: 91, target: "$750k", raised: "$300k", pct: 40, investors: 6, logoColor: "#6D28D9",
    },
    {
        id: "s5", name: "FarmList", founder: "Võ Thanh Hải", industry: "Agritech", stage: "Pre-seed",
        location: "Cần Thơ", pitch: "Direct-to-consumer marketplace for Vietnamese farmers. Eliminates 4-layer middlemen. 850+ registered farmers in Mekong Delta.",
        score: 84, target: "$200k", raised: "$70k", pct: 35, investors: 2, logoColor: "#2D6A4F",
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
