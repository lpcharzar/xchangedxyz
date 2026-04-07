import { Zap, ArrowLeftRight, PiggyBank } from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Save time",
    description: "Maximum exchange speed thanks to full automation of the exchange process",
  },
  {
    icon: ArrowLeftRight,
    title: "Make an exchange",
    description: "Choose the right strategy and make profitable exchanges with 1000+ cryptocurrencies",
  },
  {
    icon: PiggyBank,
    title: "Save money",
    description: "The best exchange rates and minimal network fees across all supported coins",
  },
];

const WhySection = () => {
  return (
    <section className="relative z-10 py-20 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
        <span className="text-muted-foreground">Trusted since</span>{" "}
        <span className="text-gradient-accent">2024</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {advantages.map((adv) => (
          <div
            key={adv.title}
            className="adv-card rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 p-8 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <adv.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">{adv.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
