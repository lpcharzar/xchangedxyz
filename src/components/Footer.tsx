import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="xchanged.xyz" className="h-5 w-5" />
              <span className="text-sm font-semibold text-foreground">
                xchanged<span className="text-muted-foreground">.xyz</span>
              </span>
            </button>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium text-foreground mb-3">{t("footer.exchange")}</h4>
            <ul className="space-y-1.5">
              {[
                { label: t("footer.swap"), path: "/" },
                { label: t("nav.orderHistory"), path: "/order-history" },
                { label: t("nav.addressBook"), path: "/address-book" },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-foreground mb-3">{t("footer.help")}</h4>
            <ul className="space-y-1.5">
              {[
                { label: t("nav.faq"), path: "/faq" },
                { label: t("nav.support"), path: "/support" },
                { label: t("nav.orderStatus"), path: "/order-status" },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-foreground mb-3">{t("footer.community")}</h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://discord.gg/Sg2dU4PMsd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.discord")}
                </a>
              </li>
              <li>
                <a
                  href="https://simpleswap.io/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a
                  href="https://simpleswap.io/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.privacy")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-5 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} xchanged.xyz
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
