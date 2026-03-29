const ExchangeWidget = () => {
  return (
    <div className="max-w-[560px] mx-auto">
      <iframe
        id="simpleswap-frame"
        name="SimpleSwap Widget"
        width="100%"
        height="392px"
        src="https://simpleswap.io/widget/00e8abdd-6e94-42c8-9a00-317b7c91f03c"
        frameBorder="0"
        className="rounded-2xl"
      />

      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Non-custodial
        </span>
        <span>•</span>
        <span>No KYC</span>
        <span>•</span>
        <span>Powered by liquidity providers</span>
      </div>
    </div>
  );
};

export default ExchangeWidget;
