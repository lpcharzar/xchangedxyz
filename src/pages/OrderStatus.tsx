import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OrderStatus = () => {
  const [orderId, setOrderId] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-4 py-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Check Order Status</h1>
        <div className="bg-card border border-border rounded-2xl p-6">
          <p className="text-muted-foreground text-sm mb-4">Enter your exchange ID to track your swap.</p>
          <div className="flex gap-2">
            <Input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter exchange ID..."
              className="bg-muted border-border text-foreground"
            />
            <Button className="gradient-primary text-primary-foreground shrink-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderStatus;
