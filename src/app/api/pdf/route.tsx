import Pdf from "@/components/pdf";
import ReactPDF from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import path from "path"

export const GET = () => {
    const background = path.join(process.cwd(), "public", "background.jpeg");
    console.log(background);
    
    const filename = "public/uploads/example.pdf";
    ReactPDF.render(<Pdf />, filename);
    return NextResponse.json({ file: filename });
}