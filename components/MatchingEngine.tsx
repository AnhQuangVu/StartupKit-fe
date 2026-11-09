"use client";
import { useDictionary } from "@/lib/dict-context";

const nodes = [
    {
        label: "Startup",
        sub: "Industry + Stage + Need",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2 L17 7 V13 L10 18 L3 13 V7 Z" stroke="#111111" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
            </svg>
        ),
    },
    {
        label: "AI Matching Engine",
        sub: "Score • Filter • Rank",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="4" stroke="#F4B400" strokeWidth="1.4" fill="none" />
                <path d="M10 1v3M10 16v3M1 10h3M16 10h3" stroke="#F4B400" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
        center: true,
    },
    {
        label: "Mentor / Investor",
        sub: "Industry + Stage + Capacity",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 15 L7 9 L11 12 L16 5 L20 8" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

const rules = [
    { label: "Auto-match by industry", desc: "Startup sector compared against mentor and investor domain expertise." },
    { label: "Auto-match by funding stage", desc: "Seed, Series A, B — each stage matched to appropriate investor profiles." },
    { label: "Admin intervenes only in disputes", desc: "The engine runs autonomously. Admin oversight reserved for escalations only." },
];

export default function MatchingEngine() {
    const dict = useDictionary();
    const mt = dict.matching;
    const NODE_TEXT = [
        { label: mt.node1Label, sub: mt.node1Sub },
        { label: mt.node2Label, sub: mt.node2Sub },
        { label: mt.node3Label, sub: mt.node3Sub },
    ];
    const RULE_TEXT = [
        { label: mt.rule1Label, desc: mt.rule1Desc },
        { label: mt.rule2Label, desc: mt.rule2Desc },
        { label: mt.rule3Label, desc: mt.rule3Desc },
    ];
    return (
        <section className="py-24 bg-[#F7F7F7]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-14 max-w-[520px]">
                    <p className="text-[12px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                        {mt.label}
                    </p>
                    <h2 className="text-[32px] md:text-[38px] font-bold text-[#111111] leading-[1.2]">
                        {mt.title1}<br />{mt.title2}
                    </h2>
                    <p className="text-[15px] text-[#666666] mt-4 leading-[1.7]">
                        {mt.sub}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Node diagram */}
                    <div className="bg-white border border-[#EAEAEA] rounded-[8px] p-8 flex flex-col items-center gap-0">
                        {nodes.map((node, i) => (
                            <div key={node.label} className="flex flex-col items-center w-full">
                                {/* Node card */}
                                <div
                                    className={`flex items-center gap-4 px-5 py-4 rounded-[8px] w-full max-w-[280px] border transition-colors
                    ${node.center
                                            ? "border-[#F4B400] bg-[#FFFBF0]"
                                            : "border-[#EAEAEA] bg-white"
                                        }`}
                                >
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${node.center ? "bg-[#F4B400]/10" : "bg-[#F7F7F7]"
                                            }`}
                                    >
                                        {node.icon}
                                    </div>
                                    <div>
                                        <div className={`text-[14px] font-semibold ${node.center ? "text-[#111111]" : "text-[#333333]"}`}>
                                            {NODE_TEXT[i].label}
                                        </div>
                                        <div className="text-[11px] text-[#999999] mt-0.5">{NODE_TEXT[i].sub}</div>
                                    </div>
                                </div>
                                {/* Connector */}
                                {i < nodes.length - 1 && (
                                    <div className="flex flex-col items-center gap-0.5 py-2">
                                        <div className="w-px h-3 bg-[#DDDDDD]" />
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                            <path d="M1 1L5 5L9 1" stroke="#DDDDDD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Rules */}
                    <div className="flex flex-col gap-5">
                        {rules.map((r, i) => (
                            <div key={r.label} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center shrink-0 text-[12px] font-bold text-[#CCCCCC]">
                                    {i + 1}
                                </div>
                                <div>
                                    <div className="text-[15px] font-semibold text-[#111111] mb-1">{RULE_TEXT[i].label}</div>
                                    <p className="text-[13px] text-[#777777] leading-[1.65]">{RULE_TEXT[i].desc}</p>
                                </div>
                            </div>
                        ))}

                        {/* Admin note */}
                        <div className="mt-2 p-4 bg-white border border-[#EAEAEA] rounded-[8px]">
                            <p className="text-[12px] text-[#888888] leading-[1.6]">
                                {mt.adminNote}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
