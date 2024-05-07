"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import * as Icon from "lucide-react";

const Tromb = () => {
    const params = useParams<{ id: string }>();
    const { data: persons } = useSWR(`/api/tromb?id=${params.id}`);
    
    return (
        <div className="">
            <ul role="list" className="divide-y divide-gray-100">
                {persons.map((person: any, index: number) => (
                    <li key={index} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.photo} alt="" />
                            <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
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