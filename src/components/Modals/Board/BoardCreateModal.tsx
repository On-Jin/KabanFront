import {SubmitHandler, useFieldArray, useForm} from "react-hook-form"
import {useState} from "react";
import usePointerEvents from "@/hooks/usePointerEvents";
import {useBoardStore} from "@/hooks/useStore";
import {useRouter} from "next/navigation";
import {InputBoard} from "@/lib/forms/InputBoard";
import BoardForm from "@/components/Modals/Board/BoardForm";
import {Board} from "@/lib/types/Board";

export default function BoardCreateModal({onClose}: {
    onClose: () => void
}) {
    const [isProcess, setIsProcess] = useState(false);
    const addBoard = useBoardStore((state) => state.addBoard);
    usePointerEvents(isProcess);
    const {replace} = useRouter();
    const board: Board = {
        id: 0,
        name: "",
        columns: [{name: "Todo", id: 0, mainTasks: []}, {name: "Doing", id: 0, mainTasks: []}]
    }

    const onSubmit: SubmitHandler<InputBoard> = async data => {
        setIsProcess(true)
        addBoard(data.name, data.columnNames.map(c => c.name))
            .then((newBoardId) => {
                setIsProcess(false);
                onClose();
                replace(`/board/${newBoardId}`);
            });
    };

    return (
        <>
            <div className="space-y-6">
                <p className="heading-l">
                    Add New Board
                </p>
                <BoardForm
                    onClose={onClose}
                    isProcess={isProcess}
                    onSubmit={onSubmit}
                    board={board}
                    submitButtonText="Create New Board"
                />
            </div>
        </>
    );
}
