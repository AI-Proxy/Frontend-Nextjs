import { Dir, Locale } from "@/i18n.config";
import { signal } from "@preact/signals-react";
import ChatMessages from "./ChatMessages";
import { getDir } from "@/lib/i18n";
import { ChatMessage, getChatMessages } from "@/fetchers/ChatMessages.fetch";
import { Suspense } from "react";
import ChatMessagesLoading from "./ChatMessages.loading";

let messages: ChatMessage[] = [];

export default async function Page({ params }: Readonly<{ params: { id: string; locale: Locale } }>) {
    const dir: string = getDir(params.locale);
    messages = await getChatMessages("server", params.id);

    return (
        <div className="flex flex-col items-center w-full grow" style={{ height: "calc(100% - 5rem)" }}>
            <Suspense fallback={<ChatMessagesLoading />}>
                <ChatMessages dir={dir} initialMessages={messages} chatId={params.id} />
            </Suspense>
        </div>
    );
}
