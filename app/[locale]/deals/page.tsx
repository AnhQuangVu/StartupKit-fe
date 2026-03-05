"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    logo?: string;         // URL — if absent, show fallback initials
    logoColor: string;     // fallback background color
}

const DEALS: Deal[] = [
    {
        id: "s1", name: "AgriBot Vietnam", founder: "Nguyen Minh", industry: "Agritech", stage: "Seed",
        location: "Hà Nội", pitch: "AI-driven crop monitoring for Vietnam's 10M rice farmers. Reduces crop loss by 30% via IoT sensors and real-time mobile recommendations.",
        score: 94, target: "$500k", raised: "$120k", pct: 24, investors: 3, logoColor: "#3D6B35",
    },
    {
        id: "s4", name: "PayEase", founder: "Pham Lan", industry: "Fintech", stage: "Series A",
        location: "TP. Hồ Chí Minh", pitch: "B2B payment automation that cuts reconciliation time by 90% for mid-size enterprises across SEA.",
        score: 97, target: "$2M", raised: "$800k", pct: 40, investors: 12, logoColor: "#1A3A5C",
    },
    {
        id: "s3", name: "MediConnect", founder: "Le Hoang", industry: "Healthtech", stage: "Seed",
        location: "Đà Nẵng", pitch: "Telemedicine platform connecting rural Vietnamese patients with certified urban specialists. 230+ active consultations/month.",
        score: 91, target: "$800k", raised: "$200k", pct: 25, investors: 7, logoColor: "#7B2D8B",
    },
    {
        id: "s2", name: "EduPath", founder: "Tran Thu", industry: "Edtech", stage: "Pre-seed",
        location: "Hà Nội", pitch: "Personalized K-12 curriculum that adapts in real-time using AI. Piloting in 14 schools in Hanoi with 91% student engagement rate.",
        score: 86, target: "$200k", raised: "$50k", pct: 25, investors: 2, logoColor: "#C05621",
    },
    {
        id: "s5", name: "FarmList", founder: "Vo Nam", industry: "Agritech", stage: "Pre-seed",
        location: "Cần Thơ", pitch: "Direct-to-consumer marketplace for Vietnamese farmers. Eliminates 4-layer middlemen. 850+ registered farmers in Mekong Delta.",
        score: 82, target: "$150k", raised: "$30k", pct: 20, investors: 1, logoColor: "#2D6A4F",
    },
    {
        id: "s6", name: "HealthScore", founder: "Bui Mai", industry: "Healthtech", stage: "Seed",
        location: "TP. Hồ Chí Minh", pitch: "Preventive diagnostics using smartphone camera and AI. Detects 14 biomarkers via a 90-second skin scan — no lab required.",
        score: 89, target: "$600k", raised: "$180k", pct: 30, investors: 5, logoColor: "#9B2335",
    },
];

/**
 * StartupLogo — shows logo image if provided, otherwise colored initials fallback.
 */
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

    const INDUSTRIES = [isVi ? "Tất cả ngành" : "All Industries", "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS", "E-commerce", "Logistics"];
    const STAGES = [isVi ? "Tất cả giai đoạn" : "All Stages", "Pre-seed", "Seed", "Series A", "Series B+"];
    const LOCATIONS = [isVi ? "Tất cả khu vực" : "All Locations", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", isVi ? "Remote / Toàn cầu" : "Remote / Global"];
    const FUNDING = [isVi ? "Mọi quy mô" : "Any Size", "< $100k", "$100k – $500k", "$500k – $2M", "> $2M"];
    const SORT = [isVi ? "Gọi vốn nhiều nhất" : "Most Funded", isVi ? "AI Score cao nhất" : "Highest AI Score", isVi ? "Mới nhất" : "Newest", isVi ? "Sắp kết thúc" : "Ending Soon"];
    const ui = {
        activeDeals: isVi ? "deal đang hoạt động" : "active deals",
        investorsActive: isVi ? "30 nhà đầu tư hoạt động tuần này" : "30 investors active this week",
        filterIndustry: isVi ? "Ngành" : "Industry",
        filterStage: isVi ? "Giai đoạn" : "Stage",
        filterLocation: isVi ? "Địa điểm" : "Location",
        filterFunding: isVi ? "Quy mô gọi vốn" : "Funding Size",
        filterSort: isVi ? "Sắp xếp" : "Sort by",
        byFounder: isVi ? "bởi" : "by",
        raisedOf: isVi ? "đã gọi trên" : "raised of",
        committed: isVi ? "nhà đầu tư đã cam kết" : "investors committed",
        aiScore: isVi ? "Điểm AI" : "AI Score",
        viewDeal: isVi ? "Xem deal" : "View Deal",
        loadMore: isVi ? "Tải thêm deal" : "Load more deals",
    };

    return (
        <div className="pt-[80px] min-h-screen bg-white">

            {/* ── Page Header ─────────────────────────────────────── */}
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
                    {/* Live counter */}
                    <div className="flex items-center gap-6 mt-6">
                        <span className="flex items-center gap-2 text-[13px] text-[#555555]">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                            {DEALS.length} {ui.activeDeals}
                        </span>
                        <span className="text-[13px] text-[#555555]">{ui.investorsActive}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">

                {/* ── Filter Bar ──────────────────────────────────────── */}
                <div className="flex flex-col gap-3 mb-10">
                    {/* Search */}
                    <input
                        type="text"
                        id="deal-search"
                        placeholder={dict.deals?.searchPlaceholder ?? "Search startups, founders, or industries…"}
                        className="w-full border border-[#EAEAEA] rounded-[8px] px-4 py-3 text-[14px] outline-none focus:border-[#111111] transition-colors bg-white"
                    />
                    {/* Filter dropdowns */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: ui.filterIndustry, options: INDUSTRIES },
                            { label: ui.filterStage, options: STAGES },
                            { label: ui.filterLocation, options: LOCATIONS },
                            { label: ui.filterFunding, options: FUNDING },
                            { label: ui.filterSort, options: SORT },
                        ].map(f => (
                            <select
                                key={f.label}
                                className="border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[13px] font-medium outline-none focus:border-[#111111] bg-white text-[#111111] cursor-pointer"
                            >
                                {f.options.map(o => <option key={o}>{o}</option>)}
                            </select>
                        ))}
                    </div>
                </div>

                {/* ── Deal Cards ──────────────────────────────────────── */}
                <div className="flex flex-col gap-5">
                    {DEALS.map((deal) => (
                        <article
                            key={deal.id}
                            className="border border-[#EAEAEA] rounded-[12px] p-6 hover:shadow-md hover:border-[#CCCCCC] transition-all group bg-white"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-5">

                                {/* Left — Logo + Meta */}
                                <div className="flex gap-4 flex-1">
                                    <StartupLogo name={deal.name} logo={deal.logo} color={deal.logoColor} />
                                    <div className="flex-1 min-w-0">
                                        {/* Name + Stage */}
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h2 className="text-[18px] font-bold text-[#111111]">{deal.name}</h2>
                                            <span className="text-[11px] font-bold bg-[#F0F0F0] text-[#555555] px-2 py-0.5 rounded-full">
                                                {deal.stage}
                                            </span>
                                        </div>
                                        {/* Industry · Location · Founder */}
                                        <p className="text-[13px] text-[#888888] mb-3">
                                            {deal.industry} &middot; {deal.location} &middot; {ui.byFounder} {deal.founder}
                                        </p>
                                        {/* Pitch */}
                                        <p className="text-[14px] text-[#444444] leading-relaxed line-clamp-2 mb-4">
                                            {deal.pitch}
                                        </p>

                                        {/* Funding Progress */}
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

                                {/* Right — Score + CTA */}
                                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 md:ml-4 shrink-0">
                                    {/* AI Score Badge */}
                                    <div className="flex flex-col items-center bg-[#FFFBF0] border border-[#F4B400] rounded-[8px] px-4 py-2 text-center">
                                        <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wide">{ui.aiScore}</span>
                                        <span className="text-[24px] font-black text-[#F4B400] leading-none">{deal.score}</span>
                                        <span className="text-[10px] text-[#888888]">/100</span>
                                    </div>
                                    {/* CTA */}
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

                {/* ── Load More ───────────────────────────────────────── */}
                <div className="flex justify-center mt-12">
                    <button className="border border-[#EAEAEA] px-8 py-3 rounded-[8px] text-[14px] font-semibold text-[#111111] hover:border-[#111111] transition-colors">
                        {ui.loadMore}
                    </button>
                </div>

            </div>
        </div>
    );
}
