import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import setCsrf from "@/middlewares/setCsrf";
import i18nRewrites from "@/middlewares/i18nRewrites";
import GuestGuard from "@/middlewares/guards/guest.guard";
import AuthGuard from "@/middlewares/guards/auth.guard";

export async function middleware(req: NextRequest) {
    let res = new NextResponse();

    if (req.method === "GET") {
        res = setCsrf(req, res);
        res = i18nRewrites(req, res);
    }

    const [guestAllowed, guestResponse] = await GuestGuard(req, res, ["/login/"]);
    if (!guestAllowed) return NextResponse.redirect(new URL("/panel", req.url));
    res = guestResponse;

    // TODO : uncomment this
    // const [authAllowed, authResponse] = await AuthGuard(req, res, ["/panel/"]);
    // if (!authAllowed) return NextResponse.redirect(new URL("/login", req.url));
    // res = authResponse;

    // TODO
    // make a middleware that refresh user's token
    // auth token lasts for 7 days, this middleware should refresh users token if it issue at passes 1 day

    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)"],
};
