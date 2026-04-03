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

  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 py-16 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        <span className="text-foreground">Recent transactions</span>
      </h2>

      <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 overflow-hidden">
        <div className="divide-y divide-border/50">
          {swaps.slice(0, 8).map((swap) => (
            <div
              key={swap.id}
              className="swap-row-enter flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs text-muted-foreground w-20 shrink-0">
                  {formatDistanceToNow(new Date(swap.created_at), { addSuffix: true })}
                </span>
                <div className="flex items-center gap-2">
                  {swap.from_icon && (
                    <img src={swap.from_icon} alt="" className="w-5 h-5 rounded-full" />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {swap.amount} {swap.from_currency}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />
                <div className="flex items-center gap-2">
                  {swap.to_icon && (
                    <img src={swap.to_icon} alt="" className="w-5 h-5 rounded-full" />
                  )}
                  <span className="text-sm font-medium text-foreground">{swap.to_currency}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs">~2 min</span>
              </div>
            </div>
          ))}
          {swaps.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-muted-foreground">
              No transactions yet
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsAndSwaps;
