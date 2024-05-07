"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import * as Icon from "lucide-react";
import { useState } from "react";

const Tromb = () => {
    const params = useParams<{ id: string }>();
    const { data: persons } = {data:[{name:'antho', photo:'https://picsum.photos/200/300', section: 'test', function: 'a'}]}//useSWR(`/api/tromb?id=${params.id}`);

    const [personsFiltered, setPersonsFiltered] = useState(persons);
    

    const search: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const term = e.target.value ?? ''
        setPersonsFiltered(persons.filter(person =>
            person.name.includes(term) ||
            person.section.includes(term) ||
            person.function.includes(term)
        ))
    }

    return (
        <div className="">
            <input type="text" onChange={search} className="border-neutral border rounded-lg m-3 p-2 outline-none" />
            <ul role="list" className="divide-y divide-gray-100">
                {personsFiltered && personsFiltered.map((person: any, index: number) => (
                    <li key={index} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.photo} alt="" />
                            <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-50">{person.name}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <button className="btn btn-info">
                                <Icon.PenBox />
                            </button>
                            <button className="btn btn-error">
                                <Icon.Trash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tromb;