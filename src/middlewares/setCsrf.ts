import { NextRequest, NextResponse } from "next/server";

const randStr = (length: number = 10): string => {
    let result: string = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
};

export default function main(req: NextRequest, res: NextResponse): NextResponse {
    res.cookies.set("XSRF-TOKEN", randStr(64), { httpOnly: true, secure: true, path: "/" });
    return res;
}
