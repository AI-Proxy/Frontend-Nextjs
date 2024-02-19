import { sleep } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const input = {
        model: "13",
    };
    const rs = {
        id: "13",
        name: "New Chat alert",
    };

    // await sleep(7000);

    return res.json(rs);
};

export default handler;
