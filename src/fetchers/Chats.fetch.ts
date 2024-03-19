import { cache } from "react";

export interface Chat {
    list: { id: string; name: string }[];
    date: string;
}

export const getChatsList = cache(async (mode: "server" | "client", lastId?: number | string): Promise<Chat[]> => {
    const UrlBase = mode === "server" ? process.env.API_BASE_URL : "";
    let requestInit: RequestInit = { method: "GET" };
    let queryParams: string = `per_page=50`;

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

    const R = await fetch(`${UrlBase}/api/v1/chats?${queryParams}`, requestInit)
        .then((response) => response)
        .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

    if (R.status >= 400) {
        console.error({ url: R.url, status: R.status, statusText: R.statusText });
        throw Error(`Couldn't get the model list`, { cause: R.status });
    }

    const response: any = (await R.json().catch((e) => {})) || [];
    return response;
});
