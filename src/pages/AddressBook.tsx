import LoginGate from "@/components/LoginGate";
import Navbar from "@/components/Navbar";
import { BookOpen } from "lucide-react";

const AddressBook = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-4 py-8 max-w-4xl mx-auto">
        <LoginGate title="Address Book" description="Log in to save and manage your wallet addresses.">
          <h1 className="text-2xl font-bold text-foreground mb-6">Address Book</h1>
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No saved addresses. Save wallet addresses for quick access.</p>
          </div>
        </LoginGate>
      </main>
    </div>
  );
};

export default AddressBook;
