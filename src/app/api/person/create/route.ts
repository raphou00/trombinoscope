import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path"

const POST = async (req: NextRequest) => {
    const body = await req.formData();

    const file = body.get("photo") as any;
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    try {
        await writeFile(
            path.join(process.cwd(), "public/uploads/photos" + filename),
            buffer
        );
        
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Grosse erreur", status: 500 });
    }

    try {
        await prisma.person.create({
            data: {
                name: body.get("name")?.toString(),
                email: body.get("email")?.toString(),
                tel: body.get("tel")?.toString(),
                section: body.get("section")?.toString(),
                function: body.get("function")?.toString(),
                trombId: body.get("trombId")?.toString(),
                photo: filename,
            }
        });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Grosse erreur", status: 500 });
    }

    return NextResponse.json({ Message: "Letsgoooooooooooooooooooooo", status: 201 });
}

export { POST };