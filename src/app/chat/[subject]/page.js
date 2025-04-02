"use client";

import React from "react";
import { ChatComp } from "@/components/chatpage/chat";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const subject = params.subject;

  // Convert URL-friendly subject back to original format
  const formattedSubject = subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="h-[calc(100vh-12rem)]">
      <ChatComp subject={formattedSubject} />
    </div>
  );
}
