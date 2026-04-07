import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does an exchange take?",
    answer:
      "Most exchanges complete in 2–30 minutes depending on network congestion and required confirmations.",
  },
  {
    question: "How do I track my transaction?",
    answer:
      "Use the Order Status page with the transaction ID you received when starting the exchange.",
  },
  {
    question: "Is registration required?",
    answer:
      "No. You can exchange without creating an account. Optional sign-up lets you save addresses and view history.",
  },
  {
    question: "Are there hidden fees?",
    answer:
      "No. The rate you see before confirming is the rate you get. Network fees are shown upfront.",
  },
];

const HowItWorks = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-foreground mb-4">FAQ</h2>

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
        <a
          href="/faq"
          className="text-sm text-primary hover:underline"
        >
          View all FAQ →
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;
