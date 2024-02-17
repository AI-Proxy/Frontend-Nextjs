"use client";
import { ChatList as ChatListType } from "@/lib/fetch";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { TbDots } from "react-icons/tb";

const ChatList = ({ chats }: { chats: ChatListType }) => {
    return (
        <ScrollArea className="w-full my-2 pe-2 grow">
            <ul className="flex flex-col gap-5 w-full max-w-full min-w-0">
                {chats.map((item, i) => (
                    <li className="flex flex-col gap-2 w-full" key={i}>
                        <small className="ms-2 opacity-60 text-xs">{item.date}</small>
                        <ul className="flex flex-col gap-0.5">
                            {item.list.map((item, j) => (
                                <li className="relative flex w-full group" key={j}>
                                    <Button className="relative flex justify-start gap-2 w-full p-2 bg-secondary text-foreground hover:bg-background" asChild>
                                        <Link className="overflow-hidden" href={`/panel/chat/${item.id}`}>
                                            <span className="w-5 h-5 bg-neutral-500 rounded-sm shrink-0"></span>
                                            <span className="w-full whitespace-nowrap overflow-hidden opacity-90">{item.name}</span>
                                            <div className="absolute end-0 bg-gradient-to-l to-transparent from-secondary group-hover:from-background from-30% min-w-16 p-2"></div>
                                        </Link>
                                    </Button>
                                    <div className="absolute end-0 flex justify-end opacity-0 group-hover:opacity-100 bg-gradient-to-l to-transparent from-secondary group-hover:from-background from-40% p-2 rounded-lg">
                                        <TbDots className="w-6 h-6 cursor-pointer" size=".7rem" />
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
