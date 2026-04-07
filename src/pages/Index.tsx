import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExchangeWidget from "@/components/ExchangeWidget";
import StatsAndSwaps from "@/components/StatsAndSwaps";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen space-bg">
      {/* Shooting stars */}
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />

      <Navbar />
      <main className="px-4 relative">
        <HeroSection />
        <ExchangeWidget />
        <StatsAndSwaps />
        <WhySection />
        <HowItWorks />
      </main>
      <div className="ground-gradient" />
      <Footer />
    </div>
  );
};

export default Index;
