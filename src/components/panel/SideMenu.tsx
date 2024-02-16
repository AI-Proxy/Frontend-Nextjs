"use client";
import { Button } from "@/components/ui/Button";
import "./SideMenu.css";
import { memo, useState } from "react";
import { TbSparkles, TbMessage2Code } from "react-icons/tb";

const SideMenu = () => {
    const [open, setOpen] = useState(true);

    return (
        <aside className={`absolute md:relative flex flex-col h-screen bg-accent z-20 transition-all duration-300 shrink-0 ${open ? "w-64" : "w-0"}`}>
            <Button
                className="absolute top-1/2 -end-8 flex flex-col items-center justify-center w-6 p-1 opacity-40 hover:opacity-100 transition-all cursor-pointer group"
                variant="ghost"
                onClick={() => setOpen((o) => !o)}
            >
                <span
                    className={`inline-block w-1 h-3.5 bg-foreground rounded-full -mb-0.5 transition-all ${
                        !open ? "rotate-[20deg]" : "group-hover:-rotate-[20deg]"
                    }`}
                ></span>
                <span
                    className={`inline-block w-1 h-3.5 bg-foreground rounded-full -mt-0.5 transition-all ${
                        !open ? "-rotate-[20deg]" : "group-hover:rotate-[20deg]"
                    }`}
                ></span>
            </Button>
            <nav className="flex flex-col w-full h-full overflow-hidden">
                <div className="flex flex-col gap-4 w-full h-full min-w-[16rem] p-3">
                    <Button className="flex items-center justify-between gap-2 w-full py-1.5" variant="default">
                        <p className="text-base">New Chat</p>
                        <TbMessage2Code size="1.25rem" />
                    </Button>
                    <ul className="w-full h-full grow"></ul>
                    <div className="flex flex-col gap-1 w-full">
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
    );
};

export default memo(SideMenu);
