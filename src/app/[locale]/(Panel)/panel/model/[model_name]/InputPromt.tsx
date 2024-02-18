"use client";
import { FormEvent, KeyboardEvent, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChatsContext } from "@/providers/ChatsContextProvider";

const InfoPromt = () => {
    const router = useRouter();
    const chatList = useContext(ChatsContext);
    const promt = useRef<HTMLInputElement>(null);

    const submit = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;

        // create new chat
        // TODO : request backend to create new chat and get its id

        // inject the new chat into chat list
        chatList.dispatch({
            type: "addChat",
            chatList: [{ list: [{ id: "13", name: "New Chat" }], date: "Today" }],
        });

        // router push to new chat page
        // enter the user promt
        localStorage.setItem("promt", promt.current?.value || "");
        localStorage.setItem("newChat", "true");
        router.push("/panel/chat/1");
    };

    return (
        <div>
            <input type="text" onKeyDown={submit} ref={promt} />
        </div>
    );
};

export default InfoPromt;
