"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LOCALES, type Locale } from "@/lib/i18n";

const LANG_LABELS: Record<Locale, string> = {
    en: "English",
    vi: "Tiếng Việt",
};

const FLAG: Record<Locale, string> = {
    en: "🇺🇸",
    vi: "🇻🇳",
};

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = (LOCALES.includes(segments[0] as Locale) ? segments[0] : "vi") as Locale;

    const switchLocale = (newLocale: Locale) => {
        setOpen(false);
        if (newLocale === currentLocale) return;
        const rest = segments.slice(1).join("/");
        const newPath = `/${newLocale}${rest ? `/${rest}` : ""}`;
        router.replace(newPath);
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    return (
        <div className="relative" ref={ref}>
            {/* Trigger button */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Switch language"
                aria-expanded={open}
                className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-[8px]
                    border text-[12px] font-semibold transition-colors
                    ${open
                        ? "border-[#F4B400] bg-[#FFFBF0] text-[#111111]"
                        : "border-[#EAEAEA] bg-white text-[#555555] hover:text-[#111111] hover:border-[#CCCCCC]"}
                `}
            >
                {/* Globe icon */}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
                    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7" cy="7" r="5.5" />
                    <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5" />
                    <path d="M1.5 7h11" />
                    <path d="M2 4.5h10M2 9.5h10" />
                </svg>
                <span className="font-black uppercase">{currentLocale}</span>
                {/* Chevron */}
                <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                    className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                >
                    <path d="M2 3.5l3 3 3-3" />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="
                    absolute right-0 top-full mt-1.5 w-40
                    bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg
                    py-1 z-50 overflow-hidden
                    animate-[fadeIn_0.1s_ease]
                ">
                    {LOCALES.map((locale) => (
                        <button
                            key={locale}
                            onClick={() => switchLocale(locale)}
                            className={`
                                w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-left transition-colors
                                ${locale === currentLocale
                                    ? "bg-[#FFFBF0] text-[#111111] font-bold"
                                    : "text-[#555555] hover:bg-[#F5F5F5] hover:text-[#111111]"}
                            `}
                        >
                            <span className="text-[15px] leading-none">{FLAG[locale]}</span>
                            <span className="flex-1">{LANG_LABELS[locale]}</span>
                            {locale === currentLocale && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                    stroke="#F4B400" strokeWidth="2" strokeLinecap="round">
                                    <path d="M2 6l3 3 5-5" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
