import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream } from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    req.on("close", () => res.end());
    res.on("close", () => res.end());
    return res.end();
};

export default handler;
