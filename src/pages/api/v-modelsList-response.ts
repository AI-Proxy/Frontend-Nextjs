import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream, readFileSync } from "fs";
import { sleep } from "@/lib/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const rs = [
        {
            id: 1,
            icon: "",
            name: `GPT-3.5`,
            desc: `OpenAI's most powerful model. Stronger than ChatGPT in quantitative questions math and physics, creative writing, and many other challenging tasks. Powered by GPT-4 Turbo with Vision.`,
        },
        {
            id: 2,
            icon: "",
            name: `GPT-4`,
            desc: `OpenAI's most powerful model. Stronger than ChatGPT in quantitative questions math and physics, creative writing, and many other challenging tasks. Powered by GPT-4 Turbo with Vision.`,
        },
        {
            id: 3,
            icon: "",
            name: `Dall-E 2`,
            desc: `ChatGPT in quantitative questions math and physics, creative writing, and many other challenging tasks. Powered by GPT-4 Turbo with Vision.`,
        },
        {
            id: 4,
            icon: "",
            name: `Dall-E 3`,
            desc: `Creative writing, and many other challenging tasks. Powered by GPT-4 Turbo with Vision.`,
        },
        {
            id: 5,
            icon: "",
            name: `Gemini Pro`,
            desc: `Stronger than ChatGPT in quantitative questions math and physics, creative writing, and many other challenging tasks. Powered by GPT-4 Turbo with Vision.`,
        },
    ];

    return res.json(rs);
};

export default handler;
