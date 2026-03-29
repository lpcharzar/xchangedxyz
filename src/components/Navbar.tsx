import { ArrowLeftRight, Clock, BookOpen, Search, HelpCircle, Headphones, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Exchange", icon: ArrowLeftRight, active: true },
  { label: "Order History", icon: Clock },
  { label: "Address Book", icon: BookOpen },
  { label: "Order Status", icon: Search },
  { label: "FAQ", icon: HelpCircle },
  { label: "Support", icon: Headphones },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-2">
        <ArrowLeftRight className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">
          <span className="text-primary">xchanged</span>
          <span className="text-foreground">.xyz</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>

      <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
        <LogIn className="h-4 w-4" />
        Login
      </Button>
    </nav>
  );
};

export default Navbar;
