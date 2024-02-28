import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { refreshAuthToken } from "@/lib/utils.server";

export default async function main(req: NextRequest, res: NextResponse, routes: string[]): Promise<[boolean, NextResponse]> {
    const allowUserToViewPage = true;
    const pathname = `${req.nextUrl.pathname}/`.replaceAll("//", "/");

    let runTheGuard = false;
    for (const route of routes) {
        if (pathname.includes(route)) {
            runTheGuard = true;
            break;
        }
    }
    if (!runTheGuard) return [allowUserToViewPage, res];

    // get the cookie
    const authToken = req.cookies.get("AuthToken")?.value || "";

    // if the token does not exist user is not logged in then dont allow user
    if (!authToken) return [!allowUserToViewPage, res];

    // verify the token
    const key = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(authToken, key, { algorithms: ["HS256"] }).catch((e) => ({ payload: undefined }));

    // verification faild then user is not logged in so dont allow user
    if (!payload) {
        res.cookies.delete("AuthToken");
        return [!allowUserToViewPage, res];
    }

    // expiration date is passed then user is not logged in (*1000 becuse of js milliseconds)
    const expireTime: number = (payload.exp || 0) * 1000;
    if (expireTime < Date.now()) {
        res.cookies.delete("AuthToken");
        return [!allowUserToViewPage, res];
    }

    // make a call to refresh token if issue at passes 1 day
    const limit: number = 60 * 60 * 24 * 1000; // 1 day
    const issuedAt: number = (payload.iat || 0) * 1000;
    if (Date.now() - limit > issuedAt) {
        res = await refreshAuthToken(req, res);
    }

    return [allowUserToViewPage, res];
}
