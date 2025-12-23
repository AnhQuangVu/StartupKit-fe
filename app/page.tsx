import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import InsightsSection from "@/components/landing/InsightsSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SolutionsSection />
        <FeaturesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <InsightsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
