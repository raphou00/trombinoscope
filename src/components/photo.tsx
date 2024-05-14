"use client";

import * as Icon from "lucide-react";

const Photo = ({ photo, setPhoto }: { photo: File | null, setPhoto: React.Dispatch<React.SetStateAction<File | null>> }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleDelete = () => {
        setPhoto(null);
    }
  
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="tooltip mx-auto" data-tip="Photo">
                <label className="w-28 h-28 flex flex-col gap-1 items-center justify-center bg-base-100 hover:border-primary border-2 border-dashed border-neutral rounded-full overflow-hidden">
                    {
                        photo ? (
                            <img
                                src={URL.createObjectURL(photo)}
                                />
                        ) : (
                            <>
                                <Icon.Image className="w-10 h-10" />
                                <input type="file" onChange={handleFileChange} className="hidden" />
                            </>
                        )
                    }
                </label>
            </div>
            
            {photo && (
                <div>
                    <button className="btn btn-error" onClick={handleDelete}>
                        <Icon.Trash />
                        <span>Supprimer</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Photo;