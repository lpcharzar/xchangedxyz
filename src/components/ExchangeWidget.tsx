const ExchangeWidget = () => {
  return (
    <div className="max-w-[560px] mx-auto">
      <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-1 glow-primary">
        <iframe
          id="simpleswap-frame"
          name="SimpleSwap Widget"
          width="100%"
          height="392px"
          src="https://simpleswap.io/widget/00e8abdd-6e94-42c8-9a00-317b7c91f03c"
          frameBorder="0"
          className="rounded-xl"
        />
      </div>

      <div className="flex items-center justify-center gap-4 mt-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Non-custodial
        </span>
        <span className="text-border">•</span>
        <span>No KYC</span>
        <span className="text-border">•</span>
        <span>Best Rates</span>
      </div>
    </div>
  );
};

export default ExchangeWidget;
