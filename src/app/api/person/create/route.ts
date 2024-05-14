import { NextRequest } from "next/server";
import prisma from "@/libs/prisma";

const POST = async (req: NextRequest) => {
    const body = await req.json();

    const { name }

    const person = await prisma.person.create({
        data: {
            name,
            photo,
            section,
            trombId
        }
    })
}

export { POST };