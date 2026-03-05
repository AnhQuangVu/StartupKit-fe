"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import AIScoreBadge from "@/components/ui/AIScoreBadge";
import { useAuth } from "@/lib/auth-context";
import { useDictionary } from "@/lib/dict-context";

export default function StartupWorkspace() {
    const { user } = useAuth();
    const dict = useDictionary();

    const STATS = [
        { label: dict.card.aiScore, value: "94", accent: true, sub: "Top 6% of startups" },
        { label: dict.workspace.startup.profileComplete, value: "78%", accent: false, sub: "Add pitch deck to reach 90%" },
        { label: dict.workspace.startup.mentorsSub, value: "3", accent: false, sub: "2 pending replies" },
        { label: "Investor Views", value: "47", accent: false, sub: "This month" },
    ];

    const ACTIVITY = [
        { type: "mentor", text: "Dr. An Nguyen accepted your session request", time: "2h ago", color: "#3D6B35" },
        { type: "investor", text: "Mekong Capital viewed your pitch deck", time: "5h ago", color: "#1A3A5C" },
        { type: "profile", text: "Your AI credibility score increased from 91→94", time: "1d ago", color: "#F4B400" },
        { type: "mentor", text: "New mentor match: Hung Le (Fintech expert)", time: "2d ago", color: "#7B2D8B" },
        { type: "system", text: "StartupKit featured your profile in weekly digest", time: "3d ago", color: "#888888" },
    ];

    const MENTORS = [
        { name: "Dr. An Nguyen", expertise: "Product · Fintech", score: 97, seed: "drannguyen", status: "Confirmed · Mar 10" },
        { name: "Hung Le", expertise: "Finance · SaaS", score: 95, seed: "hungle", status: "Pending reply" },
    ];

    return (
        <WorkspaceLayout title={dict.workspace.startup.dashboard} subtitle={`${dict.workspace.startup.dashboardSub}, ${user?.name?.split(" ")[0]} 👋`}>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map(s => (
                    <div key={s.label} className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <div className={`text-[30px] font-black leading-none mb-1 ${s.accent ? "text-[#F4B400]" : "text-[#111111]"}`}>
                            {s.value}
                        </div>
                        <div className="text-[12px] font-bold text-[#111111] mb-0.5">{s.label}</div>
                        <div className="text-[11px] text-[#888888]">{s.sub}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

                {/* Activity feed */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6">
                    <h2 className="text-[14px] font-bold text-[#111111] mb-5">{dict.workspace.startup.recentActivity}</h2>
                    <div className="flex flex-col">
                        {ACTIVITY.map((a, i) => (
                            <div key={i} className="flex items-start gap-4 py-4 border-b border-[#F5F5F5] last:border-0">
                                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: a.color }} />
                                <div className="flex-1">
                                    <p className="text-[13px] text-[#333333] leading-snug">{a.text}</p>
                                    <p className="text-[11px] text-[#AAAAAA] mt-0.5">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-5">

                    {/* Profile completeness */}
                    <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-[13px] font-bold text-[#111111]">{dict.workspace.startup.profileComplete}</h3>
                            <span className="text-[13px] font-bold text-[#F4B400]">78%</span>
                        </div>
                        <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-[#F4B400] rounded-full" style={{ width: "78%" }} />
                        </div>
                        <div className="flex flex-col gap-2">
                            {[
                                { task: "Add pitch deck", done: false },
                                { task: "Upload team photos", done: false },
                                { task: "Set AI score public", done: true },
                                { task: "Connect bank account", done: true },
                            ].map(t => (
                                <div key={t.task} className="flex items-center gap-2 text-[12.5px]">
                                    <span className={t.done ? "text-green-500" : "text-[#CCCCCC]"}>
                                        {t.done ? "✓" : "○"}
                                    </span>
                                    <span className={t.done ? "line-through text-[#AAAAAA]" : "text-[#444444]"}>{t.task}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mentor connections */}
                    <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <h3 className="text-[13px] font-bold text-[#111111] mb-4">{dict.workspace.startup.mentors}</h3>
                        <div className="flex flex-col gap-4">
                            {MENTORS.map(m => (
                                <div key={m.name} className="flex items-center gap-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`https://i.pravatar.cc/40?u=${m.seed}`} alt={m.name}
                                        className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#EAEAEA]" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-semibold text-[#111111] truncate">{m.name}</p>
                                        <p className="text-[11px] text-[#888888] truncate">{m.expertise}</p>
                                        <p className={`text-[11px] font-medium mt-0.5 ${m.status.includes("Pending") ? "text-amber-500" : "text-green-600"}`}>{m.status}</p>
                                    </div>
                                    <AIScoreBadge score={m.score} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="bg-[#111111] rounded-[10px] p-5">
                        <p className="text-[13px] font-bold text-white mb-3">{dict.workspace.startup.quickActions}</p>
                        <div className="flex flex-col gap-2">
                            {[
                                { label: dict.workspace.startup.findMentor, href: "/market/mentors" },
                                { label: dict.workspace.startup.browseInvestors, href: "/market/investments" },
                                { label: dict.workspace.startup.updatePitch, href: "/workspace/startup/projects" },
                            ].map(a => (
                                <button key={a.label}
                                    className="text-left text-[12.5px] text-white/70 hover:text-[#F4B400] transition-colors py-1">
                                    {a.label} →
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
