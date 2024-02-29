"use client";
import PromtInput, { PromtInputHandle } from "@/components/panel/chat/PromtInput";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AiModel } from "@/fetchers/AiModels.fetch";
import { useToast } from "@/hooks/UseToast";
import { ChatsContext } from "@/providers/ChatsContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback, useContext, useRef } from "react";
import { TbAlertTriangle, TbArtboard } from "react-icons/tb";

const ModelInfo = ({ modelData }: { modelData: AiModel }) => {
    const { toast } = useToast();

    const router = useRouter();
    const chatList = useContext(ChatsContext);
    const promtInputRef = useRef<PromtInputHandle>(null);

    const submit = useCallback(async () => {
        const promt = promtInputRef.current?.textareaElement?.value.trim() || "";
        if (!promt) return;

        const chatName = promt.length > 100 ? promt.substring(0, 100) : promt;

        // create new chat
        const data = new FormData();
        data.append("name", chatName);
        data.append("model_name", modelData.model_name);
        data.append("ai_service_id", modelData.ai_service_id.toString());
        data.append("chat_message", JSON.stringify({ role: "system", content: "You are a helpful assistant.", model_name: modelData.model_name }));
        data.append("chat_message", JSON.stringify({ role: "user", content: promt, model_name: modelData.model_name }));

        const R = await fetch("/api/v1/chats", { method: "POST", body: data });
        const response: any = (await R.json().catch((e) => {})) || {};

        if (R.status >= 400) {
            toast({ title: "Whoops...", description: response.message ?? "Unknow Error", variant: "destructive" });
            return;
        }

        // inject the new chat into chat list
        chatList.dispatch({ type: "addChat", chatList: [{ list: [{ id: response.chat_id, name: chatName }], date: "Today" }] });
        router.push(`/panel/chat/${response.chat_id}?promt=${promt}`);
    }, []);

    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full h-full">
                <Card className="flex flex-col gap-4 w-full max-w-screen-md p-8">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-14 h-14 p-2 rounded-lg bg-muted-foreground">
                            <Image src={modelData.icon} alt={modelData.name} width={40} height={40}></Image>
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
