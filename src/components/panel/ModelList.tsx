"use client";
import ModelCard from "@/components/panel/ModelCard";
import { Button } from "@/components/ui/Button";
import { AiModel, getModelsList } from "@/fetchers/AiModels.fetch";
import { useToast } from "@/hooks/UseToast";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import Link from "next/link";
import React, { useEffect } from "react";
import { TbLoader } from "react-icons/tb";

const modelsList = signal<AiModel[]>([]);
const lastId = signal<string>("");
const noMoreData = signal<boolean>(false);
const loading = signal<boolean>(false);

const ModelList = ({ listInitial }: { listInitial: AiModel[] }) => {
    useSignals();
    const { toast } = useToast();

    useEffect(() => {
        modelsList.value = listInitial;
    }, []);

    const loadMore = async () => {
        if (loading.value) return;
        if (noMoreData.value) return;

        loading.value = true;
        let newItems: AiModel[] = [];

        await getModelsList("client", lastId.value)
            .then((list) => {
                newItems = list;
                if (!list.length) noMoreData.value = true;
            })
            .catch((e) => {
                toast({ title: "Whoops...", description: "Couldn't get the model list", variant: "destructive" });
            });

        loading.value = false;
        modelsList.value = [...modelsList.value, ...newItems];
        lastId.value = newItems.at(-1)?.id.toString() || "";
    };

    return (
        <>
            <ul className="grid gap-6 w-full max-w-screen-lg mx-auto" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
                {modelsList.value.map((model, i) => (
                    <li key={i}>
                        <Link href={`/panel/model/${model.id}`}>
                            <ModelCard model={model} />
                        </Link>
                    </li>
                ))}
            </ul>
            {loading.value && <TbLoader className="animate-spin" size="1.25rem" />}
            {!noMoreData.value && !loading.value && <Button onClick={loadMore}>Load More</Button>}
        </>
    );
};

export default ModelList;
