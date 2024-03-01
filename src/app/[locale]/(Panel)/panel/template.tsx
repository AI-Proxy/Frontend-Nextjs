"use client";
import { useEffect } from "react";
import { useAnimate } from "framer-motion";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
    // const pathname = usePathname();
    const [wrapper, animate] = useAnimate<HTMLDivElement>();

    const enterAnimation = async () => {
        await animate(wrapper.current, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, type: "tween" });
    };

    useEffect(() => {
        enterAnimation();
    }, []);

    return (
        <div className="flex flex-col items-center w-full h-full grow" style={{ height: "calc(100% - 50rem)" }} ref={wrapper}>
            {children}
        </div>
    );
}
