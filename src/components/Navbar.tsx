import { ArrowLeftRight, Clock, BookOpen, Search, HelpCircle, Headphones, LogIn, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Exchange", icon: ArrowLeftRight, path: "/" },
  { label: "Order History", icon: Clock, path: "/order-history" },
  { label: "Address Book", icon: BookOpen, path: "/address-book" },
  { label: "Order Status", icon: Search, path: "/order-status" },
  { label: "FAQ", icon: HelpCircle, path: "/faq" },
  { label: "Support", icon: Headphones, path: "/support" },
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
              className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
        <div className="md:hidden border-t border-border px-4 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium w-full transition-colors ${
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
      )}
    </nav>
  );
};

export default Navbar;
