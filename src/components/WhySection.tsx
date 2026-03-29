import { Zap, Shield, Lock, DollarSign } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Swaps", description: "Exchange crypto in seconds, not hours. Our liquidity network ensures fast execution." },
  { icon: Shield, title: "Non-Custodial", description: "We never hold your funds. Your keys, your crypto. Always in your control." },
  { icon: Lock, title: "Secure & Private", description: "No KYC. Industry-standard encryption. Your privacy is our top priority." },
  { icon: DollarSign, title: "Low Fees", description: "Competitive rates with transparent pricing. What you see is what you get." },
];

const WhySection = () => {
  return (
    <section className="max-w-4xl mx-auto mt-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground">Why <span className="text-primary">x</span>changed<span className="text-primary">.xyz</span>?</h2>
        <p className="text-muted-foreground mt-2">The simplest way to swap crypto without middlemen.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((f) => (
          <div key={f.title} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
