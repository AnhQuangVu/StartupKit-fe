import Image from "next/image";
import Link from "next/link";

const navLinks = [
    { label: "Explore", href: "#explore" },
    { label: "Mentors", href: "#mentors" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#" },
    { label: "About", href: "#" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
    return (
        <footer className="bg-[#F7F7F7] border-t border-[#EAEAEA]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-5">
                        <Image
                            src="/Logo.jpg"
                            alt="StartupKit"
                            width={120}
                            height={34}
                            className="h-8 w-auto object-contain"
                        />
                        <p className="text-[14px] text-[#666666] leading-[1.7] max-w-[240px]">
                            The founder platform connecting Vietnamese startups with global mentors and investors.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Twitter/X */}
                            <a href="#" aria-label="Twitter" className="text-[#999999] hover:text-[#111111] transition-colors">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M2 2l14 14M2 16L16 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" aria-label="LinkedIn" className="text-[#999999] hover:text-[#111111] transition-colors">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M6 8v5M6 6v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M10 13v-3c0-1 .5-2 2-2s2 1 2 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-[13px] font-semibold text-[#111111] uppercase tracking-widest mb-5">
                            Platform
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {navLinks.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="text-[14px] text-[#666666] hover:text-[#111111] transition-colors"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-[13px] font-semibold text-[#111111] uppercase tracking-widest mb-5">
                            Stay Updated
                        </h4>
                        <p className="text-[14px] text-[#666666] mb-4 leading-[1.65]">
                            Get weekly startup insights delivered to your inbox.
                        </p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] text-[#111111] placeholder:text-[#CCCCCC] focus:outline-none focus:border-[#111111] bg-white transition-colors"
                            />
                            <button className="bg-[#111111] text-white text-[14px] font-semibold py-2.5 rounded-[8px] iso-btn hover:bg-[#F4B400] hover:text-[#111111] transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-[#EAEAEA] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[13px] text-[#999999]">
                        © 2026 StartupKit. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {legalLinks.map((l) => (
                            <Link
                                key={l.label}
                                href={l.href}
                                className="text-[13px] text-[#999999] hover:text-[#111111] transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
