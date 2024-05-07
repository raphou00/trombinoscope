import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    const body = await req.json();
    const { id } = body;

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