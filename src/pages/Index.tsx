import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExchangeWidget from "@/components/ExchangeWidget";
import StatsAndSwaps from "@/components/StatsAndSwaps";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-4">
        <HeroSection />
        <ExchangeWidget />
        <StatsAndSwaps />
        <WhySection />
        <HowItWorks />
      </main>
    </div>
  );
};

export default Index;
