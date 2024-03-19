import { NextRequest } from "next/server";
import { myChatStream } from "./streams";

export async function POST(req: NextRequest) {
    const reqData = await req.formData();
    const assistantChatMessageId = reqData.get("assistantChatMessageId")?.toString() || "";
    const promt = reqData.get("promt")?.toString() || "";
    const chatId = reqData.get("chatId")?.toString() || "";

    // return await aiChatStream(req);
    // return await simulatedChatStream(req, assistantChatMessageId, promt);
    return await myChatStream(req, assistantChatMessageId, promt, chatId);
}
