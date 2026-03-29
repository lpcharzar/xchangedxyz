import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const Support = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-4 py-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Support</h1>
        <p className="text-muted-foreground text-sm text-center mb-6">Need help? Send us a message.</p>
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground text-sm">Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-muted border-border text-foreground" required type="email" />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground text-sm">Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Issue with swap..." className="bg-muted border-border text-foreground" required />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground text-sm">Message</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue..." className="bg-muted border-border text-foreground min-h-[120px]" required />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold gap-2">
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Support;
