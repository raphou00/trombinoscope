import { getUser } from "@/libs/lucia";
import { redirect } from "next/navigation";
import Tromb from "./tromb";

const Page = async () => {
    const { user } = await getUser();
    
    if (!user) redirect("/login")
    
    return (
        <Tromb />
    );
}

export default Page;