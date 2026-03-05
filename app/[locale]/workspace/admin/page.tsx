"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";

const PENDING_APPROVALS = [
    { name: "HealthTrack VN", type: "Startup", industry: "Healthtech", submitted: "2h ago" },
    { name: "Dr. Minh Nguyen", type: "Mentor", industry: "Fintech", submitted: "5h ago" },
    { name: "CodeEdu", type: "Startup", industry: "Edtech", submitted: "1d ago" },
    { name: "LogiFlow", type: "Startup", industry: "Logistics", submitted: "2d ago" },
];

const RECENT_ACTIVITY = [
    { action: "New startup registered", detail: "PayEase", time: "30m ago", color: "#3D6B35" },
    { action: "Mentor verification done", detail: "Dr. An Nguyen", time: "2h ago", color: "#1A3A5C" },
    { action: "Investment match", detail: "AgriBot × Mekong Capital", time: "4h ago", color: "#F4B400" },
    { action: "Report generated", detail: "Monthly recap Mar 2026", time: "1d ago", color: "#888888" },
];

export default function AdminWorkspace() {
    const dict = useDictionary();

    const STATS = [
        { label: dict.workspace.admin.totalUsers, value: "1,842", accent: false, delta: dict.workspace.admin.totalUsersDelta },
        { label: dict.workspace.admin.activeStartups, value: "287", accent: false, delta: dict.workspace.admin.activeStartupsDelta },
        { label: dict.workspace.admin.activeMentors, value: "94", accent: false, delta: dict.workspace.admin.activeMentorsDelta },
        { label: dict.workspace.admin.investmentMatches, value: "412", accent: true, delta: dict.workspace.admin.investmentMatchesDelta },
    ];

    return (
        <WorkspaceLayout title={dict.workspace.admin.dashboard} subtitle={dict.workspace.admin.dashboardSub}>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map(s => (
                    <div key={s.label} className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <div className={`text-[30px] font-black leading-none mb-1 ${s.accent ? "text-[#F4B400]" : "text-[#111111]"}`}>{s.value}</div>
                        <div className="text-[12px] font-bold text-[#111111] mb-0.5">{s.label}</div>
                        <div className="text-[11px] text-green-600 font-medium">{s.delta}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                {/* Pending approvals */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[14px] font-bold text-[#111111]">{dict.workspace.admin.pendingApprovals}</h2>
                        <span className="text-[11px] bg-red-50 text-red-500 font-bold px-2.5 py-1 rounded-full">{PENDING_APPROVALS.length} {dict.workspace.admin.waiting}</span>
                    </div>
                    <div className="flex flex-col divide-y divide-[#F5F5F5]">
                        {PENDING_APPROVALS.map(a => (
                            <div key={a.name} className="py-4 flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black shrink-0 ${a.type === "Mentor" ? "bg-[#1A3A5C]" : "bg-[#3D6B35]"
                                    }`}>{a.type[0]}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-bold text-[#111111]">{a.name}</p>
                                    <p className="text-[11px] text-[#888888]">{a.type} · {a.industry} · {a.submitted}</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button className="text-[11px] font-semibold bg-[#111111] text-white px-3 py-1.5 rounded-[6px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors">{dict.workspace.admin.approve}</button>
                                    <button className="text-[11px] font-semibold border border-[#EAEAEA] text-[#888888] px-3 py-1.5 rounded-[6px] hover:border-red-300 hover:text-red-500 transition-colors">{dict.workspace.admin.reject}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-5">

                    {/* Activity */}
                    <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <h3 className="text-[13px] font-bold text-[#111111] mb-4">{dict.workspace.admin.platformActivity}</h3>
                        <div className="flex flex-col gap-3">
                            {RECENT_ACTIVITY.map((a, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: a.color }} />
                                    <div>
                                        <p className="text-[12px] text-[#333333] font-medium">{a.action}</p>
                                        <p className="text-[11px] text-[#888888]">{a.detail} · {a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User breakdown */}
                    <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <h3 className="text-[13px] font-bold text-[#111111] mb-4">{dict.workspace.admin.userBreakdown}</h3>
                        {[
                            { role: dict.workspace.admin.startups, count: 287, color: "#3D6B35", pct: 62 },
                            { role: dict.workspace.admin.mentors, count: 94, color: "#1A3A5C", pct: 20 },
                            { role: dict.workspace.admin.investors, count: 61, color: "#7B2D8B", pct: 13 },
                            { role: dict.workspace.admin.admins, count: 8, color: "#C05621", pct: 2 },
                        ].map(r => (
                            <div key={r.role} className="mb-3">
                                <div className="flex justify-between text-[12px] mb-1">
                                    <span className="font-medium text-[#333333]">{r.role}</span>
                                    <span className="text-[#888888]">{r.count}</span>
                                </div>
                                <div className="h-1.5 bg-[#F0F0F0] rounded-full">
                                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* System health */}
                    <div className="bg-[#111111] rounded-[10px] p-5">
                        <p className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-3">{dict.workspace.admin.systemHealth}</p>
                        {[
                            { name: dict.workspace.admin.apiResponse, status: "99.8%", ok: true },
                            { name: dict.workspace.admin.aiEngine, status: dict.workspace.admin.online, ok: true },
                            { name: dict.workspace.admin.matchEngine, status: dict.workspace.admin.online, ok: true },
                            { name: dict.workspace.admin.emailService, status: dict.workspace.admin.delayed, ok: false },
                        ].map(s => (
                            <div key={s.name} className="flex justify-between items-center py-1.5 border-b border-white/10 last:border-0">
                                <span className="text-[12px] text-white/70">{s.name}</span>
                                <span className={`text-[11px] font-bold ${s.ok ? "text-green-400" : "text-amber-400"}`}>{s.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
