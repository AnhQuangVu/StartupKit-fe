"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";

export default function RoleEcosystem() {
    const dict = useDictionary();
    const r = dict.roles;

    const rolesData = [
        {
            id: "startup",
            label: r.startup.label,
            tagline: r.startup.tagline,
            features: [r.startup.f1, r.startup.f2, r.startup.f3],
            cta: r.startup.cta,
            href: "/register?role=startup",
            badge: "FOR FOUNDERS",
            accentColor: "#F4B400",
            iconIllustration: (
                <svg viewBox="0 0 100 80" className="w-full h-[72px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Isometric Base Grid */}
                    <polygon points="50,15 85,32 50,50 15,32" fill="#FFFFFF" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="15,32 50,50 50,62 15,44" fill="#F0F0F0" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="50,50 85,32 85,44 50,62" fill="#E2E2E2" stroke="#111111" strokeWidth="1.8" />
                    {/* Thruster Beam (Isometric vertical) */}
                    <polygon points="46,45 54,45 52,65 48,65" fill="#F4B400" fillOpacity="0.8" />
                    {/* Isometric Rocket Fuselage */}
                    <polygon points="50,10 58,26 42,26" fill="#111111" />
                    <polygon points="50,6 50,26 42,26" fill="#222222" />
                    <polygon points="50,6 50,26 58,26" fill="#111111" />
                    {/* Nose Cone */}
                    <circle cx="50" cy="18" r="2.5" fill="#F4B400" />
                    {/* Fins */}
                    <polygon points="42,24 37,28 42,28" fill="#F4B400" stroke="#111111" strokeWidth="1" />
                    <polygon points="58,24 63,28 58,28" fill="#F4B400" stroke="#111111" strokeWidth="1" />
                </svg>
            ),
        },
        {
            id: "mentor",
            label: r.mentor.label,
            tagline: r.mentor.tagline,
            features: [r.mentor.f1, r.mentor.f2, r.mentor.f3],
            cta: r.mentor.cta,
            href: "/register?role=mentor",
            badge: "FOR EXPERTS",
            accentColor: "#111111",
            iconIllustration: (
                <svg viewBox="0 0 100 80" className="w-full h-[72px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Isometric Base Platform */}
                    <polygon points="50,16 85,33 50,50 15,33" fill="#FFFFFF" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="15,33 50,50 50,60 15,43" fill="#F0F0F0" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="50,50 85,33 85,43 50,60" fill="#E2E2E2" stroke="#111111" strokeWidth="1.8" />
                    {/* Isometric Knowledge Tower / Lighthouse */}
                    <polygon points="45,20 55,20 57,45 43,45" fill="#111111" stroke="#111111" strokeWidth="1.2" />
                    {/* Beacon Top */}
                    <polygon points="50,10 58,18 42,18" fill="#F4B400" stroke="#111111" strokeWidth="1.2" />
                    {/* Light Beam Rings */}
                    <ellipse cx="50" cy="20" rx="20" ry="7" stroke="#F4B400" strokeWidth="1.2" strokeDasharray="3 3" />
                    <ellipse cx="50" cy="20" rx="30" ry="11" stroke="#F4B400" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
                </svg>
            ),
        },
        {
            id: "investor",
            label: r.investor.label,
            tagline: r.investor.tagline,
            features: [r.investor.f1, r.investor.f2, r.investor.f3],
            cta: r.investor.cta,
            href: "/register?role=investor",
            badge: "FOR CAPITAL",
            accentColor: "#F4B400",
            iconIllustration: (
                <svg viewBox="0 0 100 80" className="w-full h-[72px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Isometric Base Grid */}
                    <polygon points="50,15 85,32 50,50 15,32" fill="#FFFFFF" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="15,32 50,50 50,62 15,44" fill="#F0F0F0" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="50,50 85,32 85,44 50,62" fill="#E2E2E2" stroke="#111111" strokeWidth="1.8" />
                    {/* Stack of Isometric Gold Coins */}
                    <g transform="translate(0, 2)">
                        {/* Coin 1 */}
                        <ellipse cx="50" cy="38" rx="14" ry="6" fill="#F4B400" stroke="#111111" strokeWidth="1.2" />
                        {/* Coin 2 */}
                        <ellipse cx="50" cy="33" rx="14" ry="6" fill="#F4B400" stroke="#111111" strokeWidth="1.2" />
                        {/* Coin 3 */}
                        <ellipse cx="50" cy="28" rx="14" ry="6" fill="#FFC933" stroke="#111111" strokeWidth="1.2" />
                        {/* Trend Growth Arrow */}
                        <path d="M35 32 L46 22 L54 26 L65 14" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        <polygon points="61,13 67,13 67,19" fill="#111111" />
                    </g>
                </svg>
            ),
        },
    ];

    return (
        <section className="relative py-28 bg-[#FFFFFF] border-t border-[#EAEAEA] overflow-hidden">
            {/* Isometric background grid */}
            <div className="absolute inset-0 iso-grid-bg opacity-30 pointer-events-none" />

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-18 max-w-[580px] mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F7F7] border border-[#EAEAEA] rounded-[6px] mb-3 text-[12px] font-bold text-[#D99B00] uppercase tracking-wider iso-btn">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                        {r.label}
                    </div>
                    <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#111111] leading-[1.18] tracking-tight">
                        {r.title1}
                        <br />
                        <span className="text-[#111111] relative inline-block">
                            {r.title2}
                            <span className="absolute bottom-1 left-0 right-0 h-[5px] bg-[#F4B400]/40 -z-10 rounded-sm" />
                        </span>
                    </h2>
                    <p className="text-[15px] text-[#666666] mt-4 leading-relaxed">
                        {r.sub}
                    </p>
                </div>

                {/* 3 Isometric Command Terminals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {rolesData.map((role) => (
                        <div
                            key={role.id}
                            className="bg-white border-2 border-[#111111] rounded-[12px] p-8 flex flex-col justify-between iso-card-3d group transition-all"
                        >
                            {/* Card Top */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-[4px] bg-[#111111] text-white">
                                        {role.badge}
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
                                </div>

                                {/* Custom Isometric 3D SVG Artwork */}
                                <div className="my-4 p-3 bg-[#F9F9F8] border border-[#EAEAEA] rounded-[8px] flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                                    {role.iconIllustration}
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-[22px] font-extrabold text-[#111111] leading-tight">
                                        {role.label}
                                    </h3>
                                    <div className="text-[12px] font-bold text-[#D99B00] tracking-wide mt-1">
                                        {role.tagline}
                                    </div>
                                </div>

                                {/* Feature checklist with isometric cube bullets */}
                                <div className="mt-6 pt-6 border-t border-[#F0F0F0] flex flex-col gap-3">
                                    {role.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-3">
                                            {/* Isometric bullet cube */}
                                            <div className="mt-1 shrink-0">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                    <polygon points="7,2 12,5 7,8 2,5" fill="#F4B400" stroke="#111111" strokeWidth="1" />
                                                    <polygon points="2,5 7,8 7,12 2,9" fill="#111111" stroke="#111111" strokeWidth="1" />
                                                    <polygon points="7,8 12,5 12,9 7,12" fill="#333333" stroke="#111111" strokeWidth="1" />
                                                </svg>
                                            </div>
                                            <span className="text-[13px] text-[#444444] leading-relaxed">
                                                {feat}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card Action */}
                            <div className="mt-8 pt-4">
                                <Link
                                    href={role.href}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#111111] text-white text-[14px] font-bold py-3 px-5 rounded-[8px] iso-btn hover:bg-[#F4B400] hover:text-[#111111] transition-all"
                                >
                                    {role.cta}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
