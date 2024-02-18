import React from "react";
import ModelInfo from "./ModelInfo";
import InputPromt from "./InputPromt";

const page = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            <ModelInfo />
            <InputPromt />
        </div>
    );
};

export default page;
