import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ExchangeWidget = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const id = "changenow-stepper-connector";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.defer = true;
    s.type = "text/javascript";
    s.src = "https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js";
    document.body.appendChild(s);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="max-w-[560px] mx-auto relative -mt-8 md:-mt-12 z-10"
    >
      <div className="swap-shell">
        <iframe
          id="iframe-widget"
          title="Crypto exchange widget"
          src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.1&amountFiat=1500&backgroundColor=303234&darkMode=true&from=btc&fromFiat=eur&horizontal=false&isFiat&lang=en-US&link_id=695ee8b5982972&locales=true&logo=false&primaryColor=a336d1&to=eth&toFiat=eth&toTheMoon=true"
          style={{ height: "356px", width: "100%", border: "none" }}
          className="rounded-[0.85rem] block relative z-10"
        />
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        {t("exchange.terms")}{" "}
        <a href="https://changenow.io/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {t("exchange.tos")}
        </a>{" "}
        {t("exchange.and")}{" "}
        <a href="https://changenow.io/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {t("exchange.privacy")}
        </a>
      </p>
    </motion.div>
  );
};

export default ExchangeWidget;
