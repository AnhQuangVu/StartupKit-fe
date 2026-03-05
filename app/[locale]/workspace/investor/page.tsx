"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import AIScoreBadge from "@/components/ui/AIScoreBadge";
import { useAuth } from "@/lib/auth-context";

const STATS = [
    { label: "AI Recommendations", value: "12", accent: true, sub: "Updated today" },
    { label: "Saved Startups", value: "8", accent: false, sub: "3 new since last visit" },
    { label: "Intro Requests", value: "4", accent: false, sub: "2 pending review" },
    { label: "Portfolio Size", value: "48", accent: false, sub: "Active companies" },
];

const RECOMMENDED = [
    { id: "s4", name: "PayEase", industry: "Fintech", stage: "Series A", score: 97, reason: "Matches your fintech focus and $500k+ ticket", seed: "payease" },
    { id: "s1", name: "AgriBot", industry: "Agritech", stage: "Seed", score: 94, reason: "Strong traction, aligned with rural SEA thesis", seed: "agribot" },
    { id: "s6", name: "HealthScore", industry: "Healthtech", stage: "Seed", score: 89, reason: "AI-first diagnostic in underserved market", seed: "healthscore" },
];

const RECENT_DEALS = [
    { name: "MediConnect", stage: "Seed", action: "Viewed pitch", time: "3h ago", status: "Watchlist" },
    { name: "EduPath", stage: "Pre-seed", action: "Requested intro", time: "1d ago", status: "In progress" },
];

export default function InvestorWorkspace() {
    const { user } = useAuth();

    return (
        <WorkspaceLayout title="Investor Dashboard" subtitle={`Welcome back, ${user?.name?.split(" ")[0]} 👋`}>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map(s => (
                    <div key={s.label} className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <div className={`text-[30px] font-black leading-none mb-1 ${s.accent ? "text-[#F4B400]" : "text-[#111111]"}`}>{s.value}</div>
                        <div className="text-[12px] font-bold text-[#111111] mb-0.5">{s.label}</div>
                        <div className="text-[11px] text-[#888888]">{s.sub}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

                {/* AI Recommended startups */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[14px] font-bold text-[#111111]">AI Recommended for You</h2>
                        <span className="text-[11px] text-[#F4B400] font-semibold">Updated daily</span>
                    </div>
                    <div className="flex flex-col divide-y divide-[#F5F5F5]">
                        {RECOMMENDED.map(r => (
                            <div key={r.id} className="py-4 flex items-start gap-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`https://picsum.photos/seed/${r.seed}/48/48`} alt={r.name}
                                    className="w-10 h-10 rounded-[6px] object-cover border border-[#EAEAEA] shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-[14px] font-bold text-[#111111]">{r.name}</p>
                                        <span className="text-[10px] font-bold bg-[#F5F5F5] text-[#555555] px-2 py-0.5 rounded-full">{r.stage}</span>
                                    </div>
                                    <p className="text-[11px] text-[#888888] mb-1">{r.industry}</p>
                                    <p className="text-[12px] text-[#555555] italic">{r.reason}</p>
                                </div>
                                <AIScoreBadge score={r.score} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Recent activity + portfolio summary */}
                <div className="flex flex-col gap-5">
                    <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <h3 className="text-[13px] font-bold text-[#111111] mb-4">Recent Deal Activity</h3>
                        <div className="flex flex-col gap-3">
                            {RECENT_DEALS.map(d => (
                                <div key={d.name} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[13px] font-semibold text-[#111111]">{d.name}</p>
                                        <p className="text-[11px] text-[#888888]">{d.action} · {d.time}</p>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.status === "In progress" ? "bg-blue-50 text-blue-600" : "bg-[#F5F5F5] text-[#888888]"
                                        }`}>{d.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Portfolio card */}
                    <div className="bg-[#111111] rounded-[10px] p-5">
                        <p className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-2">Portfolio Overview</p>
                        <p className="text-[36px] font-black text-[#F4B400] leading-none">48</p>
                        <p className="text-[12px] text-white/60 mt-1 mb-4">Portfolio companies</p>
                        {[{ label: "Fintech", pct: 40 }, { label: "Healthtech", pct: 25 }, { label: "Agritech", pct: 20 }, { label: "Other", pct: 15 }].map(f => (
                            <div key={f.label} className="mb-2">
                                <div className="flex justify-between text-[11px] text-white/60 mb-1">
                                    <span>{f.label}</span><span>{f.pct}%</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full"><div className="h-full bg-[#F4B400] rounded-full" style={{ width: `${f.pct}%` }} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
