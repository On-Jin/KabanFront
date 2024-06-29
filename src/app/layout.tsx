import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "@/app/globals.css";
import {DataProvider} from "@/context/DataContext";
import WaitMe from "@/shared/WaitMe";
import React from "react";
import ModalHandler from "@/components/Modals/ModalHandler";

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
        <body className={inter.className + " bg-k-light-grey text-k-black dark:bg-k-dark-grey dark:text-white"}>
        <div className="">
            <DataProvider>
                <WaitMe>
                    <>
                        {children}
                    </>
                    <ModalHandler/>
                </WaitMe>
            </DataProvider>
        </div>
        </body>
        </html>
    );
}
