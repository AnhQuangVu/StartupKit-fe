const steps = [
    {
        id: "01",
        label: "Startup Input",
        desc: "Founders submit raw data: team, product, market, traction, and funding needs.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="3" y="3" width="16" height="16" rx="3" stroke="#111111" strokeWidth="1.4" fill="none" />
                <path d="M7 11h8M7 8h5M7 14h6" stroke="#111111" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "02",
        label: "AI Engine",
        desc: "Our AI processes and restructures the data into a standardized, investor-ready profile format.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="4" stroke="#F4B400" strokeWidth="1.4" fill="none" />
                <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.93 4.93l1.41 1.41M15.66 15.66l1.41 1.41M4.93 17.07l1.41-1.41M15.66 6.34l1.41-1.41" stroke="#111111" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "03",
        label: "Investment Profile",
        desc: "A structured, scored profile is generated — ready for investor review and matching.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 17 L8 11 L11 14 L15 8 L19 11" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="19" cy="8" r="2.5" stroke="#F4B400" strokeWidth="1.4" fill="none" />
            </svg>
        ),
    },
    {
        id: "04",
        label: "Investor Dashboard",
        desc: "Investors receive filtered, ranked deal flow — matched to their industry and stage preferences.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="2" stroke="#111111" strokeWidth="1.4" fill="none" />
                <rect x="12" y="3" width="7" height="7" rx="2" stroke="#111111" strokeWidth="1.4" fill="none" />
                <rect x="3" y="12" width="7" height="7" rx="2" stroke="#111111" strokeWidth="1.4" fill="none" />
                <rect x="12" y="12" width="7" height="7" rx="2" stroke="#F4B400" strokeWidth="1.4" fill="none" />
            </svg>
        ),
    },
];

export default function AIPitchBuilder() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Left: sticky header */}
                    <div className="md:sticky md:top-28">
                        <p className="text-[12px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                            AI Toolkit
                        </p>
                        <h2 className="text-[32px] md:text-[38px] font-bold text-[#111111] leading-[1.2] mb-4">
                            AI-Powered<br />Pitch Deck Builder
                        </h2>
                        <p className="text-[15px] text-[#666666] leading-[1.7] mb-6">
                            Founders enter unstructured data. Our AI engine converts it into a structured, investment-ready profile that matches investor expectations — automatically.
                        </p>
                        <div className="mb-6 p-4 bg-[#F7F7F7] border border-[#EAEAEA] rounded-[8px]">
                            <p className="text-[13px] text-[#555555] leading-[1.6]">
                                <strong className="text-[#111111]">No pitch deck design needed.</strong> The system handles
                                structure, scoring, and delivery to investors — you focus on building.
                            </p>
                        </div>
                        <a
                            href="/register?role=startup"
                            className="inline-flex items-center gap-2 bg-[#111111] text-white text-[14px] font-semibold px-6 py-3 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors"
                        >
                            Build with AI
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    {/* Right: flow steps */}
                    <div className="flex flex-col gap-0">
                        {steps.map((step, i) => (
                            <div key={step.id} className="flex items-stretch gap-4">
                                {/* Connector line */}
                                <div className="flex flex-col items-center">
                                    <div className="w-9 h-9 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center shrink-0 z-10">
                                        {step.icon}
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className="w-px flex-1 bg-[#EAEAEA] mt-1 mb-1" style={{ minHeight: "40px" }} />
                                    )}
                                </div>
                                {/* Content */}
                                <div className="pb-8 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[11px] font-mono text-[#CCCCCC]">{step.id}</span>
                                        <span className="text-[15px] font-semibold text-[#111111]">{step.label}</span>
                                    </div>
                                    <p className="text-[13px] text-[#777777] leading-[1.65]">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
