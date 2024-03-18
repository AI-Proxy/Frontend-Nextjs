import { cache } from "react";

export interface ChatMessage {
    id: string;
    role: "system" | "user" | "assistant" | "tool" | "function";
    content: string | null;
    // TODO : add error states and error messages here to show errors in chat box
}

export const getChatMessages = cache(async (mode: "server" | "client", chatId: string, lastId?: number | string): Promise<ChatMessage[]> => {
    const UrlBase = mode === "server" ? process.env.API_BASE_URL : "";
    let requestInit: RequestInit = { method: "GET" };
    let queryParams: string = `per_page=50&chat_id=${chatId}`;

    if (lastId) queryParams = `${queryParams}&last_id=${lastId}`;

    if (mode === "server") {
        const { cookies: Cookies } = await import("next/headers");
        const AuthToken: string = Cookies().get("AuthToken")?.value || "";

        let headers: any = { Accept: "application/json" };
        headers["Authorization"] = `Bearer ${AuthToken}`;
        headers["serversecret"] = process.env.SERVER_SECRET || "";
        headers["tt"] = Date.now().toString();

        requestInit.headers = headers;
    }

    const R = await fetch(`${UrlBase}/api/v1/chat-messages?${queryParams}`, requestInit)
        .then((response) => response)
        .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

    if (R.status >= 400) {
        console.error({ url: R.url, status: R.status, statusText: R.statusText });
        throw Error(`Couldn't get chat messages`, { cause: R.status });
    }

    const response: any = (await R.json().catch((e) => {})) || [];
    return response;
});

export const createChatMessage = cache(async (promt: string, modelName: string, chatId: string): Promise<ChatMessage[]> => {
    const data = new FormData();
    data.append(
        "chat_message",
        JSON.stringify([
            { role: "user", content: promt, model_name: modelName, chat_id: chatId, status_code: "200" },
            { role: "assistance", content: "", model_name: modelName, chat_id: chatId },
        ])
    );

    const R = await fetch("/api/v1/chat-messages", { method: "POST", body: data });
    if (R.status >= 400) throw Error(`Couldn't create chat messages`, { cause: R.status });

    const response: any = (await R.json().catch((e) => {})) || {};
    return response;
});
