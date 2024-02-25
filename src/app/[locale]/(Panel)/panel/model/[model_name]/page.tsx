import React from "react";
import ModelInfo from "./ModelInfo";

const page = ({ params }: { params: { model_name: string } }) => {
    const modelData = {
        id: 13,
        name: "GPT-4",
        desc: "OpenAI's most powerful model. Stronger than ChatGPT in quantitative questions math and physics, creative writing, and many other challenging tasks. Powered by GPT-4 Turbo with Vision.",
    };

    return (
        <div className="flex flex-col items-center w-full h-full grow">
            <ModelInfo modelData={modelData} />
        </div>
    );
};

export default page;
