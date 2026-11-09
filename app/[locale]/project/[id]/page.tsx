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
        name: "AgriBot Vietnam", founder: "Nguyễn Văn Minh", industry: "Agritech", stage: "Seed",
        score: 94, location: "Hà Nội", teamSize: "12 people", coverSeed: "agribot", logoColor: "#3D6B35",
        tagline: "AI-driven crop monitoring for Vietnam's 10M rice farmers.",
        description: "AgriBot Vietnam combines solar IoT sensors with a mobile-first AI platform to give smallholder rice farmers real-time crop health monitoring, pest alerts, and harvest timing recommendations.",
        vision: "A Vietnam where every farmer has access to the same technology advantages as large agribusiness.",
        problem: "10M+ Vietnamese rice farmers rely on manual observation methods leading to 30% average annual crop loss. Access to agronomic expertise is limited and expensive.",
        solution: "Low-cost IoT sensor nodes + AI mobile app that delivers real-time field monitoring, automated pest detection, and optimal harvest timing — in Vietnamese.",
        market: "Vietnam's $12B agritech market growing at 18% annually. SEA addressable market exceeds $60B. Government digitization initiative supports adoption.",
        traction: "3,450 farmers & 18 cooperatives active in Mekong Delta. $28.5k MRR (+22% MoM). 87% annual retention rate.",
        team: [
            { name: "Nguyễn Văn Minh", role: "CEO / Founder", bg: "10 years agricultural R&D, HUST graduate", avatarSeed: "nguyenminh" },
            { name: "Lê Thị Nga", role: "CTO", bg: "AI/ML engineer, prev. FPT Software", avatarSeed: "lethingas" },
            { name: "Phạm Đức", role: "COO", bg: "Supply chain ops, 8 years agritech", avatarSeed: "phamduc" },
        ],
        reviews: [
            { mentor: "Dr. An Nguyen", score: 96, comment: "Strong product-market fit. Team understands the rural last-mile challenge deeply. Go-to-market strategy is realistic.", seed: "drannguyen" },
            { mentor: "Hung Le", score: 92, comment: "Clear monetization path. Unit economics are solid for the agritech segment. Consider expansion into Thailand Year 2.", seed: "hungle" },
        ],
    },
    s4: {
        name: "PayEase", founder: "Trần Thị Lan", industry: "Fintech", stage: "Series A",
        score: 97, location: "TP. Hồ Chí Minh", teamSize: "32 people", coverSeed: "payease", logoColor: "#1A3A5C",
        tagline: "B2B payment automation that cuts reconciliation time 90%.",
        description: "PayEase automates the full B2B payment lifecycle for mid-size enterprises — invoice generation, multi-bank reconciliation, and audit reporting in a single dashboard.",
        vision: "Eliminate manual finance operations from every Vietnamese business by 2028.",
        problem: "Mid-size Vietnamese enterprises spend 60+ hours/month on bank reconciliation. Error rates average 2.3%. Legacy systems cannot integrate across multiple banking partners.",
        solution: "API-first payment orchestration layer that connects directly to 22 Vietnamese banks, auto-reconciles transactions, and generates compliant audit trails in real-time.",
        market: "$4.2B B2B payment automation market in Vietnam. 180,000+ eligible enterprises. Currently <2% penetration.",
        traction: "210 enterprise clients. $1.74M ARR ($145k MRR). 118% net revenue retention. Partnerships with Vietcombank and Techcombank.",
        team: [
            { name: "Trần Thị Lan", role: "CEO / Co-founder", bg: "Ex-VP Finance at MoMo, 15 years fintech", avatarSeed: "phamlan" },
            { name: "Trần Khoa", role: "CTO / Co-founder", bg: "Staff engineer at Grab Financial Group", avatarSeed: "trankhoa" },
            { name: "Nguyễn Thu", role: "VP Sales", bg: "Enterprise sales, SAP & Oracle background", avatarSeed: "nguyenthu" },
        ],
        reviews: [
            { mentor: "Hung Le", score: 98, comment: "Best unit economics I've seen in Vietnamese fintech. NRR of 118% proves deep product stickiness.", seed: "hungle" },
            { mentor: "Mai Tran", score: 94, comment: "Go-to-market motion is efficient. Sales cycle is surprisingly short for enterprise B2B.", seed: "maitran" },
        ],
    },
    s3: {
        name: "MediConnect", founder: "BS. Lê Hoàng", industry: "Healthtech", stage: "Seed",
        score: 91, location: "Đà Nẵng", teamSize: "16 people", coverSeed: "mediconnect", logoColor: "#7B2D8B",
        tagline: "Connecting rural Vietnamese patients with urban specialists in real-time.",
        description: "MediConnect combines a telemedicine app with 45 provincial satellite diagnostic clinics so patients in tier-2/3 cities can consult top specialists in Hanoi & HCMC.",
        vision: "Quality specialist healthcare accessible within 15 minutes for every Vietnamese family.",
        problem: "Provincial patients travel 200+ km and wait 5 hours at central hospitals for specialist consultations and chronic disease follow-ups.",
        solution: "Hybrid telemedicine + local lab network with AI clinical triage and electronic health records.",
        market: "$6.5B Vietnam digital health & chronic care market growing 24% CAGR.",
        traction: "14,500 active patients, 450 certified doctors, $42k MRR (+26% MoM).",
        team: [
            { name: "BS. Lê Hoàng", role: "CEO / Founder", bg: "12 years Cardiology & Hospital Management", avatarSeed: "lehoang" },
            { name: "Linh Phạm", role: "CTO", bg: "Health AI & WebRTC architect", avatarSeed: "linhpham" },
        ],
        reviews: [
            { mentor: "Linh Pham", score: 93, comment: "Satellite clinic model solves the diagnostic trust gap in provincial Vietnam.", seed: "woman2mentor" },
        ],
    },
    s2: {
        name: "EduPath AI", founder: "Phạm Anh Tuấn", industry: "Edtech", stage: "Pre-seed",
        score: 88, location: "Hà Nội", teamSize: "9 people", coverSeed: "edupath", logoColor: "#C05621",
        tagline: "Personalized K-12 curriculum adapting in real-time using AI.",
        description: "EduPath AI provides an adaptive Socratic tutor aligned with Vietnam's MOET curriculum, helping K-12 students master Math, Physics, and English.",
        vision: "A personal 1-on-1 AI tutor for all 18 million Vietnamese K-12 students.",
        problem: "One-size-fits-all classrooms of 45 students leave knowledge gaps unaddressed while teachers are overloaded with grading.",
        solution: "Real-time knowledge graph diagnostic + AI Socratic tutoring platform licensed to schools and parents.",
        market: "$3.5B Vietnam K-12 Edtech market.",
        traction: "Piloting in 18 Hanoi schools with 9,800 active students, 91% weekly engagement, $16.4k MRR.",
        team: [
            { name: "Phạm Anh Tuấn", role: "CEO / Founder", bg: "Ex-Edtech Product Lead, 8 years education", avatarSeed: "tuan" },
            { name: "Hoàng Minh", role: "AI Lead", bg: "NLP & Adaptive Learning researcher", avatarSeed: "hoangminh" },
        ],
        reviews: [
            { mentor: "Mai Tran", score: 91, comment: "91% weekly retention across 18 schools shows exceptional classroom integration.", seed: "woman1mentor" },
        ],
    },
    s7: {
        name: "LogiSmart Green", founder: "Đặng Quốc Khánh", industry: "Logistics", stage: "Seed",
        score: 92, location: "TP. Hồ Chí Minh", teamSize: "21 people", coverSeed: "logismart", logoColor: "#0F766E",
        tagline: "AI cold-chain & backhaul optimization cutting empty truck miles by 42%.",
        description: "LogiSmart Green matches empty return trucks with B2B cargo and monitors cold-chain temperature in real time across the North-South corridor.",
        vision: "Zero empty truck miles and carbon-transparent supply chains across Southeast Asia.",
        problem: "40%+ of commercial trucks in Vietnam return empty, driving logistics costs to 16.8% of GDP.",
        solution: "AI route & backhaul matching engine + IoT cold-chain telemetry for enterprise shippers.",
        market: "$45B Vietnam logistics market ($4.8B serviceable digital freight).",
        traction: "1,400 connected trucks, 85 enterprise shippers, $68k MRR (+24% MoM).",
        team: [
            { name: "Đặng Quốc Khánh", role: "CEO", bg: "11 years Supply Chain Director @ FMCG", avatarSeed: "khanh" },
            { name: "Vũ Tùng", role: "CTO", bg: "Operations Research & Rust engineer", avatarSeed: "vutung" },
        ],
        reviews: [
            { mentor: "Son Tran", score: 94, comment: "Solves an immediate pain point for cold-chain seafood and fruit exporters.", seed: "man6mentor" },
        ],
    },
    s8: {
        name: "CyberSafe Shield", founder: "Vũ Hoàng Nam", industry: "SaaS", stage: "Seed",
        score: 90, location: "Hà Nội", teamSize: "10 people", coverSeed: "cybersafe", logoColor: "#3730A3",
        tagline: "Autonomous AI SOC-as-a-Service for SEA Fintech & SMEs.",
        description: "Automated 24/7 threat detection, zero-day isolation in 15 seconds, and one-click Decree 13 & ISO 27001 compliance.",
        vision: "Enterprise-grade cybersecurity accessible to every digital business in Southeast Asia.",
        problem: "SMEs and Fintechs face a 300% surge in cyberattacks but cannot afford a $250k/year in-house 24/7 SOC team.",
        solution: "Lightweight eBPF cloud agent + AI Threat Intelligence automating 95% of Tier-1/2 SOC workflows.",
        market: "$5.4B SEA Cybersecurity market.",
        traction: "42 paying B2B clients, $19.2k MRR, 0% churn since launch.",
        team: [
            { name: "Vũ Hoàng Nam", role: "CEO", bg: " Offensive Security Lead, 9 years InfoSec", avatarSeed: "namvu" },
        ],
        reviews: [
            { mentor: "Khanh Dang", score: 92, comment: "Zero-config eBPF deployment and built-in Decree 13 compliance is a huge wedge.", seed: "man5mentor" },
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
