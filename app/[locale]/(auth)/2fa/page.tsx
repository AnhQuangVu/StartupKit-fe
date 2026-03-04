"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDictionary } from "@/lib/dict-context";

export default function TwoFAPage() {
    const { locale } = useParams<{ locale: string }>();
    const dict = useDictionary();
    const d = dict.auth.twofa;

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resent, setResent] = useState(false);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (i: number, val: string) => {
        if (!/^\d*$/.test(val)) return;
        const next = [...otp]; next[i] = val.slice(-1); setOtp(next); setError("");
        if (val && i < 5) inputs.current[i + 1]?.focus();
    };
    const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
    };
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = [...otp]; p.split("").forEach((ch, i) => { next[i] = ch; }); setOtp(next);
        inputs.current[Math.min(p.length, 5)]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length < 6) { setError("Please enter all 6 digits."); return; }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        if (code === "123456") window.location.href = `/${locale}/dashboard`;
        else setError("Invalid code. Please try again.");
        setLoading(false);
    };

    return (
        <div className="w-full max-w-[380px]">
            <Link href={`/${locale}`} className="inline-block mb-8">
                <Image src="/Logo.jpg" alt="StartupKit" width={120} height={34} className="h-8 w-auto object-contain" />
            </Link>

            <div className="flex items-center justify-center w-12 h-12 rounded-[12px] bg-[#F7F7F7] border border-[#EAEAEA] mb-6">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2L3 5.5V11C3 15.4 6.5 19.5 11 20C15.5 19.5 19 15.4 19 11V5.5L11 2Z" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                    <path d="M8 11l2 2 4-4" stroke="#F4B400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <h1 className="text-[26px] font-bold text-[#111111] mb-1">{d.title}</h1>
            <p className="text-[14px] text-[#888888] mb-8 leading-[1.6]">
                {d.sub1}<br />
                <span className="text-[#F4B400] font-medium">{d.sub2}</span>
            </p>

            <form onSubmit={handleSubmit} noValidate>
                <div className="flex gap-2 justify-between mb-6" onPaste={handlePaste}>
                    {otp.map((digit, i) => (
                        <input key={i} ref={(el) => { inputs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1}
                            value={digit} onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
                            className={`w-12 h-14 text-center text-[22px] font-bold border rounded-[8px] outline-none transition-all
                ${error ? "border-red-400 text-red-500 bg-red-50" : digit ? "border-[#F4B400] bg-[#FFFBF0] text-[#111111]" : "border-[#EAEAEA] focus:border-[#F4B400] text-[#111111]"}`}
                        />
                    ))}
                </div>
                {error && <p className="flex items-center gap-1.5 text-[13px] text-red-500 mb-4">{error}</p>}
                <button type="submit" disabled={loading || otp.join("").length < 6}
                    className="w-full bg-[#111111] text-white text-[15px] font-semibold py-3 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors disabled:opacity-50">
                    {loading ? d.loading : d.submit}
                </button>
            </form>

            <div className="mt-5 text-center">
                {resent
                    ? <p className="text-[13px] text-green-600 font-medium">{d.resent}</p>
                    : <p className="text-[13px] text-[#888888]">{d.noCode}{" "}
                        <button onClick={async () => { setResent(true); setOtp(["", "", "", "", "", ""]); setError(""); }} className="font-semibold text-[#111111] hover:text-[#F4B400] transition-colors">{d.resend}</button>
                    </p>
                }
            </div>

            <div className="mt-4 text-center">
                <Link href={`/${locale}/login`} className="text-[13px] text-[#AAAAAA] hover:text-[#555555]">{d.backToLogin}</Link>
            </div>

            <div className="mt-8 p-4 bg-[#F7F7F7] rounded-[8px] border border-[#EAEAEA]">
                <p className="text-[12px] text-[#888888] leading-[1.6]">
                    <strong className="text-[#555555]">{d.securityTitle}</strong> {d.securityNote}
                </p>
            </div>
        </div>
    );
}
