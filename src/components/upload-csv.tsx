import { toast } from "react-toastify";

const UploadCsv = ({trombId}: {trombId:string}) => {

    const onFileChanged : React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (!e.target.files || !e.target.files[0]) return
        const fr = new FileReader();

        
        fr.onload = async () => {
            let formData = new FormData();
            const a = fr.result;
            
            formData.append("file", a!.toString())
            formData.append('trombId', trombId)
            const res = await fetch("/api/csv", {
                method: "post",
                body: formData
            });
            const msg = await res.json();

            if (msg.error) toast.error(msg.error);
            else toast.success(msg.message);
            // TODO: refresh users
        }

        fr.readAsText(e.target.files[0])
    }

    return (
        <>
            <input type="file" accept=".csv" onChange={onFileChanged} className="hidden" />
        </>
    )
}

export default UploadCsv;