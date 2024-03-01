import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import setCsrf from "@/middlewares/setCsrf";

export const _GD = async (request: NextRequest, { params }: { params: { slug: string } }): Promise<Response> => {
    // const host: string = `${request.nextUrl.protocol}//${request.headers.get("host")}`;
    // const origin: string = request.headers.get("origin")?.toString() || "";

    // if (host !== origin) {
    //     return new NextResponse("Not Valid", { status: 419 });
    // }
    if (!(await checkCsrf(request))) {
        return new NextResponse("Expired", { status: 419 });
    }

    const arrBuffer = await request
        .arrayBuffer()
        .then((b) => b)
        .catch((e) => console.error(e));
    const data = arrBuffer || null;

    const headers = new Headers();
    // const headers = request.headers;
    // headers.delete("content-length");
    // headers.delete("host");
    headers.set("content-type", request.headers.get("content-type") || "");
    headers.set("accept", "application/json");
    headers.set("x-forwarded-for", request.ip || request.headers.get("x-forwarded-for") || "");
    headers.set("serversecret", process.env.SERVER_SECRET || "");
    headers.set("tt", Date.now().toString());

    // set Authorization header if there is any
    headers.set("Authorization", `Bearer ${request.cookies.get("AuthToken")?.value}`);

    let res = await fetch(`${process.env.API_BASE_URL}${request.nextUrl.pathname}${request.nextUrl.search}`, {
        method: request.method,
        body: request.method === "GET" ? null : data,
        headers: headers,
    })
        .then((response) => response)
        .catch((error) => {
            console.error({ error });
            return new Response(error, { status: 500, statusText: "Internal Error" });
        });

    if (res.status >= 500) {
        console.error({ status: res.status, statusText: res.statusText, err: await res.text() });
        return new Response(null, { status: 500, statusText: "Internal Server Error" });
    }

    res = await setCsrf<Response>(request, res);
    return res;
};

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
        secure: process.env.SECURE_COOKIES === "true",
        httpOnly: true,
        sameSite: "lax",
        maxAge: parseInt(process.env.AUTH_TOKEN_EXPIRE_TIME_IN_SECONDS || "0"),
    });

    return res;
};
