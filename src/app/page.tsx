import { getUser } from "@/libs/lucia";
import { redirect } from "next/navigation";

const Page = async () => {
    const { user } = await getUser();
    
    return user ? redirect("/tromb/9c767c26-16ae-4417-ad48-ad12a823e509") : redirect("/login");
}

export default Page;