"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/lib/dict-context";

export default function ChatWidget() {
    const pathname = usePathname();
    const dict = useDictionary();
    const c = dict.chat;
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const isProjectCreateFlow =
        pathname?.includes("/workspace/startup/projects/create") ||
        pathname?.includes("/workspace/projects/create");

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    if (isProjectCreateFlow) return null;

    return (
        <>
            {open && <div className="fixed inset-0 z-40 md:hidden bg-black/20" onClick={() => setOpen(false)} />}

            <div
                className={`fixed bottom-0 right-0 z-50 flex flex-col bg-white border-l border-[#EAEAEA] transition-transform duration-300
          w-full md:w-[360px]
          ${open ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full"}`}
                style={{ top: 0, boxShadow: open ? "-4px 0 32px rgba(0,0,0,0.06)" : "none" }}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAEAEA]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center">
                            <ChatIcon className="text-white" size={14} />
                        </div>
                        <div>
                            <div className="text-[14px] font-semibold text-[#111111]">{c.title}</div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                <span className="text-[11px] text-[#999999]">{c.online}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setOpen(false)} aria-label="Close chat" className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#999999] hover:text-[#111111] hover:bg-[#F7F7F7] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#111111] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold text-[#F4B400]">SK</span>
                        </div>
                        <div className="bg-[#F7F7F7] rounded-[8px] rounded-tl-none px-4 py-3 max-w-[240px]">
                            <p className="text-[13px] text-[#333333] leading-[1.6]">{c.greeting}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pl-10">
                        {[c.opt1, c.opt2, c.opt3, c.opt4].map((opt) => (
                            <button key={opt} className="text-left text-[13px] text-[#111111] border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 hover:border-[#F4B400] hover:bg-[#FFFBF0] transition-colors">
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-[#EAEAEA]">
                    <div className="flex items-center gap-3 border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 focus-within:border-[#111111] transition-colors bg-white">
                        <input type="text" placeholder={c.placeholder} className="flex-1 text-[14px] text-[#111111] placeholder:text-[#CCCCCC] outline-none bg-transparent" />
                        <button aria-label="Send" className="w-7 h-7 rounded-[6px] bg-[#111111] flex items-center justify-center hover:bg-[#F4B400] transition-colors shrink-0">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-[11px] text-[#CCCCCC] text-center mt-2">{c.powered}</p>
                </div>
            </div>

            <button
                onClick={() => setOpen((p) => !p)}
                aria-label={open ? "Close chat" : "Open chat"}
                className="fixed bottom-6 right-6 z-50 w-[52px] h-[52px] rounded-full bg-[#111111] flex items-center justify-center border-2 border-transparent hover:border-[#F4B400] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.14)]"
            >
                <span className={`absolute inset-0 flex items-center justify-center transition-all ${open ? "opacity-0 rotate-90 scale-75" : "opacity-100"}`}>
                    <ChatIcon className="text-white" size={20} />
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all ${open ? "opacity-100" : "opacity-0 -rotate-90 scale-75"}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 3l10 10M13 3L3 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </span>
            </button>
        </>
    );
}

function ChatIcon({ className, size = 20 }: { className?: string; size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
            <path d="M17 10.5C17 14 13.866 17 10 17C8.76 17 7.6 16.68 6.6 16.12L3 17L4.02 13.64C3.38 12.68 3 11.52 3 10.5C3 6.86 6.134 4 10 4C13.866 4 17 6.86 17 10.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        </svg>
    );
}
