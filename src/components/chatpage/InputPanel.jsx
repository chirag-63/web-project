"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send } from "lucide-react";

export const InputPanel = ({ onSendMessage }) => {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (query.trim()) {
      onSendMessage(query);
      setQuery("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <Textarea
          className="flex-1 min-h-[60px] max-h-[120px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          placeholder="Ask your question about the subject..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          className="h-10 w-10 rounded-full mr-2 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSend}
          disabled={!query.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
