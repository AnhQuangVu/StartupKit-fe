export default function AIScoreBadge({ score }: { score: number }) {
    return (
        <span className="inline-flex items-center gap-1.5 border border-[#F4B400] text-[#F4B400] bg-[#FFFBF0] rounded-full px-3 py-1 text-sm font-bold whitespace-nowrap">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1l1.2 2.5 2.8.4-2 2 .5 2.8L6 7.4l-2.5 1.3.5-2.8-2-2 2.8-.4z" fill="#F4B400" />
            </svg>
            AI {score}
        </span>
    );
}
