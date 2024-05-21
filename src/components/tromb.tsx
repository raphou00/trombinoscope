"use client";

import { useState } from "react";
import * as Icon from "lucide-react";
import { toast } from "react-toastify";
import Modal from "@/components/modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const TrombEl = (tromb: any) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const {
        register,
        handleSubmit,
    } = useForm<any>()
    const router = useRouter();

    const handleEdit = async (data: any) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const res = await fetch(`/api/tromb?id=${tromb.id}`, {
            method: "put",
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
        } else {
            toast.success(msg.message)
        }

        document.location.reload();
    }

    const handleDelete = async () => {
        const res = await fetch(`/api/tromb?id=${tromb.id}`, {
            method: "DELETE"
        });

        const msg = await res.json();
                 
        if (msg.error) toast.error(msg.error);
        else toast.success(msg.message);

        setDeleteOpen(false);
        
        document.location.reload();
    }

    return (
        <>
            <Modal open={editOpen} setOpen={setEditOpen}>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={handleSubmit(handleEdit)}>
                        <div>
                            <h1 className="font-bold text-3xl">Modifier un trombinoscope</h1>
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
            </Modal>

            <Modal open={deleteOpen} setOpen={setDeleteOpen}>
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                            <Icon.AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6">
                                Suprimer l'utilisateur
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Il sera perdu à jamais.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="btn btn-primary w-full"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </button>
                </div>
            </Modal>

            <div className="flex justify-between gap-x-6 px-5 py-1 border border-neutral rounded-box">
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex items-center">
                        <Link href={`/tromb/${tromb.id}`}>
                            <p className="text-3xl font-bold leading-6 text-white">{tromb.name}</p>
                        </Link>
                    </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="flex gap-x-1">
                        <button className="btn btn-info" onClick={() => setEditOpen(!editOpen)}>
                            <Icon.Edit3 className="text-white" />
                        </button>
                        <button className="btn btn-error" onClick={() => setDeleteOpen(!deleteOpen)}>
                            <Icon.Trash className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrombEl;