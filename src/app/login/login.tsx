"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>()

    const sumbit = async (data: any) => {
        console.log(data);
        
        const res = await fetch("/api/login", {
            method: "post",
            body: JSON.stringify(data)
        });

        const msg = await res.json();
        console.log(msg);
        
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

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    src="/favicon.png"
                    alt="Logo"
                    width={2048}
                    height={2048}
                />
                <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight">
                    Login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(sumbit)}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6">
                            Nom
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                autoComplete="name"
                                className="input input-bordered w-full"
                                {...register("name")}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6">
                                Mot de passe
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="input input-bordered w-full"
                                {...register("password")}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;