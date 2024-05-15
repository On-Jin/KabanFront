import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "@/app/globals.css";

const inter = Plus_Jakarta_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Kaban Design System"
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
