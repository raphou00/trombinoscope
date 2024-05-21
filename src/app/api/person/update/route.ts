import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path"

const POST = async (req: NextRequest) => {
    const body = await req.formData();

    const file = body.get("photo") as any;
    let filename;
    if (file) {
        
        const buffer = Buffer.from(await file.arrayBuffer());
        filename = Date.now() + file.name.replaceAll(" ", "_");
        
        try {
            await writeFile(
            path.join(process.cwd(), "public/uploads/photos", filename),
            buffer
            );

        } catch (error) {
            console.log("Error occured ", error);
            return NextResponse.json({ message: "Grosse erreur", status: 500 });
        }
    }

    const nom = body.get('name')?.toString()
    const email = body.get('email')?.toString()
    const telephone = body.get('tel')?.toString()
    const section = body.get('section')?.toString()
    const fonction = body.get('function')?.toString()
    const personId = body.get('personId')?.toString()

    if (!nom || nom.trim() == '') return NextResponse.json({ message: 'Le nom est requis', status: 422 })
    if (!email || email.trim() == '') return NextResponse.json({ message: 'L\'email est requis', status: 422 })
    if (!telephone || telephone.trim() == '') return NextResponse.json({ message: 'Le téléphone est requis', status: 422 })
    if (!section || section.trim() == '') return NextResponse.json({ message: 'La section est requise', status: 422 })
    if (!fonction || fonction.trim() == '') return NextResponse.json({ message: 'La fonction est requise', status: 422 })
    if (!personId || personId.trim() == '') return NextResponse.json({ message: 'La personne à modifier est requise', status: 422 })

    try {
        await prisma.person.update({
            where: {
                id: personId,
            },
            data: {
                name: nom,
                email: email,
                tel: telephone,
                section: section,
                function: fonction,
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