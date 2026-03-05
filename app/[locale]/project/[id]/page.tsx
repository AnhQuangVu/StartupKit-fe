"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import AIScoreBadge from "@/components/ui/AIScoreBadge";

// Mock DB — replace with API call by `id`
const PROJECTS: Record<string, {
    name: string; founder: string; industry: string; stage: string;
    score: number; location: string; teamSize: string; coverSeed: string; logoColor: string;
    tagline: string; description: string; vision: string;
    problem: string; solution: string; market: string; traction: string;
    team: { name: string; role: string; bg: string; avatarSeed: string }[];
    reviews: { mentor: string; score: number; comment: string; seed: string }[];
}> = {
    s1: {
        name: "AgriBot Vietnam", founder: "Nguyen Minh", industry: "Agritech", stage: "Seed",
        score: 94, location: "Hà Nội", teamSize: "8 people", coverSeed: "agribot", logoColor: "#3D6B35",
        tagline: "AI-driven crop monitoring for Vietnam's 10M rice farmers.",
        description: "AgriBot Vietnam combines IoT sensors with a mobile-first AI platform to give smallholder rice farmers real-time crop health monitoring, pest alerts, and harvest timing recommendations.",
        vision: "A Vietnam where every farmer has access to the same technology advantages as large agribusiness.",
        problem: "10M+ Vietnamese rice farmers rely on manual observation methods leading to 30% average annual crop loss. Access to agronomic expertise is limited and expensive.",
        solution: "Low-cost IoT sensor nodes + AI mobile app that delivers real-time field monitoring, automated pest detection, and optimal harvest timing — in Vietnamese.",
        market: "Vietnam's $12B agritech market growing at 18% annually. SEA addressable market exceeds $60B. Government digitization initiative supports adoption.",
        traction: "Pilot in Mekong Delta with 230 farmers. 87% retention rate. 3 provincial governments in evaluation stage. 2 distribution MOU signed with co-ops.",
        team: [
            { name: "Nguyen Minh", role: "CEO / Founder", bg: "10 years agricultural R&D, HUST graduate", avatarSeed: "nguyenminh" },
            { name: "Le Thi Nga", role: "CTO", bg: "AI/ML engineer, prev. FPT Software", avatarSeed: "lethingas" },
            { name: "Pham Duc", role: "COO", bg: "Supply chain ops, 8 years agritech", avatarSeed: "phamduc" },
        ],
        reviews: [
            { mentor: "Dr. An Nguyen", score: 96, comment: "Strong product-market fit. Team understands the rural last-mile challenge deeply. Go-to-market strategy is realistic.", seed: "drannguyen" },
            { mentor: "Hung Le", score: 92, comment: "Clear monetization path. Unit economics are solid for the agritech segment. Consider expansion into Thailand Year 2.", seed: "hungle" },
        ],
    },
    s4: {
        name: "PayEase", founder: "Pham Lan", industry: "Fintech", stage: "Series A",
        score: 97, location: "TP. Hồ Chí Minh", teamSize: "32 people", coverSeed: "payease", logoColor: "#1A3A5C",
        tagline: "B2B payment automation that cuts reconciliation time 90%.",
        description: "PayEase automates the full B2B payment lifecycle for mid-size enterprises — invoice generation, multi-bank reconciliation, and audit reporting in a single dashboard.",
        vision: "Eliminate manual finance operations from every Vietnamese business by 2028.",
        problem: "Mid-size Vietnamese enterprises spend 40+ hours/month on bank reconciliation. Error rates average 2.3%. Legacy systems cannot integrate across multiple banking partners.",
        solution: "API-first payment orchestration layer that connects directly to 18 Vietnamese banks, auto-reconciles transactions, and generates compliant audit trails in real-time.",
        market: "$4.2B B2B payment automation market in Vietnam. 180,000+ eligible enterprises. Currently <2% penetration.",
        traction: "142 enterprise clients. $8.2M ARR. 94% net revenue retention. Partnerships with Vietcombank and Techcombank.",
        team: [
            { name: "Pham Lan", role: "CEO / Co-founder", bg: "Ex-CFO at Momo, 15 years fintech", avatarSeed: "phamlan" },
            { name: "Tran Khoa", role: "CTO / Co-founder", bg: "Staff engineer at Grab Financial Group", avatarSeed: "trankhoa" },
            { name: "Nguyen Thu", role: "VP Sales", bg: "Enterprise sales, SAP & Oracle background", avatarSeed: "nguyenthu" },
        ],
        reviews: [
            { mentor: "Hung Le", score: 98, comment: "Best unit economics I've seen in Vietnamese fintech. NRR of 94% proves deep product stickiness.", seed: "hungle" },
            { mentor: "Mai Tran", score: 94, comment: "Go-to-market motion is efficient. Sales cycle is surprisingly short for enterprise B2B.", seed: "maitran" },
        ],
    },
};

const FALLBACK = PROJECTS.s1;

/**
 * /project/[id] — Startup Pitch Profile
 * NOT a crowdfunding campaign. Shows ecosystem data, team, and credibility.
 * Sections: Hero → Overview → Team → Market & Traction → Mentor Reviews → CTA
 */
export default function ProjectDetail() {
    const { locale, id } = useParams() as { locale: Locale; id: string };
    const p = PROJECTS[id] ?? FALLBACK;
    const initials = p.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

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
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {/* Hero content */}
                <div className="absolute bottom-0 left-0 right-0 max-w-[960px] mx-auto px-6 md:px-12 pb-8">
                    <div className="flex items-end gap-4">
                        {/* Logo */}
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

                {/* Back */}
                <Link href={`/${locale}/market/startups`}
                    className="text-[13px] text-[#888888] hover:text-[#111111] transition-colors mb-8 inline-flex items-center gap-1">
                    ← Browse Startups
                </Link>

                {/* Tagline + AI Score + CTA row */}
                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10 mt-4 border border-[#EAEAEA] rounded-[10px] p-6">
                    <div className="flex-1">
                        <p className="text-[18px] font-semibold text-[#111111] leading-snug mb-3">{p.tagline}</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <AIScoreBadge score={p.score} />
                            <span className="text-[12px] text-[#888888]">by {p.founder}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                        <button className="bg-[#111111] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors whitespace-nowrap">
                            Connect with Startup →
                        </button>
                        <button className="border border-[#EAEAEA] text-[#111111] px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:border-[#111111] transition-colors whitespace-nowrap">
                            Request Intro
                        </button>
                    </div>
                </div>

                {/* Two-column layout: main + sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

                    {/* ── Main content ── */}
                    <div className="space-y-10">

                        {/* Overview */}
                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-3">Overview</h2>
                            <p className="text-[15px] text-[#444444] leading-relaxed mb-4">{p.description}</p>
                            <div className="bg-[#FFFBF0] border border-[#F4B400]/30 rounded-[8px] p-4">
                                <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-1">Vision</p>
                                <p className="text-[14px] text-[#444444] italic">{p.vision}</p>
                            </div>
                        </section>

                        {/* Problem / Solution */}
                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">Problem & Solution</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">Problem</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.problem}</p>
                                </div>
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5 bg-[#F9F9F9]">
                                    <p className="text-[11px] font-bold text-[#111111] uppercase tracking-wide mb-2">Solution</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.solution}</p>
                                </div>
                            </div>
                        </section>

                        {/* Market + Traction */}
                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">Market & Traction</h2>
                            <div className="space-y-4">
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">Target Market</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.market}</p>
                                </div>
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">Traction</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.traction}</p>
                                </div>
                            </div>
                        </section>

                        {/* Team */}
                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">Team</h2>
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

                        {/* Mentor Reviews */}
                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">Mentor Evaluations</h2>
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

                    {/* ── Sidebar ── */}
                    <aside className="space-y-5">

                        {/* Credibility card */}
                        <div className="border border-[#EAEAEA] rounded-[10px] p-5">
                            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-3">AI Credibility Score</p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-[48px] font-black text-[#F4B400] leading-none">{p.score}</span>
                                <span className="text-[16px] text-[#AAAAAA]">/ 100</span>
                            </div>
                            <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-[#F4B400] rounded-full" style={{ width: `${p.score}%` }} />
                            </div>
                            <p className="text-[12px] text-[#888888]">Evaluated by {p.reviews.length} mentor{p.reviews.length !== 1 ? "s" : ""}</p>
                        </div>

                        {/* Quick facts */}
                        <div className="border border-[#EAEAEA] rounded-[10px] p-5 space-y-3">
                            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Quick Facts</p>
                            {[
                                { label: "Industry", value: p.industry },
                                { label: "Stage", value: p.stage },
                                { label: "Location", value: p.location },
                                { label: "Team Size", value: p.teamSize },
                                { label: "Founder", value: p.founder },
                            ].map(f => (
                                <div key={f.label} className="flex justify-between items-center text-[13px] border-t border-[#F5F5F5] pt-2">
                                    <span className="text-[#888888] font-medium">{f.label}</span>
                                    <span className="font-semibold text-[#111111]">{f.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA card */}
                        <div className="bg-[#111111] rounded-[10px] p-5">
                            <p className="text-[13px] font-bold text-white mb-1">Interested in this startup?</p>
                            <p className="text-[12px] text-white/60 mb-4">Connect directly or request an introduction through our network.</p>
                            <button className="w-full bg-[#F4B400] text-[#111111] px-4 py-2.5 rounded-[8px] text-[13px] font-bold hover:bg-white transition-colors">
                                Connect now →
                            </button>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}
