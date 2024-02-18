"use client";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { streamingFetch } from "@/lib/utils";
import { KeyboardEvent, useEffect, useRef } from "react";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import hljs from "highlight.js";
import { TbSend } from "react-icons/tb";
import Message from "@/components/panel/chat/Message";
import { ChatMessages } from "@/lib/fetch";
import { usePathname } from "next/navigation";

// adds copy option for code blocks
hljs.addPlugin({
    "after:highlightElement": ({ el, result }) => {
        console.log({ el, result });
        const div = document.createElement("div");
        const small = document.createElement("small");
        const button = document.createElement("button");
        div.classList.add("codeblock-head", "flex", "items-center", "justify-between", "gap-2", "w-full", "p-2", "px-4", "rounded-t-xl", "bg-background");
        small.classList.add("opacity-50");
        button.classList.add("underline");
        small.innerText = result.language || "";
        button.innerText = "Copy";
        button.addEventListener("click", () => navigator.clipboard.writeText(result.code || ""));
        div.append(small, button);
        el.parentElement?.prepend(div);
    },
});

const messages = signal<ChatMessages>([]);

const Chat = ({ dir, initialMessages }: { dir: string; initialMessages: ChatMessages }) => {
    useSignals();
    const pathname = usePathname();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaSpanRef = useRef<HTMLSpanElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const scrollElement = scrollAreaRef.current?.querySelector("div");
    messages.value = initialMessages;

    const focusOnTextarea = () => textareaRef.current?.focus();
    const textareaOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.shiftKey || event.altKey || event.ctrlKey) return;
        if (event.key === "Enter") submit();
    };

    const expandInputArea = () => {
        if (textareaSpanRef.current) textareaSpanRef.current.innerText = `${textareaRef.current?.value}\n`;
        if (textareaRef.current) textareaRef.current.style.height = `${textareaSpanRef.current?.clientHeight}px`;
    };
    const clearInputArea = () => {
        if (textareaRef.current) textareaRef.current.value = "";
        if (textareaSpanRef.current) textareaSpanRef.current.innerText = "";
        expandInputArea();
    };

    const submit = async (initPromt?: string | null) => {
        const promt = initPromt ?? textareaRef.current?.value.trim();
        if (!promt) return;
        clearInputArea();

        const data = new FormData();
        data.append("promt", promt);

        // TODO : this does not have error handling
        messages.value.push({ role: "user", content: promt });
        messages.value.push({ role: "assistance", content: "" });
        const response = await fetch("/api/v-chat-response", { method: "POST", body: data });
        // const response = await fetch("/api/chat", { method: "POST", body: data });
        const reader = response.body?.getReader();
        for await (const chunk of streamingFetch(reader)) {
            const lastMessage = messages.value.at(-1);
            if (lastMessage) lastMessage.content += chunk;
            messages.value = [...messages.value];
            if (scrollElement) scrollElement.scrollTo({ top: scrollElement.scrollHeight });
        }

        // TODO : we might not need this
        // hljs.highlightAll();
    };

    useEffect(() => {
        // TODO : if the pathname contains new chat trigger then read the promt from storage and submit it then clear the storage
        // also clear the path or router from query params
        // const promt = localStorage.getItem("promt");
        // if (promt) submit(promt);
    }, []);

    useEffect(() => {
        // TODO : this might be an issue when code blocks in a chat is alot
        hljs.highlightAll();
    });

    return (
        <>
            <ScrollArea className="w-full min-h-0 grow" dir={dir === "rtl" ? "rtl" : "ltr"} ref={scrollAreaRef}>
                <div className="flex flex-col items-center justify-center gap-6 w-full h-full p-3" ref={messagesRef}>
                    {messages.value.map((message, i) => (
                        <Message text={message.content} role={message.role} key={i} />
                    ))}
                </div>
            </ScrollArea>
            <div className="w-full max-w-screen-md p-3 shrink-0">
                <div className="flex items-center gap-1 w-full p-2 rounded-lg bg-input">
                    <div className="relative flex flex-col w-full max-h-40 overflow-hidden" onClick={focusOnTextarea}>
                        <textarea
                            className="w-full min-h-6 max-h-40 px-2 bg-input outline-none resize-none shrink-0"
                            placeholder="Write something..."
                            tabIndex={0}
                            rows={1}
                            dir="auto"
                            ref={textareaRef}
                            onInput={expandInputArea}
                            onKeyDown={textareaOnKeyDown}
                        ></textarea>
                        <span
                            className="absolute inline-block w-full invisible opacity-0 pointer-events-none"
                            style={{ overflowWrap: "break-word" }}
                            ref={textareaSpanRef}
                        ></span>
                    </div>
                    <Button className="p-2 mt-auto mb-0 group" onClick={() => submit()}>
                        <TbSend className="animate-send" size="1.5rem" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Chat;
