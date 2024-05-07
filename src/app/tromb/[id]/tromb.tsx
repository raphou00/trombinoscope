"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import * as Icon from "lucide-react";
import { useState } from "react";
import {Csv} from './csv'
import Modal from "@/components/modal";
import Create from "./create";
const Tromb = () => {
    const params = useParams<{ id: string }>();
    const { data: persons } = useSWR(`/api/tromb?id=${params.id}`);

    const [personsFiltered, setPersonsFiltered] = useState(persons);
    const [open, setOpen] = useState(false);

    console.log(personsFiltered);
    

    const search: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const term = e.target.value ?? ''
        setPersonsFiltered(persons.filter(person =>
            person.name.includes(term) ||
            person.section.includes(term) ||
            person.function.includes(term)
        ));
    }

    return (
        <div className="">
            <Csv />
            <input type="text" onChange={search} className="border-neutral border rounded-lg m-3 p-2 outline-none" />
            <button className="btn btn-primary" onClick={() => setOpen(true)}><Icon.Croissant /></button>

            <Modal isOpen={open} setIsOpen={setOpen}>
                <Create />
            </Modal>

            <ul role="list" className="divide-y divide-gray-100">
                {personsFiltered && personsFiltered.map((person, index) => (
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