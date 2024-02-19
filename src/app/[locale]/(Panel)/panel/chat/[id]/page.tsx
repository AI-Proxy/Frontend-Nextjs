import { Dir, Locale } from "@/i18n.config";
import { signal } from "@preact/signals-react";
import ChatMessagesComponent from "./ChatMessages";
import { getDir } from "@/lib/i18n";
import { ChatMessages, getChatMessages } from "@/lib/fetch";
import { Suspense } from "react";

let messages: ChatMessages = [];

export default async function Page({ params }: Readonly<{ params: { locale: Locale } }>) {
    const dir: string = getDir(params.locale);
    messages = await getChatMessages();

    return (
        <div className="flex flex-col items-center w-full min-h-0 grow">
            <Suspense fallback="loading">
                <ChatMessagesComponent dir={dir} initialMessages={messages} />
            </Suspense>
        </div>
    );
}
