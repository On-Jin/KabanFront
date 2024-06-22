'use client';

import Image from "next/image";
import SwitchTheme from "@/components/SwitchTheme";
import React from "react";
import Link from "next/link";

export default function Home() {
    async function callApiLogin() {
        const response = await fetch("/api/login", {
            method: "GET"
        });
        console.log(await response.text());
    }

    async function callApiDidi() {
        const response = await fetch("/api/didi", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        console.log(await response.text());
    }

    async function callApiProtected() {
        const response = await fetch("/api/protected", {
            method: "GET"
        });
        console.log(await response.text());
    }

    async function callApiMe() {
        const response = await fetch("/api/me", {
            method: "GET"
        });
        console.log(await response.text());
    }

    async function callApiTest() {
        const response = await fetch("/api/test", {
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


            <button type="button" onClick={callApiTest}>Test</button>

            <button type="button" onClick={callApiMe}>Me</button>
            <a href={`${process.env.API_PROXY}/didi`}>Test</a>
            <Link href="/">Home</Link>

        </main>
    );
}
