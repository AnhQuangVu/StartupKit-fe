"use client";

import { useParams } from "next/navigation";
import { authApi } from "@/lib/api";
import type { Locale } from "@/lib/i18n";
import { useState } from "react";

interface OAuthButtonsProps {
    action: "login" | "register";
}

export default function OAuthButtons({ action }: OAuthButtonsProps) {
    const params = useParams();
    const locale = ((params?.locale as Locale) || "vi");
    const isVi = locale === "vi";
    const [loadingProvider, setLoadingProvider] = useState<"google" | "linkedin" | null>(null);

    const label = action === "login"
        ? (isVi ? "Tiếp tục với" : "Continue with")
        : (isVi ? "Đăng ký với" : "Sign up with");

    const handleOAuthRedirect = (provider: "google" | "linkedin") => {
        setLoadingProvider(provider);
        const url = provider === "google"
            ? authApi.getGoogleOAuthAuthorizeUrl()
            : authApi.getLinkedInOAuthAuthorizeUrl();
        window.location.href = url;
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Google OAuth2 Button */}
            <button
                type="button"
                disabled={loadingProvider !== null}
                onClick={() => handleOAuthRedirect("google")}
                className="flex items-center justify-center gap-3 w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#111111] hover:border-[#CCCCCC] hover:bg-[#FAFAFA] transition-colors cursor-pointer disabled:opacity-60"
            >
                {loadingProvider === "google" ? (
                    <span className="w-4 h-4 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                ) : (
                    <GoogleIcon />
                )}
                {loadingProvider === "google"
                    ? (isVi ? "Đang chuyển tiếp Google..." : "Connecting to Google...")
                    : `${label} Google`}
            </button>

            {/* LinkedIn OAuth2 Button */}
            <button
                type="button"
                disabled={loadingProvider !== null}
                onClick={() => handleOAuthRedirect("linkedin")}
                className="flex items-center justify-center gap-3 w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#111111] hover:border-[#0A66C2] hover:bg-[#F5F9FF] transition-colors cursor-pointer disabled:opacity-60"
            >
                {loadingProvider === "linkedin" ? (
                    <span className="w-4 h-4 border-2 border-[#0A66C2] border-t-transparent rounded-full animate-spin" />
                ) : (
                    <LinkedInIcon />
                )}
                {loadingProvider === "linkedin"
                    ? (isVi ? "Đang chuyển tiếp LinkedIn..." : "Connecting to LinkedIn...")
                    : `${label} LinkedIn`}
            </button>
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
                d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
                fill="#4285F4"
            />
            <path
                d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                fill="#34A853"
            />
            <path
                d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
                fill="#FBBC05"
            />
            <path
                d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                fill="#EA4335"
            />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
                d="M16.5 0H1.5C0.67 0 0 0.67 0 1.5V16.5C0 17.33 0.67 18 1.5 18H16.5C17.33 18 18 17.33 18 16.5V1.5C18 0.67 17.33 0 16.5 0ZM5.4 15.3H2.7V6.75H5.4V15.3ZM4.05 5.58C3.18 5.58 2.48 4.88 2.48 4.01C2.48 3.14 3.18 2.44 4.05 2.44C4.92 2.44 5.62 3.14 5.62 4.01C5.62 4.88 4.92 5.58 4.05 5.58ZM15.3 15.3H12.6V11.07C12.6 10.06 12.58 8.77 11.19 8.77C9.78 8.77 9.57 9.87 9.57 10.99V15.3H6.87V6.75H9.46V7.92H9.5C9.86 7.24 10.74 6.52 12.04 6.52C14.76 6.52 15.3 8.31 15.3 10.64V15.3Z"
                fill="#0A66C2"
            />
        </svg>
    );
}
