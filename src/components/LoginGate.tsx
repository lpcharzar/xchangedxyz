import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface LoginGateProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const LoginGate = ({ children, title, description }: LoginGateProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full">
          <LogIn className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground text-sm mb-6">
            {description || "Sign in to access this feature."}
          </p>
          <Button
            onClick={() => navigate("/auth")}
            className="gradient-primary text-primary-foreground font-semibold w-full"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoginGate;
