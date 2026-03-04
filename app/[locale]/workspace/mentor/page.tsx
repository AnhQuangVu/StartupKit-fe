"use client";

import { useDictionary } from "@/lib/dict-context";

export default function MentorWorkspace() {
    const dict = useDictionary();

    return (
        <div className="p-8">
            <h1 className="text-[28px] font-bold text-[#111111] mb-6">
                {dict.roles.mentor.label} Workspace
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-[#EAEAEA] rounded-[8px] bg-white">
                    <h2 className="text-[18px] font-bold mb-2">Pending Requests</h2>
                    <p className="text-[14px] text-[#555555]">Review 3 startups requesting sessions.</p>
                </div>
                <div className="p-6 border border-[#EAEAEA] rounded-[8px] bg-white">
                    <h2 className="text-[18px] font-bold mb-2">My Credibility Score</h2>
                    <p className="text-[14px] text-[#555555]">Your current dynamic score is 92/100.</p>
                </div>
            </div>
        </div>
    );
}
