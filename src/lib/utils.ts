import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sleep(miliseconds: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), miliseconds);
    });
}

export async function* streamingFetch(reader: any) {
    const decoder = new TextDecoder();
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield decoder.decode(value);
    }
}
