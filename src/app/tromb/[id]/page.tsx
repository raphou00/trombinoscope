import { getUser } from "@/libs/lucia";
import { redirect } from "next/navigation";
import Tromb from "./tromb";

const Page = async ({ params }: any) => {
    const { user } = await getUser();
    
    if (!user) redirect("/login")
    
    return (
        <Tromb id={params.id} />
    );
}

export default Page;