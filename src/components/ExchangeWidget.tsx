const ExchangeWidget = () => {
  return (
    <div className="max-w-[560px] mx-auto">
      <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/60 p-1.5 shadow-lg shadow-primary/5">
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

      <p className="text-center text-xs text-muted-foreground mt-3">
        By using the site you agree to the{" "}
        <a
          href="https://simpleswap.io/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="https://simpleswap.io/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default ExchangeWidget;
