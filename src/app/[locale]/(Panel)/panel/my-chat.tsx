"use client";
import { Message } from "ai";
import { FormEvent } from "react";
import { streamingFetch } from "@/lib/utils";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import axios from "axios";

const messages: Message[] = [];
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = "http://localhost:3000/api/chat";
    // const url = "http://localhost:3000/api/stream-test";
    // const url = "http://localhost:3000/api/test";

    const data = new FormData(event.currentTarget);
    const promt: any = data.get("promt");

    // await fetchEventSource(url, {
    //     method: "POST",
    //     body: data,
    //     onmessage(ev) {
    //         console.log(ev.data);
    //     },
    // });

    const response = await fetch(url, { method: "POST", body: data });
    const reader = response.body?.getReader();
    for await (const chunk of streamingFetch(reader)) {
        console.log({ chunk });
    }

    // await axios
    //     .post(url, data, {
    //         onDownloadProgress: (progressEvent) => {
    //             const xhr = progressEvent.event.target;
    //             const { response } = xhr;
    //             console.log({ response });
    //         },
    //     })
    //     .then((res) => {
    //         console.log({ res: res.data });
    //     })
    //     .catch((e) => console.error({ e }));
};

export default function MyComponent() {
    return (
        <div>
            <ul>
                {messages.map((m, index) => (
                    <li key={index}>
                        {m.role === "user" ? "User: " : "AI: "}
                        {m.content}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <label>
                    Say something...
                    <input name="promt" />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
