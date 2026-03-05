"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useState } from "react";
import { IconSend } from "@/components/icons/WorkspaceIcons";

const CONVERSATIONS = [
    { id: "c1", name: "Dr. An Nguyen", role: "Mentor", seed: "drannguyen", lastMsg: "Looking forward to our session on Monday!", time: "2h", unread: 1 },
    { id: "c2", name: "Hung Le", role: "Mentor", seed: "hungle", lastMsg: "I reviewed your deck — a few comments below.", time: "1d", unread: 0 },
    { id: "c3", name: "Mekong Capital", role: "Investor", seed: "mekong", lastMsg: "Can you share your full pitch deck?", time: "2d", unread: 2 },
    { id: "c4", name: "Do Ventures", role: "Investor", seed: "doventures", lastMsg: "We'd like to schedule an intro call.", time: "3d", unread: 0 },
];

const MESSAGES_BY_CONV: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
    c1: [
        { from: "them", text: "Hi! I reviewed your startup profile. Very impressive traction.", time: "10:00 AM" },
        { from: "me", text: "Thank you, Dr. Nguyen! I'd love to get your feedback on our product strategy.", time: "10:05 AM" },
        { from: "them", text: "Of course. Let's schedule a session. How is Monday at 10 AM?", time: "10:10 AM" },
        { from: "me", text: "Monday works perfectly! Looking forward to it.", time: "10:12 AM" },
        { from: "them", text: "Looking forward to our session on Monday!", time: "10:14 AM" },
    ],
    c3: [
        { from: "them", text: "Hello! We came across your AgriBot startup profile. Impressive numbers.", time: "Yesterday" },
        { from: "me", text: "Thank you! We're excited to connect with Mekong Capital.", time: "Yesterday" },
        { from: "them", text: "Can you share your full pitch deck?", time: "Yesterday" },
    ],
};

export default function StartupMessagesPage() {
    const [activeId, setActiveId] = useState("c1");
    const [draft, setDraft] = useState("");
    const active = CONVERSATIONS.find(c => c.id === activeId)!;
    const messages = MESSAGES_BY_CONV[activeId] ?? [];

    return (
        <WorkspaceLayout title="Messages" subtitle="Mentor and investor conversations">
            <div className="bg-white border border-[#EAEAEA] rounded-[10px] overflow-hidden flex h-[calc(100vh-220px)] min-h-[500px]">

                {/* Conversation list */}
                <div className="w-[260px] border-r border-[#EAEAEA] flex flex-col shrink-0">
                    <div className="p-4 border-b border-[#EAEAEA]">
                        <p className="text-[12px] font-bold text-[#111111] uppercase tracking-wide">Conversations</p>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {CONVERSATIONS.map(c => (
                            <button key={c.id} onClick={() => setActiveId(c.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-[#F5F5F5] text-left transition-colors ${c.id === activeId ? "bg-[#FFFBF0]" : "hover:bg-[#F9F9F9]"
                                    }`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`https://i.pravatar.cc/36?u=${c.seed}`} alt={c.name}
                                    className="w-9 h-9 rounded-full object-cover border border-[#EAEAEA] shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <p className={`text-[13px] truncate ${c.id === activeId ? "font-bold text-[#111111]" : "font-medium text-[#333333]"}`}>{c.name}</p>
                                        <span className="text-[10px] text-[#AAAAAA] shrink-0 ml-1">{c.time}</span>
                                    </div>
                                    <p className="text-[11px] text-[#888888] truncate">{c.lastMsg}</p>
                                    <span className="text-[9px] font-bold text-[#888888]">{c.role}</span>
                                </div>
                                {c.unread > 0 && (
                                    <span className="w-4.5 h-4.5 min-w-[18px] bg-[#F4B400] text-[#111111] text-[9px] font-black rounded-full flex items-center justify-center shrink-0">
                                        {c.unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat window */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <div className="px-5 py-3.5 border-b border-[#EAEAEA] flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://i.pravatar.cc/36?u=${active.seed}`} alt={active.name}
                            className="w-8 h-8 rounded-full object-cover" />
                        <div>
                            <p className="text-[13px] font-bold text-[#111111]">{active.name}</p>
                            <p className="text-[10px] text-[#888888]">{active.role}</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[70%] rounded-[10px] px-4 py-2.5 ${msg.from === "me"
                                        ? "bg-[#111111] text-white"
                                        : "bg-[#F5F5F5] text-[#111111]"
                                    }`}>
                                    <p className="text-[13px] leading-snug">{msg.text}</p>
                                    <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-white/50" : "text-[#AAAAAA]"}`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="border-t border-[#EAEAEA] p-4 flex gap-3">
                        <input value={draft} onChange={e => setDraft(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter" && draft.trim()) setDraft(""); }}
                            placeholder="Type a message…"
                            className="flex-1 border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[13px] outline-none focus:border-[#111111] transition-colors" />
                        <button
                            onClick={() => setDraft("")}
                            className="w-10 h-10 bg-[#111111] text-white rounded-[8px] flex items-center justify-center hover:bg-[#F4B400] hover:text-[#111111] transition-colors shrink-0">
                            <IconSend className="text-current" />
                        </button>
                    </div>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
