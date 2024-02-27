import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import setCsrf from "@/middlewares/setCsrf";
import i18nRewrites from "@/middlewares/i18nRewrites";
import GuestGuard from "@/middlewares/guards/guest.guard";
import AuthGuard from "@/middlewares/guards/auth.guard";

export async function middleware(req: NextRequest) {
    let res = new NextResponse();

    if (req.method === "GET") {
        res = await setCsrf<NextResponse>(req, res);
        res = i18nRewrites(req, res);
    }

    const [guestAllowed, guestResponse] = await GuestGuard(req, res, ["/login/"]);
    if (!guestAllowed) return NextResponse.redirect(new URL("/panel", req.url));
    res = guestResponse;

    const [authAllowed, authResponse] = await AuthGuard(req, res, ["/panel/"]);
    if (!authAllowed) return NextResponse.redirect(new URL("/login", req.url));
    res = authResponse;

    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)"],
};
