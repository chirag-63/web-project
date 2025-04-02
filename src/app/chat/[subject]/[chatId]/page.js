// app/chat/[subject]/[chatId]/page.js

export default async function ChatPage({ params }) {
  const { subject, chatId } = await params;
  return (
    <div>
      <h1>Chat for {subject}</h1>
      <p>Chat ID: {chatId}</p>
      {/* Render your chat interface here */}
    </div>
  );
}
