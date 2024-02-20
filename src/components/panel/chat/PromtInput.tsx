"use client";
import { Button } from "@/components/ui/Button";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { KeyboardEvent, RefObject, forwardRef, memo, useImperativeHandle, useRef } from "react";
import { TbSend } from "react-icons/tb";

export type PromtInputHandle = {
    textareaElement: HTMLTextAreaElement | null;
    clearInputArea: () => void;
};

interface PromtInputProps extends React.ComponentPropsWithoutRef<"div"> {
    onSubmit: () => Promise<void>;
}

const disableSendButton = signal<boolean>(true);

const PromtInput = forwardRef<PromtInputHandle, PromtInputProps>(({ onSubmit, ...props }, ref) => {
    useSignals();

    useImperativeHandle(
        ref,
        () => ({
            textareaElement: textareaRef.current,
            clearInputArea: () => clearInputArea(),
        }),
        []
    );

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaSpanRef = useRef<HTMLSpanElement>(null);

    const focusOnTextarea = () => textareaRef.current?.focus();

    const textareaOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
        }
    };

    const expandInputArea = () => {
        if (textareaSpanRef.current) textareaSpanRef.current.innerText = `${textareaRef.current?.value}\n`; // ? `${textareaRef.current?.value}\n` : "";
        if (textareaRef.current) textareaRef.current.style.height = `${textareaSpanRef.current?.clientHeight}px`;

        disableSendButton.value = !textareaRef.current?.value;
    };

    const clearInputArea = () => {
        if (textareaRef.current) textareaRef.current.value = "";
        if (textareaSpanRef.current) textareaSpanRef.current.innerText = "";
        if (textareaRef.current) textareaRef.current.style.height = `${textareaSpanRef.current?.clientHeight}px`;
    };

    return (
        <div className="flex items-center justify-center gap-1 w-full rounded-lg bg-input">
            <div className="relative flex flex-col w-full max-h-40 p-2 py-4 overflow-hidden" onClick={focusOnTextarea}>
                <textarea
                    className="w-full min-h-6 max-h-40 px-2 bg-input outline-none resize-none shrink-0"
                    placeholder="Write something..."
                    tabIndex={0}
                    rows={1}
                    dir="auto"
                    ref={textareaRef}
                    onInput={expandInputArea}
                    onKeyDown={textareaOnKeyDown}
                ></textarea>
                <span
                    className="absolute inline-block w-full invisible opacity-0 pointer-events-none"
                    style={{ overflowWrap: "break-word" }}
                    ref={textareaSpanRef}
                ></span>
            </div>
            <Button className="p-2 mt-auto mb-2 me-2" disabled={disableSendButton.value} onClick={() => onSubmit()}>
                <TbSend className="animate-send?" size="1.5rem" />
            </Button>
        </div>
    );
});

export default memo(PromtInput);
