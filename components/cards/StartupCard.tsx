import Link from "next/link";
import { useDictionary } from "@/lib/dict-context";

interface StartupCardProps {
    id: string;
    name: string;
    description: string;
    industry: string;
    stage: string;
    score: number;
    location: string;
    teamSize: string;
    traction?: string;
    logoColor: string;
    locale: string;
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
 * StartupCard — AngelList / Crunchbase deal-flow style.
 * Single logo top-left. NO cover image. NO stacked avatars. NO crowdfunding.
 * Layout: [Logo | Name + Industry · Stage · Location] → Description → Info tags → CTA
 */
export default function StartupCard({
    id, name, description, industry, stage, score,
    location, teamSize, traction, logoColor, locale,
}: StartupCardProps) {
    const dict = useDictionary();
    const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const stageColor = STAGE_COLORS[stage] ?? "#555555";

    return (
        <article className="
            bg-white border border-[#EAEAEA] rounded-[10px]
            flex flex-col h-full
            hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5
            transition-all duration-200
        ">
            {/* ── TOP ROW: Logo + Name + Meta ──────────── */}
            <div className="flex items-start gap-4 p-5 pb-4">
                {/* Logo block — single, square, initials */}
                <div
                    className="w-12 h-12 rounded-[8px] flex items-center justify-center text-white text-[13px] font-black shrink-0 shadow-sm"
                    style={{ backgroundColor: logoColor }}
                    aria-label={`${name} logo`}
                >
                    {initials}
                </div>

                {/* Name + quick meta */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-[#111111] leading-tight truncate">
                        {name}
                    </h3>
                    {/* Industry · Stage · Location in one compact row */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <span className="text-[11px] font-semibold text-[#555555]">{industry}</span>
                        <span className="text-[#CCCCCC]">·</span>
                        <span
                            className="text-[11px] font-bold px-2 py-0.5 rounded-full border"
                            style={{
                                color: stageColor,
                                backgroundColor: `${stageColor}10`,
                                borderColor: `${stageColor}30`,
                            }}
                        >
                            {stage}
                        </span>
                        <span className="text-[#CCCCCC]">·</span>
                        <span className="flex items-center gap-0.5 text-[11px] text-[#888888]">
                            <IconLocation /> {location}
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#F5F5F5] mx-5" />

            {/* ── DESCRIPTION ───────────────────────── */}
            <div className="px-5 py-4 flex-1">
                <p className="text-[13px] text-[#555555] leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>

            {/* ── INFO TAGS ROW ─────────────────────── */}
            <div className="px-5 pb-4 flex flex-wrap gap-2">
                {/* AI Score — gold accent */}
                <div className="flex items-center gap-1 bg-[#FFFBF0] border border-[#F4B400]/30 text-[#B88A00] px-2.5 py-1 rounded-full">
                    <IconAI />
                    <span className="text-[11px] font-bold">AI {score}</span>
                </div>

                {/* Team size */}
                <div className="flex items-center gap-1 bg-[#F5F5F5] text-[#555555] px-2.5 py-1 rounded-full">
                    <IconTeam />
                    <span className="text-[11px] font-semibold">{teamSize}</span>
                </div>

                {/* Traction if provided */}
                {traction && (
                    <div className="flex items-center gap-1 bg-[#F5F5F5] text-[#555555] px-2.5 py-1 rounded-full">
                        <IconTraction />
                        <span className="text-[11px] font-semibold">{traction}</span>
                    </div>
                )}
            </div>

            {/* ── BOTTOM CTA ────────────────────────── */}
            <div className="border-t border-[#F5F5F5] px-5 py-4">
                <Link
                    href={`/${locale}/project/${id}`}
                    className="
                        w-full flex items-center justify-center gap-1.5
                        text-[13px] font-semibold
                        bg-[#111111] text-white
                        py-2.5 rounded-[8px]
                        hover:bg-[#F4B400] hover:text-[#111111]
                        transition-colors
                    "
                >
                    {dict.card.viewProfile} →
                </Link>
            </div>
        </article>
    );
}
