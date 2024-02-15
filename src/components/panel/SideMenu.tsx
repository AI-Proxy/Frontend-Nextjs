"use client";
import { Button } from "@/components/ui/Button";
import "./SideMenu.css";
import { memo, useState } from "react";

const SideMenu = () => {
    const [open, setOpen] = useState(true);

    return (
        <aside className={`absolute md:relative flex h-screen bg-accent z-20 transition-all duration-300 shrink-0 ${open ? "w-64" : "w-0"}`}>
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
        </aside>
    );
};

export default memo(SideMenu);
