import ModelInfo from "./ModelInfo";
import { AiModel, getSingleModel } from "@/fetchers/AiModels.fetch";

const page = async ({ params }: { params: { model_id: string } }) => {
    let modelData: AiModel = {
        id: 0,
        name: "",
        icon: "",
        model_name: "",
        model_type: "",
        ai_service_id: 0,
    };

    await getSingleModel("server", params.model_id)
        .then((c) => (modelData = c))
        .catch((e) => console.log({ e }));

    return (
        <div className="flex flex-col items-center w-full h-full grow">
            <ModelInfo modelData={modelData} />
        </div>
    );
};

export default page;
