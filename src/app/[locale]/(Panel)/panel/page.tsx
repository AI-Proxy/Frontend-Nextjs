import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { Card } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/Input";
import ModelListFetcher from "./ModelListFetcher";
import { Suspense } from "react";

const dancingScript = Dancing_Script({ weight: "variable", subsets: ["latin"] });

const page = async () => {
    return (
        <ScrollArea className="w-full grow">
            <div className="flex flex-col items-center gap-10 w-full p-4 grow">
                <Card className="flex flex-col items-center gap-6 w-full max-w-screen-lg p-6 md:py-20">
                    <Link className="flex items-baseline border border-neutral-400 border-opacity-30 rounded-lg" href="/">
                        <div className="bg-foreground text-background p-1 px-2 rounded-lg">
                            <span className={`text-3xl font-extrabold ${dancingScript.className}`}>AI</span>
                        </div>
                        <b className="text-3xl px-2">Hub</b>
                    </Link>
                    <Input className="w-full max-w-screen-sm bg-input h-12 border" type="search" placeholder="Search" />
                </Card>
                <Suspense fallback="loading...">
                    <ModelListFetcher />
                </Suspense>
            </div>
        </ScrollArea>
    );
};

export default page;
