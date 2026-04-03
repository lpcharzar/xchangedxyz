import { Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative text-center pt-16 pb-8">
      {/* Ambient glow */}
      <div className="absolute inset-0 gradient-hero pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <Zap className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-semibold text-accent">Lightning Fast Exchanges</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          <span className="text-foreground">Swap Crypto</span>{" "}
          <span className="text-gradient-accent">Instantly</span>
        </h1>

        <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          No sign-up required. Non-custodial. Exchange 1000+ cryptocurrencies with the best rates.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
