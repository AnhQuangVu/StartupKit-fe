"use client";

import { useDictionary } from "@/lib/dict-context";

export default function StartupWorkspace() {
    const dict = useDictionary();

    return (
        <div className="p-8">
            <h1 className="text-[28px] font-bold text-[#111111] mb-6">
                {dict.roles.startup.label} Workspace
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-[#EAEAEA] rounded-[8px] bg-white">
                    <h2 className="text-[18px] font-bold mb-2">AI Pitch Builder</h2>
                    <p className="text-[14px] text-[#555555]">Edit your investment profile here.</p>
                </div>
                <div className="p-6 border border-[#EAEAEA] rounded-[8px] bg-white">
                    <h2 className="text-[18px] font-bold mb-2">Mentor Sessions</h2>
                    <p className="text-[14px] text-[#555555]">Manage your upcoming mentor meetings.</p>
                </div>
                <div className="p-6 border border-[#EAEAEA] rounded-[8px] bg-white">
                    <h2 className="text-[18px] font-bold mb-2">Active Deals</h2>
                    <p className="text-[14px] text-[#555555]">Track your active investment negotiations.</p>
                </div>
            </div>
        </div>
    );
}
