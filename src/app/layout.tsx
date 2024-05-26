import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "@/app/globals.css";
import {DataProvider, useData} from "@/context/DataContext";

import LoadingProvider from "@/shared/LoadingProvider";

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
        <DataProvider>
                <LoadingProvider>{children}</LoadingProvider>
        </DataProvider>
        </body>
        </html>
    );
}
