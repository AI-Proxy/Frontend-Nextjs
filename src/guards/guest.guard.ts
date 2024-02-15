import { NextRequest, NextResponse } from "next/server";

export default function main(req: NextRequest, res: NextResponse, routes: string[]): boolean {
    const allowUserToViewPage = true;
    const pathname = `${req.nextUrl.pathname}/`.replaceAll("//", "/");

    let runTheGuard = false;
    for (const route of routes) {
        if (pathname.includes(route)) {
            runTheGuard = true;
            break;
        }
    }
    if (!runTheGuard) return allowUserToViewPage;

    // get the cookie
    const authToken = req.cookies.get("AuthToken");

    // if the token does not exist user is not logged in then allow user as guest
    if (!authToken) return allowUserToViewPage;

    // verify the token
    

    // verification faild -> user is not logged in
    // decode the token and check the expiration date
    // expiration date is passed -> user is not logged in
    // if non of that then user is logged in

    return !allowUserToViewPage;
}
