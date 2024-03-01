import { Card } from "@/components/ui/Card";
import { AiModel } from "@/fetchers/AiModels.fetch";

const ModelCard = ({ model }: { model: AiModel }) => {
    return (
        <Card className="flex flex-col gap-3 w-full h-full p-4 hover:bg-secondary group">
            <span className="w-16 h-16 rounded-lg bg-blue-300"></span>
            <strong className="">{model.name}</strong>
            {model.desc && (
                <div className="relative flex flex-col w-full max-h-10 -mt-2">
                    <small className="w-full opacity-70 overflow-hidden">{model.desc}</small>
                    <span className="absolute end-0 bottom-0 w-10 h-5 bg-gradient-to-r from-transparent to-background group-hover:to-secondary"></span>
                </div>
            )}
        </Card>
    );
};

export default ModelCard;
