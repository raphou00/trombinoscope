import { redirect } from "next/navigation";
import { getUser } from "@/libs/lucia";
import Login from "./login";

const Page = async () => {
    const { user } = await getUser();
    
    if (user) redirect("/");
    
    return (
        <Login />
    );
}

export default Page;