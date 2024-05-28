import lucia from "@/libs/lucia";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const GET = (req: NextRequest) => {
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return NextResponse.redirect(req.url)
}

export { GET }