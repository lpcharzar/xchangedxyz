import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import speedImg from "@/assets/feature-speed.jpg";
import coinsImg from "@/assets/feature-coins.jpg";
import ratesImg from "@/assets/feature-rates.jpg";

const WhySection = () => {
  const { t } = useTranslation();

  const advantages = [
    { image: speedImg, title: t("why.fastTitle"), description: t("why.fastDesc") },
    { image: coinsImg, title: t("why.coinsTitle"), description: t("why.coinsDesc") },
    { image: ratesImg, title: t("why.ratesTitle"), description: t("why.ratesDesc") },
  ];

  return (
    <section className="py-20 max-w-5xl mx-auto px-5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid md:grid-cols-3 gap-6"
      >
        {advantages.map((adv) => (
          <motion.article
            key={adv.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="depth-card rounded-xl overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={adv.image}
                alt={adv.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-display text-foreground mb-1.5">{adv.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default WhySection;
