import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Content } from "@/components/chatpage/content";

const messages = [
  { sender: "user", text: "Hello, how are you?" },
  {
    sender: "bot",
    text: "I 'm just a bot, but I'm doing great! 'm just a bot, but I'm doing great! 'm just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!",
  },
  { sender: "user", text: "What can you do?" },
  {
    sender: "bot",
    text: "I can answer your questions and help you out!\n I can answer your questions and help you out!\nI can answer your questions and help you out!\nI can answer your questions and help you out!\n",
  },
  { sender: "user", text: "Hello, how are you?" },
  {
    sender: "bot",
    text: "I st a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!'m just a bot, but I'm doing great!",
  },
  { sender: "user", text: "What can you do?" },
  {
    sender: "bot",
    text: "I chelp you out!\nI can answer your questions and help you out!\nI can answer your questions and help you out!\n",
  },
];

export default async function ChatBot({ params }) {
  const { subject: subject } = await params;

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-full mx-60 mb-40 mt-10">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-lg mb-4 ${
              msg.sender === "user"
                ? "bg-gray-800 text-white self-end ml-auto rounded-3xl "
                : "bg-background text-gray self-start rounded-xl"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="fixed flex justify-center h-28 bottom-0 transform bg-background w-full">
        <div className="flex items-center w-1/2 mb-5 bg-secondary rounded-full">
          <Textarea
            className="h-full  w-full resize-none no-scrollbar scroll-smooth pl-10 pr-28 py-4 outline-none border-none border-transparent focus:outline-none focus:border-none shadow-none"
            placeholder="ask your question"
          />
          <Button className="rounded-full -ml-24 hover:cursor-pointer">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
