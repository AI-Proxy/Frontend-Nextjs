"use client";
// import "highlight.js/styles/atom-one-dark.min.css";
// import "highlight.js/styles/base16/dracula.min.css";
// import "highlight.js/styles/base16/classic-dark.min.css";
// import "highlight.js/styles/base16/chalk.min.css";
import "highlight.js/styles/base16/default-dark.min.css";
// import "highlight.js/styles/base16/espresso.min.css";
import { memo, useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";

const Message = ({ text, role }: { text: string; role: string }) => {
    const markdownRef = useRef<HTMLDivElement>(null);
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
    }, []);

    let html = "";
    if (mounted) html = DOMPurify.sanitize(marked(text).toString());

    // useEffect(() => {
    //     console.log("highlightAll");
    //     markdownRef.current?.querySelectorAll("pre code").forEach((elm: any) => {
    //         hljs.highlightElement(elm);
    //     });
    // }, []);

    useEffect(() => {
        markdownRef.current?.querySelectorAll("pre code").forEach((elm: any) => hljs.highlightElement(elm));
    }, [text]);

    return (
        <div className={`flex items-start gap-2 w-full max-w-screen-md ${role === "user" ? "flex-row" : "flex-row-reverse"}`}>
            <span className={`sticky top-0 w-6 h-6 mt-1 rounded-full shrink-0 ${role === "user" ? "bg-blue-300" : "bg-emerald-300"}`}></span>
            <div className="flex flex-col items-start gap-2 w-full max-w-screen-sm">
                <b className={`text-lg px-1 ${role === "user" ? "me-auto" : "ms-auto"}`}>{role === "user" ? "You" : "Assistance"}</b>
                <div
                    className={`markdown w-full border p-2 rounded-lg whitespace-break-spaces ${role === "user" ? "" : "bg-secondary"}`}
                    ref={markdownRef}
                    dir="auto"
                    dangerouslySetInnerHTML={{ __html: html }}
                ></div>
            </div>
        </div>
    );
};

export default memo(Message);
