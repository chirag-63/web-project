import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: null });

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({
          type: "success",
          message: "Your message has been sent successfully! We'll get back to you soon."
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Card className="border border-gray-300 dark:border-gray-700 shadow-md p-6 rounded-lg">
        <CardHeader>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Leave a Message
          </h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Enter subject expert"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Enter your query"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 min-h-[120px]"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
            {status.message && (
              <div className={`p-4 rounded-md ${
                status.type === "success" 
                  ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                  : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
              }`}>
                {status.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}