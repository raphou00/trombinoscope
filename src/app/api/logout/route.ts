import lucia from "@/libs/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const GET = () => {
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return NextResponse.redirect(process.env.APP_URL!)
}

export { GET }