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
        return NextResponse.json({ message: "Grosse erreur", status: 500 });
    }

    const nom = body.get('name')?.toString()
    const email = body.get('email')?.toString()
    const telephone = body.get('tel')?.toString()
    const section = body.get('section')?.toString()
    const fonction = body.get('function')?.toString()
    const trombId = body.get('trombId')?.toString()

    if (!nom || nom.trim() == '') return NextResponse.json({ message: 'Le nom est requis', status: 422 })
    if (!email || email.trim() == '') return NextResponse.json({ message: 'L\'email est requis', status: 422 })
    if (!telephone || telephone.trim() == '') return NextResponse.json({ message: 'Le téléphone est requis', status: 422 })
    if (!section || section.trim() == '') return NextResponse.json({ message: 'La section est requise', status: 422 })
    if (!fonction || fonction.trim() == '') return NextResponse.json({ message: 'La fonction est requise', status: 422 })
    if (!trombId || trombId.trim() == '') return NextResponse.json({ message: 'Le trombinoscope est requis', status: 422 })

    try {
        await prisma.person.create({
            data: {
                name: nom,
                email: email,
                tel: telephone,
                section: section,
                function: fonction,
                trombId: trombId,
                photo: filename,
            }
        });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ message: "Grosse erreur", status: 500 });
    }

    return NextResponse.json({ Message: "Letsgoooooooooooooooooooooo", status: 201 });
}

export { POST };