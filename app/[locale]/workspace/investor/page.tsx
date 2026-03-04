"use client";

import { useDictionary } from "@/lib/dict-context";

export default function InvestorWorkspace() {
    const dict = useDictionary();

    return (
        <div className="p-8">
            <h1 className="text-[28px] font-bold text-[#111111] mb-6">
                {dict.roles.investor.label} Workspace
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-[#F4B400] bg-[#FFFBF0] rounded-[8px]">
                    <h2 className="text-[18px] font-bold mb-2">Active Deals Pipeline</h2>
                    <p className="text-[14px] text-[#555555]">You are tracking 4 startups currently in due diligence.</p>
                </div>
                <div className="p-6 border border-[#EAEAEA] rounded-[8px] bg-white">
                    <h2 className="text-[18px] font-bold mb-2">New AI Matches</h2>
                    <p className="text-[14px] text-[#555555]">12 new profiles match your thesis this week.</p>
                </div>
            </div>
        </div>
    );
}
