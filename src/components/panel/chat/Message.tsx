import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";

const Message = ({ text, role }: { text: string; role: string }) => {
    const markdownRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    let html = "";
    if (mounted) html = DOMPurify.sanitize(marked(text).toString());

    useEffect(() => {
        // markdownRef.current?.querySelectorAll("code:not([data-highlighted])").forEach((elm) => {
        // document.querySelectorAll("code").forEach((elm) => {
        //     elm.classList.add("hljs");
        //     elm.setAttribute("data-highlighted", "reset");
        //     elm.setAttribute("data-highlighted", "yes");
        // });
        hljs.highlightAll();
    }, [text]);

    return (
        <div className={`flex items-start gap-2 w-full max-w-screen-md ${role === "user" ? "flex-row" : "flex-row-reverse"}`}>
            <span className={`sticky top-0 w-6 h-6 mt-1 rounded-full shrink-0 ${role === "user" ? "bg-blue-300" : "bg-emerald-300"}`}></span>
            <div className="flex flex-col items-start gap-2 w-full max-w-screen-sm">
                <b className={`text-lg px-1 ${role === "user" ? "me-auto" : "ms-auto"}`}>{role === "user" ? "You" : "Assistance"}</b>
                <div
                    className={`markdown w-screen max-w-full border p-2 rounded-lg whitespace-break-spaces ${role === "user" ? "" : "bg-secondary"}`}
                    ref={markdownRef}
                    dir="auto"
                    dangerouslySetInnerHTML={{ __html: html }}
                ></div>
            </div>
        </div>
    );
};

export default Message;
