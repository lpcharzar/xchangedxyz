import { Zap, ArrowLeftRight, PiggyBank } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const WhySection = () => {
  const { t } = useTranslation();

  const advantages = [
    { icon: Zap, title: t("why.fastTitle"), description: t("why.fastDesc"), accent: "from-primary/30 to-transparent" },
    { icon: ArrowLeftRight, title: t("why.coinsTitle"), description: t("why.coinsDesc"), accent: "from-[hsl(var(--primary-glow))]/30 to-transparent" },
    { icon: PiggyBank, title: t("why.ratesTitle"), description: t("why.ratesDesc"), accent: "from-purple-500/30 to-transparent" },
  ];

  return (
    <section className="py-20 max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        className="grid md:grid-cols-3 gap-5"
      >
        {advantages.map((adv, i) => (
          <motion.div
            key={adv.title}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
            }}
            className={`depth-card rounded-xl p-6 ${i === 1 ? "md:translate-y-3" : ""}`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${adv.accent} flex items-center justify-center mb-4 ring-1 ring-primary/20`}>
              <adv.icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1.5 font-display tracking-tight">{adv.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhySection;
