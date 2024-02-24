"use client";
// import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAnimate } from "framer-motion";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
    // const pathname = usePathname();
    // const [isPresent, safeToRemove] = usePresence();
    const [wrapper, animate] = useAnimate<HTMLDivElement>();

    const enterAnimation = async () => {
        await animate(wrapper.current, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, type: "tween" });
    };
    // const exitAnimation = async () => {
    //     await animate(wrapper.current, { opacity: [1, 0], y: [0, -20] }, { duration: 0.2, type: "spring", bounce: 0.25 });
    //     safeToRemove?.();
    // };
    // const exitAnimation = async (wc: any) => {
    //     console.log(1);
    //     await animate(wc, { opacity: 0 }, { duration: 0.2, type: "spring", bounce: 0.25 });
    //     safeToRemove?.();
    // };

    useEffect(() => {
        enterAnimation();
    }, []);

    // useEffect(() => {
    //     exitAnimation();
    // }, [pathname]);

    // useEffect(() => {
    //     if (isPresent) enterAnimation();
    //     else exitAnimation();
    //     return () => {
    //         safeToRemove?.();
    //     };
    // }, [isPresent]);

    return (
        <div className="flex flex-col items-center w-full h-full grow" style={{ height: "calc(100% - 50rem)" }} ref={wrapper}>
            {children}
        </div>

        // <motion.div
        //     initial={{ opacity: 0, y: 20 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     exit={{ opacity: 0 }}
        //     className="flex flex-col items-center w-full h-full grow"
        //     style={{ height: "calc(100% - 50rem)" }}
        //     key={pathname}
        // >
        //     {children}
        // </motion.div>

        // <>{children}</>
    );
}
