import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

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

    // if the token does not exist user is not logged in then allow user as guest
    if (!authToken) return [allowUserToViewPage, res];

    // verify the token
    let payload: any;
    const key = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(authToken, key, { algorithms: ["HS512"] })
        .then(({ payload }) => payload)
        .catch((e) => {});

    // verification faild then user is not logged in so allow user as guest
    if (!payload) {
        res.cookies.delete("AuthToken");
        return [allowUserToViewPage, res];
    }

    // expiration date is passed then user is not logged in
    if (payload.exp < Date.now()) {
        res.cookies.delete("AuthToken");
        return [allowUserToViewPage, res];
    }

    return [!allowUserToViewPage, res];
}
