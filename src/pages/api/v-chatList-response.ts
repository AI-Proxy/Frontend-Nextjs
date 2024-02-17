import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const rs = [
        {
            list: [
                {
                    id: "32131",
                    name: "Filter and display content. Filter and display content. Filter and display content.",
                },
                {
                    id: "32131",
                    name: "Whispering winds through the trees",
                },
                {
                    id: "32131",
                    name: "Dancing shadows under the moonlight",
                },
            ],
            date: "Today",
        },
        {
            list: [
                {
                    id: "32131",
                    name: "Butterflies fluttering in the garden",
                },
                {
                    id: "32131",
                    name: "Ocean waves crashing against the shore",
                },
            ],
            date: "Yesterday",
        },
        {
            list: [
                {
                    id: "32131",
                    name: "Sparkling stars in the midnight sky",
                },
                {
                    id: "32131",
                    name: "Footsteps echoing in an empty hallway",
                },
            ],
            date: "Previous 7 Days",
        },
        {
            list: [
                {
                    id: "32131",
                    name: "A melody lost in the silence",
                },
                {
                    id: "32131",
                    name: "Butterflies fluttering in the garden",
                },
                {
                    id: "32131",
                    name: "The aroma of freshly baked bread",
                },
                {
                    id: "32131",
                    name: "Footsteps echoing in an empty hallway",
                },
            ],
            date: "Last Month",
        },
        {
            list: [
                {
                    id: "32131",
                    name: "Laughter echoing in the distance.",
                },
            ],
            date: "Past Year",
        },
    ];

    return res.json(rs);
};

export default handler;
