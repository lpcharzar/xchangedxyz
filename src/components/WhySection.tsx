import { Zap, ArrowLeftRight, PiggyBank } from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Save time",
    description: "Maximum exchange speed due to the full automation",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ArrowLeftRight,
    title: "Make an exchange",
    description: "Pick the right strategy and make favourable trades",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: PiggyBank,
    title: "Save money",
    description: "Best exchange rates and minimum commissions",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const WhySection = () => {
  return (
    <section className="relative z-10 py-16 md:py-24 max-w-5xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        <span className="text-muted-foreground">Trusted since </span>
        <span className="text-gradient-accent">2024</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {advantages.map((adv) => (
          <div
            key={adv.title}
            className="adv-card rounded-2xl bg-card/50 backdrop-blur-sm border border-border/40 overflow-hidden"
          >
            {/* Illustration area */}
            <div className="relative h-48 bg-gradient-to-b from-secondary/40 to-card/50 flex items-center justify-center">
              <div className={`w-20 h-20 rounded-2xl ${adv.bgColor} flex items-center justify-center`}>
                <adv.icon className={`h-10 w-10 ${adv.color}`} />
              </div>
              {/* Decorative stars */}
              <div className="absolute top-4 right-6 w-1 h-1 bg-foreground/20 rounded-full" />
              <div className="absolute top-8 left-8 w-1.5 h-1.5 bg-foreground/15 rounded-full" />
              <div className="absolute bottom-6 right-10 w-1 h-1 bg-foreground/10 rounded-full" />
            </div>

            {/* Text content */}
            <div className="p-6">
              <h3 className={`text-lg font-bold ${adv.color} mb-2`}>{adv.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
