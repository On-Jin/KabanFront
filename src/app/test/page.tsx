'use client';

import Image from "next/image";
import SwitchTheme from "@/components/switch-theme";

export default function Home() {
    async function callApiLogin() {
        const response = await fetch("/api/login", {
            method: "GET"
        });
        console.log(await response.text());
    }

    async function callApiDidi() {
        const response = await fetch("/api/didi", {
            method: "GET"
        });
        console.log(await response.text());
    }

    async function callApiProtected() {
        const response = await fetch("/api/protected", {
            method: "GET"
        });
        console.log(await response.text());
    }

    return (
        <main className="flex min-h-screen flex-col items-center dark:bg-zinc-900 dark:text-white">
            <SwitchTheme/>
            <button type="button" onClick={callApiLogin}>Login</button>
            <button type="button" onClick={callApiDidi}>Didi</button>
            <button type="button" onClick={callApiProtected}>Protected</button>
        </main>
    );
}
