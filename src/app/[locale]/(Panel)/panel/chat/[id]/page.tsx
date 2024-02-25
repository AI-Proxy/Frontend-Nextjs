import { Dir, Locale } from "@/i18n.config";
import { signal } from "@preact/signals-react";
import ChatMessagesComponent from "./ChatMessages";
import { getDir } from "@/lib/i18n";
import { ChatMessages, getChatMessages } from "@/lib/fetch";
import { Suspense } from "react";
import ChatMessagesLoading from "./ChatMessages.loading";

let messages: ChatMessages = [];

export default async function Page({ params }: Readonly<{ params: { locale: Locale } }>) {
    const dir: string = getDir(params.locale);
    messages = await getChatMessages();

    return (
        <div className="flex flex-col items-center w-full grow" style={{ height: "calc(100% - 5rem)" }}>
            <Suspense fallback={<ChatMessagesLoading />}>
                <ChatMessagesComponent dir={dir} initialMessages={messages} />
            </Suspense>
        </div>
    );
}
