"use client";

import { useState } from "react";
import * as Icon from "lucide-react";
import { toast } from "react-toastify";
import Modal from "@/components/modal";
import Link from "next/link";

const TrombEl = (tromb: any) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = async () => {
        const res = await fetch(`/api/tromb/delete?id=${tromb.id}`);

        const msg = await res.json();
                 
        if (msg.error) toast.error(msg.error);
        else toast.success(msg.message);

        setDeleteOpen(false)
    }

    return (
        <>
            <Modal open={editOpen} setOpen={setEditOpen}>

            </Modal>

            <Modal open={deleteOpen} setOpen={setDeleteOpen}>
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <Icon.AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                Suprimmer le trombinoscope
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Il sera perdu à jamais.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="btn btn-primary w-full"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </button>
                </div>
            </Modal>

            <Link href={`/tromb/${tromb.id}`}>
                <div className="flex justify-between gap-x-6 px-5 py-1 border border-neutral rounded-box">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex items-center">
                            <p className="text-3xl font-bold leading-6 text-white">{tromb.name}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <div className="flex gap-x-1">
                            <button className="btn btn-info" onClick={() => setEditOpen(!editOpen)}>
                                <Icon.Edit3 className="text-white" />
                            </button>
                            <button className="btn btn-error" onClick={() => setEditOpen(!deleteOpen)}>
                                <Icon.Trash className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default TrombEl;