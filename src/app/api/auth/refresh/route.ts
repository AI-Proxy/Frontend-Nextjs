import { _GD } from "@/lib/utils.server";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    request.nextUrl.pathname = "/api/v1/auth/refresh";

    const authToken = request.cookies.get("AuthToken")?.value || "";
    const key = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(authToken, key, { algorithms: ["HS256"] }).catch((e) => ({ payload: undefined }));
    if (!payload) return new NextResponse(null, { status: 403 });

    const limit: number = 60 * 60 * 24 * 1000; // 1 day
    const issuedAt: number = (payload.iat || 0) * 1000;
    if (Date.now() - limit < issuedAt) return new NextResponse(null, { status: 403 });

    const response = await _GD(request, { params: { slug: "" } });
    if (response.status === 401) {
        const res = new NextResponse(null, { status: 401 });
        res.cookies.delete("AuthToken");
        return res;
    }
    if (response.status !== 200) return response;

    const responseData = await response.json();
    const TOKEN: string = responseData.token;

    const res = new NextResponse(null, response);
    res.cookies.set("AuthToken", TOKEN, {
        path: "/",
        secure: process.env.SECURE_COOKIES === "true",
        httpOnly: true,
        sameSite: "lax",
        maxAge: parseInt(process.env.AUTH_TOKEN_EXPIRE_TIME_IN_SECONDS || "0"),
    });

    return res;
};
