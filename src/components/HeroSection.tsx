import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative text-center pt-24 pb-12 isolate">
      {/* 3D scene behind */}
      <div className="absolute inset-x-0 -top-10 h-[420px] -z-10 pointer-events-none">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6 backdrop-blur-sm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-ring" />
        {t("hero.badge")}
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
        className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05] font-display"
      >
        <motion.span
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          className="block"
        >
          {t("hero.title1")}
        </motion.span>
        <motion.span
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          className="block bg-gradient-to-r from-primary via-[hsl(var(--primary-glow))] to-primary bg-clip-text text-transparent"
        >
          {t("hero.title2")}
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.35 }}
        className="mt-5 text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed"
      >
        {t("hero.subtitle")}
      </motion.p>
    </div>
  );
};

export default HeroSection;
