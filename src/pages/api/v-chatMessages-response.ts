import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream, readFileSync } from "fs";
import { sleep } from "@/lib/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const sr2 = readFileSync("./src/pages/api/sample_response2.txt");
    const sr1 = readFileSync("./src/pages/api/sample_response1.txt");
    const sr0 = readFileSync("./src/pages/api/sample_response0.txt");

    const rs = [
        { role: "user", content: `test ${Math.random()}` },
        { role: "Assistance", content: sr0.toString() },
        { role: "user", content: `test ${Math.random()}` },
        { role: "Assistance", content: sr1.toString() },
        { role: "user", content: `test ${Math.random()}` },
        { role: "Assistance", content: sr2.toString() },
    ];

    return res.json(rs);
};

export default handler;
