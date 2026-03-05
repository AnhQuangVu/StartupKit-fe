interface FundingProgressProps {
    committed: string;
    target: string;
    pct: number;
    label?: string;
}

export default function FundingProgress({ committed, target, pct, label = "Commitment progress" }: FundingProgressProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-[12px] text-[#555555] font-medium">
                    <span className="font-bold text-[#111111]">{committed}</span>
                    {" "}of {target}
                </span>
                <span className="text-[12px] font-bold text-[#F4B400]">{pct}%</span>
            </div>
            <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden" title={label}>
                <div
                    className="h-full bg-[#F4B400] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(pct, 100)}%` }}
                />
            </div>
            <p className="text-[11px] text-[#AAAAAA] mt-1">{label}</p>
        </div>
    );
}
