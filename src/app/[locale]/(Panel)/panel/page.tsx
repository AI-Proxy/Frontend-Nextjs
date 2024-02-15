"use client";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Locale } from "@/i18n.config";
import { getDir } from "@/lib/i18n";
import { streamingFetch } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import { TbSend } from "react-icons/tb";

export default function Page({ params }: Readonly<{ params: { locale: Locale } }>) {
    const dir = getDir(params.locale);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaSpanRef = useRef<HTMLSpanElement>(null);
    const msgBoxRef = useRef<HTMLDivElement>(null);

    const focusOnTextarea = () => textareaRef.current?.focus();

    const expandInputArea = () => {
        if (textareaSpanRef.current) textareaSpanRef.current.innerText = textareaRef.current?.value || "";
        if (textareaRef.current) textareaRef.current.style.height = `${textareaSpanRef.current?.clientHeight}px`;
    };
    useEffect(() => {
        expandInputArea();
        hljs.highlightAll();
    }, []);

    const submit = async () => {
        const promt = textareaRef.current?.value;
        if (!promt) return;

        const data = new FormData();
        data.append("promt", promt);

        // TODO : this does not have error handling
        const response = await fetch("/api/chat", { method: "POST", body: data });
        const reader = response.body?.getReader();
        for await (const chunk of streamingFetch(reader)) {
            const oldChunk = msgBoxRef.current?.innerHTML;
            if (msgBoxRef.current) msgBoxRef.current.innerHTML = oldChunk + chunk;
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 w-full min-h-0 grow">
            <ScrollArea className="w-full min-h-0 grow" dir={dir === "rtl" ? "rtl" : "ltr"}>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="flex items-start gap-2 w-full max-w-screen-md pb-4">
                        <span className="w-6 h-6 mt-1 rounded-full bg-blue-300 shrink-0"></span>
                        <div className="flex flex-col gap-2 w-full max-w-screen-sm">
                            <b className="text-lg ms-1">You</b>
                            <div
                                className="markdown w-screen max-w-full border p-2 rounded-lg whitespace-break-spaces"
                                dir="auto"
                                ref={msgBoxRef}
                                dangerouslySetInnerHTML={{
                                    __html: marked(`Here's how you can use it: \n 1. Create a new file named \`server.js\`.\n 2. Copy and paste the above code into \`server.js\`.\n 3. Open your terminal and navigate to the directory where \`server.js\` is located.\n 4. Run the following command to start the server: \`node server.js\`.\n\`\`\`javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});\n\`\`\``),
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className="flex items-center gap-1 w-full max-w-screen-md p-2 mb-3 rounded-lg bg-input shrink-0">
                <div className="relative flex flex-col w-full max-h-40 overflow-hidden" onClick={focusOnTextarea}>
                    <textarea
                        className="w-full min-h-6 max-h-40 px-2 bg-input outline-none resize-none shrink-0"
                        placeholder="Write something..."
                        tabIndex={0}
                        rows={1}
                        dir="auto"
                        ref={textareaRef}
                        onInput={expandInputArea}
                    ></textarea>
                    <span
                        className="absolute inline-block w-full invisible opacity-0 pointer-events-none"
                        style={{ overflowWrap: "break-word" }}
                        ref={textareaSpanRef}
                    ></span>
                </div>
                <Button className="p-2 mt-auto mb-0 group" onClick={submit} disabled={!!(textareaRef.current?.value ?? false)}>
                    <TbSend className="animate-send" size="1.5rem" />
                </Button>
            </div>
        </div>
    );
}
