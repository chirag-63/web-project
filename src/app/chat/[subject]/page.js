import { ChatComp } from "@/components/chatpage/chat";

export default async function ChatBot({ params }) {
  const { subject } = await params;
  return <ChatComp subject={subject} />;
}
