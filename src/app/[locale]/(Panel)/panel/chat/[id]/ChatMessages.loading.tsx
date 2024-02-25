import React from "react";

const ChatMessagesLoading = () => {
    const arr = [1, 0, 1, 0];
    return (
        <div className="flex flex-col items-center gap-4 w-full p-4">
            {arr.map((v, i) => (
                <div className={`flex items-start gap-2 w-full max-w-screen-md ${v ? "flex-row" : "flex-row-reverse"}`} key={i}>
                    <span className="sticky top-0 w-6 h-6 mt-1 rounded-full shrink-0 bg-neutral-500 animate-pulse"></span>
                    <div className="flex flex-col items-start gap-2 w-full max-w-screen-sm">
                        <b className={`text-lg px-1 ${v ? "me-auto" : "ms-auto"}`}>
                            <span className="w-20 h-6 animate-pulse"></span>
                        </b>
                        <div className={`flex flex-col gap-2 w-full border p-4 rounded-lg whitespace-break-spaces`}>
                            <span className="w-8/12 h-3 rounded bg-accent animate-pulse"></span>
                            <span className="w-8/12 h-3 rounded bg-accent animate-pulse"></span>
                            <span className="w-28 h-3 rounded bg-accent animate-pulse"></span>
                            <span className=""></span>
                            <span className="w-7/12 h-3 rounded bg-accent animate-pulse"></span>
                            <span className="w-6/12 h-3 rounded bg-accent animate-pulse"></span>
                            <span className="w-6/12 h-3 rounded bg-accent animate-pulse"></span>
                            <span className="w-20 h-3 rounded bg-accent animate-pulse"></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessagesLoading;
