import { ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 mb-3">
              <ArrowLeftRight className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">
                <span className="text-primary">xchanged</span>
                <span className="text-foreground">.xyz</span>
              </span>
            </button>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The simplest way to swap crypto without middlemen. Non-custodial, no KYC.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Exchange", path: "/" },
                { label: "Order History", path: "/order-history" },
                { label: "Address Book", path: "/address-book" },
                { label: "Order Status", path: "/order-status" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {[
                { label: "FAQ", path: "/faq" },
                { label: "Support", path: "/support" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://simpleswap.io/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://simpleswap.io/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} xchanged.xyz — All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by liquidity providers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
