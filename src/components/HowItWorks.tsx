import { ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your exchange on our Order Status page using the transaction ID provided during the exchange.",
  },
  {
    question: "Why can I trust you?",
    answer:
      "No registration or personal data required. We don't hold your funds — all exchanges happen instantly through full automation. Non-custodial and transparent.",
  },
  {
    question: "Do you have hidden fees?",
    answer:
      "Honesty is our priority, so we are completely transparent. All fees are clearly shown before you confirm the exchange.",
  },
];

const HowItWorks = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section className="relative z-10 py-12 md:py-20 max-w-2xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
        FAQ
      </h2>

      <div className="divide-y divide-border/40">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-muted-foreground/40">{i + 1}</span>
                <span className="text-sm md:text-base font-semibold text-foreground">{faq.question}</span>
              </div>
              <div className={`w-8 h-8 rounded-full border border-border/60 flex items-center justify-center shrink-0 transition-colors ${openIndex === i ? 'bg-primary border-primary' : ''}`}>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openIndex === i ? "rotate-180 text-primary-foreground" : "text-muted-foreground"
                  }`}
                />
              </div>
            </button>
            {openIndex === i && (
              <div className="pb-5 pl-12">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end mt-6">
        <button
          onClick={() => navigate("/faq")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          Go to page FAQ
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <ArrowRight className="h-4 w-4 text-primary-foreground" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
