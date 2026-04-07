import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does an exchange take?",
    answer:
      "Most exchanges are completed within 2-30 minutes depending on the blockchain network speed and confirmations required.",
  },
  {
    question: "How can I track my transaction?",
    answer:
      "You can track your exchange on our Order Status page using the transaction ID provided during the exchange.",
  },
  {
    question: "Why can you trust us?",
    answer:
      "No registration or personal data required. We don't hold your funds — all exchanges happen instantly through full automation. Non-custodial and transparent.",
  },
  {
    question: "Are there hidden fees?",
    answer:
      "Honesty is our priority, so we are completely transparent. All fees are clearly shown before you confirm the exchange.",
  },
];

const HowItWorks = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-16 max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        <span className="text-foreground">Frequently asked questions</span>
      </h2>

      <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 divide-y divide-border/50 overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-secondary/30 transition-colors"
            >
              <span className="text-sm font-semibold text-foreground">{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <a
          href="/faq"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
        >
          Go to FAQ page →
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;
