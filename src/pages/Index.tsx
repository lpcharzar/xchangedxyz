import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExchangeWidget from "@/components/ExchangeWidget";
import WhySection from "@/components/WhySection";
import StatsAndSwaps from "@/components/StatsAndSwaps";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen ff-bg">
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />

      <Navbar />
      <main className="relative">
        <HeroSection />
        <ExchangeWidget />
        <div className="landscape-gradient" />
        <WhySection />
        <StatsAndSwaps />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
