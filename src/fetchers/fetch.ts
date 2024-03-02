import { cache } from "react";

export type ChatMessages = Array<{ role: string; content: string }>;
export const getChatMessages = cache(async (): Promise<ChatMessages> => {
    const data = new FormData();
    let Q: Response = new Response();
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v-chatMessages-response`, { method: "GET", next: { revalidate: 2 } })
        .then((res) => (Q = res))
        .catch((err) => console.error({ err }));
    return await Q.json();
});
