"use client";
import { Button } from "@/components/ui/Button";
import "./SideMenu.css";
import { Suspense, memo, useEffect, useState } from "react";
import { TbSparkles, TbMessage2Code } from "react-icons/tb";
import ChatList from "./ChatList";
import { Chat } from "@/fetchers/Chats.fetch";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const dancingScript = Dancing_Script({ weight: "700", subsets: ["latin"] });

const open = signal<boolean | null>(null);

const SideMenu = ({ chatListInitial }: { chatListInitial: Chat[] }) => {
    useSignals();

    const resizeHandler = (event: UIEvent) => {
        if (window.innerWidth < 768) {
            if (open.value) open.value = false;
            else open.value = open.value;
        }
    };

    useEffect(() => {
        if (window.innerWidth > 768) open.value = true;
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <>
            <div
                className={`backdrop absolute inset-0 inline-block md:hidden bg-black z-10 transition-all duration-500 ${
                    open.value ? "opacity-40" : "pointer-events-none opacity-0"
                }`}
                onClick={() => (open.value = false)}
            ></div>
            <aside
                className={`absolute md:relative flex flex-col h-[100svh] max-h-full bg-accent z-20 transition-all duration-300 shrink-0`}
                data-open={open.value ? "true" : "false"}
            >
                <Button
                    className="absolute top-3.5 md:top-1/2 -end-8 flex flex-col items-center justify-center w-6 p-1 opacity-40 hover:opacity-100 transition-all cursor-pointer group"
                    variant="ghost"
                    onClick={() => (open.value = !open.value)}
                >
                    <span
                        className={`inline-block w-1 h-3.5 bg-foreground rounded-full -mb-0.5 transition-all ${
                            !open.value ? "rotate-[20deg]" : "group-hover:-rotate-[20deg]"
                        }`}
                    ></span>
                    <span
                        className={`inline-block w-1 h-3.5 bg-foreground rounded-full -mt-0.5 transition-all ${
                            !open.value ? "-rotate-[20deg]" : "group-hover:rotate-[20deg]"
                        }`}
                    ></span>
                </Button>
                <nav className="flex flex-col w-full h-full overflow-hidden">
                    <div className="flex flex-col gap-4 w-full h-full min-w-[16rem] p-3 pt-4">
                        <div className="flex items-center justify-between gap-4 w-full shrink-0">
                            <Link href="/">
                                <div className="bg-foreground text-background p-1 px-2 rounded-lg">
                                    <span className={`text-lg font-bold ${dancingScript.className}`}>AI</span>
                                </div>
                            </Link>
                            <Button className="flex items-center justify-between gap-2 w-max py-5" variant="outline" asChild>
                                <Link href="/panel">
                                    <TbMessage2Code size="1.25rem" />
                                    <p className="text-base">New Chat</p>
                                </Link>
                            </Button>
                        </div>

                        <ChatList chats={chatListInitial} />

                        <div className="flex flex-col gap-1 w-full shrink-0">
                            <Button className="flex items-center justify-start gap-3 w-full h-16 p-3" variant="outline">
                                <TbSparkles size="1.5rem" />
                                <div className="flex flex-col items-start">
                                    <p>Upgrade Plan</p>
                                    <small className="opacity-60">GPT4, Dall-E and more...</small>
                                </div>
                            </Button>
                            <Button className="flex items-center justify-start gap-3 w-full h-12 p-2" variant="outline">
                                <span className="w-8 h-8 rounded-full bg-blue-300"></span>
                                <b className="">Kasra Keshvardoost</b>
                            </Button>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default SideMenu;
