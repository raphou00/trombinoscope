"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Canvas } from "@react-three/fiber";
import { Gltf, OrbitControls, Sky } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { MeshBasicMaterial } from "three";
import Pdf from "@/components/model-pdf";

const Scene = () => {
    const a = async () => {
        const res = await fetch("/api/pdf?id=f00aab30-9640-4fc6-86eb-6903f0f334ec")
        const data = await res.json();

    }
    
    return (
        <div className="h-screen">

        <button className="btn" onClick={a}>a</button>

        {/* <Canvas>
            <Physics>
                <Sky />
                <OrbitControls />

                <RigidBody
                    colliders="cuboid"
                    position={[0, 100, 90]}
                    >
                    <mesh>
                        <boxGeometry />
                        <meshBasicMaterial color="red" />
                    </mesh>
                </RigidBody>                

                <RigidBody
                    colliders="trimesh"
                    type="fixed"
                    position={[0, -10, 100]}
                    rotation={[0, -Math.PI, 0]}
                    >
                    <Gltf
                        src="/neuro_sama/scene.gltf"
                        />
                </RigidBody>

            </Physics>
        </Canvas> */}
        </div>
    );
}

const Login = () => {
    const {
        register,
        handleSubmit,
    } = useForm<any>()
    const router = useRouter()

    const sumbit = async (data: any) => {
        const res = await fetch("/api/login", {
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
        router.push('/')
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

export default Scene;