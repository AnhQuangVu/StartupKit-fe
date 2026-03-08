"use client"
import EcosystemMapHero from "@/components/EcosystemMapHero";
import EcosystemStats from "@/components/EcosystemStats";
import RoleEcosystem from "@/components/RoleEcosystem";
import AIPitchBuilder from "@/components/AIPitchBuilder";
import MatchingEngine from "@/components/MatchingEngine";
import CredibilityScore from "@/components/CredibilityScore";
import BusinessModel from "@/components/BusinessModel";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";

/**
 * LAYER 1 — Marketing Landing Page
 * URL: /[locale]
 * Navbar, Footer, ChatWidget are injected by app/[locale]/layout.tsx — do NOT add them here.
 */
export default async function LandingPage() {
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
