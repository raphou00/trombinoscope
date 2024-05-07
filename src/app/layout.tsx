import Image from "next/image";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import "./globals.css";
import lucia, { getUser } from "@/libs/lucia";
import { cookies } from "next/headers";
import { LogOut } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
    title: "Trombinoscope EPTM",
    description: "Le trombinoscope de l'EPTM",
    icons: "/favicon.png"
};

const Layout = async ({ children }: React.PropsWithChildren) => {
    const {session} = await getUser();

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <header className="sticky top-0 bg-base-200 border-b border-neutral h-16 flex items-center justify-between px-2">
                        <Link href="/">
                            <Image
                                src="/favicon.png"
                                alt="caca"
                                width={100}
                                height={100}
                                className="h-14 w-14"
                            />
                       </Link>

                        {session && (
                            <form action="/api/logout">
                                <button className="btn btn-primary" type="submit">
                                    <LogOut className="text-white" />
                                </button>
                            </form>
                        )}
                    </header>
                    {children}
                </Providers>
            </body>
        </html>
    );
}

export { metadata };
export default Layout;