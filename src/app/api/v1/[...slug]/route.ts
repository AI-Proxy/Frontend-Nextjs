import { checkCsrf } from "@/lib/utils.server";
import { NextRequest, NextResponse } from "next/server";
import setCsrf from "@/middlewares/setCsrf";

export const _GD = async (request: NextRequest, { params }: { params: { slug: string } }): Promise<Response> => {
    const host: string = `${request.nextUrl.protocol}//${request.headers.get("host")}`;
    const origin: string = request.headers.get("origin")?.toString() || "";

    if (host !== origin) {
        return new NextResponse("Not Valid", { status: 419 });
    }
    if (!(await checkCsrf(request))) {
        return new NextResponse("Expired", { status: 419 });
    }

    const arrBuffer = await request
        .arrayBuffer()
        .then((b) => b)
        .catch((e) => console.error(e));
    const data = arrBuffer || null;

    const headers = request.headers;
    headers.delete("content-length");
    headers.delete("host");
    headers.set("accept", "application/json");
    headers.set("x-forwarded-for", request.ip || request.headers.get("x-forwarded-for") || "");
    headers.set("serversecret", process.env.SERVER_SECRET || "");
    headers.set("tt", Date.now().toString());

    // set Authorization header if there is any
    headers.set("Authorization", request.cookies.get("AuthToken")?.value || "");

    let res = await fetch(`${process.env.API_BASE_URL}${request.nextUrl.pathname}${request.nextUrl.search}`, {
        method: request.method,
        body: request.method === "GET" ? null : data,
        headers: headers,
    })
        .then((response) => response)
        .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

    if (res.status >= 500) {
        console.error({ status: res.status, statusText: res.statusText, err: await res.text() });
        return new Response(null, { status: 500, statusText: "Internal Server Error" });
    }

    res = await setCsrf<Response>(request, res);
    return res;
};

export const GET = async (request: NextRequest, { params }: any) => await _GD(request, { params });
export const POST = async (request: NextRequest, { params }: any) => await _GD(request, { params });
export const PUT = async (request: NextRequest, { params }: any) => await _GD(request, { params });
export const DELETE = async (request: NextRequest, { params }: any) => await _GD(request, { params });
export const OPTIONS = async (request: NextRequest, { params }: any) => await _GD(request, { params });
