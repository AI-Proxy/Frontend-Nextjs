import { cache } from "react";

export interface AiModel {
    id: number;
    icon: string;
    name: string;
    model_name: string;
    model_type: string;
    ai_service_id: number;
    desc?: string;
}

export const getModelsList = cache(async (mode: "server" | "client", lastId?: number | string): Promise<AiModel[]> => {
    const UrlBase = mode === "server" ? process.env.API_BASE_URL : "";
    let requestInit: RequestInit = { method: "GET" };
    let queryParams: string = `per_page=30`;

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

    const R = await fetch(`${UrlBase}/api/v1/ai-model?${queryParams}`, requestInit)
        .then((response) => response)
        .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

    if (R.status >= 400) {
        console.error({ url: R.url, status: R.status, statusText: R.statusText });
        throw Error(`Couldn't get the model list`, { cause: R.status });
    }

    const response: any = (await R.json().catch((e) => {})) || [];
    return response;
});

export const getSingleModel = cache(async (mode: "server" | "client", id?: number | string): Promise<AiModel> => {
    const UrlBase = mode === "server" ? process.env.API_BASE_URL : "";
    let requestInit: RequestInit = { method: "GET" };

    if (mode === "server") {
        const { cookies: Cookies } = await import("next/headers");
        const AuthToken: string = Cookies().get("AuthToken")?.value || "";

        let headers: any = { Accept: "application/json" };
        headers["Authorization"] = `Bearer ${AuthToken}`;
        headers["serversecret"] = process.env.SERVER_SECRET || "";
        headers["tt"] = Date.now().toString();

        requestInit.headers = headers;
    }

    const R = await fetch(`${UrlBase}/api/v1/ai-model/${id}`, requestInit)
        .then((response) => response)
        .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

    if (R.status >= 400) {
        console.error({ url: R.url, status: R.status, statusText: R.statusText });
        throw Error(`Couldn't get the model`);
    }

    const response: any = (await R.json().catch((e) => {})) || [];
    return response;
});
