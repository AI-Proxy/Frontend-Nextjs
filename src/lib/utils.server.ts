import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

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

export const refreshAuthToken = async (req: NextRequest, res: NextResponse): Promise<NextResponse> => {
    res = new NextResponse(res.body, res);

    const old_TOKEN: string = req.cookies.get("AuthToken")?.value || "";
    if (!old_TOKEN) return res;

    const R = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: { Accept: "application/json", Authorization: `Bearer ${old_TOKEN}` },
    })
        .then((response) => response)
        .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

    if (R.status >= 400) {
        console.error({ status: R.status, statusText: R.statusText, err: await R.text() });
        return res;
    }

    const responseData = await R.json();
    const new_TOKEN: string = responseData.token;

    res.cookies.set("AuthToken", new_TOKEN, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        maxAge: parseInt(process.env.AUTH_TOKEN_EXPIRE_TIME_IN_SECONDS || "0"),
    });

    return res;
};
