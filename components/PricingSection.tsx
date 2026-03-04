const plans = [
    {
        name: "Free",
        price: "0",
        currency: "USD",
        period: "forever",
        description: "For early-stage founders exploring the ecosystem.",
        features: [
            "Create founder profile",
            "Browse mentor directory",
            "3 mentor session requests/month",
            "Access community forum",
            "Basic AI pitch feedback",
        ],
        cta: "Get started free",
        highlight: false,
    },
    {
        name: "Premium",
        price: "29",
        currency: "USD",
        period: "per month",
        description: "For founders ready to scale and raise funding.",
        features: [
            "Everything in Free",
            "Unlimited mentor sessions",
            "Smart investor matching",
            "Full AI toolkit access",
            "Legal document generator",
            "Priority support",
            "Investor pitch review",
        ],
        cta: "Start free trial",
        highlight: true,
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-16 max-w-[480px]">
                    <p className="text-[13px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                        Pricing
                    </p>
                    <h2 className="text-[36px] md:text-[40px] font-bold text-[#111111] leading-[1.2]">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-[16px] text-[#666666] mt-4 leading-[1.7]">
                        Start free. Upgrade when you need more firepower.
                    </p>
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[820px]">
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            className={`rounded-[8px] p-8 flex flex-col gap-6 ${p.highlight
                                    ? "bg-[#111111] text-white border border-[#111111]"
                                    : "bg-white border border-[#EAEAEA]"
                                }`}
                        >
                            {/* Plan name */}
                            <div>
                                <div
                                    className={`text-[13px] font-semibold uppercase tracking-widest mb-3 ${p.highlight ? "text-[#F4B400]" : "text-[#999999]"
                                        }`}
                                >
                                    {p.name}
                                </div>
                                <div className="flex items-end gap-1.5">
                                    <span className={`text-[14px] ${p.highlight ? "text-[#999999]" : "text-[#999999]"}`}>
                                        {p.currency}
                                    </span>
                                    <span
                                        className={`text-[48px] font-bold leading-none ${p.highlight ? "text-white" : "text-[#111111]"
                                            }`}
                                    >
                                        {p.price}
                                    </span>
                                    <span className={`text-[14px] mb-1.5 ${p.highlight ? "text-[#999999]" : "text-[#999999]"}`}>
                                        / {p.period}
                                    </span>
                                </div>
                                <p
                                    className={`text-[14px] mt-2 leading-[1.6] ${p.highlight ? "text-[#AAAAAA]" : "text-[#666666]"
                                        }`}
                                >
                                    {p.description}
                                </p>
                            </div>

                            {/* Features */}
                            <ul className="flex flex-col gap-3">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-[14px]">
                                        <span
                                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${p.highlight ? "bg-[#F4B400]" : "bg-[#F7F7F7] border border-[#EAEAEA]"
                                                }`}
                                        >
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <path d="M1.5 4L3.5 6L6.5 2" stroke={p.highlight ? "#111111" : "#111111"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className={p.highlight ? "text-[#CCCCCC]" : "text-[#444444]"}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                href="/register"
                                className={`mt-auto inline-flex items-center justify-center text-[15px] font-semibold px-6 py-3 rounded-[8px] transition-colors ${p.highlight
                                        ? "bg-[#F4B400] text-[#111111] hover:bg-yellow-400"
                                        : "border border-[#EAEAEA] text-[#111111] hover:border-[#111111]"
                                    }`}
                            >
                                {p.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
