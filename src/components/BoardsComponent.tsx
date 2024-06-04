'use client'
import BoardComponent from "@/components/BoardComponent";
import React, {Suspense, useCallback, useEffect, useState} from "react";
import {useBoards} from "@/context/BoardsContext";

export default function BoardsComponent() {
    const [counter, SetCounter] = useState<number>(0);

    const {boards, updateBoard, refreshData} = useBoards();

    return (
        <>
            <div onClick={() => SetCounter(counter + 1)}>click {counter}</div>
            <button onClick={refreshData}>
                Refresh Data
            </button>
            <div className="touch-manipulation w-full grow flex flex-col">
                <Suspense fallback={<div>Loading...</div>}>
                    {boards.length > 0 &&
                        <BoardComponent key={boards[0].id} board={boards[0]} updateBoard={updateBoard}/>}
                </Suspense>
            </div>
        </>
    );
}