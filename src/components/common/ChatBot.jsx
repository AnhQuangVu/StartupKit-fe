import React, { useState } from "react";
import HomeOnlyChatbot from "./HomeOnlyChatbot";

export default function ChatBot() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed right-4 bottom-24 z-50">
            <div className="flex flex-col items-end">
                {open && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/30 md:hidden"
                            onClick={() => setOpen(false)}
                            aria-hidden="true"
                        />

                        <div className="w-full sm:w-80 md:w-96 bg-white rounded-xl shadow-lg mb-3 overflow-hidden">
                            <div className="h-[80vh] md:h-[520px]">
                                <HomeOnlyChatbot />
                            </div>
                        </div>
                    </>
                )}

                <button
                    onClick={() => setOpen((s) => !s)}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full shadow-lg"
                    aria-pressed={open}
                    aria-label={open ? 'Đóng trợ giúp' : 'Mở trợ giúp'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H6l-4 4V5z" />
                    </svg>
                    <span className="hidden md:inline">Trợ giúp</span>
                </button>
            </div>
        </div>
    );
}
