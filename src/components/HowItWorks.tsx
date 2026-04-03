const steps = [
  { step: 1, title: "Choose Your Coins", description: "Select the crypto pair you want to swap and enter the amount.", emoji: "🪙" },
  { step: 2, title: "Send Funds", description: "Send your crypto to the generated deposit address.", emoji: "📤" },
  { step: 3, title: "Receive Crypto", description: "Get your swapped crypto delivered straight to your wallet.", emoji: "✅" },
];

const HowItWorks = () => {
  return (
    <section className="max-w-4xl mx-auto mt-20 pb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
        <p className="text-muted-foreground mt-2">Three simple steps to swap your crypto.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div key={s.step} className="text-center group">
            <div className="text-3xl mb-3">{s.emoji}</div>
            <div className="text-xs font-bold text-accent tracking-widest uppercase mb-3">
              Step {s.step}
            </div>
            <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
