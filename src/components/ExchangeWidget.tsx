const ExchangeWidget = () => {
  return (
    <div className="max-w-[480px] mx-auto relative z-10 px-4">
      <div className="exchange-glow rounded-2xl bg-card/80 backdrop-blur-md p-1.5 border border-border/40">
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

      <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
        By using the site and creating an exchange, you agree to the xchanged.xyz's{" "}
        <a
          href="https://simpleswap.io/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Terms of Services
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
