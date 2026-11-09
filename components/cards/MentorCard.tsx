import Link from "next/link";
import AIScoreBadge from "@/components/ui/AIScoreBadge";
import { useDictionary } from "@/lib/dict-context";

interface MentorCardProps {
    id: string;
    name: string;
    title: string;
    expertise: string[];
    bio: string;
    score: number;
    sessions: number;
    rate: string;
    avatarSeed: string;
    locale: string;
    avatarUrl?: string;
}

/**
 * MentorCard — Professional mentor profile card.
 * Layout: portrait photo → name + title → expertise chips → bio → score + CTA
 */
export default function MentorCard({
    id, name, title, expertise, bio, score, sessions, rate, avatarSeed, locale, avatarUrl,
}: MentorCardProps) {
    const dict = useDictionary();
    const photoSrc = avatarUrl || (avatarSeed.startsWith("http") || avatarSeed.startsWith("/") ? avatarSeed : `https://i.pravatar.cc/600?u=${avatarSeed}`);
    return (
        <article className="bg-white border border-[#EAEAEA] rounded-[10px] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">

            {/* Portrait photo — 16:9 */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={photoSrc}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                />
                {/* Online dot */}
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 text-[11px] font-semibold text-[#333333] px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                    {dict.card.available}
                </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 gap-3">

                {/* Name + title */}
                <div>
                    <h3 className="text-[16px] font-bold text-[#111111] leading-tight">{name}</h3>
                    <p className="text-[12px] text-[#888888] mt-0.5">{title}</p>
                </div>

                {/* Expertise chips */}
                <div className="flex flex-wrap gap-1.5">
                    {expertise.map(tag => (
                        <span key={tag} className="text-[11px] font-semibold bg-[#F5F5F5] text-[#444444] px-2.5 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Bio */}
                <p className="text-[13px] text-[#555555] leading-relaxed line-clamp-2 flex-1">
                    {bio}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-[12px] text-[#888888] border-t border-[#F0F0F0] pt-3">
                    <span><span className="font-bold text-[#111111]">{sessions}</span> {dict.card.sessions}</span>
                    <span className="font-bold text-[#111111] ml-auto">{rate}</span>
                </div>

                {/* Score + CTA */}
                <div className="flex items-center justify-between">
                    <AIScoreBadge score={score} />
                    <Link
                        href={`/${locale}/profile/${id}`}
                        className="text-[12.5px] font-semibold bg-[#111111] text-white px-4 py-2 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors whitespace-nowrap"
                    >
                        {dict.card.bookSession} →
                    </Link>
                </div>
            </div>
        </article>
    );
}
