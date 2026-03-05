"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import AIScoreBadge from "@/components/ui/AIScoreBadge";

type Role = "Mentor" | "Startup Founder" | "Investor";

interface ProfileData {
    name: string; role: Role; bio: string;
    expertise: string[]; score: number;
    sessions: number; connections: number;
    location: string; avatarSeed: string;
    projects?: { id: string; name: string; industry: string; stage: string }[];
    reviews?: { author: string; rating: number; comment: string }[];
    portfolio?: { firmName: string; focus: string[] }[];
}

// Mock DB — replace with API fetch by `id`
const PROFILES: Record<string, ProfileData> = {
    m1: {
        name: "Dr. An Nguyen", role: "Mentor", location: "Hà Nội",
        bio: "Ex-VP Product at VNPay. 12 years scaling B2B fintech products across Southeast Asia. Active advisor to 40+ startups in Vietnam and Singapore.",
        expertise: ["Product Strategy", "Fintech", "Growth", "B2B SaaS"],
        score: 97, sessions: 142, connections: 89, avatarSeed: "drannguyen",
        reviews: [
            { author: "AgriBot Vietnam", rating: 5, comment: "Exceptional guidance on our product roadmap. Helped us reduce time-to-market by 3 months." },
            { author: "PayEase", rating: 5, comment: "Deep fintech expertise. Transformed our pitch from good to investor-ready." },
            { author: "EduPath", rating: 5, comment: "Strategic thinker. Challenged our assumptions in the best possible way." },
        ],
    },
    m2: {
        name: "Mai Tran", role: "Mentor", location: "TP. Hồ Chí Minh",
        bio: "Growth marketing expert. Led 0-to-1M user acquisition campaigns for 3 edtech startups across Vietnam. Specializes in D2C and community-led growth.",
        expertise: ["Growth Marketing", "Edtech", "D2C", "Community"],
        score: 91, sessions: 88, connections: 64, avatarSeed: "maitran",
        reviews: [
            { author: "MediConnect", rating: 5, comment: "Changed how we think about user acquisition entirely." },
            { author: "FarmList", rating: 4, comment: "Practical, actionable advice with clear metrics to track." },
        ],
    },
    s1: {
        name: "Nguyen Minh", role: "Startup Founder", location: "Hà Nội",
        bio: "Building AI-driven agriculture tools for Vietnam. Previously worked 10 years in agricultural R&D at VAAS before founding AgriBot Vietnam.",
        expertise: ["Agritech", "AI/IoT", "Rural Markets", "Hardware"],
        score: 94, sessions: 12, connections: 47, avatarSeed: "nguyenminh",
        projects: [
            { id: "s1", name: "AgriBot Vietnam", industry: "Agritech", stage: "Seed" },
        ],
    },
    i1: {
        name: "Linh Pham (Mekong Capital)", role: "Investor", location: "TP. Hồ Chí Minh",
        bio: "Investment Director at Mekong Capital. Focuses on consumer-facing tech and fintech in Vietnam and Southeast Asia. Board member at 6 portfolio companies.",
        expertise: ["Fintech", "Consumer Tech", "Series A", "Board advisory"],
        score: 95, sessions: 0, connections: 133, avatarSeed: "linhpham",
        portfolio: [
            { firmName: "Mekong Capital", focus: ["Fintech", "Consumer", "Retail"] },
        ],
    },
};

const FALLBACK = PROFILES.m1;

const roleColors: Record<Role, string> = {
    "Mentor": "#3D6B35",
    "Startup Founder": "#1A3A5C",
    "Investor": "#7B2D8B",
};

const roleLabels: Record<Role, string> = {
    "Mentor": "Expert Mentor",
    "Startup Founder": "Startup Founder",
    "Investor": "Investor / VC",
};

/**
 * /profile/[id] — Public user profile
 * Shows founder, mentor, or investor data.
 * Sections: Hero → Bio → Stats → Expertise → Projects / Reviews / Portfolio → CTA
 */
export default function PublicProfile() {
    const { locale, id } = useParams() as { locale: Locale; id: string };
    const p = PROFILES[id] ?? FALLBACK;
    const isMentor = p.role === "Mentor";
    const isFounder = p.role === "Startup Founder";
    const isInvestor = p.role === "Investor";
    const backHref = `/${locale}/market/${isMentor ? "mentors" : isInvestor ? "investments" : "startups"}`;
    const backLabel = isMentor ? "Back to Mentors" : isInvestor ? "Back to Investors" : "Back to Startups";

    return (
        <div className="pt-[72px] min-h-screen bg-white">

            {/* ── HERO BANNER ─────────────────────────────────── */}
            <div className="bg-[#111111] border-b border-[#222]">
                <div className="max-w-[860px] mx-auto px-6 md:px-12 py-10">

                    <Link href={backHref} className="text-[12px] text-white/40 hover:text-white/80 transition-colors inline-flex items-center gap-1 mb-6">
                        ← {backLabel}
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://i.pravatar.cc/160?u=${p.avatarSeed}`}
                                alt={p.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-white/10"
                            />
                            <span
                                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#111111] flex items-center justify-center"
                                style={{ backgroundColor: roleColors[p.role] }}
                                title={p.role}
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h1 className="text-[28px] font-black text-white leading-tight">{p.name}</h1>
                                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
                                    style={{ backgroundColor: roleColors[p.role] }}>
                                    {roleLabels[p.role]}
                                </span>
                            </div>
                            <p className="text-[13px] text-white/50 mb-3">📍 {p.location}</p>
                            <p className="text-[14px] text-white/70 leading-relaxed max-w-[520px]">{p.bio}</p>

                            {/* Expertise chips */}
                            <div className="flex flex-wrap gap-1.5 mt-4">
                                {p.expertise.map(tag => (
                                    <span key={tag} className="text-[11px] font-semibold bg-white/10 text-white/80 px-2.5 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CONTENT ─────────────────────────────────────── */}
            <div className="max-w-[860px] mx-auto px-6 md:px-12 py-10">

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-px bg-[#EAEAEA] border border-[#EAEAEA] rounded-[10px] overflow-hidden mb-10">
                    {[
                        { label: "AI Score", value: p.score, accent: true },
                        { label: isMentor ? "Sessions" : isInvestor ? "Connections" : "Meetings", value: isMentor ? p.sessions : p.connections, accent: false },
                        { label: isMentor ? "Reviews" : isFounder ? "Projects" : "Portfolio", value: (p.reviews?.length ?? p.projects?.length ?? p.portfolio?.length ?? 0), accent: false },
                    ].map(stat => (
                        <div key={stat.label} className="bg-white text-center py-6 px-4">
                            <div className={`text-[36px] font-black leading-none mb-1 ${stat.accent ? "text-[#F4B400]" : "text-[#111111]"}`}>
                                {stat.value}
                            </div>
                            <div className="text-[12px] font-semibold text-[#888888] uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* AI Score section */}
                <div className="border border-[#EAEAEA] rounded-[10px] p-6 mb-8 flex items-center gap-6">
                    <div className="shrink-0">
                        <AIScoreBadge score={p.score} />
                    </div>
                    <div className="flex-1">
                        <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#F4B400] rounded-full transition-all" style={{ width: `${p.score}%` }} />
                        </div>
                    </div>
                    <span className="text-[24px] font-black text-[#F4B400] shrink-0">{p.score}<span className="text-[14px] text-[#AAAAAA] font-normal">/100</span></span>
                </div>

                {/* Activity: Projects (Founders) */}
                {p.projects && p.projects.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {p.projects.map(proj => (
                                <Link key={proj.id} href={`/${locale}/project/${proj.id}`}
                                    className="border border-[#EAEAEA] rounded-[10px] p-5 hover:border-[#111111] hover:shadow-md transition-all flex flex-col gap-2">
                                    <h3 className="text-[16px] font-bold text-[#111111]">{proj.name}</h3>
                                    <div className="flex gap-2">
                                        <span className="text-[11px] font-semibold bg-[#F5F5F5] text-[#555555] px-2.5 py-1 rounded-full">{proj.industry}</span>
                                        <span className="text-[11px] font-semibold bg-[#F5F5F5] text-[#555555] px-2.5 py-1 rounded-full">{proj.stage}</span>
                                    </div>
                                    <span className="text-[13px] text-[#F4B400] font-semibold mt-1">View project →</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews (Mentors) */}
                {p.reviews && p.reviews.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">Session Reviews</h2>
                        <div className="flex flex-col gap-4">
                            {p.reviews.map(r => (
                                <div key={r.author} className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[14px] font-bold text-[#111111]">{r.author}</span>
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: r.rating }).map((_, i) => (
                                                <span key={i} className="text-[#F4B400] text-[14px]">★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[13px] text-[#555555] italic">&ldquo;{r.comment}&rdquo;</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Portfolio (Investors) */}
                {p.portfolio && p.portfolio.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">Portfolio & Focus</h2>
                        <div className="flex flex-col gap-4">
                            {p.portfolio.map(firm => (
                                <div key={firm.firmName} className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[16px] font-bold text-[#111111] mb-3">{firm.firmName}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {firm.focus.map(f => (
                                            <span key={f} className="text-[11px] font-semibold bg-[#FFFBF0] border border-[#F4B400] text-[#B88A00] px-2.5 py-1 rounded-full">{f}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <div className="border border-[#EAEAEA] rounded-[10px] p-6 text-center">
                    <p className="text-[16px] font-bold text-[#111111] mb-1">
                        {isMentor ? `Book a session with ${p.name.split(" ")[0]}` : `Connect with ${p.name.split(" ")[0]}`}
                    </p>
                    <p className="text-[13px] text-[#888888] mb-5">
                        {isMentor ? "Get expert guidance tailored to your startup stage." : "Reach out through the StartupKit network."}
                    </p>
                    <button className="bg-[#111111] text-white px-8 py-3 rounded-[8px] text-[14px] font-bold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                        {isMentor ? "Book Session →" : "Send Request →"}
                    </button>
                </div>

            </div>
        </div>
    );
}
