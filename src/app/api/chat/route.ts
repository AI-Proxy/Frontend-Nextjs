import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { createReadStream } from "fs";
import { sleep } from "@/lib/utils";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const myChatStream = async (req: NextRequest, assistanceChatMessageId: string) => {
    const body = await req.formData();
    const promt = body.get("promt")?.toString() || "";
    if (!promt) return;

    // TODO
    // query the laravel backend and get a list of non empty messages so that we can send them to gpt
    // we can use the chat message listing and controll the message amount with per_page value

    // NOTICE
    // there might be some situations in which the promt of user has no answer from ai
    // should we include that promt in message list or not

    const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: promt },
    ];
    const AiResponse = await openai.chat.completions.create({ model: "gpt-3.5-turbo", stream: true, messages });

    let content = "";
    const stream = new ReadableStream({
        async pull(controller) {
            for await (const chunk of AiResponse) {
                if (!chunk) continue;
                const msg = chunk.choices[0].delta.content?.toString() || "";
                content += msg;
                controller.enqueue(msg);
            }
            controller.close();
            await updateChatMessage(req, assistanceChatMessageId, content);
        },
        async cancel() {
            console.log("cancel");
            // TODO : we can also do something here if user canceled the promt in any time
        },
    });

    const res = new Response(stream);
    res.headers.append("Content-Type", "text/event-stream; charset=utf-8");
    res.headers.append("Connection", "keep-alive");
    res.headers.append("Cache-Control", "no-cache");
    res.headers.append("Content-Encoding", "UTF-8"); // chunk | compress | UTF-8
    res.headers.append("X-Accel-Buffering", "no");

    return res;
};

const aiChatStream = async (req: NextRequest) => {
    const body = await req.formData();
    const promt = body.get("promt")?.toString() || "";
    if (!promt) return;

    const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: promt },
    ];

    const response = await openai.chat.completions.create({ model: "gpt-3.5-turbo", stream: true, messages });
    const stream = OpenAIStream(response);
    const res = new StreamingTextResponse(stream);
    res.headers.append("Content-Type", "text/event-stream; charset=utf-8");
    res.headers.append("Connection", "keep-alive");
    res.headers.append("Cache-Control", "no-cache");
    res.headers.append("Content-Encoding", "UTF-8"); // chunk | compress | UTF-8
    res.headers.append("X-Accel-Buffering", "no");

    return res;
};

const simulatedChatStream = async (req: NextRequest, assistanceChatMessageId: string) => {
    const rs = createReadStream("./src/app/api/chat/sample_response2.txt", { highWaterMark: 20 });
    let content = "";

    const stream = new ReadableStream({
        async pull(controller) {
            for await (const chunk of rs) {
                if (!chunk) continue;
                await sleep(100);
                content += chunk;
                controller.enqueue(chunk);
            }
            controller.close();
            await updateChatMessage(req, assistanceChatMessageId, content);
        },
        async cancel() {
            console.log("cancel");
        },
    });

    const res = new Response(stream);
    res.headers.append("Content-Type", "text/event-stream; charset=utf-8");
    res.headers.append("Connection", "keep-alive");
    res.headers.append("Cache-Control", "no-cache");
    res.headers.append("Content-Encoding", "UTF-8"); // chunk | compress | UTF-8
    res.headers.append("X-Accel-Buffering", "no");

    return res;
};

const updateChatMessage = async (req: NextRequest, assistanceChatMessageId: string, AiResponse: string) => {
    const data = new FormData();
    data.append("content", AiResponse);
    data.append("_method", "PUT");

    const headers = new Headers();
    headers.set("accept", "application/json");
    headers.set("Authorization", `Bearer ${req.cookies.get("AuthToken")?.value}`);

    const R = await fetch(`${process.env.API_BASE_URL}/api/v1/chat-messages/${assistanceChatMessageId}`, { method: "POST", body: data, headers: headers });
    if (R.status >= 400) console.error(await R.json());
};

export async function POST(req: NextRequest) {
    const reqData = await req.formData();
    const assistanceChatMessageId = reqData.get("assistanceChatMessageId")?.toString() || "";

    // return await aiChatStream(req);
    // return await myChatStream(req, assistanceChatMessageId);
    return await simulatedChatStream(req, assistanceChatMessageId);
}
