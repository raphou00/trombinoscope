import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import ReactPDF from "@react-pdf/renderer";
import Pdf from "@/components/model-pdf";

export const GET = async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id")!;

    const tromb = await prisma.tromb.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            persons: true
        }
    });

    await ReactPDF.render(<Pdf tromb={tromb!.persons} />, `${__dirname}/public/a.pdf`);
    const pdf = await ReactPDF.renderToStream(<Pdf tromb={tromb!.persons} />);
    return NextResponse.json({ pdf });
}