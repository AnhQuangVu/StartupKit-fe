"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import type { Locale } from "@/lib/i18n";
import {
    IconGrid, IconRocket, IconUsers, IconBriefcase, IconMessage, IconSettings,
    IconCalendar, IconStar, IconInbox, IconBarChart, IconShield, IconBell, IconUser,
} from "@/components/icons/WorkspaceIcons";

type NavItem = { labelKey: string; href: string; Icon: React.ComponentType<{ className?: string }> };
type NavDict = Record<string, NavItem[]>;

const SIDEBAR_NAV: NavDict = {
    STARTUP: [
        { labelKey: "dashboard", href: "", Icon: IconGrid },
        { labelKey: "myProjects", href: "projects", Icon: IconRocket },
        { labelKey: "mentorConns", href: "mentors", Icon: IconUsers },
        { labelKey: "investorConns", href: "investors", Icon: IconBriefcase },
        { labelKey: "messages", href: "messages", Icon: IconMessage },
        { labelKey: "settings", href: "settings", Icon: IconSettings },
    ],
    MENTOR: [
        { labelKey: "dashboard", href: "", Icon: IconGrid },
        { labelKey: "sessions", href: "sessions", Icon: IconCalendar },
        { labelKey: "startupReqs", href: "requests", Icon: IconInbox },
        { labelKey: "messages", href: "messages", Icon: IconMessage },
        { labelKey: "myProfile", href: "profile", Icon: IconUser },
        { labelKey: "settings", href: "settings", Icon: IconSettings },
    ],
    INVESTOR: [
        { labelKey: "dashboard", href: "", Icon: IconGrid },
        { labelKey: "dealFlow", href: "deals", Icon: IconBarChart },
        { labelKey: "savedStartups", href: "saved", Icon: IconStar },
        { labelKey: "messages", href: "messages", Icon: IconMessage },
        { labelKey: "myProfile", href: "profile", Icon: IconUser },
        { labelKey: "settings", href: "settings", Icon: IconSettings },
    ],
    ADMIN: [
        { labelKey: "dashboard", href: "", Icon: IconGrid },
        { labelKey: "userMgmt", href: "users", Icon: IconUsers },
        { labelKey: "startupApprovals", href: "approvals", Icon: IconRocket },
        { labelKey: "mentorVerification", href: "mentors", Icon: IconShield },
        { labelKey: "reports", href: "reports", Icon: IconBarChart },
        { labelKey: "settings", href: "settings", Icon: IconSettings },
    ],
};

interface WorkspaceLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

import { useDictionary } from "@/lib/dict-context";

export default function WorkspaceLayout({ children, title, subtitle, actions }: WorkspaceLayoutProps) {
    const dict = useDictionary();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
    const params = useParams();
    const pathname = usePathname();
    const locale = (params?.locale as Locale) ?? "vi";
    const role = user?.role ?? "STARTUP";
    const roleLower = role.toLowerCase();
    const base = role === "STARTUP" ? `/${locale}/workspace` : `/${locale}/workspace/${roleLower}`;
    const navItems = SIDEBAR_NAV[role] ?? SIDEBAR_NAV.STARTUP;

    // Active: exact match for dashboard, startsWith for sub-pages
    const isActive = (itemHref: string) => {
        const full = itemHref === "" ? base : `${base}/${itemHref}`;
        return itemHref === "" ? pathname === base : pathname?.startsWith(full);
    };

    return (
        <div className="pt-[72px] min-h-screen bg-[#F7F7F7] flex">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ── Sidebar ─────────────────────────────────── */}
            <aside className={`
                fixed top-[72px] left-0 h-[calc(100vh-72px)] w-[260px] bg-white border-r border-[#EAEAEA]
                flex flex-col z-40 transition-transform duration-200 shrink-0
                ${sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0"}
                md:sticky md:top-[72px]
            `}>
                {/* User info */}
                <div className="px-5 py-4 border-b border-[#EAEAEA] flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.pravatar.cc/48?u=${user?.avatarSeed}`}
                        alt={user?.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#EAEAEA] shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-bold text-[#111111] truncate leading-tight">{user?.name}</p>
                        <span className="inline-block mt-0.5 text-[9px] font-black tracking-wide bg-[#F4B400] text-[#111111] px-1.5 py-0.5 rounded-full">
                            {dict.common.roles[roleLower as keyof typeof dict.common.roles] ?? role}
                        </span>
                    </div>
                </div>

                {/* Nav items */}
                <nav className="flex-1 overflow-y-auto py-2">
                    {navItems.map(({ labelKey, href, Icon }) => {
                        const active = isActive(href);
                        return (
                            <Link key={href} href={href === "" ? base : `${base}/${href}`}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-5 py-[10px] text-[13px] font-medium transition-all
                                    ${active
                                        ? "text-[#F4B400] bg-[#FFFBF0] border-r-2 border-[#F4B400] font-semibold"
                                        : "text-[#555555] hover:text-[#111111] hover:bg-[#F5F5F5]"}
                                `}>
                                <Icon className={`shrink-0 ${active ? "text-[#F4B400]" : "text-[#111111]"}`} />
                                {dict.workspace.nav_links[labelKey as keyof typeof dict.workspace.nav_links] ?? labelKey}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom: marketplace link */}
                <div className="px-5 py-4 border-t border-[#EAEAEA]">
                    <Link href={`/${locale}/market`}
                        className="flex items-center gap-2 text-[12px] text-[#888888] hover:text-[#111111] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                            <path d="M7 1L1 7l6 6M1 7h12" />
                        </svg>
                        {dict.workspace.backToMarket}
                    </Link>
                </div>
            </aside>

            {/* ── Main area ───────────────────────────────── */}
            <div className="flex-1 min-w-0 flex flex-col">

                {/* Topbar */}
                <div className="bg-white border-b border-[#EAEAEA] px-6 md:px-8 py-0 flex items-center h-14 gap-4 sticky top-[72px] z-20">
                    {/* Mobile toggle */}
                    <button className="md:hidden p-1 text-[#555555]" onClick={() => setSidebarOpen(o => !o)}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                            <path d="M2 5h14M2 9h14M2 13h14" />
                        </svg>
                    </button>

                    {/* Page title */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-[16px] font-black text-[#111111] leading-none">{title}</h1>
                        {subtitle && <p className="text-[11px] text-[#888888] mt-0.5">{subtitle}</p>}
                    </div>

                    {/* Actions slot */}
                    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}

                    {/* Notification + avatar */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button className="relative p-1.5 text-[#555555] hover:text-[#111111] transition-colors">
                            <IconBell />
                            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#F4B400] rounded-full border border-white" />
                        </button>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://i.pravatar.cc/32?u=${user?.avatarSeed}`}
                            alt={user?.name}
                            className="w-7 h-7 rounded-full object-cover border border-[#EAEAEA]" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
