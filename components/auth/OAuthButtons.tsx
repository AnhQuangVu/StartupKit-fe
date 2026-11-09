"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { authApi } from "@/lib/api";
import type { Locale } from "@/lib/i18n";
import { useState } from "react";

interface OAuthButtonsProps {
    action: "login" | "register";
}

export default function OAuthButtons({ action }: OAuthButtonsProps) {
    const params = useParams();
    const router = useRouter();
    const { loginWithOAuth } = useAuth();
    const locale = ((params?.locale as Locale) || "vi");
    const isVi = locale === "vi";
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

    const label = action === "login"
        ? (isVi ? "Tiếp tục với" : "Continue with")
        : (isVi ? "Đăng ký với" : "Sign up with");

    const handleOAuth = async (provider: "google" | "linkedin") => {
        try {
            setLoadingProvider(provider);
            const isProdBackend = process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost");
            const useRealOAuth = process.env.NEXT_PUBLIC_USE_REAL_OAUTH === "true";

            if (isProdBackend && useRealOAuth) {
                const url = provider === "google"
                    ? authApi.getGoogleOAuthAuthorizeUrl()
                    : authApi.getLinkedInOAuthAuthorizeUrl();
                window.location.href = url;
                return;
            }

            const user = await loginWithOAuth(provider);
            if (user) {
                const roleLower = user.role.toLowerCase();
                const target = user.role === "STARTUP" ? `/${locale}/workspace/startup/projects` : `/${locale}/workspace/${roleLower}`;
                router.push(target);
            }
        } catch (err) {
            console.error("OAuth error:", err);
        } finally {
            setLoadingProvider(null);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Google OAuth2 */}
            <button
                type="button"
                disabled={loadingProvider !== null}
                onClick={() => handleOAuth("google")}
                className="flex items-center justify-center gap-3 w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#111111] hover:border-[#CCCCCC] hover:bg-[#FAFAFA] transition-colors cursor-pointer disabled:opacity-60"
            >
                <GoogleIcon />
                {loadingProvider === "google" ? (isVi ? "Đang xác thực Google..." : "Connecting Google...") : `${label} Google`}
            </button>

            {/* LinkedIn OAuth2 */}
            <button
                type="button"
                disabled={loadingProvider !== null}
                onClick={() => handleOAuth("linkedin")}
                className="flex items-center justify-center gap-3 w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#111111] hover:border-[#0A66C2] hover:bg-[#F5F9FF] transition-colors cursor-pointer disabled:opacity-60"
            >
                <LinkedInIcon />
                {loadingProvider === "linkedin" ? (isVi ? "Đang xác thực LinkedIn..." : "Connecting LinkedIn...") : `${label} LinkedIn`}
            </button>
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM5.3 15.3H2.7V6.7h2.6v8.6zM4 5.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm11.3 9.8h-2.6v-4.2c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.3H7.1V6.7h2.5v1.2h.04c.35-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v4.7z" fill="#0A66C2" />
        </svg>
    );
}
