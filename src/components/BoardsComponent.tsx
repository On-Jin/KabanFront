'use client'
import BoardComponent from "@/components/BoardComponent";
import React, {Suspense, useCallback, useEffect, useState} from "react";
import {useBoards} from "@/context/BoardsContext";
import {useBoardStore} from "@/hooks/useStore";
import ModalHandler from "@/components/ModalHandler";

export default function BoardsComponent() {
    const [counter, SetCounter] = useState<number>(0);

    const {boardIds, refreshData} = useBoards();

    // const updateBoardStore = useBoardStore((state) => state.updateBoard);
    // const boardStore = useBoardStore((state) => state.board);
    const fetchBoard = useBoardStore((state) => state.fetchBoard);
    const isLoading = useBoardStore((state) => state.isLoading);

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
            {!isLoading &&
                <>
                    <div className="touch-manipulation w-full grow flex flex-col">
                        <BoardComponent/>
                    </div>
                    <ModalHandler/>
                </>
            }
        </>
    );
}