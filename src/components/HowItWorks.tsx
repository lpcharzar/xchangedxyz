import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const HowItWorks = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 max-w-2xl mx-auto"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4 font-display tracking-tight">{t("faq.title")}</h2>

      <div className="depth-card rounded-xl divide-y divide-border/60 overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="btn-press w-full flex items-center justify-between px-5 py-4 text-left hover:bg-primary/5 transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="ml-4 shrink-0"
              >
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 26 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <a href="/faq" className="text-sm text-primary hover:underline">
          {t("faq.viewAll")}
        </a>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
