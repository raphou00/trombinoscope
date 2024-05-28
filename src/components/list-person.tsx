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
    const { data, mutate } = useSWR(`/api/tromb?id=${id}`, fetcher, { refreshInterval: 100000 });
    const [personsFiltered, setPersonsFiltered] = useState<null | Person[]>(null);
    const [open, setOpen] = useState(false);

    const search: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const term = e.target.value.toLowerCase() ?? "";
        
        if (!data) return
        setPersonsFiltered(data.persons.filter((person: Person) =>
            person.name.toLowerCase().includes(term) ||
            person.section.toLowerCase().includes(term) ||
            person.function.toLowerCase().includes(term)
        ));
    }

    useEffect(() => {
        if (!data) return;
        setPersonsFiltered(data.persons)
    }, [data]);

    const onSuccess = () => {
        setOpen(false)
        mutate()
    }

    return (
        <div className="max-w-5xl mx-auto">

            <h1 className="text-5xl font-bold text-center my-5">Trombinoscope - {data?.name}</h1>

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
                <FormCreatePerson trombId={id} person={undefined} onSuccess={onSuccess} />
            </Modal>

            <ul role="list" className="space-y-2 mb-5">
                {personsFiltered && personsFiltered.map((person: Person, index: number) => (
                    <PersonEl {...person} key={index} onChange={mutate} />
                ))}
            </ul>
        </div>
    );
}

export default Tromb;