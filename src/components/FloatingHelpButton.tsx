import { MessageCircleQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingHelpButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/support")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 font-semibold text-sm"
      aria-label="Need help?"
    >
      <MessageCircleQuestion className="h-5 w-5" />
      Need help?
    </button>
  );
};

export default FloatingHelpButton;
