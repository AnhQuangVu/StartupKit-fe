"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/lib/auth-context";
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

    const [modalOpen, setModalOpen] = useState(false);
    const [provider, setProvider] = useState<"google" | "linkedin">("google");
    const [customEmail, setCustomEmail] = useState("");
    const [customName, setCustomName] = useState("");
    const [role, setRole] = useState<UserRole>("STARTUP");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const label = action === "login"
        ? (isVi ? "Tiếp tục với" : "Continue with")
        : (isVi ? "Đăng ký với" : "Sign up with");

    const openModal = (p: "google" | "linkedin") => {
        setProvider(p);
        setError("");
        setCustomEmail("");
        setCustomName("");
        setRole("STARTUP");
        setModalOpen(true);
    };

    const handleConfirmCustomLogin = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const trimmed = customEmail.trim();
        if (!trimmed) {
            setError(isVi ? "Vui lòng nhập địa chỉ email Google/Gmail của bạn." : "Please enter your Gmail address.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setError(isVi ? "Địa chỉ email không đúng định dạng." : "Invalid email address format.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const nameToUse = customName.trim() || trimmed.split("@")[0];
            const user = await loginWithOAuth(provider, trimmed, nameToUse, role);
            setModalOpen(false);
            const roleLower = user.role.toLowerCase();
            const target = user.role === "STARTUP" ? `/${locale}/workspace/startup/projects` : `/${locale}/workspace/${roleLower}`;
            router.push(target);
        } catch (err) {
            setError(err instanceof Error ? err.message : (isVi ? "Đăng nhập không thành công" : "Authentication failed"));
        } finally {
            setLoading(false);
        }
    };

    const handleDirectOAuthRedirect = () => {
        const url = provider === "google"
            ? authApi.getGoogleOAuthAuthorizeUrl()
            : authApi.getLinkedInOAuthAuthorizeUrl();
        window.location.href = url;
    };

    return (
        <>
            <div className="flex flex-col gap-3">
                {/* Google OAuth2 Button */}
                <button
                    type="button"
                    onClick={() => openModal("google")}
                    className="flex items-center justify-center gap-3 w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#111111] hover:border-[#CCCCCC] hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                >
                    <GoogleIcon />
                    {label} Google
                </button>

                {/* LinkedIn OAuth2 Button */}
                <button
                    type="button"
                    onClick={() => openModal("linkedin")}
                    className="flex items-center justify-center gap-3 w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#111111] hover:border-[#0A66C2] hover:bg-[#F5F9FF] transition-colors cursor-pointer"
                >
                    <LinkedInIcon />
                    {label} LinkedIn
                </button>
            </div>

            {/* Google / LinkedIn Real Account Dialog */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[440px] overflow-hidden border border-[#EAEAEA]">
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAFAFA]">
                            <div className="flex items-center gap-3">
                                {provider === "google" ? <GoogleIcon /> : <LinkedInIcon />}
                                <h3 className="text-[16px] font-bold text-[#111111]">
                                    {provider === "google"
                                        ? (isVi ? "Đăng nhập với Google" : "Sign in with Google")
                                        : (isVi ? "Đăng nhập với LinkedIn" : "Sign in with LinkedIn")}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#888888] hover:text-[#111111] hover:bg-[#EAEAEA] transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleConfirmCustomLogin} className="p-6 space-y-4">
                            <p className="text-[13px] text-[#666666] leading-relaxed">
                                {isVi
                                    ? `Nhập tài khoản ${provider === "google" ? "Gmail" : "LinkedIn"} thực tế của bạn để xác thực vào nền tảng:`
                                    : `Enter your real ${provider === "google" ? "Gmail" : "LinkedIn"} account to authenticate:`}
                            </p>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-[8px] text-[12px] text-red-600 font-medium">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-[12px] font-bold text-[#333333] uppercase tracking-wider mb-1.5">
                                    {provider === "google" ? "Email Google / Gmail *" : "Email LinkedIn *"}
                                </label>
                                <input
                                    type="email"
                                    value={customEmail}
                                    onChange={(e) => setCustomEmail(e.target.value)}
                                    placeholder={provider === "google" ? "vidu@gmail.com" : "you@company.com"}
                                    required
                                    className="w-full border border-[#EAEAEA] rounded-[8px] px-3.5 py-2.5 text-[14px] text-[#111111] outline-none focus:border-[#111111] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-[12px] font-bold text-[#333333] uppercase tracking-wider mb-1.5">
                                    {isVi ? "Họ và tên hiển thị" : "Display Name"}
                                </label>
                                <input
                                    type="text"
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    placeholder={isVi ? "Nguyễn Văn A" : "Alex Nguyen"}
                                    className="w-full border border-[#EAEAEA] rounded-[8px] px-3.5 py-2.5 text-[14px] text-[#111111] outline-none focus:border-[#111111] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-[12px] font-bold text-[#333333] uppercase tracking-wider mb-1.5">
                                    {isVi ? "Vai trò của bạn trên StartupKit" : "Your Role on StartupKit"}
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as UserRole)}
                                    className="w-full border border-[#EAEAEA] rounded-[8px] px-3.5 py-2.5 text-[13px] font-medium text-[#111111] bg-white outline-none focus:border-[#111111] transition-colors cursor-pointer"
                                >
                                    <option value="STARTUP">🚀 {isVi ? "Startup Founder (Nhà sáng lập)" : "Startup Founder"}</option>
                                    <option value="INVESTOR">💼 {isVi ? "Investor / VC (Nhà đầu tư)" : "Investor / VC"}</option>
                                    <option value="MENTOR">🎓 {isVi ? "Mentor (Cố vấn chuyên gia)" : "Mentor"}</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#111111] hover:bg-[#F4B400] hover:text-[#111111] text-white font-bold py-3 rounded-[8px] text-[14px] transition-colors cursor-pointer disabled:opacity-50 mt-2"
                            >
                                {loading
                                    ? (isVi ? "Đang xác thực..." : "Authenticating...")
                                    : (isVi ? `Đăng nhập với ${provider === "google" ? "Gmail này" : "LinkedIn này"}` : `Sign in with this ${provider}`)}
                            </button>

                            {/* Alternative: Direct Server OAuth2 Redirect */}
                            <div className="pt-3 border-t border-[#EAEAEA] text-center">
                                <button
                                    type="button"
                                    onClick={handleDirectOAuthRedirect}
                                    className="text-[12px] text-[#666666] hover:text-[#111111] underline transition-colors"
                                >
                                    {isVi
                                        ? "Hoặc chuyển tiếp đến máy chủ OAuth2 (Server Redirect) →"
                                        : "Or continue to OAuth2 Server Redirect →"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
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
