import { readFileSync, writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import prisma from "@/libs/prisma";

export const POST = async ( req: NextRequest ) => {
    try {
        const formData = await req.formData()
        const file = formData.get('file');
        const trombId = formData.get('trombId');

        if (!file) return NextResponse.json({succcess: false, message: 'No file provided'});
        if (!trombId || trombId === '') return NextResponse.json({success: false, message: 'No trombinoscope id provided'})

        const data = file.toString().split('\n').map(el => el.replace('\r', '').split(';'))
        const header = data[0];

        if (!header.every(r => ['Civilité', 'Nom', 'Prénom', 'Email Ecole', 'Section', 'Fonction', 'Mobile'].includes(r))) {
            return NextResponse.json({success: false, message: 'Bad header in csv'});
        }

        const nomIdx = header.indexOf('Nom')
        const prenomIdx = header.indexOf('Prénom')
        const emailIdx = header.indexOf('Email Ecole')
        const sectionIdx = header.indexOf('Section')
        const fonctionIdx = header.indexOf('Fonction')
        const mobileIdx = header.indexOf('Mobile')

        for (const line of data.slice(1, -1)) {
            // TODO: check csv line
            const user = await prisma.person.create({
                data: {
                    name: line[nomIdx] + ' ' + line[prenomIdx],
                    function: line[fonctionIdx],
                    section: line[sectionIdx],
                    email: line[emailIdx],
                    tel: line[mobileIdx],
                    photo: '',
                    trombId: trombId?.toString()
                }
            })

        }
    } catch {
        return NextResponse.json({success: false, message: "Grosse erreur"});
    }
    
    return NextResponse.json({success: true, message: "Csv imported sucessfully"});
}