'use client'
import { useState, useEffect } from "react"
import { InputPanel } from "./InputPanel"
import axios from "axios"
import ReactMarkdown from "react-markdown";
import Cookies from "js-cookie";
import { Loader, User, Bot } from "lucide-react"
import remarkGfm from "remark-gfm";
import { Highlight, themes } from "prism-react-renderer"

export const ChatComp = ({ subject }) => {
    const [messages, setMessages] = useState([]);
    const [loadingResponse, setLoadingResponse] = useState(false);
    const cookieKey = `chat_${subject.toLowerCase().replace(/\s+/g, "_")}`;

    useEffect(() => {
        const savedMessages = Cookies.get(cookieKey);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, [cookieKey]);

    useEffect(() => {
        if (messages.length > 0) {
            Cookies.set(cookieKey, JSON.stringify(messages), { expires: 1 });
        }
    }, [messages, cookieKey]);

    const systemPrompt = `You are an AI mentor specialized in ${subject}.  
        Your job is to assist students ONLY with questions related to ${subject}.  
        - If someone asks about another subject (e.g., Operating Systems when you're the Computer Networks bot), respond with:  
        *"I specialize in ${subject}. For {other subject}, please ask the respective mentor!"*  
        - If someone asks, "What subject bot are you?", reply:  
        *"I am your dedicated mentor for ${subject}. Ask me anything!"*  
        - Stay engaging, provide clear explanations, and ensure answers are strictly within ${subject}.`;

    const handleSendMessage = async (query) => {
        if (!query.trim()) return;
        const newUserMessage = { sender: "user", text: query };
        setMessages((prev) => [...prev, newUserMessage]);

        const conversationContext =`${systemPrompt}\n\n` + messages.reduce((acc, msg) => {
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
                                    className="whitespace-pre-wrap prose dark:prose-invert break-words p-3 max-w-2xl mb-4 bg-background text-gray self-start rounded-xl"
                                    components={{
                                        h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-xl font-bold">{children}</h3>,
                                        h4: ({ children }) => <h4 className="text-lg font-semibold">{children}</h4>,
                                        h5: ({ children }) => <h5 className="text-base font-semibold">{children}</h5>,
                                        h6: ({ children }) => <h6 className="text-sm font-semibold">{children}</h6>,
                                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                        em: ({ children }) => <em className="italic">{children}</em>,
                                        ul: ({ children }) => <ul className="list-disc list-outside pl-5">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal list-outside pl-5">{children}</ol>,
                                        li: ({ children }) => <li className="ml-4">{children}</li>,
                                        p: ({ children }) => <p className="">{children}</p>,
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 text-base border-gray-600 pl-4 italic text-gray-400">
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
                                                                className="p-4 rounded-lg"
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