import Link from "next/link";
import { useDictionary } from "@/lib/dict-context";

interface StartupCardProps {
    id: string;
    name: string;
    tagline: string;
    description: string;
    industry: string;
    stage: string;
    score: number;
    location: string;
    teamSize: string;
    traction?: string;
    logoColor: string;
    locale: string;
    coverImage?: string;
    founderName?: string;
    founderAvatar?: string;
}

/** Inline SVG icons — stroke currentColor, 14×14. Colors: black / gold / white only. */
function IconLocation() {
    return (
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 1C4.8 1 3 2.8 3 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" />
            <circle cx="7" cy="5" r="1.2" />
        </svg>
    );
}
function IconTeam() {
    return (
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="4.5" r="2" />
            <path d="M1 13c0-2.2 1.8-4 4-4s4 1.8 4 4" />
            <circle cx="10.5" cy="4.5" r="1.5" />
            <path d="M13 13c0-1.7-1.1-3-2.5-3.5" />
        </svg>
    );
}
function IconAI() {
    return (
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="7,1 9,5 13,5.5 10,8.5 10.8,13 7,11 3.2,13 4,8.5 1,5.5 5,5" />
        </svg>
    );
}
function IconTraction() {
    return (
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1,11 4,7 7,9 10,4 13,2" />
            <path d="M10,2h3v3" />
        </svg>
    );
}

const STAGE_COLORS: Record<string, string> = {
    "Pre-seed": "#555555",
    "Seed": "#3D6B35",
    "Series A": "#1A3A5C",
    "Series B": "#7B2D8B",
    "Series B+": "#7B2D8B",
};

/**
 * StartupCard — Storytelling-focused design with cover image.
 * Layout: Cover Image (with logo overlay) → Founder + Name → Tagline → Meta → AI Score → CTA
 * Inspired by Product Hunt + AngelList but more visual storytelling.
 */
export default function StartupCard({
    id, name, tagline, description, industry, stage, score,
    location, teamSize, traction, logoColor, locale,
    coverImage, founderName, founderAvatar,
}: StartupCardProps) {
    const dict = useDictionary();
    const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const stageColor = STAGE_COLORS[stage] ?? "#555555";

    return (
        <article className="
            group
            bg-white border border-[#EAEAEA] rounded-[12px]
            overflow-hidden
            flex flex-col h-full
            hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1
            hover:border-[#F4B400]
            transition-all duration-300
        ">
            {/* ── COVER IMAGE SECTION ──────────────── */}
            <div className="relative w-full bg-gradient-to-br from-[#F5F5F5] to-[#E8E8E8]" style={{ paddingTop: '56.25%' }}>
                {/* Cover image */}
                {coverImage ? (
                    <div className="absolute inset-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={coverImage}
                            alt={`${name} cover`}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay for better logo visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>
                ) : (
                    /* Fallback pattern if no cover image */
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[80px] opacity-10">{initials}</div>
                    </div>
                )}

                {/* Logo overlaid at bottom-left */}
                <div
                    className="absolute bottom-4 left-4 w-16 h-16 rounded-[10px] flex items-center justify-center text-white text-[16px] font-black shadow-lg border-2 border-white"
                    style={{ backgroundColor: logoColor }}
                    aria-label={`${name} logo`}
                >
                    {initials}
                </div>

                {/* AI Score badge at top-right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <IconAI />
                    <span className="text-[12px] font-bold text-[#111111]">{score}</span>
                </div>
            </div>

            {/* ── CONTENT SECTION ───────────────────── */}
            <div className="flex flex-col flex-1 p-5">
                {/* Founder info */}
                {founderName && (
                    <div className="flex items-center gap-2 mb-3">
                        {founderAvatar ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={founderAvatar}
                                alt={founderName}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-[#E8E8E8] flex items-center justify-center text-[10px] font-bold text-[#888888]">
                                {founderName.charAt(0)}
                            </div>
                        )}
                        <span className="text-[11px] text-[#888888] font-medium">{founderName}</span>
                    </div>
                )}

                {/* Startup name */}
                <h3 className="text-[18px] font-bold text-[#111111] leading-tight mb-2">
                    {name}
                </h3>

                {/* Tagline */}
                <p className="text-[13px] text-[#555555] leading-relaxed mb-4 line-clamp-2">
                    {tagline}
                </p>

                {/* Meta info row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                        style={{
                            color: stageColor,
                            backgroundColor: `${stageColor}10`,
                            borderColor: `${stageColor}30`,
                        }}
                    >
                        {stage}
                    </span>
                    <span className="text-[11px] font-semibold text-[#555555] bg-[#F5F5F5] px-2.5 py-1 rounded-full">
                        {industry}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#888888]">
                        <IconLocation /> {location}
                    </span>
                </div>

                {/* Traction highlight */}
                {traction && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-[#F9F9F9] rounded-[8px] border border-[#EAEAEA]">
                        <IconTraction />
                        <span className="text-[12px] font-semibold text-[#111111]">{traction}</span>
                    </div>
                )}

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA Button */}
                <Link
                    href={`/${locale}/project/${id}`}
                    className="
                        w-full flex items-center justify-center gap-2
                        text-[13px] font-bold
                        bg-[#111111] text-white
                        px-5 py-3 rounded-[8px]
                        group-hover:bg-[#F4B400] group-hover:text-[#111111]
                        transition-all duration-300
                    "
                >
                    {dict.card.viewProfile}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 7h10M9 3l4 4-4 4" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
