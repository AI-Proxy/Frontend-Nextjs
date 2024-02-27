import { NextRequest, NextResponse } from "next/server";
import { _GD } from "@/app/api/v1/[...slug]/route";

export const POST = async (request: NextRequest) => {
    request.nextUrl.pathname = "/api/v1/auth/verify-otp";

    const response = await _GD(request, { params: { slug: "" } });
    if (response.status !== 200) return response;

    const responseData = await response.json();
    const TOKEN: string = responseData.token;

    const res = new NextResponse(null, response);
    res.cookies.set("AuthToken", TOKEN, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        maxAge: parseInt(process.env.AUTH_TOKEN_EXPIRE_TIME_IN_SECONDS || "0"),
    });

    return res;
};
