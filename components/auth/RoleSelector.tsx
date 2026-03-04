"use client";

type Role = "startup" | "mentor" | "investor";

const roles: { value: Role; label: string; desc: string; icon: React.ReactNode }[] = [
    {
        value: "startup",
        label: "Startup",
        desc: "Build, pitch, and grow your startup",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2 L17 7 V14 L10 18 L3 14 V7 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
                <path d="M10 2 V18 M3 7 L17 7" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
            </svg>
        ),
    },
    {
        value: "mentor",
        label: "Mentor",
        desc: "Guide founders with your expertise",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="8" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <path d="M2 17 C2 14 5 12 8 12 C11 12 14 14 14 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <path d="M15 8 L17 10 L15 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        value: "investor",
        label: "Investor",
        desc: "Discover and fund high-potential startups",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 14 L7 9 L11 11 L16 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
            </svg>
        ),
    },
];

interface RoleSelectorProps {
    value: Role | "";
    onChange: (role: Role) => void;
    error?: string;
}

export default function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
    return (
        <div>
            <label className="block text-[13px] font-semibold text-[#111111] mb-2">
                I am a <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
                {roles.map((r) => {
                    const selected = value === r.value;
                    return (
                        <button
                            key={r.value}
                            type="button"
                            onClick={() => onChange(r.value)}
                            className={`flex flex-col items-center gap-2 px-3 py-4 rounded-[8px] border text-center transition-all
                ${selected
                                    ? "border-[#F4B400] bg-[#FFFBF0] text-[#111111]"
                                    : "border-[#EAEAEA] bg-white text-[#666666] hover:border-[#CCCCCC]"
                                }`}
                        >
                            <span className={selected ? "text-[#111111]" : "text-[#888888]"}>{r.icon}</span>
                            <div>
                                <div className={`text-[13px] font-semibold ${selected ? "text-[#111111]" : "text-[#555555]"}`}>
                                    {r.label}
                                </div>
                                <div className="text-[11px] text-[#999999] leading-[1.4] mt-0.5 hidden sm:block">
                                    {r.desc}
                                </div>
                            </div>
                            {selected && (
                                <span className="w-4 h-4 rounded-full bg-[#F4B400] flex items-center justify-center">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M1.5 4L3.5 6L6.5 2" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
            {error && <p className="mt-2 text-[12px] text-red-500">{error}</p>}
        </div>
    );
}
