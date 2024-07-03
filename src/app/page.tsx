'use client'
import React, {useState} from "react";
import {useBoardStore} from "@/hooks/useStore";
import KButton, {KButtonSize, KButtonType} from "@/components/K/KButton";
import KProcessing from "@/components/K/KProcessing";
import {useRouter} from "next/navigation";

export default function Home() {
    const boardIds = useBoardStore((state) => state.boardIds);
    const populateMe = useBoardStore((state) => state.populateMe);
    const [isProcessNewBoard, setIsProcessNewBoard] = useState(false);
    const addBoard = useBoardStore((state) => state.addBoard);
    const {replace} = useRouter();

    const addNewBoardHandler = async () => {
        setIsProcessNewBoard(true)
        populateMe()
            .then((newBoardIds) => {
                setIsProcessNewBoard(false);
                replace(`/board/${newBoardIds[0]}`);
            });
    };

    return (
        <div>
            {/*{boardIds!.map(info => (<Link key={info.id} href={`/board/${info.id}`}>{info.name}</Link>))}*/}
            {/*<button onClick={populateMe}>Populate</button>*/}
            <p>This board is no boards. Create a new column to get started.</p>

            <KButton
                disabled={isProcessNewBoard}
                onClick={addNewBoardHandler}
                buttonSize={KButtonSize.Small}
                buttonType={KButtonType.Destructive}
            >
                {isProcessNewBoard ? <KProcessing/> : '+ Add New Board'}
            </KButton>
        </div>
    );
}
