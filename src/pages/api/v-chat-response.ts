import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream } from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // -> before sending request to GPT, request backend to create new chat message for User promt and check users balance

    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Encoding", "UTF-8"); // chunk | compress | UTF-8
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    const rs = createReadStream("./src/pages/api/sample_response2.txt");
    // rs.on("data", (chunk) => {});
    for await (const chunk of rs) {
        if (!chunk) continue;
        res.write(chunk);
    }

    // -> when stream is finished or req or res object emmit close event
    // we must request back so that we save chat message for Assistance response
    // and calculate user's balance and usage base on said request

    req.on("close", () => res.end());
    res.on("close", () => res.end());
    return res.end();
};

export default handler;
