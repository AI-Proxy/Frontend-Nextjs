import { cache } from "react";

export type ChatList = Array<{ list: { id: string; name: string }[]; date: string }>;
export const getChatList = cache(async () => {
    const data = new FormData();
    let Q: Response = new Response();
    await fetch("http://localhost:3000/api/v-chatList-response", { method: "GET", next: { revalidate: 2 } })
        .then((res) => (Q = res))
        .catch((err) => console.error({ err }));
    return await Q.json();
});

export type ChatMessages = Array<{ role: string; content: string }>;
export const getChatMessages = cache(async (): Promise<ChatMessages> => {
    const data = new FormData();
    let Q: Response = new Response();
    await fetch("http://localhost:3000/api/v-chatMessages-response", { method: "GET", next: { revalidate: 2 } })
        .then((res) => (Q = res))
        .catch((err) => console.error({ err }));
    return await Q.json();
});

export type ModelsList = Array<{ id: number; icon: string; name: string; desc: string }>;
export const getModelsList = cache(async (): Promise<ModelsList> => {
    const data = new FormData();
    let Q: Response = new Response();
    await fetch("http://localhost:3000/api/v-modelsList-response", { method: "GET", next: { revalidate: 60 * 60 * 24 } })
        .then((res) => (Q = res))
        .catch((err) => console.error({ err }));
    return await Q.json();
});
