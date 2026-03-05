"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import AIScoreBadge from "@/components/ui/AIScoreBadge";
import { useDictionary } from "@/lib/dict-context";

const RECOMMENDED = [
    { id: "m1", name: "Dr. An Nguyen", title: "Ex-VP Product · VNPay", expertise: ["Product", "Fintech"], score: 97, seed: "drannguyen", why: "Matches your fintech product stage" },
    { id: "m2", name: "Mai Tran", title: "Growth Marketer · Edtech", expertise: ["Marketing", "D2C"], score: 91, seed: "maitran", why: "Strong D2C experience for your market" },
    { id: "m5", name: "Bao Vo", title: "GTM Strategist · Agritech", expertise: ["Agritech", "Rural GTM"], score: 93, seed: "baovo", why: "Deep agritech Go-To-Market expertise" },
];

const CONNECTED = [
    { id: "m3", name: "Hung Le", title: "Ex-VC Partner · Do Ventures", expertise: ["Finance", "SaaS"], score: 95, seed: "hungle", nextSession: "Mar 10, 10:00 AM", status: "confirmed" },
];

const PENDING = [
    { id: "m6", name: "Thu Dao", title: "COO · Series A startup", expertise: ["Operations"], score: 88, seed: "thudao", requested: "2d ago" },
];

interface MentorData {
    id: string; name: string; title: string; expertise: string[];
    score: number; seed: string;
    why?: string; nextSession?: string; status?: string; requested?: string;
}

function MentorCard({ m, cta }: { m: MentorData; cta: React.ReactNode }) {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.pravatar.cc/48?u=${m.seed}`} alt={m.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#EAEAEA] shrink-0" />
                <div className="min-w-0">
                    <p className="text-[14px] font-bold text-[#111111] truncate">{m.name}</p>
                    <p className="text-[11px] text-[#888888] truncate">{m.title}</p>
                </div>
                <div className="ml-auto shrink-0"><AIScoreBadge score={m.score} /></div>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {m.expertise.map(e => (
                    <span key={e} className="text-[10px] font-semibold bg-[#F5F5F5] text-[#555555] px-2 py-0.5 rounded-full">{e}</span>
                ))}
            </div>
            {m.why && <p className="text-[11px] text-[#888888] italic">{m.why}</p>}
            {m.nextSession && (
                <p className={`text-[11px] font-semibold ${m.status === "confirmed" ? "text-green-600" : "text-amber-500"}`}>
                    📅 {m.nextSession}
                </p>
            )}
            {m.requested && <p className="text-[11px] text-[#AAAAAA]">Requested {m.requested}</p>}
            {cta}
        </div>
    );
}

export default function StartupMentorsPage() {
    const dict = useDictionary();

    return (
        <WorkspaceLayout title={dict.workspace.startup.mentors} subtitle={dict.workspace.startup.mentorsSub}>

            <div className="space-y-10">
                {/* Recommended */}
                <section>
                    <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{dict.workspace.startup.aiRecommended}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {RECOMMENDED.map(m => (
                            <MentorCard key={m.id} m={m} cta={
                                <button className="mt-auto w-full text-[12.5px] font-semibold bg-[#111111] text-white py-2 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                                    {dict.card.requestSession} →
                                </button>
                            } />
                        ))}
                    </div>
                </section>

                {/* Connected */}
                <section>
                    <h2 className="text-[11px] font-bold text-[#111111] uppercase tracking-[0.14em] mb-4">{dict.workspace.startup.connected}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {CONNECTED.map(m => (
                            <MentorCard key={m.id} m={m} cta={
                                <button className="mt-auto w-full text-[12.5px] font-semibold border border-[#111111] text-[#111111] py-2 rounded-[8px] hover:bg-[#111111] hover:text-white transition-colors">
                                    View Session →
                                </button>
                            } />
                        ))}
                    </div>
                </section>

                {/* Pending */}
                <section>
                    <h2 className="text-[11px] font-bold text-[#888888] uppercase tracking-[0.14em] mb-4">{dict.workspace.startup.pending}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {PENDING.map(m => (
                            <MentorCard key={m.id} m={m} cta={
                                <button className="mt-auto w-full text-[12.5px] font-semibold border border-[#EAEAEA] text-[#888888] py-2 rounded-[8px] cursor-not-allowed">
                                    {dict.workspace.startup.awaitingReply}
                                </button>
                            } />
                        ))}
                    </div>
                </section>
            </div>
        </WorkspaceLayout>
    );
}
