"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDictionary } from "@/lib/dict-context";
import OAuthButtons from "@/components/auth/OAuthButtons";
import RoleSelector from "@/components/auth/RoleSelector";
import { useAuth } from "@/lib/auth-context";

type Role = "startup" | "mentor" | "investor";

interface FormState {
    fullName: string; email: string; password: string;
    confirmPassword: string; role: Role | ""; agreeTerms: boolean;
}

export default function RegisterPage() {
    const { locale } = useParams<{ locale: string }>();
    const router = useRouter();
    const { register } = useAuth();
    const dict = useDictionary();
    const d = dict.auth.register;

    const [form, setForm] = useState<FormState>({ fullName: "", email: "", password: "", confirmPassword: "", role: "", agreeTerms: false });
    const [showPw, setShowPw] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);
    const [submitError, setSubmitError] = useState("");

    const set = (key: keyof FormState, value: string | boolean) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const validateStep1 = () => {
        const e: Partial<Record<keyof FormState, string>> = {};
        if (!form.fullName.trim()) e.fullName = "Full name is required.";
        if (!form.email) e.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
        if (!form.password) e.password = "Password is required.";
        else if (form.password.length < 8) e.password = "Min. 8 characters.";
        if (!form.confirmPassword) e.confirmPassword = "Please confirm your password.";
        else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
        setErrors(e); return !Object.keys(e).length;
    };
    const validateStep2 = () => {
        const e: Partial<Record<keyof FormState, string>> = {};
        if (!form.role) e.role = "Please select a role.";
        if (!form.agreeTerms) e.agreeTerms = "You must agree to Terms.";
        setErrors(e); return !Object.keys(e).length;
    };

    const pwStrength = (() => {
        let s = 0; const p = form.password;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();
    const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
    const strengthLabels = [d.pwWeak, d.pwFair, d.pwGood, d.pwStrong];

    return (
        <div className="w-full max-w-[420px]">
            <Link href={`/${locale}`} className="inline-block mb-8">
                <Logo height={34} />
            </Link>

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${step >= s ? "bg-[#111111] text-white" : "bg-[#EAEAEA] text-[#999999]"}`}>
                                {step > s ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : s}
                            </div>
                            {s < 2 && <div className={`w-8 h-px ${step > s ? "bg-[#111111]" : "bg-[#EAEAEA]"}`} />}
                        </div>
                    ))}
                    <span className="ml-2 text-[12px] text-[#999999]">{d.step} {step} {d.of} 2</span>
                </div>
                <h1 className="text-[26px] font-bold text-[#111111]">{step === 1 ? d.title1 : d.title2}</h1>
                <p className="text-[14px] text-[#888888] mt-1">{step === 1 ? d.sub1 : d.sub2}</p>
            </div>

            {step === 1 ? (
                <>
                    <OAuthButtons action="register" />
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-[#EAEAEA]" />
                        <span className="text-[12px] text-[#CCCCCC] font-medium">{d.orEmail}</span>
                        <div className="flex-1 h-px bg-[#EAEAEA]" />
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); if (validateStep1()) setStep(2); }} noValidate className="flex flex-col gap-4">
                        {[
                            { key: "fullName" as const, label: d.fullName, ph: d.fullNamePlaceholder, type: "text" },
                            { key: "email" as const, label: d.email, ph: d.emailPlaceholder, type: "email" },
                        ].map(({ key, label, ph, type }) => (
                            <div key={key}>
                                <label className="block text-[13px] font-semibold text-[#111111] mb-1.5">{label} <span className="text-red-500">*</span></label>
                                <input type={type} value={form[key] as string} onChange={(e) => set(key, e.target.value)} placeholder={ph}
                                    className={`w-full border rounded-[8px] px-4 py-2.5 text-[14px] placeholder:text-[#CCCCCC] outline-none transition-colors ${errors[key] ? "border-red-400 bg-red-50" : "border-[#EAEAEA] focus:border-[#F4B400]"}`} />
                                {errors[key] && <p className="mt-1.5 text-[12px] text-red-500">{errors[key]}</p>}
                            </div>
                        ))}
                        <div>
                            <label className="block text-[13px] font-semibold text-[#111111] mb-1.5">{d.password} <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder={d.passwordPlaceholder}
                                    className={`w-full border rounded-[8px] px-4 py-2.5 pr-11 text-[14px] placeholder:text-[#CCCCCC] outline-none transition-colors ${errors.password ? "border-red-400 bg-red-50" : "border-[#EAEAEA] focus:border-[#F4B400]"}`} />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" /></svg>
                                </button>
                            </div>
                            {form.password && (
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex gap-1 flex-1">{[0, 1, 2, 3].map((i) => <div key={i} className={`h-1 flex-1 rounded-full ${i < pwStrength ? strengthColors[pwStrength - 1] : "bg-[#EAEAEA]"}`} />)}</div>
                                    <span className="text-[11px] text-[#888888]">{strengthLabels[pwStrength - 1] ?? ""}</span>
                                </div>
                            )}
                            {errors.password && <p className="mt-1.5 text-[12px] text-red-500">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-[#111111] mb-1.5">{d.confirmPassword} <span className="text-red-500">*</span></label>
                            <input type="password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} placeholder={d.confirmPasswordPlaceholder}
                                className={`w-full border rounded-[8px] px-4 py-2.5 text-[14px] placeholder:text-[#CCCCCC] outline-none transition-colors ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-[#EAEAEA] focus:border-[#F4B400]"}`} />
                            {errors.confirmPassword && <p className="mt-1.5 text-[12px] text-red-500">{errors.confirmPassword}</p>}
                        </div>
                        <button type="submit" className="w-full bg-[#111111] text-white text-[15px] font-semibold py-3 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors mt-1">{d.next}</button>
                    </form>
                </>
            ) : (
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!validateStep2() || !form.role) return;
                    setSubmitError("");
                    setLoading(true);

                    try {
                        const roleMap = {
                            startup: "STARTUP",
                            mentor: "MENTOR",
                            investor: "INVESTOR",
                        } as const;

                        await register({
                            fullName: form.fullName.trim(),
                            email: form.email.trim(),
                            password: form.password,
                            confirmPassword: form.confirmPassword,
                            userType: roleMap[form.role],
                        });

                        router.push(`/${locale}/login?registered=${encodeURIComponent(form.email.trim())}`);
                    } catch (error) {
                        setSubmitError(error instanceof Error ? error.message : "Registration failed. Please try again.");
                    } finally {
                        setLoading(false);
                    }
                }} noValidate className="flex flex-col gap-6">
                    <RoleSelector value={form.role} onChange={(r) => set("role", r)} error={errors.role} />
                    {form.role === "investor" && (
                        <div className="flex items-start gap-3 bg-[#FFFBF0] border border-[#F4B400]/40 rounded-[8px] px-4 py-3">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0"><circle cx="8" cy="8" r="7" stroke="#F4B400" strokeWidth="1.4" /><path d="M8 5v4M8 11h.01" stroke="#F4B400" strokeWidth="1.4" strokeLinecap="round" /></svg>
                            <p className="text-[12px] text-[#775500] leading-[1.6]"><strong>{d.investorNoticeTitle}</strong> {d.investorNotice}</p>
                        </div>
                    )}
                    <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                            <div onClick={() => set("agreeTerms", !form.agreeTerms)} className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 cursor-pointer ${form.agreeTerms ? "bg-[#111111] border-[#111111]" : "border-[#CCCCCC]"}`}>
                                {form.agreeTerms && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                            <span className="text-[13px] text-[#555555] leading-[1.5]">
                                {d.terms1}{" "}
                                <Link href="#" className="text-[#111111] font-semibold hover:text-[#F4B400] underline underline-offset-2">{d.termsLink}</Link>{" "}
                                {d.and}{" "}
                                <Link href="#" className="text-[#111111] font-semibold hover:text-[#F4B400] underline underline-offset-2">{d.privacyLink}</Link>
                            </span>
                        </label>
                        {errors.agreeTerms && <p className="mt-1.5 text-[12px] text-red-500">{errors.agreeTerms}</p>}
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setStep(1)} className="flex-1 border border-[#EAEAEA] text-[#111111] text-[15px] font-semibold py-3 rounded-[8px] hover:border-[#111111] transition-colors">{d.back}</button>
                        <button type="submit" disabled={loading} className="flex-1 bg-[#111111] text-white text-[15px] font-semibold py-3 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors disabled:opacity-60">{loading ? d.loading : d.submit}</button>
                    </div>
                    {submitError ? <p className="text-[12px] text-red-500">{submitError}</p> : null}
                </form>
            )}

            <p className="text-center text-[13px] text-[#888888] mt-6">
                {d.haveAccount}{" "}
                <Link href={`/${locale}/login`} className="font-semibold text-[#111111] hover:text-[#F4B400] transition-colors">{d.signin}</Link>
            </p>
        </div>
    );
}
