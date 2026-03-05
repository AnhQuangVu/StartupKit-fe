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
    const deal = {
        name: "AgriBot Vietnam",
        founder: "Nguyen Minh",
        industry: "Agritech",
        stage: "Seed",
        location: "Hà Nội, Vietnam",
        seeking: "$500k",
        raised: "$120k",
        pct: 24,
        investors: 3,
        minTicket: "$10k",
        score: 94,
        logoColor: "#3D6B35",
        problem: "Vietnamese rice farmers lack access to modern crop monitoring tools. 10M+ farmers rely on manual methods leading to 30% crop loss annually.",
        solution: "AI-driven IoT sensors + mobile app providing real-time crop health monitoring and optimal harvest timing recommendations.",
        market: "Vietnam has 10M rice farmers and a $12B agritech market growing at 18% year-over-year across SEA.",
        traction: "Pilot with 230 Mekong Delta farmers. 87% retention. 3 provincial governments in evaluation for scale.",
        use_of_funds: "40% R&D · 35% Sales & Distribution · 15% Operations · 10% Legal & Compliance",
        team: [
            { name: "Nguyen Minh", role: "CEO / Founder", bg: "10 years agricultural R&D, prev. VAAS" },
            { name: "Le Thi Nga", role: "CTO", bg: "AI/ML engineer, prev. FPT Software" },
            { name: "Tran Duc", role: "CFO", bg: "Southeast Asia financial modeling, prev. Mekong Capital" },
        ],
        highlights: ["230 farms piloting", "$12B Vietnam agritech market", "87% 30-day retention", "3 gov evaluations"],
    };

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
