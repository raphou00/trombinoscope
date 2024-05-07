export const Csv = () => {

    const onFileChanged : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e)
    }

    return (
        <>
            <input type="file" accept=".csv" onChange={onFileChanged} />
        </>
    )
}