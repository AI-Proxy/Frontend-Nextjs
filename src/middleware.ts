import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import setCsrf from "@/middlewares/setCsrf";
import i18nRewrites from "@/middlewares/i18nRewrites";
import GuestGuard from "@/guards/guest.guard";
import AuthGuard from "@/guards/auth.guard";

export function middleware(req: NextRequest) {
    let res = new NextResponse();
    const pathname = `${req.nextUrl.pathname}/`.replaceAll("//", "/");

    if (req.method === "GET") {
        res = setCsrf(req, res);
        res = i18nRewrites(req, res);
    }

    // if (pathname.includes("/login/")) {
    //     console.log("from middleware", req.nextUrl.pathname);
    //     res = NextResponse.redirect(new URL("/", req.url));
    //     // return NextResponse.redirect(new URL("/", req.url));
    // }
    const guestAllowed = GuestGuard(req, res, ["/login/"]);
    if (!guestAllowed) return NextResponse.redirect(new URL("/panel", req.url));

    const authAllowed = AuthGuard(req, res, ["/panel/"]);
    if (!authAllowed) return NextResponse.redirect(new URL("/login", req.url));

    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)"],
};
