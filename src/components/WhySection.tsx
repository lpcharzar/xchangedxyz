import { Zap, ArrowLeftRight, PiggyBank } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhySection = () => {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: Zap,
      title: t("why.fastTitle"),
      description: t("why.fastDesc"),
    },
    {
      icon: ArrowLeftRight,
      title: t("why.coinsTitle"),
      description: t("why.coinsDesc"),
    },
    {
      icon: PiggyBank,
      title: t("why.ratesTitle"),
      description: t("why.ratesDesc"),
    },
  ];

  return (
    <section className="py-16 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-5">
        {advantages.map((adv) => (
          <div
            key={adv.title}
            className="glow-card rounded-xl bg-card/60 backdrop-blur-sm border border-border/60 p-6 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <adv.icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1.5">{adv.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
