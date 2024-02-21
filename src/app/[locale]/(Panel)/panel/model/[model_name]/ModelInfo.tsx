"use client";
import PromtInput, { PromtInputHandle } from "@/components/panel/chat/PromtInput";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChatsContext } from "@/providers/ChatsContextProvider";
import { useRouter } from "next/navigation";
import { memo, useCallback, useContext, useRef } from "react";
import { TbAlertTriangle, TbArtboard } from "react-icons/tb";

const ModelInfo = ({ modelData }: { modelData: any }) => {
    const router = useRouter();
    const chatList = useContext(ChatsContext);
    const promtInputRef = useRef<PromtInputHandle>(null);

    const submit = useCallback(async () => {
        const promt = promtInputRef.current?.textareaElement?.value.trim() || "";
        if (!promt) return;

        // create new chat
        const data = new FormData();
        let Q: Response = new Response();
        await fetch("http://localhost:3000/api/v-createNewChat-response", { method: "GET", next: { revalidate: 0 } })
            .then((res) => (Q = res))
            .catch((err) => console.error({ err }));

        if (Q.status !== 200) return;
        const newChat = await Q.json();

        // inject the new chat into chat list
        chatList.dispatch({ type: "addChat", chatList: [{ list: [{ id: newChat.id, name: newChat.name }], date: "Today" }] });
        router.push(`/panel/chat/13?promt=${promt}`);
    }, []);

    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full h-full">
                <Card className="flex flex-col gap-4 w-full max-w-screen-md p-8">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-14 h-14 rounded-lg bg-blue-300">
                            <TbArtboard className="text-background" size="2rem" />
                        </span>
                        <b className="text-2xl">{modelData.name}</b>
                    </div>
                    <p className="opacity-80">{modelData.desc}</p>
                    <ul className="flex flex-wrap gap-2">
                        <li>
                            <Badge variant="secondary">Official</Badge>
                        </li>
                        <li>
                            <Badge variant="destructive">Paid Access</Badge>
                        </li>
                    </ul>
                </Card>
                <Card className="flex flex-wrap items-center justify-between gap-4 w-full max-w-screen-md p-8 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <TbAlertTriangle className="text-red-500 opacity-90" size="1.2rem" />
                        <p>Charge your account balance to start using this model</p>
                    </div>
                    <Button>Charge Your Account</Button>
                </Card>
            </div>
            <div className="w-full max-w-screen-md p-3 shrink-0">
                <PromtInput onSubmit={submit} ref={promtInputRef} />
            </div>
        </>
    );
};

export default memo(ModelInfo);
