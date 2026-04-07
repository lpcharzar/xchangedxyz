import { Zap, ArrowLeftRight, PiggyBank } from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Fast",
    description: "Most swaps complete in under 5 minutes thanks to automated processing.",
  },
  {
    icon: ArrowLeftRight,
    title: "1000+ coins",
    description: "Exchange between Bitcoin, Ethereum, Solana, and hundreds of other cryptocurrencies.",
  },
  {
    icon: PiggyBank,
    title: "Best rates",
    description: "We compare rates across providers to get you the best deal every time.",
  },
];

const WhySection = () => {
  return (
    <section className="py-16 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-5">
        {advantages.map((adv) => (
          <div
            key={adv.title}
            className="rounded-xl bg-card border border-border p-6"
          >
            <adv.icon className="h-5 w-5 text-primary mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">{adv.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
