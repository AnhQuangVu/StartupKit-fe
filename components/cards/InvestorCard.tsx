import Link from "next/link";
import { useDictionary } from "@/lib/dict-context";

interface InvestorCardProps {
    id: string;
    firmName: string;
    focus: string[];          // investment domains
    stages: string[];         // preferred stages
    ticketMin: string;
    ticketMax: string;
    portfolio: number;        // companies invested
    avatarSeed: string;
    locale: string;
    coverUrl?: string;
    logoUrl?: string;
}

/**
 * InvestorCard — Investor / VC firm profile card for discovery.
 * Layout: photo/logo → firm name → focus tags → stages → ticket range → CTA
 * NOT a deal card — this is the investor profile on /market/investments.
 */
export default function InvestorCard({
    id, firmName, focus, stages, ticketMin, ticketMax, portfolio, avatarSeed, locale, coverUrl, logoUrl,
}: InvestorCardProps) {
    const dict = useDictionary();
    const photoSrc = coverUrl || (avatarSeed.startsWith("http") || avatarSeed.startsWith("/") ? avatarSeed : `https://picsum.photos/seed/${avatarSeed}vc/600/338`);
    return (
        <article className="bg-white border border-[#EAEAEA] rounded-[10px] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">

            {/* Firm photo / logo — 16:9 */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={photoSrc}
                    alt={firmName}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />
                {/* Portfolio badge */}
                <span className="absolute bottom-3 right-3 bg-white/90 text-[11px] font-bold text-[#111111] px-2.5 py-1 rounded-full">
                    {portfolio} {dict.card.portfolio}
                </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 gap-3">

                {/* Firm name */}
                <h3 className="text-[16px] font-bold text-[#111111] leading-tight">{firmName}</h3>

                {/* Investment focus chips */}
                <div className="flex flex-wrap gap-1.5">
                    {focus.map(f => (
                        <span key={f} className="text-[11px] font-semibold bg-[#FFFBF0] border border-[#F4B400] text-[#B88A00] px-2.5 py-1 rounded-full">
                            {f}
                        </span>
                    ))}
                </div>

                {/* Stage preferences */}
                <div className="flex flex-wrap gap-1.5">
                    {stages.map(s => (
                        <span key={s} className="text-[11px] font-semibold bg-[#F5F5F5] text-[#555555] px-2.5 py-1 rounded-full">
                            {s}
                        </span>
                    ))}
                </div>

                {/* Ticket size */}
                <div className="flex-1 flex items-end">
                    <div className="w-full border-t border-[#F0F0F0] pt-4">
                        <p className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wide mb-1">{dict.card.ticketSize}</p>
                        <p className="text-[15px] font-black text-[#111111]">{ticketMin} – {ticketMax}</p>
                    </div>
                </div>

                {/* CTA */}
                <Link
                    href={`/${locale}/profile/${id}`}
                    className="block text-center text-[12.5px] font-semibold bg-[#111111] text-white px-4 py-2.5 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors"
                >
                    {dict.card.viewProfile} →
                </Link>
            </div>
        </article>
    );
}
