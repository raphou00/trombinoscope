import { readFileSync, writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = async ( req: NextRequest ) => {
    const formData = await req.formData()
    const file = formData.get('file');

    if (!file) return NextResponse.json({succcess: false, message: 'No file provided'});

    const data = file.toString().split('\n').map(el => el.replace('\r', '').split(';'))
    const header = data[0];
    
    // TODO : read file
    
    return NextResponse.json({success: true, message: ""});
}