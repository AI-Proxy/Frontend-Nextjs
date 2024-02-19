import { Button } from "@/components/ui/Button";
import React from "react";

const CodeInfo = ({ language, code }: { language: string; code: string }) => {
    return (
        <div className="flex items-center justify-between gap-2 w-full p-2 rounded-t-xl bg-secondary">
            <small className="opacity-50">{language}</small>
            <Button variant="link" size="sm">
                <span className="text-xs">Copy Code</span>
            </Button>
        </div>
    );
};

export default CodeInfo;
