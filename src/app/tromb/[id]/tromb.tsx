"use client";

import useSWR from "swr";
import * as Icon from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "@/components/modal";
import { Csv } from "./csv";
import Create from "./create";

const fetcher = (a: string) => fetch(a).then(e => e.json())

const Tromb = ({ id }: { id: string }) => {
    const { data } = useSWR(`/api/tromb?id=${id}`, fetcher);
    const [personsFiltered, setPersonsFiltered] = useState(null);
    const [open, setOpen] = useState(false);

    const search: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const term = e.target.value ?? "";
        
        if (!data) return
        setPersonsFiltered(data.persons.filter((person: any) =>
            person.name.includes(term) ||
            person.section.includes(term) ||
            person.function.includes(term)
        ));
    }    

    useEffect(() => {
        if (!data) return;
        search({ data.persons });
    }, [data]);

    return (
        <div className="max-w-5xl mx-auto">
            {/* <Csv /> */}
            <div className="flex justify-center items-center w-full">
                <div className="flex items-center relative">
                    <input type="text" onChange={search} className="input input-bordered bg-base-200 border-neutral border rounded-lg m-3 outline-none" placeholder="Rechercher..." />
                    <button className="absolute bg-base-200 right-6" onClick={() => setOpen(true)}><Icon.Search /></button>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Créer une personne">
                    <button className="btn btn-primary" onClick={() => setOpen(true)}><Icon.Edit2 /></button>
                </div>
            </div>

            <Modal isOpen={open} setIsOpen={setOpen}>
                <Create />
            </Modal>

            <ul role="list" className="divide-y divide-gray-100">
                {personsFiltered && personsFiltered.map((person: any, index: number) => (
                    <li key={index} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full" src={person.photo} alt="" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-white">{person.name}</p>
                                <p className="mt-1 truncate text-sm leading-5 text-gray-200">{person.section}</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{person.function}</p>
                            <div className="flex gap-x-1">
                                <button className="btn btn-info">
                                    <Icon.PenBox className="text-white" />
                                </button>
                                <button className="btn btn-error">
                                    <Icon.Trash className="text-white" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tromb;