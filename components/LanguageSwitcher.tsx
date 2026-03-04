"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    // Extract current locale from first path segment
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = (LOCALES.includes(segments[0] as Locale) ? segments[0] : "vi") as Locale;

    const switchLocale = (newLocale: Locale) => {
        if (newLocale === currentLocale) return;
        // Replace first segment with new locale, keep rest of path
        const rest = segments.slice(1).join("/");
        const newPath = `/${newLocale}${rest ? `/${rest}` : ""}`;
        router.replace(newPath);
    };

    return (
        <div className="flex items-center border border-[#EAEAEA] rounded-[8px] overflow-hidden">
            {LOCALES.map((locale) => (
                <button
                    key={locale}
                    onClick={() => switchLocale(locale)}
                    aria-label={`Switch to ${locale.toUpperCase()}`}
                    className={`text-[12px] font-semibold px-3 py-1.5 transition-colors ${currentLocale === locale
                            ? "bg-[#F4B400] text-[#111111]"
                            : "text-[#999999] hover:text-[#111111] bg-white"
                        }`}
                >
                    {locale.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
