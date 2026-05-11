import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-finance.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-16 pb-12 max-w-5xl mx-auto px-5">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-ring" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
            className="text-4xl md:text-5xl text-foreground leading-[1.08] font-display"
          >
            <span className="block">{t("hero.title1")}</span>
            <span className="block text-primary italic">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="mt-5 text-base text-muted-foreground max-w-md md:max-w-none mx-auto md:mx-0 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="order-1 md:order-2"
        >
          <div className="relative rounded-xl overflow-hidden border border-border shadow-[var(--shadow-elegant)]">
            <img
              src={heroImage}
              alt="Premium financial workspace with marble desk, gold pen and leather portfolio"
              width={1920}
              height={1080}
              className="w-full h-[260px] md:h-[360px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
