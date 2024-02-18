export type ChatList = Array<{ list: { id: string; name: string }[]; date: string }>;
export const getChatList = async () => {
    const data = new FormData();
    let Q: Response = new Response();
    await fetch("http://localhost:3000/api/v-chatList-response", { method: "GET", next: { revalidate: 2 } })
        .then((res) => (Q = res))
        .catch((err) => console.error({ err }));
    return await Q.json();
};

export type ChatMessages = Array<{ role: string; content: string }>;
export const getChatMessages = async (): Promise<ChatMessages> => {
    return [{ role: "user", content: `test ${Math.random()}` }];
};
