﻿import {useBoardStore} from "@/hooks/useStore";
import KButton, {KButtonSize, KButtonType} from "@/components/K/KButton";
import {useState} from "react";
import KProcessing from "@/components/K/KProcessing";
import usePointerEvents from "@/hooks/usePointerEvents";
import clsx from "clsx";
import {Board} from "@/lib/types/Board";

export default function BoardDeleteModal({board, onCancel, onDeleted}: {
    board: Board,
    onCancel: () => void,
    onDeleted: (newFetchedBoardId: number | null) => void
}) {
    const [isProcess, setIsProcess] = useState(false);
    const deleteBoard = useBoardStore((state) => state.deleteBoard);
    usePointerEvents(isProcess);

    async function deleteBoardHandler() {
        setIsProcess(true);
        const newFetchedBoardId = await deleteBoard(board.id);
        onDeleted(newFetchedBoardId);
        setIsProcess(false);
    }


    return (
        <>
            <div
                className={clsx("space-y-6", {"opacity-50": isProcess})}
            >
                <p className="text-k-red heading-l">Delete this board?</p>
                <p className="body-l text-k-medium-grey">
                    Are you sure you want to delete the ‘{board.name}’ board? This action will remove all columns and
                    tasks and cannot be reversed.
                </p>
                <div className="space-y-6 md:space-y-0 md:flex md:space-x-4">
                    <KButton
                        disabled={isProcess}
                        onClick={deleteBoardHandler}
                        buttonSize={KButtonSize.Small}
                        buttonType={KButtonType.Destructive}
                    >
                        {isProcess ? <KProcessing/> : 'Delete'}
                    </KButton>
                    <KButton
                        disabled={isProcess}
                        onClick={onCancel}
                        buttonSize={KButtonSize.Small}
                        buttonType={KButtonType.Secondary}
                    >
                        Cancel
                    </KButton>
                </div>
            </div>
        </>
    );
}
