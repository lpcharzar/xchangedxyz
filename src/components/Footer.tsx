import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative z-10 border-t border-border/30 bg-background/60 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <img src="/logo.png" alt="xchanged.xyz" className="h-6 w-6" />
            <span className="text-lg font-bold">
              <span className="text-primary">x</span>
              <span className="text-foreground">changed</span>
              <span className="text-primary">.xyz</span>
            </span>
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-5 mb-6">
          <a
            href="https://discord.gg/Sg2dU4PMsd"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Discord"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-muted-foreground">
          © 2024–{new Date().getFullYear()} xchanged.xyz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
