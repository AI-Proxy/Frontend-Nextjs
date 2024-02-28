import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { Card } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/Input";
import { getModelsList } from "@/fetchers/fetch";

const dancingScript = Dancing_Script({ weight: "variable", subsets: ["latin"] });

const page = async () => {
    const modelsList = await getModelsList();

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
                <ul className="grid gap-6 w-full max-w-screen-lg mx-auto mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
                    {modelsList.map((model, i) => (
                        <li className="" key={i}>
                            <Link href={`/panel/model/${model.id}`}>
                                <Card className="flex flex-col gap-3 w-full p-4 hover:bg-secondary group">
                                    <span className="w-16 h-16 rounded-lg bg-blue-300"></span>
                                    <strong className="-mb-2">{model.name}</strong>
                                    <div className="relative flex flex-col w-full max-h-10">
                                        <small className="w-full opacity-70 overflow-hidden">{model.desc}</small>
                                        <span className="absolute end-0 bottom-0 w-10 h-5 bg-gradient-to-r from-transparent to-background group-hover:to-secondary"></span>
                                    </div>
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </ScrollArea>
    );
};

export default page;
