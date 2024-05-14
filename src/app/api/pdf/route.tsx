import path from "path";
import { NextResponse } from "next/server";
import ReactPDF from "@react-pdf/renderer";
import Pdf from "@/components/pdf";

export const GET = () => {
    const filename = `${crypto.randomUUID()}.pdf`;
    const pathanme = path.join(process.cwd(), "public", "pdfs", filename);

    ReactPDF.render(<Pdf />, pathanme);
    return NextResponse.json({ file: filename });
}