export const Csv = () => {

    const onFileChanged : React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (!e.target.files || !e.target.files[0]) return
        let formData = new FormData();
        const fr = new FileReader();

        fr.onload = async () => {
            const a = fr.result;
            console.log(a);
            
            formData.append("file", a!.toString())
            const res = await fetch("/api/uploadcsv", {
                method: "post",
                body: formData
            });
            res.json().then(r => {
                console.log(r)
            })
        }

        fr.readAsText(e.target.files[0])
    }

    return (
        <>
            <input type="file" accept=".csv" onChange={onFileChanged} />
        </>
    )
}