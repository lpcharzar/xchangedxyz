import { ArrowRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
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

  // Most recent at top, least recent at bottom (already sorted desc from query)
  const sortedSwaps = useMemo(() => swaps.slice(0, 8), [swaps]);

  if (sortedSwaps.length === 0) return null;

  return (
    <section className="py-12 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-foreground mb-4">Recent swaps</h2>

      <div className="rounded-xl bg-card/60 backdrop-blur-sm border border-border/60 overflow-hidden">
        <div className="divide-y divide-border/40">
          {sortedSwaps.map((swap, i) => (
            <div
              key={swap.id}
              className="swap-row-enter flex items-center justify-between px-4 py-3 hover:bg-primary/5 transition-colors"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  {swap.from_icon && (
                    <img src={swap.from_icon} alt="" className="w-4 h-4 rounded-full" />
                  )}
                  <span className="text-sm text-foreground font-medium">
                    ${swap.amount} {swap.from_currency}
                  </span>
                </div>
                <ArrowRight className="h-3 w-3 text-primary/60 shrink-0" />
                <div className="flex items-center gap-1.5">
                  {swap.to_icon && (
                    <img src={swap.to_icon} alt="" className="w-4 h-4 rounded-full" />
                  )}
                  <span className="text-sm text-foreground">{swap.to_currency}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 ml-4">
                {formatDistanceToNow(new Date(swap.created_at))} ago
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsAndSwaps;
