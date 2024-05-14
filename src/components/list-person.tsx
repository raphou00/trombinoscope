"use client";

import useSWR from "swr";
import { Person } from "@prisma/client";
import * as Icon from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "@/components/modal";
import PersonEl from "@/components/person";
import FormCreatePerson from "@/components/form-create-person";
import UploadCsv from "@/components/upload-csv";

const fetcher = (a: string) => fetch(a).then(e => e.json())

const Tromb = ({ id }: { id: string }) => {
    const { data } = useSWR(`/api/tromb?id=${id}`, fetcher, { refreshInterval: 100000 });
    const [personsFiltered, setPersonsFiltered] = useState<null | Person[]>(null);
    const [open, setOpen] = useState(false);

    const search: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const term = e.target.value ?? "";
        
        if (!data) return
        setPersonsFiltered(data.persons.filter((person: Person) =>
            person.name.includes(term) ||
            person.section.includes(term) ||
            person.function.includes(term)
        ));
    }    

    useEffect(() => {
        if (!data) return;
        setPersonsFiltered(data.persons)
    }, [data]);

    return (
        <div className="max-w-5xl mx-auto">
            
            <div className="flex justify-center items-center gap-x-2 w-full">
                <div className="flex items-center w-full relative py-5 ">
                    <input
                        type="text"
                        onChange={search}
                        className="m-0 input input-bordered bg-base-200 border-neutral border rounded-lg max-w-full w-full outline-none"
                        placeholder="Rechercher..."
                    />
                    <button className="absolute bg-base-200 right-6" onClick={() => setOpen(true)}><Icon.Search /></button>
                </div>

                <div className="tooltip tooltip-bottom" data-tip="Créer une personne">
                    <button className="btn btn-primary" onClick={() => setOpen(true)}>
                        <Icon.PlusSquare />
                    </button>
                </div>

                <div className="tooltip tooltip-bottom" data-tip="Importer .csv">
                    <label className="btn btn-primary">
                        <Icon.FileArchive />
                        <UploadCsv trombId={id} />
                    </label>
                </div>
            </div>

            <Modal open={open} setOpen={setOpen}>
                <FormCreatePerson trombId={id} />
            </Modal>

            <ul role="list" className="divide-y divide-gray-100">
                {personsFiltered && personsFiltered.map((person: Person, index: number) => (
                    <PersonEl {...person} />
                ))}
            </ul>
        </div>
    );
}

export default Tromb;