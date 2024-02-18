import { sleep } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const rs = [
        {
            list: [
                {
                    id: "1",
                    name: "Filter and display content. Filter and display content. Filter and display content.",
                },
                {
                    id: "2",
                    name: "Whispering winds through the trees",
                },
                {
                    id: "3",
                    name: "Dancing shadows under the moonlight",
                },
            ],
            date: "Today",
        },
        {
            list: [
                {
                    id: "4",
                    name: "Butterflies fluttering in the garden",
                },
                {
                    id: "5",
                    name: "Ocean waves crashing against the shore",
                },
            ],
            date: "Yesterday",
        },
        {
            list: [
                {
                    id: "6",
                    name: "Sparkling stars in the midnight sky",
                },
                {
                    id: "7",
                    name: "Footsteps echoing in an empty hallway",
                },
            ],
            date: "Previous 7 Days",
        },
        {
            list: [
                {
                    id: "8",
                    name: "A melody lost in the silence",
                },
                {
                    id: "9",
                    name: "Butterflies fluttering in the garden",
                },
                {
                    id: "10",
                    name: "The aroma of freshly baked bread",
                },
                {
                    id: "11",
                    name: "Footsteps echoing in an empty hallway",
                },
            ],
            date: "Last Month",
        },
        {
            list: [
                {
                    id: "12",
                    name: "Laughter echoing in the distance.",
                },
            ],
            date: "Past Year",
        },
    ];

    // await sleep(7000);

    return res.json(rs);
};

export default handler;
