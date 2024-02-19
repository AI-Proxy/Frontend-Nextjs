"use client";
import { FormEvent, KeyboardEvent, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChatsContext } from "@/providers/ChatsContextProvider";
import { Input } from "@/components/ui/Input";

const InfoPromt = () => {
    const router = useRouter();
    const chatList = useContext(ChatsContext);
    const promt = useRef<HTMLInputElement>(null);

    const submit = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;

        // create new chat
        const data = new FormData();
        let Q: Response = new Response();
        await fetch("http://localhost:3000/api/v-createNewChat-response", { method: "GET", next: { revalidate: 0 } })
            .then((res) => (Q = res))
            .catch((err) => console.error({ err }));

        if (Q.status !== 200) return;
        const newChat = await Q.json();

        // inject the new chat into chat list
        chatList.dispatch({ type: "addChat", chatList: [{ list: [{ id: newChat.id, name: newChat.name }], date: "Today" }] });
        router.push(`/panel/chat/13?promt=${promt.current?.value || ""}`);
    };

    return (
        <div>
            <Input placeholder="Write something..." type="text" onKeyDown={submit} ref={promt} />
        </div>
    );
};

export default InfoPromt;
