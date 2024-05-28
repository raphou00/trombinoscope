"use client";

import Photo from "@/components/photo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Create = () => {
    const {
        register,
        handleSubmit,
    } = useForm<any>()
    const router = useRouter();

    const sumbit = async (data: any) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const res = await fetch("/api/tromb", {
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

        document.location.reload();
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-2" onSubmit={handleSubmit(sumbit)}>
                <div>
                    <h1 className="font-bold text-3xl text-center">Créer un trombinoscope</h1>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        Nom
                    </label>
                    <div className="mt-2">
                        <input
                            placeholder="Super stylé..."
                            className="input input-bordered w-full"
                            {...register("name")}
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Créer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Create;