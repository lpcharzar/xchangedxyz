import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import OrderHistory from "./pages/OrderHistory";
import AddressBook from "./pages/AddressBook";
import OrderStatus from "./pages/OrderStatus";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import FloatingHelpButton from "./components/FloatingHelpButton";
import AdminConsole from "./pages/AdminConsole";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <FloatingHelpButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/address-book" element={<AddressBook />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
