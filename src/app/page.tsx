import { getUser } from "@/libs/lucia";
import { redirect } from "next/navigation";

const Page = async () => {
    const { user } = await getUser();
    
    return user ? redirect("/tromb") : redirect("/login");
}

export default Page;