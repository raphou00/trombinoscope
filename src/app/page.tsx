"use client";

import Image from "next/image";
import { useState } from "react";
import Webcam from "@/components/webcam";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
  
    const handleUpload = async () => {
        const formdata = new FormData();
        formdata.append("file", file!);
    
        const requestOptions = { method: "POST", body: formdata };
    
        await fetch("/api/upload", requestOptions);
    };

    const handlePdf = async () => {
        const res = await fetch("/api/pdf");
        const data = await res.json();
        console.log(data.filename);
        
    };
  
    return (
        <>
            <div>
                <label htmlFor="file" className="sr-only">
                    Choose a file
                </label>
                <input id="file" type="file" onChange={handleFileChange} />
            </div>
            {file && (
                <section>
                    File details:
                    <ul>
                        <li>Name: {file.name}</li>
                        <li>Type: {file.type}</li>
                        <li>Size: {file.size} bytes</li>
                    </ul>
                </section>
            )}
    
            {file && <button onClick={handleUpload}>Upload a file</button>}

            <Webcam />

            <button onClick={handlePdf}>pdf</button>
        </>
    );
}
