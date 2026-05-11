import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import heroGlow from "@/assets/hero-glow.png";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-24 md:pt-32 pb-0 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur text-sm text-foreground/85"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
          className="mt-6 font-display font-medium text-foreground tracking-tight text-[44px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          {t("hero.title1")} <span className="text-foreground/90">{t("hero.title2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="mt-5 text-base md:text-lg text-muted-foreground"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.2 }}
          className="relative mt-10 md:mt-14 mx-auto w-full max-w-4xl pointer-events-none select-none"
        >
          <img
            src={heroGlow}
            alt=""
            aria-hidden="true"
            width={1536}
            height={896}
            className="w-full h-auto mix-blend-screen"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
