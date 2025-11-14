import React from "react";

export default function FeedbackButton({ formLink }) {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <a
                href={formLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#FFCE23] text-black px-4 py-3 rounded-full font-semibold shadow-lg hover:opacity-95 transition-opacity"
                aria-label="Feedback"
            >
                <span className="text-lg">✉️</span>
                <span className="hidden sm:inline">Góp ý</span>
            </a>
        </div>
    );
}
