import React from "react";

interface LogoProps {
    className?: string;
    variant?: "default" | "light" | "icon-only";
    height?: number;
}

export default function Logo({ className = "", variant = "default", height = 32 }: LogoProps) {
    const isLight = variant === "light";

    return (
        <div className={`flex items-center gap-2 select-none ${className}`}>
            {/* Modern Vector Mark */}
            <svg
                width={height}
                height={height}
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 transition-transform duration-200 group-hover:scale-105"
            >
                {/* Background soft rounded hex */}
                <rect width="36" height="36" rx="9" fill="#111111" />
                
                {/* Dynamic geometric launch mark in Vietnam Gold */}
                <path
                    d="M18 7L27 16L22.5 20.5L18 16L13.5 20.5L9 16L18 7Z"
                    fill="#F4B400"
                />
                <path
                    d="M18 17L23 22L20.5 24.5L18 22L15.5 24.5L13 22L18 17Z"
                    fill="#FFD54F"
                    opacity="0.9"
                />
                <circle cx="18" cy="27" r="2" fill="#F4B400" />
            </svg>

            {/* Typography */}
            {variant !== "icon-only" && (
                <div className="flex items-center tracking-tight leading-none">
                    <span
                        className={`text-[20px] font-black tracking-[-0.03em] ${
                            isLight ? "text-white" : "text-[#111111]"
                        }`}
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                        STARTUP
                    </span>
                    <span
                        className="text-[20px] font-black text-[#F4B400] tracking-[-0.03em] ml-0.5"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                        KIT
                    </span>
                </div>
            )}
        </div>
    );
}
