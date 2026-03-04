import { type Locale } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Feeds
import GuestMarketplaceFeed from "@/components/marketplace/GuestMarketplaceFeed";
import StartupMarketplaceFeed from "@/components/marketplace/StartupMarketplaceFeed";
import MentorMarketplaceFeed from "@/components/marketplace/MentorMarketplaceFeed";
import InvestorMarketplaceFeed from "@/components/marketplace/InvestorMarketplaceFeed";
import AdminOverviewFeed from "@/components/marketplace/AdminOverviewFeed";

type Role = "GUEST" | "STARTUP" | "MENTOR" | "INVESTOR" | "ADMIN";

// FIXME: Replace with real session fetch soon
async function getSession(): Promise<{ role: Role }> {
    // Hardcoded for architectural mockup. Change to test different views.
    return { role: "STARTUP" };
}

export default async function MarketplaceHome({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const session = await getSession();
    const role = session.role;

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar locale={locale as Locale} />
            <main className="flex-1">
                {role === "GUEST" && <GuestMarketplaceFeed />}
                {role === "STARTUP" && <StartupMarketplaceFeed />}
                {role === "MENTOR" && <MentorMarketplaceFeed />}
                {role === "INVESTOR" && <InvestorMarketplaceFeed />}
                {role === "ADMIN" && <AdminOverviewFeed />}
            </main>
            <Footer />
        </div>
    );
}
