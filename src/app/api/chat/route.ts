import { NextRequest } from "next/server";
import { myChatStream } from "./streams";

export async function POST(req: NextRequest) {
    const reqData = await req.formData();
    const assistanceChatMessageId = reqData.get("assistanceChatMessageId")?.toString() || "";
    const promt = reqData.get("promt")?.toString() || "";
    const chatId = reqData.get("chatId")?.toString() || "";

    // return await aiChatStream(req);
    // return await simulatedChatStream(req, assistanceChatMessageId, promt);
    return await myChatStream(req, assistanceChatMessageId, promt, chatId);
}
