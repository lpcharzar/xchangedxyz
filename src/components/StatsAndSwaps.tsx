import { ArrowRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

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
  const { t } = useTranslation();
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

    return () => { supabase.removeChannel(channel); };
  }, []);

  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const sortedSwaps = useMemo(() => swaps.slice(0, 8), [swaps]);

  if (sortedSwaps.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-ring" />
        <h2 className="text-lg font-semibold text-foreground font-display tracking-tight">{t("swaps.title")}</h2>
      </div>

      <div className="depth-card rounded-xl overflow-hidden">
        <div className="divide-y divide-border/40">
          <AnimatePresence initial={false}>
            {sortedSwaps.map((swap) => (
              <motion.div
                key={swap.id}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="flex items-center justify-between px-4 py-3 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {swap.from_icon && (
                      <img src={swap.from_icon} alt="" className="w-4 h-4 rounded-full" />
                    )}
                    <span className="text-sm text-foreground font-medium tabular-nums">
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
                  {formatDistanceToNow(new Date(swap.created_at))} {t("swaps.ago")}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default StatsAndSwaps;
