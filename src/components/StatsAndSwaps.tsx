import { TrendingUp, BarChart3, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Swap {
  id: string;
  amount: number;
  from_currency: string;
  to_currency: string;
  from_icon: string | null;
  to_icon: string | null;
  created_at: string;
}

const StatsAndSwaps = () => {
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [totalVolume, setTotalVolume] = useState(0);

  useEffect(() => {
    // Fetch initial swaps
    const fetchSwaps = async () => {
      const { data } = await supabase
        .from("swaps")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (data) {
        setSwaps(data);
      }

      // Get total volume
      const { data: allSwaps } = await supabase
        .from("swaps")
        .select("amount");

      if (allSwaps) {
        const vol = allSwaps.reduce((sum, s) => sum + Number(s.amount), 0);
        setTotalVolume(vol);
      }
    };

    fetchSwaps();

    // Subscribe to realtime
    const channel = supabase
      .channel("swaps-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "swaps" },
        (payload) => {
          const newSwap = payload.new as Swap;
          setSwaps((prev) => [newSwap, ...prev].slice(0, 10));
          setTotalVolume((prev) => prev + Number(newSwap.amount));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Update relative times every minute
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: TrendingUp, value: `${swaps.length}+`, label: "Swaps Completed" },
    { icon: BarChart3, value: `$${totalVolume.toLocaleString()}`, label: "Exchange Volume" },
    { icon: Clock, value: "~2 minutes", label: "Avg Swap Time" },
  ];

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
          {swaps.slice(0, 5).map((swap) => (
            <div key={swap.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">${Number(swap.amount)}</span>
                {swap.from_icon && <img src={swap.from_icon} alt={swap.from_currency} className="w-5 h-5 rounded-full" />}
                <span className="text-sm font-medium text-foreground">{swap.from_currency}</span>
                <span className="text-muted-foreground text-xs">→</span>
                {swap.to_icon && <img src={swap.to_icon} alt={swap.to_currency} className="w-5 h-5 rounded-full" />}
                <span className="text-sm font-medium text-foreground">{swap.to_currency}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(swap.created_at), { addSuffix: true })}
              </span>
            </div>
          ))}
          {swaps.length === 0 && (
            <p className="text-sm text-muted-foreground">No swaps yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsAndSwaps;
