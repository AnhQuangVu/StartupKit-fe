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
                <svg viewBox="0 0 120 90" className="w-full h-[96px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Isometric Base Grid */}
                    <polygon points="60,18 102,38 60,60 18,38" fill="#FFFFFF" stroke="#111111" strokeWidth="2.2" />
                    <polygon points="18,38 60,60 60,74 18,52" fill="#F0F0F0" stroke="#111111" strokeWidth="2.2" />
                    <polygon points="60,60 102,38 102,52 60,74" fill="#E2E2E2" stroke="#111111" strokeWidth="2.2" />
                    {/* Glowing Thruster Energy Beam */}
                    <polygon points="55,54 65,54 62,80 58,80" fill="#F4B400" fillOpacity="0.85" />
                    {/* Isometric Rocket Fuselage */}
                    <polygon points="60,10 70,32 50,32" fill="#111111" />
                    <polygon points="60,6 60,32 50,32" fill="#222222" />
                    <polygon points="60,6 60,32 70,32" fill="#111111" />
                    {/* Cockpit Gem */}
                    <circle cx="60" cy="22" r="3.5" fill="#F4B400" stroke="#FFFFFF" strokeWidth="1" />
                    {/* Left & Right Wings */}
                    <polygon points="50,28 44,35 50,35" fill="#F4B400" stroke="#111111" strokeWidth="1.5" />
                    <polygon points="70,28 76,35 70,35" fill="#F4B400" stroke="#111111" strokeWidth="1.5" />
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
                <svg viewBox="0 0 120 90" className="w-full h-[96px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Isometric Base Platform */}
                    <polygon points="60,18 102,38 60,60 18,38" fill="#FFFFFF" stroke="#111111" strokeWidth="2.2" />
                    <polygon points="18,38 60,60 60,74 18,52" fill="#F0F0F0" stroke="#111111" strokeWidth="2.2" />
                    <polygon points="60,60 102,38 102,52 60,74" fill="#E2E2E2" stroke="#111111" strokeWidth="2.2" />
                    {/* Knowledge Lighthouse / Tower */}
                    <polygon points="54,24 66,24 69,54 51,54" fill="#111111" stroke="#111111" strokeWidth="1.5" />
                    {/* Beacon Top */}
                    <polygon points="60,12 70,22 50,22" fill="#F4B400" stroke="#111111" strokeWidth="1.5" />
                    {/* Light Radar Rings */}
                    <ellipse cx="60" cy="24" rx="26" ry="9" stroke="#F4B400" strokeWidth="1.6" strokeDasharray="4 4" />
                    <ellipse cx="60" cy="24" rx="38" ry="13" stroke="#F4B400" strokeWidth="1.2" strokeDasharray="5 5" strokeOpacity="0.6" />
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
                <svg viewBox="0 0 120 90" className="w-full h-[96px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Isometric Base Grid */}
                    <polygon points="60,18 102,38 60,60 18,38" fill="#FFFFFF" stroke="#111111" strokeWidth="2.2" />
                    <polygon points="18,38 60,60 60,74 18,52" fill="#F0F0F0" stroke="#111111" strokeWidth="2.2" />
                    <polygon points="60,60 102,38 102,52 60,74" fill="#E2E2E2" stroke="#111111" strokeWidth="2.2" />
                    {/* 3D Stack of Gold Coins */}
                    <g transform="translate(0, 3)">
                        <ellipse cx="60" cy="46" rx="18" ry="8" fill="#D99B00" stroke="#111111" strokeWidth="1.5" />
                        <ellipse cx="60" cy="40" rx="18" ry="8" fill="#F4B400" stroke="#111111" strokeWidth="1.5" />
                        <ellipse cx="60" cy="34" rx="18" ry="8" fill="#FFC933" stroke="#111111" strokeWidth="1.5" />
                        {/* 3D Growth Trendline */}
                        <path d="M42 38 L55 26 L65 31 L78 17" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <polygon points="73,15 81,15 81,23" fill="#111111" />
                    </g>
                </svg>
            ),
        },
    ];

    return (
        <section className="relative py-32 bg-[#FFFFFF] border-t-2 border-[#111111] overflow-hidden">
            {/* 3D Isometric Background Grid with animated floaters */}
            <div className="absolute inset-0 iso-grid-bg opacity-40 pointer-events-none" />

            <div className="absolute top-16 left-12 iso-float pointer-events-none opacity-20 hidden lg:block">
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                    <polygon points="42,8 74,26 42,44 10,26" fill="#F4B400" stroke="#111111" strokeWidth="2" />
                    <polygon points="10,26 42,44 42,74 10,56" fill="#111111" stroke="#111111" strokeWidth="2" />
                    <polygon points="42,44 74,26 74,56 42,74" fill="#333333" stroke="#111111" strokeWidth="2" />
                </svg>
            </div>

            <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-20 max-w-[620px] mx-auto">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#F7F7F7] border-2 border-[#111111] rounded-[8px] mb-4 text-[13px] font-black text-[#D99B00] uppercase tracking-wider iso-btn shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
                        {r.label}
                    </div>
                    <h2 className="text-[34px] md:text-[46px] font-black text-[#111111] leading-[1.14] tracking-tight">
                        {r.title1}
                        <br />
                        <span className="text-[#111111] relative inline-block">
                            {r.title2}
                            <span className="absolute bottom-1.5 left-0 right-0 h-[7px] bg-[#F4B400]/45 -z-10 rounded-sm" />
                        </span>
                    </h2>
                    <p className="text-[16px] text-[#666666] mt-4 leading-relaxed">
                        {r.sub}
                    </p>
                </div>

                {/* 3 Spacious, Large Isometric Command Terminals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {rolesData.map((role) => (
                        <div
                            key={role.id}
                            className="bg-white border-2 border-[#111111] rounded-[16px] p-9 flex flex-col justify-between iso-card-3d group transition-all"
                        >
                            {/* Card Top */}
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-[11px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-[4px] bg-[#111111] text-white">
                                        {role.badge}
                                    </span>
                                    <span className="w-3 h-3 rounded-full bg-[#F4B400]" />
                                </div>

                                {/* Large Custom Isometric 3D SVG Artwork */}
                                <div className="my-5 p-5 bg-[#F9F9F8] border-2 border-[#EAEAEA] rounded-[12px] flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                                    {role.iconIllustration}
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-[26px] font-black text-[#111111] leading-tight">
                                        {role.label}
                                    </h3>
                                    <div className="text-[13px] font-extrabold text-[#D99B00] tracking-wide mt-1.5">
                                        {role.tagline}
                                    </div>
                                </div>

                                {/* Feature checklist with 3D isometric bullet cubes */}
                                <div className="mt-8 pt-6 border-t border-[#F0F0F0] flex flex-col gap-4">
                                    {role.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-3.5">
                                            <div className="mt-1 shrink-0">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <polygon points="8,2 14,5.5 8,9 2,5.5" fill="#F4B400" stroke="#111111" strokeWidth="1.2" />
                                                    <polygon points="2,5.5 8,9 8,14 2,10.5" fill="#111111" stroke="#111111" strokeWidth="1.2" />
                                                    <polygon points="8,9 14,5.5 14,10.5 8,14" fill="#333333" stroke="#111111" strokeWidth="1.2" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] text-[#444444] leading-relaxed">
                                                {feat}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card Action */}
                            <div className="mt-10 pt-4">
                                <Link
                                    href={role.href}
                                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#111111] text-white text-[15px] font-black py-4 px-6 rounded-[10px] iso-btn hover:bg-[#F4B400] hover:text-[#111111] transition-all shadow-md"
                                >
                                    {role.cta}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
