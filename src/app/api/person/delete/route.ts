import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id")!;

    try {
        await prisma.person.delete({
            where: { id }
        });
    } catch {
        return NextResponse.json({ error: "Petit problème" });
    }

    return NextResponse.json({ message: "Utilisateur supprimé" });
}

export { GET };