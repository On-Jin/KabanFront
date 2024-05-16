import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "@/app/globals.css";
import NavBar from "@/shared/NavBar";


const inter = Plus_Jakarta_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Kaban",
    description: "Challenge from FrontEnd Mentor",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className + " bg-k-light-grey"}>
            <NavBar/>
            <main>
                {children}
            </main>
        </body>
        </html>
    );
}
