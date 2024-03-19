"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

const loading = () => {
    return (
        <div className="flex flex-col items-center gap-4 w-full h-full">
            <Card className="flex flex-col gap-4 w-full max-w-screen-md p-8">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-14 h-14 p-2 rounded-lg bg-muted-foreground" />
                    <b className="text-2xl">
                        <Skeleton className="w-24 h-6" />
                    </b>
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                    <Skeleton className="w-9/12 h-2" />
                    <Skeleton className="w-8/12 h-2" />
                    <Skeleton className="w-9/12 h-2" />
                    <Skeleton className="w-5/12 h-2" />
                </div>
                <ul className="flex flex-wrap gap-2">
                    <li>
                        <Skeleton className="w-16 h-5" />
                    </li>
                    <li>
                        <Skeleton className="w-16 h-5 bg-destructive" />
                    </li>
                </ul>
            </Card>
            <Card className="flex flex-wrap items-center justify-between gap-4 w-full max-w-screen-md p-8 py-4">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="w-4 h-4 text-red-500 opacity-90 animate-ping" />
                    <Skeleton className="w-20 h-2" />
                    <Skeleton className="w-9/12 h-2" />
                </div>
            </Card>
        </div>
    );
};

export default loading;
