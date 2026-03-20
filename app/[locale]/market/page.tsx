"use client";

import { useAuth } from "@/lib/auth-context";
import GuestMarketplaceFeed from "@/components/marketplace/GuestMarketplaceFeed";
import StartupMarketplaceFeed from "@/components/marketplace/StartupMarketplaceFeed";
import MentorMarketplaceFeed from "@/components/marketplace/MentorMarketplaceFeed";
import InvestorMarketplaceFeed from "@/components/marketplace/InvestorMarketplaceFeed";
import AdminOverviewFeed from "@/components/marketplace/AdminOverviewFeed";

/**
 * LAYER 2 — Marketplace Home
 * URL: /[locale]/market
 * Navbar, Footer, ChatWidget injected by LocaleLayout — do NOT add them here.
 */
export default function MarketHome() {
    const { user } = useAuth();
    const role = user?.role ?? "GUEST";

    return (
        <>
            {role === "GUEST" && <GuestMarketplaceFeed />}
            {role === "STARTUP" && <StartupMarketplaceFeed />}
            {role === "MENTOR" && <MentorMarketplaceFeed />}
            {role === "INVESTOR" && <InvestorMarketplaceFeed />}
            {role === "ADMIN" && <AdminOverviewFeed />}
        </>
    );
}
