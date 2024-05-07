import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "argon2";
import { z } from "zod";
import prisma from "@/libs/prisma";
import lucia from "@/libs/lucia";

const loginSchema = z.object({
    name: z.string().min(1, { message: "Nom requis" }),
    password: z.string().min(1, { message: "Mot de passe requis" }),
})

const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { name, password } = body;

        const { error } = loginSchema.safeParse(body) as any;

        if (error) {
            return NextResponse.json({ success: false, errors: error.issues });
        }

        const user = await prisma.user.findUnique({ 
            where: {
                name
            }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid credentials" });
        }

        if (!user || !(await verify(user.password!, password))) {
            return NextResponse.json({ success: false, error: "Invalid credentials" });
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ success: false, error: "Something went wrong" });
    }
    
    redirect("/tromb");
}

export { POST };