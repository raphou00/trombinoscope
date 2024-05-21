import { getUser } from "@/libs/lucia";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id")!;

    const persons = await prisma.tromb.findUnique({
        where: { id },
        select: {
            name: true,
            sections: true,
            persons: true
        }
    });

    return NextResponse.json(persons );
}

const POST = async (req: NextRequest) => {
    const body = await req.formData();
    const { user } = await getUser();

    if (!user) {
        return NextResponse.json({ message: "Hacker ?? 🐱‍💻", status: 403 });
    }

    const nom = body.get('name')?.toString()

    if (!nom || nom.trim() == '') return NextResponse.json({ message: 'Le nom est requis', status: 422 })

    try {
        await prisma.tromb.create({
            data: {
                name: nom,
                userid: user.id
            }
        });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ message: "Grosse erreur", status: 500 });
    }

    return NextResponse.json({ Message: "Letsgoooooooooooooooooooooo", status: 201 });
}

const PUT = async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id")!;
    const body = await req.formData();
    const { user } = await getUser();

    if (!user) {
        return NextResponse.json({ message: "Hacker ?? 🐱‍💻", status: 403 });
    }

    const nom = body.get('name')?.toString()

    if (!nom || nom.trim() == '') return NextResponse.json({ message: 'Le nom est requis', status: 422 })

    try {
        await prisma.tromb.update({
            where: {
                id: id,
                userid: user.id
            },
            data: {
                name: nom
            }
        });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ message: "Grosse erreur", status: 500 });
    }

    return NextResponse.json({ Message: "Letsgoooooooooooooooooooooo", status: 201 });
}

const DELETE = async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id")!;

    const persons = await prisma.tromb.delete({
        where: { id },
    });

    return NextResponse.json(persons );
}

export { GET, POST, PUT, DELETE };