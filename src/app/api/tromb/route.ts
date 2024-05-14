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

export { GET };