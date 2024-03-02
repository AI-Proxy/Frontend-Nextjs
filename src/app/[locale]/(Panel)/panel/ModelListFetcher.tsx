import ModelList from "@/components/panel/ModelList";
import { getModelsList } from "@/fetchers/AiModels.fetch";

const ModelListFetcher = async () => {
    const modelsList_initial = await getModelsList("server");
    return <ModelList listInitial={modelsList_initial} />;
};

export default ModelListFetcher;
