import { Clock, BookOpen, Search, HelpCircle, Headphones, LogIn, LogOut, Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const ADMIN_EMAIL = "xchanged.xyz@gmail.com";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.orderHistory"), icon: Clock, path: "/order-history", requiresAuth: true },
    { label: t("nav.addressBook"), icon: BookOpen, path: "/address-book", requiresAuth: true },
    { label: t("nav.orderStatus"), icon: Search, path: "/order-status", requiresAuth: false },
    { label: t("nav.faq"), icon: HelpCircle, path: "/faq", requiresAuth: false },
    { label: t("nav.support"), icon: Headphones, path: "/support", requiresAuth: false },
  ];

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-5 py-3 max-w-5xl mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src="/logo.png" alt="xchanged.xyz" className="h-6 w-6" />
          <span className="text-base font-semibold tracking-tight text-foreground">
            xchanged<span className="text-muted-foreground">.xyz</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                location.pathname === item.path
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          {user?.email === ADMIN_EMAIL && (
            <Button
              onClick={() => navigate("/admin")}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
            >
              <Shield className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t("nav.admin")}</span>
            </Button>
          )}
          {user ? (
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground text-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t("nav.logout")}</span>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              size="sm"
              className="hidden md:inline-flex text-xs"
            >
              {t("nav.signup")}
            </Button>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 pb-4 pt-2 space-y-0.5 bg-card">
          {navItems.map((item) => {
            const locked = item.requiresAuth && !user;
            return (
              <button
                key={item.path}
                onClick={() => {
                  if (!locked) {
                    navigate(item.path);
                    setMobileOpen(false);
                  }
                }}
                disabled={locked}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm transition-colors ${
                  locked
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : location.pathname === item.path
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
                {locked && (
                  <span className="text-xs text-primary">{t("nav.loginRequired")}</span>
                )}
              </button>
            );
          })}

          {user ? (
            <button
              onClick={() => { signOut(); setMobileOpen(false); }}
              className="flex items-center justify-center gap-2 w-full mt-2 px-3 py-2.5 rounded-md bg-secondary text-muted-foreground text-sm hover:bg-secondary/80 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {t("nav.logout")}
            </button>
          ) : (
            <button
              onClick={() => { navigate("/auth"); setMobileOpen(false); }}
              className="flex items-center justify-center gap-2 w-full mt-2 px-3 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              {t("nav.login")}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
