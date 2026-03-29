import { useState } from "react";
import { Lock, ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const coins = [
  { symbol: "ETH", name: "Ethereum", icon: "https://static.simpleswap.io/images/currencies-logo/eth.svg" },
  { symbol: "BTC", name: "Bitcoin", icon: "https://static.simpleswap.io/images/currencies-logo/btc.svg" },
  { symbol: "SOL", name: "Solana", icon: "https://static.simpleswap.io/images/currencies-logo/sol.svg" },
  { symbol: "USDT", name: "Tether", icon: "https://static.simpleswap.io/images/currencies-logo/usdt.svg" },
];

const ExchangeWidget = () => {
  const [sendAmount, setSendAmount] = useState("0.1");
  const [sendCoin, setSendCoin] = useState(coins[0]);
  const [getCoin, setGetCoin] = useState(coins[1]);

  return (
    <div className="max-w-lg mx-auto">
      <div className="gradient-card rounded-2xl p-6 border border-border glow-primary">
        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-6">
          <span className="bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
          <span className="text-muted-foreground text-xs">/4</span>
        </div>

        {/* You send */}
        <div className="bg-muted rounded-xl p-4 mb-2">
          <label className="text-xs text-muted-foreground mb-1 block">You send</label>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              className="bg-transparent text-xl font-semibold text-foreground outline-none w-full"
            />
            <button className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 hover:bg-secondary/80 transition-colors">
              <img src={sendCoin.icon} alt={sendCoin.symbol} className="w-6 h-6" />
              <span className="font-semibold text-foreground">{sendCoin.symbol}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Rate toggle */}
        <div className="flex items-center justify-between py-2 px-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Floating rate</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>

        {/* You get */}
        <div className="bg-muted rounded-xl p-4 mb-4">
          <label className="text-xs text-muted-foreground mb-1 block">You get</label>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-muted-foreground">≈ 0.0031</span>
            <button className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 hover:bg-secondary/80 transition-colors">
              <img src={getCoin.icon} alt={getCoin.symbol} className="w-6 h-6" />
              <span className="font-semibold text-foreground">{getCoin.symbol}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mb-4">
          By clicking Exchange you agree with{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </p>

        {/* Exchange button */}
        <Button className="w-full gradient-primary text-primary-foreground font-semibold text-lg py-6 rounded-xl hover:opacity-90 transition-opacity">
          Exchange
        </Button>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Non-custodial
        </span>
        <span>•</span>
        <span>No KYC</span>
        <span>•</span>
        <span>Powered by liquidity providers</span>
      </div>
    </div>
  );
};

export default ExchangeWidget;
