import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { createReadStream } from "fs";
import { sleep } from "@/lib/utils";
import { Stream } from "openai/streaming.mjs";
import { getFilteredChatMessages, updateChatMessage } from "./fetchers";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const myChatStream = async (req: NextRequest, assistantChatMessageId: string, promt: string, chatId: string) => {
    // TODO
    // query the laravel backend and get a list of non empty messages so that we can send them to gpt
    // we can use the chat message listing and controll the message amount with per_page value

    const filteredChatMessages = await getFilteredChatMessages(req, chatId);

    const messages: OpenAI.ChatCompletionMessageParam[] = filteredChatMessages.map((v) => {
        const { role, content }: any = v;
        return { role, content };
    });
    messages.push({ role: "user", content: promt });

    let error: boolean = false;
    let AiResponse: Stream<OpenAI.Chat.Completions.ChatCompletionChunk>;

    await openai.chat.completions
        .create({ model: "gpt-3.5-turbo", stream: true, messages })
        .then((response) => (AiResponse = response))
        .catch(async (e) => {
            error = true;
            await updateChatMessage(req, assistantChatMessageId, "", true, e.status, e.code);
        });

    if (error) return new Response(null, { status: 400, statusText: "AI error" });

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
            await updateChatMessage(req, assistantChatMessageId, content, true, "200");
        },
        async cancel() {
            await updateChatMessage(req, assistantChatMessageId, content, true, "200");
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

export const aiChatStream = async (req: NextRequest) => {
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

export const simulatedChatStream = async (req: NextRequest, assistantChatMessageId: string, promt: string) => {
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
            await updateChatMessage(req, assistantChatMessageId, content);
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
