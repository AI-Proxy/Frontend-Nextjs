"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

const error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    // useEffect(() => {}, [error]);
    return (
        <Card className="flex flex-col gap-1 w-full max-w-screen-sm m-auto p-10 py-4 bg-destructive">
            <CardTitle className="text-lg opacity-50">Error!</CardTitle>
            <CardDescription className="text-foreground">{error.message}</CardDescription>
        </Card>
    );
};

export default error;
