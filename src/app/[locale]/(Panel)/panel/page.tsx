import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { Card } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/Input";

const dancingScript = Dancing_Script({ weight: "variable", subsets: ["latin"] });

const page = () => {
    const array: Array<string> = [
        "bg-purple-50",
        "bg-purple-100",
        "bg-purple-200",
        "bg-purple-300",
        "bg-purple-400",
        "bg-purple-500",
        "bg-purple-600",
        "bg-purple-700",
        "bg-purple-800",
        "bg-purple-900",
        "bg-purple-950",
        "bg-blue-100",
        "bg-blue-200",
        "bg-blue-300",
        "bg-blue-400",
        "bg-blue-500",
        "bg-blue-600",
        "bg-blue-700",
    ];

    return (
        <ScrollArea className="w-full min-h-0 grow">
            <div className="flex flex-col items-center gap-10 w-full grow">
                <div className="flex flex-col items-center gap-6 w-full py-20">
                    <Link className="flex items-baseline border border-neutral-400 border-opacity-30 rounded-lg" href="/">
                        <div className="bg-foreground text-background p-1 px-2 rounded-lg">
                            <span className={`text-3xl font-extrabold ${dancingScript.className}`}>AI</span>
                        </div>
                        <b className="text-3xl px-2">Hub</b>
                    </Link>
                    <Input className="w-full max-w-screen-sm rounded-full border-2 border-muted-foreground" type="search" placeholder="Search" />
                </div>
                <ul className="grid gap-6 w-full max-w-screen-lg mx-auto mb-10 px-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
                    {array.map((d, i) => (
                        <li className="" key={i}>
                            <Link href={`/panel/model/${i}`}>
                                <Card className="flex flex-col gap-3 w-full p-4 hover:bg-secondary">
                                    <span className={`w-16 h-16 rounded-lg ${d}`}></span>
                                    <strong className="-mb-2">GPT-4</strong>
                                    <small className="w-full max-h-10 opacity-70 overflow-hidden overflow-ellipsis">
                                        OpenAI's most powerful model. Stronger than ChatGPT in quantitative questions (math and physics), creative writing, and
                                        many other challenging tasks. Powered by GPT-4 Turbo with Vision.
                                    </small>
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
