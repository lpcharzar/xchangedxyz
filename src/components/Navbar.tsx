import { Clock, BookOpen, Search, HelpCircle, Headphones, LogIn, LogOut, Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const ADMIN_EMAIL = "xchanged.xyz@gmail.com";

const navItems = [
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
    <nav className="relative z-20 bg-background/60 backdrop-blur-md border-b border-border/30">
      <div className="flex items-center justify-between px-5 py-3 max-w-6xl mx-auto">
        {/* Hamburger (mobile) */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo center */}
        <button onClick={() => navigate("/")} className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <img src="/logo.png" alt="xchanged.xyz" className="h-6 w-6" />
          <span className="text-base font-bold tracking-tight">
            <span className="text-primary">x</span>
            <span className="text-foreground">changed</span>
            <span className="text-primary">.xyz</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-foreground bg-secondary/60"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side */}
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
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            <>
              <Button
                onClick={() => navigate("/auth")}
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/auth")}
                size="sm"
                className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/30 px-4 pb-4 pt-2 space-y-1 bg-background/90 backdrop-blur-md">
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
              Login / Sign up
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
