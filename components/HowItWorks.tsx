const steps = [
    {
        number: "01",
        title: "Build Your Profile",
        description:
            "Create a founder profile that showcases your vision, team, and traction. Tell your story in minutes.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="5" y="5" width="22" height="22" rx="4" stroke="#111111" strokeWidth="1.5" fill="none" />
                <path d="M10 16 L22 16 M10 11 L18 11 M10 21 L16 21" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Connect with Mentors",
        description:
            "Get matched with experienced mentors from Vietnam and globally who align with your industry and stage.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="11" cy="13" r="5" stroke="#111111" strokeWidth="1.5" fill="none" />
                <circle cx="23" cy="13" r="4" stroke="#111111" strokeWidth="1.5" fill="none" />
                <path d="M4 26 C4 22 7 20 11 20 C15 20 18 22 18 26" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M23 20 C26 20 28 22 28 24" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Raise Capital",
        description:
            "Pitch to a curated network of investors with AI-powered matching to find the right funding partner for your vision.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 24 L10 17 L15 20 L21 12 L27 16" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="27" cy="12" r="3" stroke="#F4B400" strokeWidth="1.5" fill="none" />
                <path d="M6 28 L27 28" stroke="#111111" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.3" />
            </svg>
        ),
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-[#F7F7F7]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mx-auto max-w-[480px] mb-16">
                    <p className="text-[13px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                        How It Works
                    </p>
                    <h2 className="text-[32px] md:text-[38px] font-bold text-[#111111] leading-[1.2]">
                        Three steps to grow your startup
                    </h2>
                </div>

                {/* 3-col grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((s) => (
                        <div
                            key={s.number}
                            className="bg-white border border-[#EAEAEA] rounded-[8px] p-8 flex flex-col gap-5 hover:border-[#111111] transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                {s.icon}
                                <span className="text-[13px] font-mono font-semibold text-[#CCCCCC]">{s.number}</span>
                            </div>
                            <div>
                                <h3 className="text-[18px] font-semibold text-[#111111] mb-2">{s.title}</h3>
                                <p className="text-[14px] text-[#666666] leading-[1.65]">{s.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
