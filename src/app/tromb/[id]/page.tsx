import { getUser } from "@/libs/lucia";
import { redirect } from "next/navigation";
import Tromb from "../../../components/list-person";

const Page = async ({ params }: any) => {
    const { user } = await getUser();
    
    if (!user) redirect("/login")
    
    return (
        <Tromb id={params.id} />
    );
}

export default Page;