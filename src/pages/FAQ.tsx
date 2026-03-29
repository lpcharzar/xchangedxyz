import Navbar from "@/components/Navbar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How does xchanged.xyz work?", a: "We aggregate liquidity from multiple providers to offer you the best exchange rates. Simply select your crypto pair, enter the amount, send funds to the generated address, and receive your swapped crypto." },
  { q: "Do I need to create an account?", a: "No! You can swap crypto without signing up. However, creating an account lets you track order history and save wallet addresses." },
  { q: "Is it safe?", a: "Yes. We are non-custodial, meaning we never hold your funds. Transactions go directly between you and our liquidity providers." },
  { q: "What are the fees?", a: "Our fees are included in the exchange rate shown. There are no hidden charges — what you see is what you get." },
  { q: "How long does a swap take?", a: "Most swaps complete within 2-30 minutes depending on network confirmation times." },
  { q: "What if my transaction is stuck?", a: "Contact our support team with your exchange ID and we'll help resolve the issue." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-4 py-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h1>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-foreground text-sm">{faq.q}</span>
                {open === i ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQ;
