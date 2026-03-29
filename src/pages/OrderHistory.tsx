import LoginGate from "@/components/LoginGate";
import Navbar from "@/components/Navbar";
import { Clock } from "lucide-react";

const OrderHistory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-4 py-8 max-w-4xl mx-auto">
        <LoginGate title="View Order History" description="Log in to see your past swaps and transaction history.">
          <h1 className="text-2xl font-bold text-foreground mb-6">Order History</h1>
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No swaps yet. Complete your first exchange to see it here.</p>
          </div>
        </LoginGate>
      </main>
    </div>
  );
};

export default OrderHistory;
