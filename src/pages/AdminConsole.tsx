import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow, format, subDays, subHours } from "date-fns";
import {
  ArrowLeftRight,
  TrendingUp,
  BarChart3,
  Activity,
  RefreshCw,
  ArrowLeft,
  Search,
  Filter,
  Clock,
  DollarSign,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ADMIN_EMAIL = "xchanged.xyz@gmail.com";

interface Swap {
  id: string;
  amount: number;
  from_currency: string;
  to_currency: string;
  from_icon: string | null;
  to_icon: string | null;
  created_at: string;
}

const AdminConsole = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [filteredSwaps, setFilteredSwaps] = useState<Swap[]>([]);
  const [totalVolume, setTotalVolume] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [, setTick] = useState(0);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/", { replace: true });
    }
  }, [user, loading, isAdmin, navigate]);

  const fetchSwaps = async () => {
    setRefreshing(true);
    const { data } = await supabase
      .from("swaps")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (data) {
      setSwaps(data);
      const vol = data.reduce((sum, s) => sum + Number(s.amount), 0);
      setTotalVolume(vol);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchSwaps();

    const channel = supabase
      .channel("admin-swaps-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "swaps" },
        (payload) => {
          const newSwap = payload.new as Swap;
          setSwaps((prev) => [newSwap, ...prev]);
          setTotalVolume((prev) => prev + Number(newSwap.amount));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  // Relative time refresh
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  // Filtering
  useEffect(() => {
    let result = [...swaps];

    if (timeFilter !== "all") {
      const now = new Date();
      let cutoff: Date;
      switch (timeFilter) {
        case "1h": cutoff = subHours(now, 1); break;
        case "24h": cutoff = subDays(now, 1); break;
        case "7d": cutoff = subDays(now, 7); break;
        case "30d": cutoff = subDays(now, 30); break;
        default: cutoff = new Date(0);
      }
      result = result.filter((s) => new Date(s.created_at) >= cutoff);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.from_currency.toLowerCase().includes(q) ||
          s.to_currency.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    setFilteredSwaps(result);
  }, [swaps, timeFilter, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const filteredVolume = filteredSwaps.reduce((sum, s) => sum + Number(s.amount), 0);
  const uniqueCurrencies = new Set(swaps.flatMap((s) => [s.from_currency, s.to_currency]));
  const topPairs = getTopPairs(filteredSwaps);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Admin Console</h1>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">x</span>changed<span className="text-primary">.xyz</span> — Live Dashboard
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">Live</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSwaps}
              disabled={refreshing}
              className="gap-2 border-border"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={ArrowLeftRight}
            label="Total Swaps"
            value={swaps.length.toLocaleString()}
            accent="primary"
          />
          <StatCard
            icon={DollarSign}
            label="Total Volume"
            value={`$${totalVolume.toLocaleString()}`}
            accent="primary"
          />
          <StatCard
            icon={Activity}
            label="Filtered Swaps"
            value={filteredSwaps.length.toLocaleString()}
            accent="primary"
          />
          <StatCard
            icon={BarChart3}
            label="Currencies Seen"
            value={uniqueCurrencies.size.toString()}
            accent="primary"
          />
        </div>

        {/* Top Pairs */}
        {topPairs.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">
              Popular Trading Pairs
            </h3>
            <div className="flex flex-wrap gap-3">
              {topPairs.map((pair) => (
                <div
                  key={pair.pair}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/60 border border-border"
                >
                  <span className="text-sm font-semibold text-foreground">{pair.pair}</span>
                  <span className="text-xs text-primary font-medium">{pair.count}×</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by currency or swap ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtered volume summary */}
        <div className="text-sm text-muted-foreground">
          Showing <span className="text-foreground font-semibold">{filteredSwaps.length}</span> swaps
          {timeFilter !== "all" && (
            <> — <span className="text-primary font-semibold">${filteredVolume.toLocaleString()}</span> volume</>
          )}
        </div>

        {/* Swap Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold text-muted-foreground tracking-wider uppercase px-6 py-4">
                    Swap
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground tracking-wider uppercase px-6 py-4">
                    Amount
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground tracking-wider uppercase px-6 py-4 hidden md:table-cell">
                    Swap ID
                  </th>
                  <th className="text-right text-xs font-semibold text-muted-foreground tracking-wider uppercase px-6 py-4">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSwaps.map((swap, i) => (
                  <tr
                    key={swap.id}
                    className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${
                      i === 0 ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {swap.from_icon && (
                          <img src={swap.from_icon} alt="" className="w-6 h-6 rounded-full" />
                        )}
                        <span className="text-sm font-semibold text-foreground">
                          {swap.from_currency}
                        </span>
                        <span className="text-muted-foreground text-xs">→</span>
                        {swap.to_icon && (
                          <img src={swap.to_icon} alt="" className="w-6 h-6 rounded-full" />
                        )}
                        <span className="text-sm font-semibold text-foreground">
                          {swap.to_currency}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-primary">
                        ${Number(swap.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground font-mono">
                        {swap.id.slice(0, 8)}…
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(swap.created_at), { addSuffix: true })}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">
                          {format(new Date(swap.created_at), "MMM d, HH:mm")}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSwaps.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-muted-foreground">
                      No swaps found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}) => (
  <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </div>
);

// Helper: get top trading pairs
function getTopPairs(swaps: Swap[]) {
  const counts: Record<string, number> = {};
  swaps.forEach((s) => {
    const pair = `${s.from_currency} → ${s.to_currency}`;
    counts[pair] = (counts[pair] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([pair, count]) => ({ pair, count }));
}

export default AdminConsole;
