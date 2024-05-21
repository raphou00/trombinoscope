"use client";

import { Tromb } from "@prisma/client";
import * as Icon from "lucide-react";
import { useState } from "react";
import Modal from "./modal";
import FormCreateTromb from "./form-create-tromb";
import TrombEl from "./tromb";

const ListTromb = ({ trombs }: { trombs: Tromb[] }) => {
    const [trombsFiltered, setTrombsFiltered] = useState(trombs);
    const [open, setOpen] = useState(false);

    const search: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const term = e.target.value ?? ''
        setTrombsFiltered(trombs.filter(tromb =>
            tromb.name.includes(term)
        ));
    }

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
            </div>

            <Modal open={open} setOpen={setOpen}>
                <FormCreateTromb />
            </Modal>

            <ul role="list" className="flex flex-col gap-y-2">
                {trombsFiltered && trombsFiltered.map((tromb: Tromb, index: number) => (
                    <TrombEl {...tromb} key={index} />
                ))}
            </ul>
        </div>
    );
}

export default ListTromb;