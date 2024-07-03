'use client'
import React, {useEffect, useState} from "react";
import {useBoardStore} from "@/hooks/useStore";
import KButton, {KButtonSize, KButtonType} from "@/components/K/KButton";
import KProcessing from "@/components/K/KProcessing";
import {useRouter} from "next/navigation";
import useSetUrl from "@/hooks/useSetUrl";
import ModalHandler from "@/components/Modals/ModalHandler";

export default function Home() {
    const boardIds = useBoardStore((state) => state.boardIds);
    const populateMe = useBoardStore((state) => state.populateMe);
    const [isProcessNewBoard, setIsProcessNewBoard] = useState(false);
    const {replace} = useRouter();
    const {setAddBoardUrl} = useSetUrl();

    useEffect(() => {
        if (boardIds != null && boardIds?.length != 0) {
            replace(`/board/${boardIds[0].id}`);
        }
    }, [boardIds]);

    const populateHandler = async () => {
        setIsProcessNewBoard(true)
        populateMe()
            .then((newBoardIds) => {
                replace(`/board/${newBoardIds[0]}`);
            });
    };

    const addNewBoardHandler = async () => {
        setAddBoardUrl();
    };


    if (boardIds != null && boardIds.length > 0) {
        return <></>;
    }

    return (
        <div className="grow">
            <div className="flex-col content-center h-full mb-4 md:mb-6 space-y-6">
                <p className="text-center px-6 text-k-medium-grey heading-l">
                    There is no boards. Create a new board to get started.
                </p>

                <div className="w-fit mx-auto space-y-6">
                    <KButton
                        className="w-full mx-auto"
                        disabled={isProcessNewBoard}
                        onClick={addNewBoardHandler}
                        buttonSize={KButtonSize.Large}
                        buttonType={KButtonType.Primary}
                    >
                        + Add New Board
                    </KButton>

                    <KButton
                        className="w-fit mx-auto"
                        disabled={isProcessNewBoard}
                        onClick={populateHandler}
                        buttonSize={KButtonSize.Large}
                        buttonType={KButtonType.Primary}
                    >
                        {isProcessNewBoard ? <KProcessing/> : '+ Populate with default data'}
                    </KButton>
                </div>

                <ModalHandler/>
            </div>
        </div>
    );
}
