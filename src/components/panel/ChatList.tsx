"use client";
import { Chat, getChatsList } from "@/fetchers/Chats.fetch";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { TbDots, TbLoader, TbPencil, TbTrash } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { UIEvent, useContext, useEffect } from "react";
import { ChatsContext } from "@/providers/ChatsContextProvider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useToast } from "@/hooks/UseToast";

const lastId = signal<string>("");
const noMoreData = signal<boolean>(false);
const loading = signal<boolean>(false);

const ChatList = ({ listInitial }: { listInitial: Chat[] }) => {
    useSignals();

    const { toast } = useToast();
    const pathname = usePathname();
    const chatsContext = useContext(ChatsContext);

    useEffect(() => {
        chatsContext.dispatch({ type: "setInitalChats", chatList: listInitial });
        lastId.value = listInitial.at(-1)?.list.at(-1)?.id.toString() || "";
        noMoreData.value = false;
    }, []);

    const loadMore = async (event: UIEvent) => {
        const clientHeight = event.currentTarget.clientHeight;
        const delta = Math.abs(event.currentTarget.scrollHeight - event.currentTarget.scrollTop);

        if (clientHeight !== delta) return;
        if (loading.value) return;
        if (noMoreData.value) return;

        loading.value = true;
        let newItems: Chat[] = [];

        await getChatsList("client", lastId.value)
            .then((list) => {
                newItems = list;
                if (!list.length) noMoreData.value = true;
            })
            .catch((e) => {
                toast({ title: "Whoops...", description: "Couldn't get the chat list", variant: "destructive" });
            });

        loading.value = false;
        lastId.value = newItems.at(-1)?.list.at(-1)?.id.toString() || "";
        chatsContext.dispatch({ type: "loadMoreChats", chatList: newItems });
    };

    return (
        <ScrollArea className="w-full my-1 pe-2 grow" onScroll={loadMore}>
            <ul className="flex flex-col gap-5 w-full max-w-full">
                {chatsContext.value.map((item, i) => (
                    <li className="flex flex-col gap-2 w-full" key={i}>
                        <small className="ms-2 opacity-60 text-xs">{item.date}</small>
                        <ul className="flex flex-col gap-0.5">
                            {item.list.map((item, j) => (
                                <li className="relative flex w-full group" key={j}>
                                    <Button
                                        className={`relative flex justify-start gap-2 w-full p-2 text-foreground hover:bg-background ${
                                            pathname === `/panel/chat/${item.id}` ? "bg-background" : "bg-secondary"
                                        }`}
                                        asChild
                                    >
                                        <Link className="overflow-hidden" href={`/panel/chat/${item.id}`}>
                                            <span className="w-5 h-5 bg-neutral-500 rounded-sm shrink-0"></span>
                                            <span className="w-full whitespace-nowrap overflow-hidden opacity-90">{item.name}</span>
                                            <div
                                                className={`absolute end-0 bg-gradient-to-l to-transparent group-hover:from-background from-30% min-w-16 p-2 ${
                                                    pathname === `/panel/chat/${item.id}` ? "from-background" : "from-secondary"
                                                }`}
                                            ></div>
                                        </Link>
                                    </Button>
                                    <div className="absolute end-0 flex justify-end opacity-0 group-hover:opacity-100 bg-gradient-to-l to-transparent from-secondary group-hover:from-background from-30% min-w-16 p-2 rounded-lg">
                                        <Popover>
                                            <PopoverTrigger>
                                                <TbDots className="w-6 h-6 cursor-pointer" size=".7rem" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full max-w-64 p-1.5" align="start">
                                                <Button className="flex items-center justify-start gap-2 px-3 w-full" variant="ghost">
                                                    <TbPencil size="1.2rem" />
                                                    <span>Rename</span>
                                                </Button>
                                                <Button className="flex items-center justify-start gap-2 px-3 w-full text-red-500 opacity-75" variant="ghost">
                                                    <TbTrash size="1.2rem" />
                                                    <span>Delete Chat</span>
                                                </Button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col items-center gap-1">{loading.value && <TbLoader className="animate-spin" size="1.25rem" />}</div>
        </ScrollArea>
    );
};

export default ChatList;
