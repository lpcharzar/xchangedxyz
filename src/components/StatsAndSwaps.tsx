import { TrendingUp, BarChart3, Clock } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "100+", label: "Swaps Completed" },
  { icon: BarChart3, value: "$0.00", label: "24h Volume" },
  { icon: Clock, value: "~2 minutes", label: "Avg Swap Time" },
];

const recentSwaps = [
  { amount: "$19", from: "MATIC", to: "ETH", time: "6 min ago", fromIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/matic.png", toIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/eth.png" },
  { amount: "$34", from: "SOL", to: "USDT", time: "15 min ago", fromIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/sol.png", toIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/usdt.png" },
  { amount: "$28", from: "DOT", to: "SOL", time: "20 min ago", fromIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/dot.png", toIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/sol.png" },
  { amount: "$27", from: "ADA", to: "ETH", time: "31 min ago", fromIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/ada.png", toIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/eth.png" },
  { amount: "$77", from: "ETH", to: "BTC", time: "40 min ago", fromIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/eth.png", toIcon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/btc.png" },
];

const StatsAndSwaps = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
      {/* Live Stats */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">Live Stats</h3>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Swaps */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">Recent Swaps</h3>
        <div className="space-y-3">
          {recentSwaps.map((swap, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">{swap.amount}</span>
                <img src={swap.fromIcon} alt={swap.from} className="w-5 h-5 rounded-full" />
                <span className="text-sm font-medium text-foreground">{swap.from}</span>
                <span className="text-muted-foreground text-xs">→</span>
                <img src={swap.toIcon} alt={swap.to} className="w-5 h-5 rounded-full" />
                <span className="text-sm font-medium text-foreground">{swap.to}</span>
              </div>
              <span className="text-xs text-muted-foreground">{swap.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsAndSwaps;
