import { NextResponse } from "next/server";
import ReactPDF from "@react-pdf/renderer";
import Pdf from "@/components/pdf";

export const GET = () => {
    const filename = "public/uploads/example.pdf";
    ReactPDF.render(<Pdf />, filename);
    return NextResponse.json({ file: filename });
}