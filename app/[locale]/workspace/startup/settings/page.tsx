"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useState } from "react";
import { IconUpload, IconPlus, IconTrash } from "@/components/icons/WorkspaceIcons";

const STAGES = ["Pre-seed", "Seed", "Series A", "Series B+"];
const INDUSTRIES = ["Fintech", "Edtech", "Healthtech", "Agritech", "SaaS", "E-commerce", "Logistics", "Deep Tech", "Other"];

const INITIAL_TEAM = [
    { name: "Nguyen Minh", role: "CEO / Founder", bg: "10 years agricultural R&D" },
    { name: "Le Thi Nga", role: "CTO", bg: "AI/ML engineer, prev. FPT Software" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6 flex flex-col gap-5">
            <h2 className="text-[14px] font-bold text-[#111111] pb-3 border-b border-[#F0F0F0]">{title}</h2>
            {children}
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#555555] uppercase tracking-wide">{label}</label>
            {children}
        </div>
    );
}

const inputCls = "border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[13.5px] text-[#111111] outline-none focus:border-[#111111] transition-colors w-full";

export default function StartupSettingsPage() {
    const [team, setTeam] = useState(INITIAL_TEAM);
    const [stage, setStage] = useState("Seed");
    const [industry, setIndustry] = useState("Agritech");

    const addMember = () => setTeam(t => [...t, { name: "", role: "", bg: "" }]);
    const removeMember = (i: number) => setTeam(t => t.filter((_, idx) => idx !== i));

    return (
        <WorkspaceLayout title="Settings" subtitle="Manage your startup profile and information"
            actions={
                <button className="bg-[#F4B400] text-[#111111] text-[12.5px] font-bold px-4 py-2 rounded-[8px] hover:bg-[#111111] hover:text-white transition-colors">
                    Save Changes
                </button>
            }
        >
            <div className="max-w-[760px] space-y-6">

                {/* Startup info */}
                <Section title="Startup Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Startup Name">
                            <input className={inputCls} defaultValue="AgriBot Vietnam" />
                        </Field>
                        <Field label="Tagline">
                            <input className={inputCls} defaultValue="AI-driven crop monitoring for Vietnam's rice farmers." />
                        </Field>
                    </div>
                    <Field label="Description">
                        <textarea className={`${inputCls} resize-none h-24`}
                            defaultValue="AgriBot combines IoT sensors with a mobile-first AI platform to give smallholder rice farmers real-time crop monitoring and harvest timing recommendations." />
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Industry">
                            <select className={inputCls} value={industry} onChange={e => setIndustry(e.target.value)}>
                                {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                            </select>
                        </Field>
                        <Field label="Funding Stage">
                            <select className={inputCls} value={stage} onChange={e => setStage(e.target.value)}>
                                {STAGES.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </Field>
                        <Field label="Location">
                            <input className={inputCls} defaultValue="Hà Nội, Vietnam" />
                        </Field>
                        <Field label="Team Size">
                            <input className={inputCls} defaultValue="8 people" />
                        </Field>
                        <Field label="Website">
                            <input className={inputCls} placeholder="https://yoursite.com" />
                        </Field>
                        <Field label="Founded">
                            <input className={inputCls} placeholder="2023" type="number" />
                        </Field>
                    </div>
                </Section>

                {/* Logo + Cover */}
                <Section title="Logo & Cover Image">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Startup Logo">
                            <div className="border-2 border-dashed border-[#EAEAEA] rounded-[8px] p-6 flex flex-col items-center gap-2 hover:border-[#F4B400] transition-colors cursor-pointer group">
                                <IconUpload className="text-[#CCCCCC] group-hover:text-[#F4B400] transition-colors" size={24} />
                                <span className="text-[12px] text-[#888888]">Upload logo (PNG, SVG, min 200×200)</span>
                            </div>
                        </Field>
                        <Field label="Cover Image">
                            <div className="border-2 border-dashed border-[#EAEAEA] rounded-[8px] p-6 flex flex-col items-center gap-2 hover:border-[#F4B400] transition-colors cursor-pointer group">
                                <IconUpload className="text-[#CCCCCC] group-hover:text-[#F4B400] transition-colors" size={24} />
                                <span className="text-[12px] text-[#888888]">Upload cover (16:9, min 1200×675)</span>
                            </div>
                        </Field>
                    </div>
                </Section>

                {/* Pitch deck */}
                <Section title="Pitch Deck">
                    <Field label="Upload Pitch Deck">
                        <div className="border-2 border-dashed border-[#EAEAEA] rounded-[8px] p-8 flex flex-col items-center gap-3 hover:border-[#F4B400] hover:bg-[#FFFBF0] transition-all cursor-pointer group">
                            <IconUpload className="text-[#CCCCCC] group-hover:text-[#F4B400] transition-colors" size={28} />
                            <div className="text-center">
                                <p className="text-[13px] font-semibold text-[#333333]">Drag & drop or click to upload</p>
                                <p className="text-[11px] text-[#AAAAAA] mt-1">PDF only · Max 25MB</p>
                            </div>
                        </div>
                    </Field>
                </Section>

                {/* Team */}
                <Section title="Team Members">
                    <div className="flex flex-col gap-4">
                        {team.map((member, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start p-4 border border-[#EAEAEA] rounded-[8px] relative">
                                <Field label="Full Name">
                                    <input className={inputCls} value={member.name}
                                        onChange={e => setTeam(t => t.map((m, idx) => idx === i ? { ...m, name: e.target.value } : m))} />
                                </Field>
                                <Field label="Role">
                                    <input className={inputCls} value={member.role}
                                        onChange={e => setTeam(t => t.map((m, idx) => idx === i ? { ...m, role: e.target.value } : m))} />
                                </Field>
                                <Field label="Background">
                                    <div className="flex gap-2">
                                        <input className={inputCls} value={member.bg}
                                            onChange={e => setTeam(t => t.map((m, idx) => idx === i ? { ...m, bg: e.target.value } : m))} />
                                        <button onClick={() => removeMember(i)}
                                            className="shrink-0 w-10 h-10 flex items-center justify-center border border-[#EAEAEA] rounded-[8px] text-[#CCCCCC] hover:border-red-300 hover:text-red-400 transition-colors">
                                            <IconTrash />
                                        </button>
                                    </div>
                                </Field>
                            </div>
                        ))}
                        <button onClick={addMember}
                            className="flex items-center gap-2 text-[12.5px] font-semibold text-[#888888] hover:text-[#111111] transition-colors w-fit">
                            <IconPlus /> Add team member
                        </button>
                    </div>
                </Section>

                {/* Save */}
                <div className="flex justify-end">
                    <button className="bg-[#F4B400] text-[#111111] text-[14px] font-bold px-8 py-3 rounded-[8px] hover:bg-[#111111] hover:text-white transition-colors">
                        Save All Changes
                    </button>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
