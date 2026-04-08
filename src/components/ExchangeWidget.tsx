import { useTranslation } from "react-i18next";

const ExchangeWidget = () => {
  const { t } = useTranslation();

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
        {t("exchange.terms")}{" "}
        <a
          href="https://simpleswap.io/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {t("exchange.tos")}
        </a>{" "}
        {t("exchange.and")}{" "}
        <a
          href="https://simpleswap.io/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {t("exchange.privacy")}
        </a>
      </p>
    </div>
  );
};

export default ExchangeWidget;
