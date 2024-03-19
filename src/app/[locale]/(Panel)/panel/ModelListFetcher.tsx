import ModelList from "@/components/panel/ModelList";
import { AiModel, getModelsList } from "@/fetchers/AiModels.fetch";

const ModelListFetcher = async () => {
    let modelsList_initial: AiModel[] = [];
    await getModelsList("server")
        .then((c) => (modelsList_initial = c))
        .catch((e) => console.log({ e }));

    return <ModelList listInitial={modelsList_initial} />;
};

export default ModelListFetcher;
