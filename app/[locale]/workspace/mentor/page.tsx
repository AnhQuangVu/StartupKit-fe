"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useAuth } from "@/lib/auth-context";

const STATS = [
    { label: "AI Score", value: "97", accent: true, sub: "Top 3% of mentors" },
    { label: "Sessions Done", value: "142", accent: false, sub: "+8 this month" },
    { label: "Pending Requests", value: "5", accent: false, sub: "3 need reply" },
    { label: "Avg Rating", value: "4.9", accent: false, sub: "From 142 sessions" },
];

const SESSIONS = [
    { startup: "AgriBot Vietnam", topic: "Product roadmap review", date: "Mar 10, 10:00", status: "Confirmed" },
    { startup: "EduPath", topic: "User acquisition strategy", date: "Mar 12, 14:00", status: "Confirmed" },
    { startup: "MediConnect", topic: "AI product positioning", date: "Mar 15, 11:00", status: "Pending" },
];

const REQUESTS = [
    { startup: "FarmList", industry: "Agritech", message: "Need guidance on rural distribution playbook.", ago: "2h ago" },
    { startup: "HealthScore", industry: "Healthtech", message: "Looking for feedback on our B2B sales motion.", ago: "1d ago" },
];

export default function MentorWorkspace() {
    const { user } = useAuth();

    return (
        <WorkspaceLayout title="Mentor Dashboard" subtitle={`Welcome back, ${user?.name?.split(" ")[0]} 👋`}>

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

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                {/* Upcoming sessions */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6">
                    <h2 className="text-[14px] font-bold text-[#111111] mb-5">Upcoming Sessions</h2>
                    <div className="flex flex-col divide-y divide-[#F5F5F5]">
                        {SESSIONS.map(s => (
                            <div key={s.startup} className="py-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[14px] font-black text-[#111111] shrink-0">
                                    {s.startup[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-semibold text-[#111111]">{s.startup}</p>
                                    <p className="text-[12px] text-[#888888]">{s.topic}</p>
                                    <p className="text-[12px] text-[#555555] font-medium mt-0.5">📅 {s.date}</p>
                                </div>
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${s.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                                    }`}>{s.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Startup Requests */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                    <h2 className="text-[14px] font-bold text-[#111111] mb-4">New Requests</h2>
                    <div className="flex flex-col gap-4">
                        {REQUESTS.map(r => (
                            <div key={r.startup} className="border border-[#EAEAEA] rounded-[8px] p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[13px] font-bold text-[#111111]">{r.startup}</p>
                                    <span className="text-[10px] text-[#AAAAAA]">{r.ago}</span>
                                </div>
                                <span className="text-[10px] font-bold bg-[#F5F5F5] text-[#555555] px-2 py-0.5 rounded-full">{r.industry}</span>
                                <p className="text-[12px] text-[#666666] mt-2 line-clamp-2">{r.message}</p>
                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 text-[11.5px] font-semibold bg-[#111111] text-white py-1.5 rounded-[6px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors">Accept</button>
                                    <button className="flex-1 text-[11.5px] font-semibold border border-[#EAEAEA] text-[#888888] py-1.5 rounded-[6px] hover:border-[#999] transition-colors">Decline</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
