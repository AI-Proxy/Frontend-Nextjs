import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { createReadStream } from "fs";
import { sleep } from "@/lib/utils";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const myChatStream = async (req: NextRequest) => {
    const body = await req.formData();
    const promt = body.get("promt")?.toString() || "";
    if (!promt) return;

    const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: promt },
    ];
    const AiResponse = await openai.chat.completions.create({ model: "gpt-3.5-turbo", stream: true, messages });

    const stream = new ReadableStream({
        async pull(controller) {
            for await (const chunk of AiResponse) {
                if (!chunk) continue;
                const msg = chunk.choices[0].delta.content?.toString() || "";
                controller.enqueue(msg);
            }
            controller.close();
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

const simulatedChatStream = async () => {
    const rs = createReadStream("./src/app/api/chat/sample_response2.txt", { highWaterMark: 20 });

    const stream = new ReadableStream({
        async pull(controller) {
            for await (const chunk of rs) {
                if (!chunk) continue;
                await sleep(100);
                controller.enqueue(chunk);
            }
            controller.close();
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

export async function POST(req: NextRequest) {
    // return await myChatStream(req);
    // return await aiChatStream(req);
    return await simulatedChatStream();
}
