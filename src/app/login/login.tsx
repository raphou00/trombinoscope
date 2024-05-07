"use client";

import Image from "next/image";

const Login = () => {
    const sumbit = async () => {
        const res = await fetch("/api/login", {
            method: "post"
        });
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
                <form className="space-y-6" onSubmit={sumbit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                            Adresse mail
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                autoComplete="email"
                                required
                                className="input input-bordered w-full"
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
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="input input-bordered w-full"
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