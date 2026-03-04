import EcosystemMapHero from "@/components/EcosystemMapHero";
import EcosystemStats from "@/components/EcosystemStats";
import RoleEcosystem from "@/components/RoleEcosystem";
import AIPitchBuilder from "@/components/AIPitchBuilder";
import MatchingEngine from "@/components/MatchingEngine";
import CredibilityScore from "@/components/CredibilityScore";
import BusinessModel from "@/components/BusinessModel";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";

export default function GuestMarketplaceFeed() {
    return (
        <>
            <EcosystemMapHero />
            <EcosystemStats />
            <RoleEcosystem />
            <AIPitchBuilder />
            <MatchingEngine />
            <CredibilityScore />
            <BusinessModel />
            <HowItWorks />
            <CTASection />
        </>
    );
}
