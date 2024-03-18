"use client";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { streamingFetch } from "@/lib/utils";
import { UIEvent, memo, useCallback, useEffect, useRef } from "react";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import hljs from "highlight.js";
import Message from "@/components/panel/chat/Message";
import { ChatMessage, createChatMessage, getChatMessages } from "@/fetchers/ChatMessages.fetch";
import { usePathname, useSearchParams } from "next/navigation";
import PromtInput, { PromtInputHandle } from "@/components/panel/chat/PromtInput";
import { useToast } from "@/hooks/UseToast";

// adds copy option for code blocks
hljs.addPlugin({
    "after:highlightElement": ({ el, result }) => {
        const div = document.createElement("div");
        const small = document.createElement("small");
        const button = document.createElement("button");
        div.classList.add(
            "codeblock-head",
            "flex",
            "items-center",
            "justify-between",
            "gap-2",
            "w-full",
            "p-2",
            "px-4",
            "rounded-t-xl",
            "bg-background",
            "border-b"
        );
        small.classList.add("opacity-50");
        button.classList.add("underline");
        small.innerText = result.language || "";
        button.innerText = "Copy";
        button.addEventListener("click", async () => await navigator.clipboard.writeText(result.code || ""));
        div.append(small, button);
        el.parentElement?.prepend(div);
    },
});

const messages = signal<ChatMessage[]>([]);
const loadingMessages = signal<boolean>(false);
const noMoreMessages = signal<boolean>(false);
const topMessageId = signal<string>("");
const last_scrollHeigth = signal<number>(0);

const ChatMessages = ({ dir, initialMessages, chatId }: { dir: string; initialMessages: ChatMessage[]; chatId: string }) => {
    useSignals();

    const { toast } = useToast();
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
        const currentTarget = event.currentTarget;

        loadingMessages.value = true;
        let newItems: ChatMessage[] = [];

        await getChatMessages("client", chatId, topMessageId.value)
            .then((list) => {
                newItems = list;
                if (!list.length) noMoreMessages.value = true;
            })
            .catch((e) => {
                toast({ title: "Whoops...", description: "Couldn't get chat messages", variant: "destructive" });
            });
        messages.value = [...newItems, ...messages.value];
        console.log({ newItems });

        topMessageId.value = newItems.at(0)?.id.toString() || "";
        loadingMessages.value = false;

        const scrollDiff = Math.abs(last_scrollHeigth.value - currentTarget.scrollHeight);
        if (scrollDiff > 200) currentTarget.scrollTo({ top: scrollDiff });
        else currentTarget.scrollTo({ top: last_scrollHeigth.value });
        last_scrollHeigth.value = currentTarget.scrollHeight;
    };

    const submit = useCallback(async (initPromt?: string | null) => {
        const promt = initPromt ?? promtInputRef.current?.textareaElement?.value.trim();
        if (!promt) return;
        promtInputRef.current?.clearInputArea();

        let lastMessage = messages.value.at(-1);

        // create chat-messages before hand
        if (!initPromt) {
            let error = false;
            await createChatMessage(promt, "gpt-3.5-turbo", chatId)
                .then((r) => messages.value.push(...r))
                .catch(() => (error = true));
            if (error) return;
            lastMessage = messages.value.at(-1);
        }

        const data = new FormData();
        data.append("promt", promt);
        data.append("assistanceChatMessageId", lastMessage?.id || "");
        data.append("chatId", chatId);
        const response = await fetch("/api/chat", { method: "POST", body: data });

        if (response.status !== 200) {
            console.warn(response.statusText);
            // TODO : if there is an error with promt, set the last message error values
            return;
        }

        const reader = response.body?.getReader();
        for await (const chunk of streamingFetch(reader)) {
            if (lastMessage) lastMessage.content += chunk;
            messages.value = [...messages.value];
            endOfMsgSpan.current?.scrollIntoView({ behavior: "instant" });
        }
    }, []);

    useEffect(() => {
        messages.value = initialMessages;
        topMessageId.value = initialMessages.at(0)?.id.toString() || "";

        setTimeout(() => {
            endOfMsgSpan.current?.scrollIntoView();
            last_scrollHeigth.value = scrollAreaRef.current?.querySelector("div")?.scrollHeight || 0;
        }, 50);

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
                        <Message text={message.content || ""} role={message.role} key={i} />
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

export default memo(ChatMessages);
