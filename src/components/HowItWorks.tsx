import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
    <section className="py-16 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-foreground mb-4">{t("faq.title")}</h2>

      <div className="rounded-xl bg-card border border-border divide-y divide-border overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-secondary/40 transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground shrink-0 ml-4 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-3.5">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <a href="/faq" className="text-sm text-primary hover:underline">
          {t("faq.viewAll")}
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;
