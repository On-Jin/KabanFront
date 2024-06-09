'use client'
import BoardComponent from "@/components/BoardComponent";
import React, {useState} from "react";
import {useBoards} from "@/context/BoardsContext";
import {useBoardStore} from "@/hooks/useStore";
import ModalHandler from "@/components/ModalHandler";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function BoardsComponent() {
    const [counter, SetCounter] = useState<number>(0);

    const {boardIds, refreshData} = useBoards();

    const fetchBoard = useBoardStore((state) => state.fetchBoard);
    const isLoading = useBoardStore((state) => state.isLoading);
    // const router = useRouter();
    if (boardIds == null)
        return <div>Loading ...</div>

    return (
        <>
            <button onClick={() => {
                // selectBoard(boardIds[0].id);
                fetchBoard(boardIds[0].id);
            }}>
                Fetch
            </button>
            <div>{JSON.stringify(boardIds)}</div>
            <div onClick={() => SetCounter(counter + 1)}>click {counter}</div>
            <button onClick={refreshData}>
                Refresh Data
            </button>
            <Link href={`/`}>base</Link>
            <Link href={`/board/2`}>board 2</Link>
            {!isLoading &&
                <>
                    {/*<div className="touch-manipulation w-full grow flex flex-col">*/}
                    {/*    <BoardComponent/>*/}
                    {/*</div>*/}
                    <ModalHandler/>
                </>
            }
        </>
    );
}