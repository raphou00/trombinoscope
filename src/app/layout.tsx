import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
    title: "Trombinoscope EPTM",
    description: "Le trombinoscope de l'EPTM",
    icons: "/favicon.png"
};

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}

export { metadata };
export default Layout;