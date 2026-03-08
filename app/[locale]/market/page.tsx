"use client"

import GuestMarketplaceFeed from "@/components/marketplace/GuestMarketplaceFeed";
import StartupMarketplaceFeed from "@/components/marketplace/StartupMarketplaceFeed";
import MentorMarketplaceFeed from "@/components/marketplace/MentorMarketplaceFeed";
import InvestorMarketplaceFeed from "@/components/marketplace/InvestorMarketplaceFeed";
import AdminOverviewFeed from "@/components/marketplace/AdminOverviewFeed";

type Role = "GUEST" | "STARTUP" | "MENTOR" | "INVESTOR" | "ADMIN";

// FIXME: Replace with real session fetch
async function getSession(): Promise<{ role: Role }> {
    return { role: "GUEST" };
}

/**
 * LAYER 2 — Marketplace Home
 * URL: /[locale]/market
 * Navbar, Footer, ChatWidget injected by LocaleLayout — do NOT add them here.
 */
export default async function MarketHome() {
    const session = await getSession();
    const role = session.role;

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
