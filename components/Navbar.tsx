"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useDictionary } from "@/lib/dict-context";
import { useAuth } from "@/lib/auth-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dict = useDictionary();
    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();
    const locale = (params?.locale as Locale) ?? "vi";
    const base = `/${locale}`;

    // Close dropdown on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdown(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Hide on auth pages
    const isAuthPage = pathname?.includes("/login") || pathname?.includes("/register") || pathname?.includes("/2fa");
    if (isAuthPage) return null;

    const navItems = [
        { label: dict.nav.market ?? "Khám phá", href: `${base}/market` },
        { label: dict.nav.startups ?? "Startup", href: `${base}/market/startups` },
        { label: dict.nav.mentors, href: `${base}/market/mentors` },
        { label: dict.nav.investments ?? "Đầu tư", href: `${base}/market/investments` },
    ];

    const isActive = (href: string) => {
        if (href === `${base}/market`) {
            // "Khám phá" tab only active on exact /market, not on sub-routes
            return pathname === href;
        }
        // For other tabs, use startsWith to include nested routes
        return pathname?.startsWith(href);
    };

    const handleLogout = () => {
        logout();
        setDropdown(false);
        router.push(base);
    };

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] transition-all">
            <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex items-center h-[72px] gap-8">

                {/* Logo & Network Tag */}
                <Link href={base} className="flex items-center shrink-0 mr-2 group">
                    <div className="flex items-center overflow-hidden h-8 w-[130px]">
                        <Image src="/Logo.jpg" alt="StartupKit" width={160} height={44}
                            className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
                            style={{ mixBlendMode: "multiply" }} priority />
                    </div>
                    <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 ml-3 rounded-full text-[11px] font-semibold bg-[#F7F7F7] text-[#555555] border border-[#EAEAEA] tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                        VENTURE NETWORK
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1.5 flex-1">
                    {navItems.map(item => {
                        const active = isActive(item.href);
                        return (
                            <Link key={item.href} href={item.href}
                                className={`text-[13.5px] font-medium px-3.5 py-1.5 rounded-[6px] whitespace-nowrap transition-all ${
                                    active
                                        ? "text-[#111111] bg-[#F7F7F7] font-semibold border border-[#EAEAEA]"
                                        : "text-[#555555] hover:text-[#111111] hover:bg-[#F9F9F9]"
                                }`}>
                                {item.label}
                            </Link>
                        );
                    })}
                    {/* Workspace link — only when authenticated */}
                    {isAuthenticated && (
                        <Link href={`${base}/workspace`}
                            className={`text-[13.5px] font-medium px-3.5 py-1.5 rounded-[6px] whitespace-nowrap transition-all ${
                                isActive(`${base}/workspace`)
                                    ? "text-[#111111] bg-[#F7F7F7] font-semibold border border-[#EAEAEA]"
                                    : "text-[#555555] hover:text-[#111111] hover:bg-[#F9F9F9]"
                            }`}>
                            {dict.nav.workspace ?? "Workspace"}
                        </Link>
                    )}
                </nav>

                {/* Right section */}
                <div className="hidden md:flex items-center gap-3.5 ml-auto shrink-0">
                    <LanguageSwitcher />

                    {isAuthenticated && user ? (
                        /* ── User dropdown ─────────────────────── */
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdown(o => !o)}
                                className="flex items-center gap-2 rounded-full border border-[#EAEAEA] pl-2 pr-3 py-1 hover:border-[#CCCCCC] transition-colors"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`https://i.pravatar.cc/40?u=${user.avatarSeed}`}
                                    alt={user.name}
                                    className="w-7 h-7 rounded-full object-cover" />
                                <span className="text-[13px] font-semibold text-[#111111] max-w-[100px] truncate">
                                    {user.name.split(" ").at(-1)}
                                </span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                                    <path d="M2 4l4 4 4-4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Dropdown panel */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-[220px] bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg overflow-hidden z-50">
                                    {/* User info */}
                                    <div className="px-4 py-3 border-b border-[#F0F0F0]">
                                        <p className="text-[13px] font-bold text-[#111111] truncate">{user.name}</p>
                                        <p className="text-[11px] text-[#888888] truncate">{user.email}</p>
                                        <span className="inline-block mt-1 text-[10px] font-bold bg-[#F4B400] text-[#111111] px-2 py-0.5 rounded-full">
                                            {user.role}
                                        </span>
                                    </div>
                                    {/* Menu items */}
                                    <div className="py-1">
                                        {[
                                             { label: "My Profile", href: `${base}/profile/${user.id}` },
                                             { label: "Workspace", href: `${base}/workspace` },
                                        ].map(item => (
                                            <Link key={item.href} href={item.href}
                                                onClick={() => setDropdown(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#333333] hover:bg-[#F9F9F9] transition-colors">
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="border-t border-[#F0F0F0] py-1">
                                        <button onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* ── Guest: Login + Register ──────────── */
                        <div className="flex items-center gap-2.5">
                            <Link href={`${base}/login`}
                                className="text-[13.5px] text-[#444444] hover:text-[#111111] px-3 py-1.5 rounded-[6px] hover:bg-[#F7F7F7] transition-all font-medium">
                                {dict.nav.login}
                            </Link>
                            <Link href={`${base}/register`}
                                className="text-[13.5px] font-semibold bg-[#111111] hover:bg-[#222222] text-white px-4 py-2 rounded-[8px] transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap">
                                {dict.nav.signup}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile */}
                <div className="md:hidden flex items-center gap-3 ml-auto">
                    <LanguageSwitcher />
                    <button className="flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                        <span className={`block h-0.5 w-6 bg-[#111111] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-[#111111] transition-all ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-[#111111] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-[#EAEAEA] px-6 py-6 flex flex-col gap-4">
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href}
                            className={`text-[15px] font-medium ${isActive(item.href) ? "text-[#F4B400]" : "text-[#111111]"}`}
                            onClick={() => setMenuOpen(false)}>
                            {item.label}
                        </Link>
                    ))}
                    {isAuthenticated && (
                        <Link href={`${base}/workspace`} className="text-[15px] font-medium text-[#111111]" onClick={() => setMenuOpen(false)}>
                            Workspace
                        </Link>
                    )}
                    <div className="border-t border-[#EAEAEA] pt-4 flex flex-col gap-3">
                        {isAuthenticated && user ? (
                            <>
                                <Link href={`${base}/profile/${user.id}`} className="text-[15px] text-[#111111]" onClick={() => setMenuOpen(false)}>My Profile</Link>
                                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left text-[15px] text-red-500">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href={`${base}/login`} className="text-[15px] text-[#111111]" onClick={() => setMenuOpen(false)}>{dict.nav.login}</Link>
                                <Link href={`${base}/register`} className="text-[15px] font-semibold bg-[#111111] text-white px-5 py-3 rounded-[8px] text-center" onClick={() => setMenuOpen(false)}>{dict.nav.signup}</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
