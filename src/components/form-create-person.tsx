"use client";

import Photo from "@/components/photo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Create = ({ trombId }: { trombId: string }) => {
    const {
        register,
        handleSubmit,
    } = useForm<any>()
    const [photo, setPhoto] = useState<File | null>();

    const sumbit = async (data: any) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => formData.append(key, data[key]));

        formData.append("photo", photo!);
        formData.append("trombId", trombId);

        console.log(Object.fromEntries(formData));
        

        const res = await fetch("/api/person/create", {
            method: "post",
            body: formData
        });

        const msg = await res.json();
        
        if (!msg.success) {
            if (msg.errors) {
                msg.errors.forEach((e: any) => {
                    toast.error(`${e.path[0]} ${e.message}`);
                });
                
                return;
            }
            
            if (msg.error) {
                toast.error(msg.error);
            }
        }

        toast.success(msg.message)
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-2" onSubmit={handleSubmit(sumbit)}>
                <div>
                    <label htmlFor="name" className="block text-center text-sm font-medium leading-6">
                        Photo
                    </label>
                    <div className="mt-2 w-full">
                        {/* @ts-ignore */}
                        <Photo photo={photo} setPhoto={setPhoto} />
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        Nom
                    </label>
                    <div className="mt-2">
                        <input
                            placeholder="Eliott Boichot"
                            className="input input-bordered w-full"
                            {...register("name")}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        Téléphone
                    </label>
                    <div className="mt-2">
                        <input
                            type="tel"
                            placeholder="0123456789"
                            className="input input-bordered w-full"
                            {...register("tel")}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        E-Mail
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            placeholder="patrick.savioz@edu.vs.ch"
                            className="input input-bordered w-full"
                            {...register("email")}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        Section
                    </label>
                    <div className="mt-2">
                        <input
                            placeholder="Info"
                            className="input input-bordered w-full"
                            {...register("section")}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        Fonction
                    </label>
                    <div className="mt-2">
                        <input
                            placeholder="Eleve"
                            className="input input-bordered w-full"
                            {...register("function")}
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Create;