"use client";

import { Tromb } from "@prisma/client";
import * as Icon from "lucide-react";
import { useState } from "react";
import Link from "next/link"

const Tromb = ({ trombs }: { trombs: Tromb[] }) => {
    const [trombsFiltered, setTrombsFiltered] = useState(trombs);
    

    const search: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const term = e.target.value ?? ''
        setTrombsFiltered(trombs.filter(tromb =>
            tromb.name.includes(term)
        ));
    }

    return (
        <div className="">
            <input type="text" onChange={search} className="border-neutral border rounded-lg m-3 p-2 outline-none" />
            <ul role="list" className="divide-y divide-gray-100">
                {trombsFiltered.map((tromb, index) => (
                    <Link key={index} href={`/tromb/${tromb.id}`} className="flex justify-between gap-x-6 py-5 border border-neutral rounded-xl">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-white">{tromb.name}</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <div className="flex gap-x-1">
                                <button className="btn btn-info">
                                    <Icon.PenBox className="text-white" />
                                </button>
                                <button className="btn btn-error">
                                    <Icon.Trash className="text-white" />
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Tromb;