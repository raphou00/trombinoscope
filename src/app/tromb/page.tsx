import { getUser } from "@/libs/lucia";
import prisma from "@/libs/prisma";
import Tromb from "../../components/list-tromb";

const Page = async () => {
    const { user } = await getUser();
    const trombs = await prisma.tromb.findMany({
        where: {
            userid: user?.id
        }
    });
    

    return (
        <>
            <h1 className="text-5xl font-bold text-center my-5">Trombinoscopes</h1>
            <Tromb trombs={trombs} />
        </>
    );
}

export default Page;