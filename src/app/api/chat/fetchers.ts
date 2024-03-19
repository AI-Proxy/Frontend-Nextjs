import { ChatMessage } from "@/fetchers/ChatMessages.fetch";
import { NextRequest } from "next/server";

export const updateChatMessage = async (
    req: NextRequest,
    assistantChatMessageId: string,
    AiResponse: string,
    sent?: boolean,
    statusCode?: string,
    err?: string
) => {
    const data = new FormData();
    data.append("content", AiResponse);
    // data.append("sent", sent ? "true" : "false");
    data.append("status_code", statusCode ?? "200");
    data.append("error", err ?? "");
    data.append("_method", "PUT");

    const headers = new Headers();
    headers.set("accept", "application/json");
    headers.set("Authorization", `Bearer ${req.cookies.get("AuthToken")?.value}`);

    const R = await fetch(`${process.env.API_BASE_URL}/api/v1/chat-messages/${assistantChatMessageId}`, { method: "POST", body: data, headers: headers });
    if (R.status >= 400) console.error(await R.json());
};

export const getFilteredChatMessages = async (req: NextRequest, chatId: string): Promise<ChatMessage[]> => {
    let queryParams: string = `per_page=50&chat_id=${chatId}`;

    const headers = new Headers();
    headers.set("accept", "application/json");
    headers.set("Authorization", `Bearer ${req.cookies.get("AuthToken")?.value}`);

    const R = await fetch(`${process.env.API_BASE_URL}/api/v1/chat-messages/sorted?${queryParams}`, { method: "GET", headers })
        .then((response) => response)
        .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

    if (R.status >= 400) {
        console.error({ url: R.url, status: R.status, statusText: R.statusText });
        return [];
    }

    const response: any = (await R.json().catch((e) => {})) || [];
    return response;
};
