import React from "react";
import ModelInfo from "./ModelInfo";
import InputPromt from "./InputPromt";
import { Card } from "@/components/ui/Card";

const page = ({ params }: { params: { model_name: string } }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            <Card className="flex flex-col items-center justify-center gap-4 p-10">
                <ModelInfo model_number={params.model_name} />
                <InputPromt />
            </Card>
        </div>
    );
};

export default page;
