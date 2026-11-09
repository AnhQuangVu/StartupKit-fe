"use client";
import { useDictionary } from "@/lib/dict-context";

const roles = [
    {
        id: "startup",
        label: "Startup",
        tagline: "Build → Pitch → Fund",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3 L23 9 V19 L14 25 L5 19 V9 Z" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <path d="M14 3 V25 M5 9 L23 9" stroke="#111111" strokeWidth="1" strokeOpacity="0.25" />
            </svg>
        ),
        features: [
            "Build AI-powered investment profile",
            "Connect with verified investors",
            "Pay 10% only after successful funding",
        ],
        cta: { label: "Start Building", href: "/register?role=startup" },
    },
    {
        id: "mentor",
        label: "Mentor",
        tagline: "Guide → Grow → Earn",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="11" cy="10" r="4.5" stroke="#111111" strokeWidth="1.5" fill="none" />
                <path d="M3 24 C3 20 6.5 18 11 18 C15.5 18 19 20 19 24" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M22 12 L26 16 L22 20" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M26 16 H19" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        features: [
            "Offer structured mentoring sessions",
            "Build credibility score over time",
            "Get booked directly on platform",
        ],
        cta: { label: "Become a Mentor", href: "/register?role=mentor" },
    },
    {
        id: "investor",
        label: "Investor",
        tagline: "Discover → Match → Invest",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 21 L9 14 L13 17 L19 9 L25 12" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="25" cy="9" r="3" stroke="#F4B400" strokeWidth="1.5" fill="none" />
                <path d="M4 25 H25" stroke="#111111" strokeWidth="1" strokeOpacity="0.2" />
            </svg>
        ),
        features: [
            "Access structured deal flow pipeline",
            "AI-assisted startup filtering",
            "Transparent credibility metrics",
        ],
        cta: { label: "Access Deal Flow", href: "/register?role=investor" },
    },
];

export default function RoleEcosystem() {
    const dict = useDictionary();
    const r = dict.roles;
    type RoleId = "startup" | "mentor" | "investor";
    const T: Record<RoleId, { label: string; tagline: string; features: string[]; cta: string }> = {
        startup: { label: r.startup.label, tagline: r.startup.tagline, features: [r.startup.f1, r.startup.f2, r.startup.f3], cta: r.startup.cta },
        mentor:  { label: r.mentor.label,  tagline: r.mentor.tagline,  features: [r.mentor.f1,  r.mentor.f2,  r.mentor.f3],  cta: r.mentor.cta  },
        investor:{ label: r.investor.label, tagline: r.investor.tagline, features: [r.investor.f1, r.investor.f2, r.investor.f3], cta: r.investor.cta },
    };
    return (
        <section className="py-24 bg-[#F7F7F7]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-14 max-w-[520px] mx-auto">
                    <p className="text-[12px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                        {r.label}
                    </p>
                    <h2 className="text-[32px] md:text-[38px] font-bold text-[#111111] leading-[1.2]">
                        {r.title1}<br />{r.title2}
                    </h2>
                    <p className="text-[15px] text-[#666666] mt-4 leading-[1.7]">
                        {r.sub}
                    </p>
                </div>

                {/* Role cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            className="bg-white border border-[#EAEAEA] rounded-[8px] p-8 flex flex-col gap-6 hover:border-[#111111] transition-colors group"
                        >
                            {/* Icon + label */}
                            <div className="flex items-start justify-between">
                                <div>
                                    {role.icon}
                                    <div className="mt-3">
                                        <div className="text-[18px] font-bold text-[#111111]">{T[role.id as RoleId].label}</div>
                                        <div className="text-[12px] text-[#F4B400] font-semibold tracking-wide mt-0.5">
                                            {T[role.id as RoleId].tagline}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[11px] font-mono text-[#DDDDDD] group-hover:text-[#BBBBBB] transition-colors">
                                    {String(roles.indexOf(role) + 1).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Features */}
                            <ul className="flex flex-col gap-2.5">
                                {T[role.id as RoleId].features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#555555] leading-[1.55]">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#BBBBBB] shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                href={role.cta.href}
                                className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-[#111111] border-b border-[#EAEAEA] pb-0.5 w-fit hover:border-[#F4B400] hover:text-[#F4B400] transition-colors"
                            >
                                {T[role.id as RoleId].cta}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
