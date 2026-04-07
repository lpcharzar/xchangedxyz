import { ArrowRight, Clock } from "lucide-react";
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

  useEffect(() => {
    const fetchSwaps = async () => {
      const { data } = await supabase
        .from("swaps")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (data) setSwaps(data);
    };

    fetchSwaps();

    const channel = supabase
      .channel("swaps-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "swaps" },
        (payload) => {
          const newSwap = payload.new as Swap;
          setSwaps((prev) => [newSwap, ...prev].slice(0, 10));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Force re-render every minute for relative timestamps
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 py-12 md:py-20 max-w-3xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
        Recent transactions
      </h2>

      <div className="space-y-2">
        {swaps.slice(0, 8).map((swap) => (
          <div key={swap.id} className="swap-row-enter">
            {/* Time + speed row */}
            <div className="flex items-center justify-between px-5 py-2">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(swap.created_at), { addSuffix: true })}
              </span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-xs">~2 min</span>
              </div>
            </div>

            {/* Swap details row */}
            <div className="tx-row flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-card/60 border border-border/30">
              <span className="text-sm font-semibold text-foreground">
                ${swap.amount} {swap.from_currency}
              </span>
              {swap.from_icon && (
                <img src={swap.from_icon} alt="" className="w-5 h-5 rounded-full" />
              )}
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              {swap.to_icon && (
                <img src={swap.to_icon} alt="" className="w-5 h-5 rounded-full" />
              )}
              <span className="text-sm font-semibold text-foreground">{swap.to_currency}</span>
            </div>
          </div>
        ))}
        {swaps.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            No transactions yet
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsAndSwaps;
