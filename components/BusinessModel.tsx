"use client";
import { useDictionary } from "@/lib/dict-context";

export default function BusinessModel() {
    const dict = useDictionary();
    const bm = dict.business;
    const tiers = [
        {
            name: bm.freeName,
            desc: bm.freeDesc,
            features: [bm.freeF1, bm.freeF2, bm.freeF3, bm.freeF4],
            cta: bm.freeCta,
            href: "/register",
            highlight: false,
        },
        {
            name: bm.premName,
            desc: bm.premDesc,
            features: [bm.premF1, bm.premF2, bm.premF3, bm.premF4],
            cta: bm.premCta,
            href: "/pricing",
            highlight: true,
        },
    ];
    return (
        <section className="py-24 bg-[#F7F7F7]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-14 max-w-[500px] mx-auto">
                    <p className="text-[12px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                        {bm.label}
                    </p>
                    <h2 className="text-[32px] md:text-[38px] font-bold text-[#111111] leading-[1.2]">
                        {bm.title1}<br />{bm.title2}
                    </h2>
                    <p className="text-[15px] text-[#666666] mt-4 leading-[1.7]">
                        {bm.sub}
                    </p>
                </div>

                {/* Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto mb-12">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`rounded-[8px] p-8 border flex flex-col gap-6 ${tier.highlight
                                    ? "bg-[#111111] border-[#111111] text-white"
                                    : "bg-white border-[#EAEAEA] text-[#111111]"
                                }`}
                        >
                            <div>
                                <div className={`text-[13px] font-semibold uppercase tracking-widest mb-1 ${tier.highlight ? "text-[#F4B400]" : "text-[#999999]"}`}>
                                    {tier.name}
                                </div>
                                <p className={`text-[14px] leading-[1.6] ${tier.highlight ? "text-[#AAAAAA]" : "text-[#666666]"}`}>
                                    {tier.desc}
                                </p>
                            </div>

                            <ul className="flex flex-col gap-2.5">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-[13px] leading-[1.55]">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                                            <path d="M2.5 7L6 10.5L11.5 4" stroke={tier.highlight ? "#F4B400" : "#111111"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={tier.highlight ? "text-[#CCCCCC]" : "text-[#555555]"}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={tier.href}
                                className={`inline-flex items-center justify-center gap-2 text-[14px] font-semibold py-2.5 px-5 rounded-[8px] transition-colors mt-auto ${tier.highlight
                                        ? "bg-[#F4B400] text-[#111111] hover:bg-white hover:text-[#111111]"
                                        : "border border-[#EAEAEA] text-[#111111] hover:border-[#111111]"
                                    }`}
                            >
                                {tier.cta}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Success fee note */}
                <div className="max-w-[620px] mx-auto p-6 bg-white border border-[#EAEAEA] rounded-[8px] flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="7" stroke="#F4B400" strokeWidth="1.4" fill="none" />
                            <path d="M9 6v4M9 12h.01" stroke="#F4B400" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-[14px] font-semibold text-[#111111] mb-1">{bm.feeTitle}</div>
                        <p className="text-[13px] text-[#777777] leading-[1.6]">
                            {bm.feeDesc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
