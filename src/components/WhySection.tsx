import { Zap, Shield, Lock, DollarSign } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Swaps", description: "Exchange crypto in seconds, not hours. Our liquidity network ensures fast execution.", color: "text-accent" },
  { icon: Shield, title: "Non-Custodial", description: "We never hold your funds. Your keys, your crypto. Always in your control.", color: "text-primary" },
  { icon: Lock, title: "Secure & Private", description: "No KYC. Industry-standard encryption. Your privacy is our top priority.", color: "text-accent" },
  { icon: DollarSign, title: "Best Rates", description: "Competitive rates with transparent pricing. What you see is what you get.", color: "text-primary" },
];

const WhySection = () => {
  return (
    <section className="max-w-4xl mx-auto mt-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground">
          Why <span className="text-primary">x</span>changed<span className="text-primary">.xyz</span>?
        </h2>
        <p className="text-muted-foreground mt-2">The simplest way to swap crypto without middlemen.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300 group"
          >
            <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <f.icon className={`h-5 w-5 ${f.color}`} />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
