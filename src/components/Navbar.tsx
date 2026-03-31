import { ArrowLeftRight, Clock, BookOpen, Search, HelpCircle, Headphones, LogIn, LogOut, Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const ADMIN_EMAIL = "xchanged.xyz@gmail.com";

const navItems = [
  { label: "Exchange", icon: ArrowLeftRight, path: "/", requiresAuth: false },
  { label: "Order History", icon: Clock, path: "/order-history", requiresAuth: true },
  { label: "Address Book", icon: BookOpen, path: "/address-book", requiresAuth: true },
  { label: "Order Status", icon: Search, path: "/order-status", requiresAuth: false },
  { label: "FAQ", icon: HelpCircle, path: "/faq", requiresAuth: false },
  { label: "Support", icon: Headphones, path: "/support", requiresAuth: false },
];

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src="/logo.png" alt="xchanged.xyz" className="h-7 w-7" />
          <span className="text-lg font-bold">
            <span className="text-primary">x</span>
            <span className="text-foreground">changed</span>
            <span className="text-primary">.xyz</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user?.email === ADMIN_EMAIL && (
            <Button
              onClick={() => navigate("/admin")}
              variant="outline"
              size="sm"
              className="gap-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          )}
          {user ? (
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="gap-2 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              size="sm"
              className="hidden md:inline-flex gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 pb-4 pt-2 space-y-1">
          {navItems.map((item) => {
            const locked = item.requiresAuth && !user;
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (!locked) {
                    navigate(item.path);
                    setMobileOpen(false);
                  }
                }}
                disabled={locked}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
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
                  <span className="text-xs text-primary font-medium">Login to view</span>
                )}
              </button>
            );
          })}

          {user ? (
            <button
              onClick={() => { signOut(); setMobileOpen(false); }}
              className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-3 rounded-full bg-secondary text-muted-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => { navigate("/auth"); setMobileOpen(false); }}
              className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Login / Register
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
