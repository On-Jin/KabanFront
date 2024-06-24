import {useBoardStore} from "@/hooks/useStore";
import KButton, {KButtonSize, KButtonType} from "@/components/KButton";
import {useState} from "react";
import KProcessing from "@/components/KProcessing";
import usePointerEvents from "@/hooks/usePointerEvents";
import clsx from "clsx";
import {Board} from "@/lib/types/Board";

export default function BoardDeleteModal({board, onClose}: {
    board: Board,
    onClose: () => void
}) {
    const [isProcess, setIsProcess] = useState(false);
    const deleteBoard = useBoardStore((state) => state.deleteBoard);
    usePointerEvents(isProcess);

    async function deleteBoardHandler() {
        setIsProcess(true);
        await deleteBoard(board.id);
        onClose();
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
                    onClick={onClose}
                    buttonSize={KButtonSize.Small}
                    buttonType={KButtonType.Secondary}
                >
                    Cancel
                </KButton>
            </div>
        </>
    );
}
