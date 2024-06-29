import {SubmitHandler} from "react-hook-form"
import {useState} from "react";
import usePointerEvents from "@/hooks/usePointerEvents";
import {useBoardStore} from "@/hooks/useStore";
import {InputBoard} from "@/lib/forms/InputBoard";
import BoardForm from "@/components/Modals/Board/BoardForm";

export default function BoardEditModal({onClose}: {
    onClose: () => void
}) {
    const [isProcess, setIsProcess] = useState(false);
    const board = useBoardStore(state => state.board);
    const patchBoard = useBoardStore((state) => state.patchBoard);
    usePointerEvents(isProcess);

    const onSubmit: SubmitHandler<InputBoard> = async data => {
        setIsProcess(true);

        const newColumns = data.columnNames.filter(c => c.isNew);
        const updatedColumn = data.columnNames.filter(c => !c.isNew && (board.columns.find(dataC => dataC.id == c.id)?.name != c.name));
        const deletedColumns = board.columns
            .filter(c => !data.columnNames.some(dataC => !dataC.isNew && dataC.id === c.id))
            .map(s => s.id);

        console.log("deletedColumns", deletedColumns);
        console.log("updatedColumn", updatedColumn);
        console.log("newColumns", newColumns);
        patchBoard(board.id, data.name, deletedColumns, [...newColumns, ...updatedColumn])
            .then(() => {
                setIsProcess(false);
                onClose();
            });
    };

    return (
        <>
            <div className="space-y-6">
                <p className="heading-l">
                    Edit Board
                </p>
                <BoardForm
                    onClose={onClose}
                    isProcess={isProcess}
                    onSubmit={onSubmit}
                    board={board}
                    prefixBoardOnTitle={true}
                    submitButtonText="Save Changes"
                />
            </div>
        </>
    );
}
