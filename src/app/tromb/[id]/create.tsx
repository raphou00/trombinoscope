"use client";

import Photo from "@/components/photo";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Create = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>()

    const sumbit = async (data: any) => {
        const res = await fetch("/api/create-user", {
            method: "post",
            body: JSON.stringify(data)
        });

        const msg = await res.json();
        console.log(msg);
        
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
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        Photo
                    </label>
                    <div className="mt-2">
                        <Photo />
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        Nom
                    </label>
                    <div className="mt-2">
                        <input
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
                            className="input input-bordered w-full"
                            {...register("fonction")}
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