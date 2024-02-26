import { jwtVerify } from "jose";
import { type ClassValue, clsx } from "clsx";
import { NextRequest } from "next/server";
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
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield new TextDecoder().decode(value);
    }
}

export const checkCsrf = async (req: NextRequest) => {
    // in GET method we don't need csrf checks
    if (req.method == "GET") return true;

    const ip = req.ip || req.headers.get("x-forwarded-for") || "";
    const key = new TextEncoder().encode(process.env.CSRF_SECRET);
    const XSRF: string = req.cookies.get("XSRF-TOKEN")?.value || "";

    const { payload } = await jwtVerify<{ ip: string | undefined }>(XSRF, key, { algorithms: ["HS256"] }).catch(() => ({ payload: undefined }));

    if (!payload) return false;
    if (payload.ip === ip) return true;

    return false;
};
