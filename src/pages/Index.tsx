import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExchangeWidget from "@/components/ExchangeWidget";
import StatsAndSwaps from "@/components/StatsAndSwaps";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background ambient-bg grid-pattern">
      <div className="relative z-10">
        <Navbar />
        <main className="px-4">
          <HeroSection />
          <ExchangeWidget />
          <StatsAndSwaps />
          <WhySection />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
