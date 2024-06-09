'use client'
import BoardComponent from "@/components/BoardComponent";
import React, {Suspense, useCallback, useEffect, useState} from "react";
import {useBoards} from "@/context/BoardsContext";
import {useBoardStore} from "@/hooks/useStore";

export default function BoardsComponent() {
    const [counter, SetCounter] = useState<number>(0);

    const { boardIds, refreshData} = useBoards();

    const updateBoardStore = useBoardStore((state) => state.updateBoard);
    const boardStore = useBoardStore((state) => state.board);
    const fetchBoard = useBoardStore((state) => state.fetchBoard);

    // useEffect(() => {
    //     if (board) {
    //         updateBoardStore(board);
    //     }
    // }, [board]);

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
            <div onClick={() => SetCounter(counter + 1)}>click {counter}</div>
            <button onClick={refreshData}>
                Refresh Data
            </button>
            <div className="touch-manipulation w-full grow flex flex-col">
                <Suspense fallback={<div>Loading...</div>}>
                    <BoardComponent/>
                </Suspense>
            </div>
        </>
    );
}