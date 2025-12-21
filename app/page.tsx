import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SolutionsSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
};

export default Index;
