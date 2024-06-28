'use client'
import React from "react";
import {useBoardStore} from "@/hooks/useStore";
import Link from "next/link";

export default function Home() {
    const boardIds = useBoardStore((state) => state.boardIds);
    const populateMe = useBoardStore((state) => state.populateMe);

    return (
        <>
            {boardIds!.map(info => (<Link key={info.id} href={`/board/${info.id}`}>{info.name}</Link>))}
            <button onClick={populateMe}>Populate</button>
        </>
    );
}
