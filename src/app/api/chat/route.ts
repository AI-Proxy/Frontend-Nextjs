import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { useChat } from "ai/react";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_noStore } from "next/cache";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    unstable_noStore();
    // const { messages } = await req.json();
    // const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    //     { role: "system", content: "You are a helpful assistant." },
    //     { role: "user", content: "write me a simple nodejs code to make https request to an api endpoint" },
    //     {
    //         role: "assistant",
    //         content:
    //             "Sure! Here's a simple Node.js code to make an HTTPS request to an API endpoint using the `https` module:\n\n```javascript\nconst https = require('https');\n\nconst options = {\n  hostname: 'api.example.com',\n  port: 443, // default HTTPS port\n  path: '/api/endpoint',\n  method: 'GET',\n  headers: {\n    'Content-Type': 'application/json',\n    // Any other headers required by the API endpoint\n  }\n};\n\nconst req = https.request(options, (res) => {\n  let data = '';\n\n  res.on('data', (chunk) => {\n    data += chunk;\n  });\n\n  res.on('end', () => {\n    console.log(data); // Handle the response data here\n  });\n});\n\nreq.on('error', (error) => {\n  console.error(error);\n});\n\nreq.end();\n```\n\nIn this example, you need to replace `'api.example.com'` with the actual API endpoint hostname, and `'/api/endpoint'` with the specific endpoint you want to request. Additionally, you can modify the `options` object to include any required headers or request parameters according to the API documentation.\n\nRemember to handle the response data in the `res.on('end', ...)` callback according to your requirements.",
    //     },
    //     { role: "user", content: "can you change the port to 400 instead of 443" },
    // ];

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
    // return new StreamingTextResponse(stream);
}
