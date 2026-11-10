"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDictionary } from "@/lib/dict-context";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
    const { locale } = useParams<{ locale: string }>();
    const router = useRouter();
    const { login } = useAuth();
    const dict = useDictionary();
    const d = dict.auth.login;

    const [email, setEmail] = useState("");
    const [password, setPw] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [registeredNotice, setRegisteredNotice] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        const reg = params.get("registered");
        if (reg) {
            setEmail(reg);
            setRegisteredNotice(
                locale === "vi"
                    ? `Đăng ký tài khoản ${reg} thành công! Hãy nhập mật khẩu để đăng nhập.`
                    : `Account ${reg} registered successfully! Please enter your password to sign in.`
            );
        }
    }, [locale]);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!email) e.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
        if (!password) e.password = "Password is required.";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const user = await login(email, password);
            const rolePath = user.role === "STARTUP"
                ? "/workspace/startup"
                : user.role === "INVESTOR"
                    ? "/workspace/investor"
                    : user.role === "MENTOR"
                        ? "/workspace/mentor"
                        : user.role === "ADMIN"
                            ? "/workspace/admin"
                            : "/workspace";
            router.push(`/${locale}${rolePath}`);
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                form: error instanceof Error ? error.message : "Login failed. Please try again.",
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px]">
            <Link href={`/${locale}`} className="inline-block mb-8">
                <Logo height={34} />
            </Link>

            <h1 className="text-[26px] font-bold text-[#111111] mb-1">{d.title}</h1>
            <p className="text-[14px] text-[#888888] mb-6">{d.sub}</p>

            {registeredNotice && (
                <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-[8px] text-[13px] text-emerald-800 leading-relaxed flex items-center gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    {registeredNotice}
                </div>
            )}

            <OAuthButtons action="login" />

            <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[#EAEAEA]" />
                <span className="text-[12px] text-[#CCCCCC] font-medium">{d.orEmail}</span>
                <div className="flex-1 h-px bg-[#EAEAEA]" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div>
                    <label className="block text-[13px] font-semibold text-[#111111] mb-1.5">{d.email}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={d.emailPlaceholder}
                        className={`w-full border rounded-[8px] px-4 py-2.5 text-[14px] placeholder:text-[#CCCCCC] outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-[#EAEAEA] focus:border-[#F4B400]"}`} />
                    {errors.email && <p className="mt-1.5 text-[12px] text-red-500">{errors.email}</p>}
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[13px] font-semibold text-[#111111]">{d.password}</label>
                        <Link href="#" className="text-[12px] text-[#F4B400] font-medium hover:underline">{d.forgot}</Link>
                    </div>
                    <div className="relative">
                        <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPw(e.target.value)} placeholder={d.passwordPlaceholder}
                            className={`w-full border rounded-[8px] px-4 py-2.5 pr-11 text-[14px] placeholder:text-[#CCCCCC] outline-none transition-colors ${errors.password ? "border-red-400 bg-red-50" : "border-[#EAEAEA] focus:border-[#F4B400]"}`} />
                        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#555555]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                {showPw ? <path d="M2 2L14 14M6.5 6.7A2 2 0 009.3 9.5M4 4.4C2.5 5.5 1 8 1 8s2.5 5 7 5a8 8 0 003.6-.9M7 3.1A8 8 0 0115 8c-.4.9-1 1.8-1.8 2.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /> : <><path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" /></>}
                            </svg>
                        </button>
                    </div>
                    {errors.password && <p className="mt-1.5 text-[12px] text-red-500">{errors.password}</p>}
                </div>

                <button type="submit" disabled={loading}
                    className="w-full bg-[#111111] text-white text-[15px] font-semibold py-3 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors disabled:opacity-60 mt-1">
                    {loading ? d.loading : d.submit}
                </button>
                {errors.form && <p className="text-[12px] text-red-500">{errors.form}</p>}
            </form>

            <p className="text-center text-[13px] text-[#888888] mt-6">
                {d.noAccount}{" "}
                <Link href={`/${locale}/register`} className="font-semibold text-[#111111] hover:text-[#F4B400] transition-colors">{d.createAccount}</Link>
            </p>
        </div>
    );
}
