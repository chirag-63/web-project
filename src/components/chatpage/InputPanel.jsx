'use client'
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const InputPanel = ({onSendMessage}) => {
    const [query, setQuery] = useState("");

    const handleSend = () => {
        if (query.trim()) {
            onSendMessage(query);
            setQuery("");
        }
    };

    return (
        <div className="fixed flex justify-center h-28 bottom-0 transform bg-background w-full">
            <div className="flex items-center w-1/2 mb-5 bg-secondary rounded-2xl ">
                <Textarea
                    className="h-full w-full resize-none no-scrollbar scroll-smooth pl-5 pr-28 py-4 outline-none border-none border-transparent focus:outline-none focus:border-none shadow-none"
                    placeholder="ask your question"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <Button
                    className="rounded-full -ml-24 hover:cursor-pointer"
                    onClick={handleSend}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}