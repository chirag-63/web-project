"use client";
import { useState, useEffect, useRef } from "react";
import { InputPanel } from "./InputPanel";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Loader,
  Sparkles,
  BookOpen,
  Code2,
  Brain,
  Lightbulb,
} from "lucide-react";
import remarkGfm from "remark-gfm";
import { Highlight, themes } from "prism-react-renderer";
// import { useRouter } from "next/navigation";

export const ChatComp = ({ subject }) => {
  // const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const [chatId, setChatId] = useState(null);

  // const checkOrCreateChat = async () => {
  //     if (!chatId) {
  //         try {
  //             const res = await axios.post("/api/chat/new", { subject });
  //             setChatId(res.data.chat._id);  // Set the created chatId
  //             router.replace(`/chat/${subject}/?chatId=${res.data.chat._id}`, undefined, { shallow: true });
  //         } catch (error) {
  //             console.error("Error creating chat:", error);
  //         }
  //     }
  // };

  // useEffect(() => {
  //     const fetchMessages = async () => {
  //         try {
  //             const res = await axios.get(`/api/chat/${chatId}`);
  //             if (res.data.success) {
  //                 setMessages(res.data.messages);
  //             }
  //         } catch (error) {
  //             console.error("Failed to fetch messages:", error);
  //         }
  //     };

  //     fetchMessages();
  // }, [chatId]);

  // Save messages to database
  const saveMessages = async () => {
    try {
      await axios.post("/api/chat/save", {
        subject,
        messages,
      });
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  };

  // Load saved messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/load?subject=${subject}`);
        if (response.data.messages) {
          setMessages(response.data.messages);
        } else {
          // Set initial greeting if no saved messages
          const greeting = {
            sender: "bot",
            text: `# 👋 Welcome to ${subject} Learning Assistant!

I'm your dedicated ${subject} tutor, ready to help you master this subject. Let's make learning ${subject} fun and engaging!

## 🎯 What I Can Help You With

### 📚 Core Concepts
* Understanding fundamental ${subject} principles
* Explaining complex topics in simple terms
* Breaking down difficult concepts step by step

### 💻 Practical Learning
* Writing and debugging code
* Best practices and design patterns
* Real-world examples and use cases

### 🧠 Problem Solving
* Algorithm design and optimization
* Debugging techniques
* Performance considerations

### ⚡ Advanced Topics
* Latest trends and updates in ${subject}
* Advanced features and techniques
* Best practices and industry standards

## 💡 How to Get Started
1. Ask me any question about ${subject}
2. Request code examples or explanations
3. Get help with specific problems
4. Learn about best practices

What would you like to learn about ${subject} today?`,
          };
          setMessages([greeting]);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
        // Set initial greeting on error
        const greeting = {
          sender: "bot",
          text: `# 👋 Welcome to ${subject} Learning Assistant!

I'm your dedicated ${subject} tutor, ready to help you master this subject. Let's make learning ${subject} fun and engaging!

## 🎯 What I Can Help You With

### 📚 Core Concepts
* Understanding fundamental ${subject} principles
* Explaining complex topics in simple terms
* Breaking down difficult concepts step by step

### 💻 Practical Learning
* Writing and debugging code
* Best practices and design patterns
* Real-world examples and use cases

### 🧠 Problem Solving
* Algorithm design and optimization
* Debugging techniques
* Performance considerations

### ⚡ Advanced Topics
* Latest trends and updates in ${subject}
* Advanced features and techniques
* Best practices and industry standards

## 💡 How to Get Started
1. Ask me any question about ${subject}
2. Request code examples or explanations
3. Get help with specific problems
4. Learn about best practices

What would you like to learn about ${subject} today?`,
        };
        setMessages([greeting]);
      }
    };

    loadMessages();
  }, [subject]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setLoadingResponse(true);

    try {
      // Get response from Gemini API
      const response = await axios.post("/api/gemini", {
        prompt: message,
        subject,
      });

      // Add bot response
      const botMessage = {
        sender: "bot",
        text: response.data.response,
      };
      setMessages((prev) => [...prev, botMessage]);

      // Save messages after successful response
      await saveMessages();
    } catch (error) {
      console.error("Error getting response:", error);
      // Add error message
      const errorMessage = {
        sender: "bot",
        text: "I apologize, but I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoadingResponse(false);
    }
  };

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <Highlight
        {...themes.vsDark}
        code={String(children).replace(/\n$/, "")}
        language={match[1]}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 rounded-lg overflow-x-auto`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="flex">
                <span className="text-gray-500 mr-4 select-none">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    ) : (
      <code
        className={`${className} bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm`}
        {...props}
      >
        {children}
      </code>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 shadow-md"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock,
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-2 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-2 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 dark:text-gray-300">
                      {children}
                    </li>
                  ),
                  p: ({ children }) => (
                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                      {children}
                    </p>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-2">
                      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      {children}
                    </td>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-purple-500 dark:border-purple-400 pl-4 my-4 italic bg-purple-50 dark:bg-purple-900/20 py-2 rounded">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loadingResponse && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center space-x-2">
                <Loader className="w-5 h-5 animate-spin text-purple-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Thinking...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <InputPanel onSendMessage={handleSendMessage} />
    </div>
  );
};
