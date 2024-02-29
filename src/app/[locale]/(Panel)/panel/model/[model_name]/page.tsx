import React from "react";
import ModelInfo from "./ModelInfo";
import { AiModel } from "@/fetchers/AiModels.fetch";

const page = ({ params }: { params: { model_name: string } }) => {
    const modelData: AiModel = {
        id: 1,
        icon: "",
        name: "ChatGpt 3.5",
        model_name: "gpt-3.5-turbo-0125",
        model_type: "text",
        ai_service_id: 1,
        desc: "OpenAI's most powerful model. Stronger than ChatGPT in quantitative questions math and physics, creative writing, and many other challenging tasks. Powered by GPT-4 Turbo with Vision.",
    };

    return (
        <div className="flex flex-col items-center w-full h-full grow">
            <ModelInfo modelData={modelData} />
        </div>
    );
};

export default page;
