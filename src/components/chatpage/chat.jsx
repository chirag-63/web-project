'use client'
import { useState, useEffect } from "react"
import { InputPanel } from "./InputPanel"
import axios from "axios"
import ReactMarkdown from "react-markdown";
import { Loader, User, Bot } from "lucide-react"
import remarkGfm from "remark-gfm";
import { Highlight, themes } from "prism-react-renderer"
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export const ChatComp = ({ subject }) => {
    const { user } = useUser();
    // const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [loadingResponse, setLoadingResponse] = useState(false);

    const userProfileImage = user?.imageUrl || "/default-avatar.png";

    const handleSendMessage = async (query) => {
        if (!query.trim()) return;
        const newUserMessage = { sender: "user", text: query };
        setMessages((prev) => [...prev, newUserMessage]);

        const conversationContext = messages.reduce((acc, msg) => {
            const role = msg.sender === "user" ? "User" : "Assistant";
            return acc + `${msg.text}\n`;
        }, "") + `User: ${query}\n`;

        try {
            setLoadingResponse(true);

            const response = await axios.post(
                "/api/gemini",
                { prompt: conversationContext },
                { headers: { "Content-Type": "application/json" } }
            );

            const newBotMessage = { sender: "bot", text: response.data.response };
            setMessages((prev) => [...prev, newBotMessage]);
        }
        catch (error) {
            console.log(error)
            throw error;
        } finally {
            setLoadingResponse(false);
        }

    }

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col w-full mx-56 mb-40 mt-10">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                    >
                        {msg.sender === 'user'
                            ? <div className="flex ml-10">
                                <ReactMarkdown
                                    className={`whitespace-pre-wrap break-words overflow-hidden 
                                    p-3 rounded-xl mb-4 bg-gray-800 text-white self-end ml-auto
                                    inline-block max-w-fit`}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                                <User className="mt-2 ml-2 bg-blue-500 text-black rounded-full min-h-7 min-w-7 p-1" />
                            </div>
                            : <div className="flex ">
                                <Bot className="mt-3 ml-2 bg-purple-500 text-white rounded-full min-h-7 min-w-7 p-1" />
                                <ReactMarkdown remarkPlugins={[remarkGfm]}
                                    className="whitespace-pre-wrap break-words p-3 max-w-2xl mb-4 bg-background text-gray self-start rounded-xl"
                                    components={{
                                        h1: ({ children }) => <h1 className="mb-3 text-3xl font-bold">{children}</h1>,
                                        h2: ({ children }) => <h2 className="mb-3 text-2xl font-bold">{children}</h2>,
                                        h3: ({ children }) => <h3 className="mb-3 text-xl font-bold">{children}</h3>,
                                        h4: ({ children }) => <h4 className="mb-3 text-lg font-semibold">{children}</h4>,
                                        h5: ({ children }) => <h5 className="mb-3 text-base font-semibold">{children}</h5>,
                                        h6: ({ children }) => <h6 className="mb-3 text-sm font-semibold">{children}</h6>,
                                        strong: ({ children }) => <strong className="mb-3 font-bold">{children}</strong>,
                                        em: ({ children }) => <em className="mb-3 italic">{children}</em>,
                                        ul: ({ children }) => <ul className="mb-3 list-disc list-outside pl-5">{children}</ul>,
                                        ol: ({ children }) => <ol className="mb-3 list-decimal list-outside pl-5">{children}</ol>,
                                        li: ({ children }) => <li className="mb-3 ml-4">{children}</li>,
                                        p: ({ children }) => <p className="mb-3">{children}</p>,
                                        blockquote: ({ children }) => (
                                            <blockquote className="mb-3 border-l-4 text-base border-gray-600 pl-4 italic text-gray-400">
                                                {children}
                                            </blockquote>
                                        ),
                                        code: ({ inline, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || "");
                                            if (!inline && match) {
                                                return (
                                                    <Highlight
                                                        themes={themes.oneDark}
                                                        code={String(children).replace(/\n$/, "")}
                                                        language={match[1] || "plaintext"}
                                                    >
                                                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                                            <pre
                                                                className="p-4 my-3 rounded-lg"
                                                                style={{
                                                                    ...style,
                                                                    fontSize: "0.9rem",
                                                                    whiteSpace: "pre-wrap",
                                                                    overflowWrap: "break-word",
                                                                    maxWidth: "100%",
                                                                }}
                                                            >
                                                                {tokens.map((line, i) => (
                                                                    <div key={i} {...getLineProps({ line })}>
                                                                        {line.map((token, key) => (
                                                                            <span key={key} {...getTokenProps({ token })} />
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </pre>
                                                        )}
                                                    </Highlight>
                                                );
                                            } else {
                                                return (
                                                    <code className="bg-gray-700 text-white px-1 rounded break-all" {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }
                                        }
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                        }

                    </div>
                ))}
                {loadingResponse && (
                    <Loader className="animate-spin w-4" />
                )}
            </div>
            <InputPanel onSendMessage={handleSendMessage} />
        </div>
    )
}