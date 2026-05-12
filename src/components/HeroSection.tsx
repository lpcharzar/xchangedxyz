import { useTranslation } from "react-i18next";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import heroGlow from "@/assets/hero-glow.png";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 600], [0, 120]);
  const glowScale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const glowOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const titleY = useTransform(scrollY, [0, 600], [0, -40]);

  // Pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx.set(px * 40);
      my.set(py * 24);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const title1 = String(t("hero.title1") ?? "");
  const title2 = String(t("hero.title2") ?? "");
  const words1 = title1.split(" ").filter(Boolean);
  const words2 = title2.split(" ").filter(Boolean);

  const wordVariants = {
    hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease },
    },
  } as const;

  return (
    <section ref={sectionRef} className="relative pt-24 md:pt-32 pb-0 overflow-hidden">
      {/* Ambient backdrop orbs */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[18%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.35),transparent_70%)] blur-3xl" />
        <div className="absolute left-[15%] top-[55%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary-glow)/0.22),transparent_70%)] blur-3xl" />
        <div className="absolute right-[10%] top-[40%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--accent)/0.22),transparent_70%)] blur-3xl" />
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur text-sm text-foreground/85 shadow-[0_0_0_1px_hsl(var(--primary)/0.06),0_8px_30px_-12px_hsl(var(--primary)/0.35)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          style={{ y: titleY }}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          className="mt-6 font-display font-medium tracking-tight text-[44px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          <span className="block text-foreground">
            {words1.map((w, i) => (
              <span key={`a-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <motion.span variants={wordVariants} className="inline-block will-change-transform">
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block">
            {words2.map((w, i) => (
              <span key={`b-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <motion.span
                  variants={wordVariants}
                  className="inline-block will-change-transform bg-clip-text text-transparent bg-[linear-gradient(110deg,hsl(var(--foreground))_0%,hsl(var(--primary-glow))_40%,hsl(var(--primary))_55%,hsl(var(--foreground))_80%)] [background-size:250%_100%] animate-[shimmer_6s_linear_infinite]"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="mt-5 text-base md:text-lg text-muted-foreground"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          style={{ y: glowY, scale: glowScale, opacity: glowOpacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease, delay: 0.2 }}
          className="relative mt-10 md:mt-14 mx-auto w-full max-w-4xl pointer-events-none select-none"
        >
          <motion.img
            style={{ x: sx, y: sy }}
            src={heroGlow}
            alt=""
            aria-hidden="true"
            width={1536}
            height={896}
            className="w-full h-auto mix-blend-screen animate-[breathe_9s_ease-in-out_infinite]"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
