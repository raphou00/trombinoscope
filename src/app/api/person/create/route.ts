import { NextRequest } from "next/server";
import prisma from "@/libs/prisma";

const POST = async (req: NextRequest) => {
    const body = await req.json();

    const { nom, section, fonction, trombId, email, mobile } = body
    const photo = '' // TODO

    const person = await prisma.person.create({
        data: {
            name: nom,
            photo,
            section,
            trombId,
            email,
            tel: mobile,
            function: fonction
        }
    })
}

export { POST };