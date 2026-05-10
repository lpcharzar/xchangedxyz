import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ExchangeWidget = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="max-w-[560px] mx-auto relative"
    >
      <div className="swap-shell">
        <iframe
          id="simpleswap-frame"
          name="SimpleSwap Widget"
          title="Crypto exchange widget"
          width="100%"
          height="392px"
          src="https://simpleswap.io/widget/00e8abdd-6e94-42c8-9a00-317b7c91f03c"
          frameBorder="0"
          className="rounded-[0.85rem] relative z-10 block"
        />
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
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
    </motion.div>
  );
};

export default ExchangeWidget;
