import { getUser } from "@/libs/lucia";
import prisma from "@/libs/prisma";
import Tromb from "./tromb";

const Page = async () => {
    const { user } = await getUser();
    const trombs = await prisma.tromb.findMany({
        where: {
            userid: user?.id
        }
    });
    

    return (
        <>
            <Tromb trombs={trombs} />
        </>
    );
}

export default Page;