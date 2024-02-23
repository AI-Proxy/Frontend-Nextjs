"use client";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
    const [wrapper, animate] = useAnimate<HTMLDivElement>();
    const enterAnimation = async () => {
        if (!wrapper.current) return;
        await animate(wrapper.current, { opacity: [0, 1], y: [-30, 0] }, { duration: 0.3, ease: "easeOut", delay: 0.2 });
    };
    const exitAnimation = async () => {
        if (!wrapper.current) return;
        await animate(wrapper.current, { opacity: [1, 0], y: [0, -30] }, { duration: 0.2, ease: "easeOut" });
    };

    useEffect(() => {
        enterAnimation();
        return () => {
            exitAnimation();
        };
    }, []);

    return (
        <div className="flex flex-col items-center w-full h-full grow" style={{ height: "calc(100% - 50rem)" }} ref={wrapper}>
            {children}
        </div>
    );
}
