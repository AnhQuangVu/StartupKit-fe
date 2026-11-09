"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/lib/auth-context";
import type { Locale } from "@/lib/i18n";

interface OAuthButtonsProps {
    action: "login" | "register";
}

export default function OAuthButtons({ action }: OAuthButtonsProps) {
    const { socialLogin } = useAuth();
    const router = useRouter();
    const params = useParams();
    const locale = ((params?.locale as Locale) || "vi");
    const isVi = locale === "vi";

    const [activeProvider, setActiveProvider] = useState<"google" | "linkedin" | null>(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<UserRole>("STARTUP");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const label = action === "login"
        ? (isVi ? "Tiếp tục với" : "Continue with")
        : (isVi ? "Đăng ký bằng" : "Sign up with");

    const openModal = (provider: "google" | "linkedin") => {
        setActiveProvider(provider);
        if (provider === "google") {
            setEmail("founder.vietnam@gmail.com");
            setName("Nguyễn Minh Quân");
        } else {
            setEmail("quan.nguyen@linkedin.vn");
            setName("Nguyễn Minh Quân (LinkedIn)");
        }
        setRole("STARTUP");
    };

    const handleQuickAccount = async (preset: { email: string; name: string; role: UserRole }) => {
        if (!activeProvider) return;
        setIsSubmitting(true);
        try {
            await socialLogin({
                provider: activeProvider,
                email: preset.email,
                name: preset.name,
                role: preset.role,
            });
            setActiveProvider(null);
            router.push(`/${locale}/workspace/${preset.role.toLowerCase()}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCustomSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeProvider || !email.trim()) return;
        setIsSubmitting(true);
        try {
            await socialLogin({
                provider: activeProvider,
                email: email.trim(),
                name: name.trim() || email.split("@")[0],
                role,
            });
            setActiveProvider(null);
            router.push(`/${locale}/workspace/${role.toLowerCase()}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const quickAccounts: { email: string; name: string; role: UserRole; badge: string }[] = [
        {
            name: "Nguyễn Văn Minh (AgriBot AI)",
            email: activeProvider === "linkedin" ? "minh.agribot@linkedin.com" : "minh.agribot@gmail.com",
            role: "STARTUP",
            badge: isVi ? "Founder / Startup" : "Startup Founder",
        },
        {
            name: "Trần Bảo Ngọc (Mekong Ventures)",
            email: activeProvider === "linkedin" ? "ngoc.investor@linkedin.com" : "ngoc.investor@gmail.com",
            role: "INVESTOR",
            badge: isVi ? "Nhà đầu tư / VC" : "Investor / VC",
        },
        {
            name: "TS. Lê Hoàng An (Cố vấn chiến lược)",
            email: activeProvider === "linkedin" ? "an.mentor@linkedin.com" : "an.mentor@gmail.com",
            role: "MENTOR",
            badge: isVi ? "Chuyên gia / Mentor" : "Mentor / Advisor",
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-3">
                {/* Google */}
                <button
                    type="button"
                    onClick={() => openModal("google")}
                    className="flex items-center justify-center gap-3 w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#111111] hover:border-[#111111] hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                >
                    <GoogleIcon />
                    {label} Google
                </button>

                {/* LinkedIn */}
                <button
                    type="button"
                    onClick={() => openModal("linkedin")}
                    className="flex items-center justify-center gap-3 w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#111111] hover:border-[#0A66C2] hover:bg-[#F5F9FF] transition-colors cursor-pointer"
                >
                    <LinkedInIcon />
                    {label} LinkedIn
                </button>
            </div>

            {activeProvider && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4">
                    <div className="bg-white border border-[#EAEAEA] rounded-[14px] w-full max-w-[440px] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0]">
                            <div className="flex items-center gap-2.5">
                                {activeProvider === "google" ? <GoogleIcon /> : <LinkedInIcon />}
                                <div>
                                    <h3 className="text-[16px] font-bold text-[#111111]">
                                        {activeProvider === "google"
                                            ? (isVi ? "Xác thực tài khoản Google" : "Sign in with Google")
                                            : (isVi ? "Xác thực tài khoản LinkedIn" : "Sign in with LinkedIn")}
                                    </h3>
                                    <p className="text-[12px] text-[#888888]">
                                        {isVi
                                            ? "Chọn nhanh tài khoản có sẵn hoặc nhập thông tin của bạn"
                                            : "Choose a quick account or enter your details"}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveProvider(null)}
                                className="text-[#888888] hover:text-[#111111] text-[18px] font-bold px-2"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Quick 1-click accounts */}
                        <div className="mt-4">
                            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-2">
                                {isVi ? "Đăng nhập nhanh (1-Click)" : "1-Click Quick Sign In"}
                            </p>
                            <div className="space-y-2">
                                {quickAccounts.map((acc) => (
                                    <button
                                        key={acc.email}
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={() => handleQuickAccount(acc)}
                                        className="w-full flex items-center justify-between p-2.5 rounded-[8px] border border-[#EAEAEA] hover:border-[#F4B400] hover:bg-[#FFFDF5] transition-all text-left cursor-pointer"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-[13px] font-bold text-[#111111] truncate">{acc.name}</p>
                                            <p className="text-[11px] text-[#777777] truncate">{acc.email}</p>
                                        </div>
                                        <span className="text-[11px] font-bold bg-[#111111] text-[#F4B400] px-2.5 py-1 rounded-full shrink-0 ml-2">
                                            {acc.badge}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 my-4">
                            <div className="flex-1 h-px bg-[#EAEAEA]" />
                            <span className="text-[11px] text-[#999999] uppercase font-semibold">
                                {isVi ? "hoặc tùy chỉnh tài khoản" : "or custom account"}
                            </span>
                            <div className="flex-1 h-px bg-[#EAEAEA]" />
                        </div>

                        {/* Custom OAuth Form */}
                        <form onSubmit={handleCustomSubmit} className="space-y-3">
                            <div>
                                <label className="block text-[12px] font-semibold text-[#111111] mb-1">
                                    {isVi ? "Họ và tên" : "Full Name"}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-[#EAEAEA] rounded-[8px] px-3 py-2 text-[13px] outline-none focus:border-[#111111]"
                                />
                            </div>
                            <div>
                                <label className="block text-[12px] font-semibold text-[#111111] mb-1">
                                    Email ({activeProvider === "google" ? "Google" : "LinkedIn"})
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-[#EAEAEA] rounded-[8px] px-3 py-2 text-[13px] outline-none focus:border-[#111111]"
                                />
                            </div>
                            <div>
                                <label className="block text-[12px] font-semibold text-[#111111] mb-1">
                                    {isVi ? "Vai trò trên hệ sinh thái" : "Ecosystem Role"}
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(["STARTUP", "INVESTOR", "MENTOR"] as UserRole[]).map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setRole(r)}
                                            className={`py-2 px-2 rounded-[8px] text-[12px] font-bold border transition-all cursor-pointer ${
                                                role === r
                                                    ? "border-[#F4B400] bg-[#FFFBF0] text-[#111111]"
                                                    : "border-[#EAEAEA] text-[#666666] hover:border-[#CCCCCC]"
                                            }`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveProvider(null)}
                                    className="px-4 py-2 rounded-[8px] border border-[#EAEAEA] text-[13px] font-semibold text-[#555555] hover:text-[#111111]"
                                >
                                    {isVi ? "Hủy" : "Cancel"}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-5 py-2 rounded-[8px] bg-[#111111] text-white text-[13px] font-bold hover:bg-[#F4B400] hover:text-[#111111] transition-colors cursor-pointer"
                                >
                                    {isSubmitting
                                        ? (isVi ? "Đang xử lý..." : "Signing in...")
                                        : (isVi ? "Tiếp tục vào Workspace →" : "Continue to Workspace →")}
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
            <rect width="18" height="18" rx="3" fill="#0A66C2" />
            <path d="M4.5 7H6.5V13.5H4.5V7ZM5.5 6C4.95 6 4.5 5.55 4.5 5C4.5 4.45 4.95 4 5.5 4C6.05 4 6.5 4.45 6.5 5C6.5 5.55 6.05 6 5.5 6Z" fill="white" />
            <path d="M8 7H9.9V7.9H9.93C10.2 7.36 10.9 6.8 11.95 6.8C13.95 6.8 14.3 8.1 14.3 9.8V13.5H12.3V10.2C12.3 9.5 12.28 8.6 11.3 8.6C10.3 8.6 10.15 9.35 10.15 10.15V13.5H8.15V7H8Z" fill="white" />
        </svg>
    );
}
