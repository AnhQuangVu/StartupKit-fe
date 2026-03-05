"use client";
import { useDictionary } from "@/lib/dict-context";

const signals = [
    {
        label: "Mentor Reviews",
        desc: "Every completed session is reviewed. Peer validation builds long-term trust.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.09 7.26H18L13.47 10.74L15.56 16L10 12.27L4.44 16L6.53 10.74L2 7.26H7.91L10 2Z" stroke="#111111" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
            </svg>
        ),
        value: "Reviews",
        weight: 35,
    },
    {
        label: "Completed Sessions",
        desc: "Verified mentoring activity. Sessions are tracked and confirmed on-platform.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="3" stroke="#111111" strokeWidth="1.4" fill="none" />
                <path d="M7 10l2.5 2.5L13 8" stroke="#F4B400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        value: "Sessions",
        weight: 35,
    },
    {
        label: "Successful Deals",
        desc: "Funding events and successful partnerships contribute the most to long-term score.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v3M17 10h-3M10 17v-3M3 10h3" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="10" cy="10" r="4" stroke="#F4B400" strokeWidth="1.4" fill="none" />
            </svg>
        ),
        value: "Deals",
        weight: 30,
    },
];

export default function CredibilityScore() {
    const dict = useDictionary();
    const cr = dict.credibility;
    const SIG_TEXT = [
        { label: cr.sig1Label, desc: cr.sig1Desc, value: cr.sig1Val },
        { label: cr.sig2Label, desc: cr.sig2Desc, value: cr.sig2Val },
        { label: cr.sig3Label, desc: cr.sig3Desc, value: cr.sig3Val },
    ];
    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Score card visual */}
                    <div className="bg-[#F7F7F7] border border-[#EAEAEA] rounded-[8px] p-8 flex flex-col items-center gap-6">
                        {/* Score ring */}
                        <div className="relative w-40 h-40">
                            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                                <circle cx="80" cy="80" r="64" stroke="#EAEAEA" strokeWidth="12" fill="none" />
                                <circle
                                    cx="80" cy="80" r="64"
                                    stroke="#F4B400" strokeWidth="12" fill="none"
                                    strokeDasharray={`${0.74 * 2 * Math.PI * 64} ${2 * Math.PI * 64}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[32px] font-bold text-[#111111]">74</span>
                                <span className="text-[12px] text-[#999999]">{cr.gauge}</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-[16px] font-semibold text-[#111111]">{cr.scoreTitle}</div>
                            <div className="text-[12px] text-[#888888] mt-0.5">{cr.gaugeSub}</div>
                        </div>

                        {/* Weight bars */}
                        <div className="w-full flex flex-col gap-3">
                            {signals.map((s, i) => (
                                <div key={s.label} className="flex items-center gap-3">
                                    <div className="text-[12px] text-[#777777] w-[90px] shrink-0">{SIG_TEXT[i].value}</div>
                                    <div className="flex-1 h-1.5 bg-[#EAEAEA] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#F4B400] rounded-full"
                                            style={{ width: `${s.weight}%` }}
                                        />
                                    </div>
                                    <div className="text-[11px] text-[#AAAAAA] w-8 text-right">{s.weight}%</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-[12px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                            {cr.label}
                        </p>
                        <h2 className="text-[32px] md:text-[38px] font-bold text-[#111111] leading-[1.2] mb-4">
                            {cr.title1}<br />{cr.title2}
                        </h2>
                        <p className="text-[15px] text-[#666666] leading-[1.7] mb-8">
                            {cr.sub}
                        </p>

                        <div className="flex flex-col gap-5">
                            {signals.map((s, i) => (
                                <div key={s.label} className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-[#F7F7F7] border border-[#EAEAEA] flex items-center justify-center shrink-0">
                                        {s.icon}
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-semibold text-[#111111] mb-0.5">{SIG_TEXT[i].label}</div>
                                        <p className="text-[13px] text-[#777777] leading-[1.6]">{SIG_TEXT[i].desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
