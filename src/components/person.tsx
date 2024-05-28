"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Icon from "lucide-react";
import { toast } from "react-toastify";
import Modal from "@/components/modal";
import {Create} from "@/components/form-create-person"

const PersonEl = (person: any) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`/api/person/delete?id=${person.id}`);

        const msg = await res.json();
                 
        if (msg.error) toast.error(msg.error);
        else toast.success(msg.message);

        setDeleteOpen(false)
        person.onChange()
    }

    const updateFinished = () => {
        setEditOpen(false)
        person.onChange()
    }

    return (
        <>
            <Modal open={editOpen} setOpen={setEditOpen} key={'edit'}>
                <Create trombId={person.trombId} person={person} onSuccess={updateFinished} />
            </Modal>

            <Modal open={deleteOpen} setOpen={setDeleteOpen} key={'delete'}>
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                            <Icon.AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6">
                                Suprimer l&apos;utilisateur
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

            <div className="flex justify-between gap-x-6 px-2 py-1 border border-neutral rounded-box">
                <div className="flex min-w-0 gap-x-4">
                    <div className="group relative cursor-pointer">
                        <img className="h-12 w-12 flex-none rounded-full" src={person.photo || '/default-avatar-icon.jpg'} alt="" />
                        {
                            (!person.photo || person.photo.trim() === '') ? 
                            <Icon.Plus className="absolute top-3 left-3 hidden group-hover:block text-black" /> :
                            <Icon.ImageDown className="absolute top-3 left-3 hidden group-hover:block text-black" />
                        }
                    </div>
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-white">{person.name}</p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-200">{person.email}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-2">{person.tel} - {person.section} - {person.function}</div>
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

export default PersonEl;