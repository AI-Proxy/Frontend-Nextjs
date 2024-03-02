"use client";
import { Chat } from "@/fetchers/Chats.fetch";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { TbDots, TbPencil, TbTrash } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { ChatsContext } from "@/providers/ChatsContextProvider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

const ChatList = ({ chats }: { chats: Chat[] }) => {
    const pathname = usePathname();
    const chatsContext = useContext(ChatsContext);
    let chatList = chats;

    useEffect(() => {
        chatsContext.dispatch({ type: "setInitalChats", chatList: chats });
        chatList = chatsContext.value;
    }, []);

    return (
        <ScrollArea className="w-full my-1 pe-2 grow">
            <ul className="flex flex-col gap-5 w-full max-w-full">
                {chatList.map((item, i) => (
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
        </ScrollArea>
    );
};

export default ChatList;
