import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n.config";

export default function main(req: NextRequest, res: NextResponse): NextResponse {
    const pathname = req.nextUrl.pathname;
    const defaultLocale = i18n.defaultLocale;
    const pathnameIsMissingLocale = i18n.locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);

    if (pathnameIsMissingLocale) {
        return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, req.url), res);
    }

    return NextResponse.next(res);
}
