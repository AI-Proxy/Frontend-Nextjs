"use client";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { streamingFetch } from "@/lib/utils";
import { KeyboardEvent, UIEvent, memo, useCallback, useEffect, useRef } from "react";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import hljs from "highlight.js";
import { TbSend } from "react-icons/tb";
import Message from "@/components/panel/chat/Message";
import { ChatMessages } from "@/lib/fetch";
import { usePathname, useSearchParams } from "next/navigation";
import PromtInput, { PromtInputHandle } from "@/components/panel/chat/PromtInput";

// adds copy option for code blocks
hljs.addPlugin({
    "after:highlightElement": ({ el, result }) => {
        const div = document.createElement("div");
        const small = document.createElement("small");
        const button = document.createElement("button");
        div.classList.add("codeblock-head", "flex", "items-center", "justify-between", "gap-2", "w-full", "p-2", "px-4", "rounded-t-xl", "bg-background");
        small.classList.add("opacity-50");
        button.classList.add("underline");
        small.innerText = result.language || "";
        button.innerText = "Copy";
        button.addEventListener("click", async () => await navigator.clipboard.writeText(result.code || ""));
        div.append(small, button);
        el.parentElement?.prepend(div);
    },
});

const messages = signal<ChatMessages>([]);
const loadingMessages = signal<boolean>(false);
const noMoreMessages = signal<boolean>(false);
const last_scrollHeigth = signal<number>(0);

const Chat = ({ dir, initialMessages }: { dir: string; initialMessages: ChatMessages }) => {
    useSignals();

    const pathname = usePathname();
    const queryParams = useSearchParams();

    const promtInputRef = useRef<PromtInputHandle>(null);
    const endOfMsgSpan = useRef<HTMLSpanElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const loadMoreMessages = async (event: UIEvent) => {
        if (event.currentTarget.scrollTop > 100) return;
        if (noMoreMessages.value) return;
        if (loadingMessages.value) return;
        const ct = event.currentTarget;

        loadingMessages.value = true;

        const newMessages = await getChatMessages();
        loadingMessages.value = false;
        messages.value = [...newMessages, ...messages.value];

        const scrollDiff = Math.abs(last_scrollHeigth.value - ct.scrollHeight);
        if (scrollDiff > 500) ct.scrollTo({ top: scrollDiff });
        else ct.scrollTo({ top: last_scrollHeigth.value });
        last_scrollHeigth.value = ct.scrollHeight;

        // noMoreMessages.current = true;
    };

    const getChatMessages = async (): Promise<ChatMessages> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(initialMessages);
            }, 2000);
        });
    };

    const submit = useCallback(async (initPromt?: string | null) => {
        const promt = initPromt ?? promtInputRef.current?.textareaElement?.value.trim();
        if (!promt) return;
        promtInputRef.current?.clearInputArea();

        const data = new FormData();
        data.append("promt", promt);

        // TODO : this does not have error handling
        messages.value.push({ role: "user", content: promt });
        messages.value.push({ role: "assistance", content: "" });
        // const response = await fetch("/api/v-chat-response", { method: "POST", body: data });
        const response = await fetch("/api/chat", { method: "POST", body: data });
        if (response.status !== 200) {
            console.warn(response.statusText);
            return;
        }
        const reader = response.body?.getReader();
        for await (const chunk of streamingFetch(reader)) {
            const lastMessage = messages.value.at(-1);
            if (lastMessage) lastMessage.content += chunk;
            messages.value = [...messages.value];
            endOfMsgSpan.current?.scrollIntoView({ behavior: "instant" });
            // if (scrollElement) scrollElement.scrollTo({ top: scrollElement.scrollHeight });
        }
        setTimeout(() => {
            endOfMsgSpan.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);

        // TODO : we might not need this
        hljs.highlightAll();
    }, []);

    useEffect(() => {
        messages.value = initialMessages;

        setTimeout(() => {
            endOfMsgSpan.current?.scrollIntoView({ behavior: "auto" });
            last_scrollHeigth.value = scrollAreaRef.current?.querySelector("div")?.scrollHeight || 0;
        }, 100);

        const initalPromt = queryParams?.get("promt");
        window.history.pushState({}, "", pathname);
        if (initalPromt) submit(initalPromt);
    }, []);

    return (
        <>
            <ScrollArea className="w-full max-h-full grow" dir={dir === "rtl" ? "rtl" : "ltr"} ref={scrollAreaRef} onScroll={loadMoreMessages}>
                <div className="flex flex-col items-center gap-6 w-full h-full p-3" ref={messagesRef}>
                    <span hidden={!loadingMessages.value}>Loading More Messages...</span>
                    {messages.value.map((message, i) => (
                        <Message text={message.content} role={message.role} key={i} />
                    ))}
                    <span ref={endOfMsgSpan}></span>
                </div>
            </ScrollArea>
            <div className="w-full max-w-screen-md p-3 shrink-0">
                <PromtInput onSubmit={submit} ref={promtInputRef} />
            </div>
        </>
    );
};

export default memo(Chat);
