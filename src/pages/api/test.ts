import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from "formidable";

export const config = { api: { bodyParser: false } };

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const form = new Formidable();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Encoding", "UTF-8"); // chunk | compress | UTF-8
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    const body = await form.parse(req);
    const promt = body[0].promt?.[0] || "";
    if (!promt) return;

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: promt },
    ];
    const response = await openai.chat.completions.create({ model: "gpt-3.5-turbo", stream: true, messages });

    let message;
    for await (const chunk of response) {
        if (!chunk) continue;
        message = chunk.choices[0].delta.content;
        res.write(message);
    }

    req.on("close", () => res.end());
    res.on("close", () => res.end());
    return res.end();
};

export default handler;
