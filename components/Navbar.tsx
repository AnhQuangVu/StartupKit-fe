"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/lib/dict-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

export default function Navbar({ locale }: { locale: Locale }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const dict = useDictionary();
    const pathname = usePathname();

    const base = `/${locale}`;

    const navItems = [
        { label: dict.nav.ecosystem, href: `${base}#ecosystem` },
        { label: dict.nav.mentors, href: `${base}#mentors` },
        { label: dict.nav.pricing, href: `${base}#pricing` },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EAEAEA]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
                {/* Logo */}
                <Link href={base} className="flex items-center shrink-0">
                    <Image
                        src="/Logo.jpg"
                        alt="StartupKit"
                        width={140}
                        height={40}
                        className="h-9 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-[15px] text-[#111111] hover:text-[#F4B400] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <LanguageSwitcher />

                    <Link
                        href={`${base}/login`}
                        className="text-[15px] text-[#111111] hover:text-[#F4B400] transition-colors"
                    >
                        {dict.nav.login}
                    </Link>
                    <Link
                        href={`${base}/register`}
                        className="text-[15px] font-semibold bg-[#111111] text-white px-5 py-2.5 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors"
                    >
                        {dict.nav.signup}
                    </Link>
                </div>

                {/* Mobile: lang + hamburger */}
                <div className="md:hidden flex items-center gap-3">
                    <LanguageSwitcher />
                    <button
                        className="flex flex-col gap-1.5 p-1"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-0.5 w-6 bg-[#111111] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-[#111111] transition-all ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-[#111111] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-[#EAEAEA] px-6 py-6 flex flex-col gap-5">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href} className="text-[15px] text-[#111111]" onClick={() => setMenuOpen(false)}>
                            {item.label}
                        </Link>
                    ))}
                    <Link href={`${base}/login`} className="text-[15px] text-[#111111]" onClick={() => setMenuOpen(false)}>
                        {dict.nav.login}
                    </Link>
                    <Link
                        href={`${base}/register`}
                        className="text-[15px] font-semibold bg-[#111111] text-white px-5 py-3 rounded-[8px] text-center"
                        onClick={() => setMenuOpen(false)}
                    >
                        {dict.nav.signup}
                    </Link>
                </div>
            )}
        </header>
    );
}
