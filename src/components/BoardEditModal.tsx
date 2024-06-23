import {FieldError, SubmitHandler, useFieldArray, useForm} from "react-hook-form"
import {useState} from "react";
import usePointerEvents from "@/hooks/usePointerEvents";
import KStringput from "@/components/KStringput";
import Image from "next/image";
import crossIcon from '/public/icon-cross.svg';
import KButton, {KButtonSize, KButtonType} from "@/components/KButton";
import KProcessing from "@/components/KProcessing";
import {useBoardStore} from "@/hooks/useStore";
import {InputBoard} from "@/lib/forms/InputBoard";
import {InputColumn} from "@/lib/forms/InputColumn";

export default function BoardEditModal({onClose}: {
    onClose: () => void
}) {
    const [isProcess, setIsProcess] = useState(false);
    const board = useBoardStore(state => state.board);
    const patchBoard = useBoardStore((state) => state.patchBoard);
    usePointerEvents(isProcess);


    const {register, setValue, control, handleSubmit, watch, formState: {errors}}
        = useForm<InputBoard>({
        defaultValues: {
            name: board.name,
            columnNames: board.columns.map(c => ({name: c.name, id: c.id, isNew: false} as InputColumn))
        }
    });

    const {fields, append, remove}
        = useFieldArray({
        control,
        name: "columnNames"
    });

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
                <button onClick={() => setIsProcess(!isProcess)}>switch {`${isProcess}`}</button>
                <p className="heading-l">
                    Add New Board
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className="body-m text-k-medium-grey">
                            Edit Board
                        </p>
                        <KStringput
                            disabled={isProcess}
                            error={errors.name}
                            placeholder="e.g. Web Design"
                            {...register("name", {required: true})}
                        />
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Board Columns</p>
                        {fields.map((subTask, index) => (
                            <div key={subTask.id} className="flex items-center gap-x-4">
                                <KStringput
                                    className="grow"
                                    error={errors.columnNames?.[index] as FieldError}
                                    disabled={isProcess}
                                    placeholder={"..."}
                                    {...register(`columnNames.${index}.name`, {required: true})}
                                />


                                <button
                                    className="disabled:opacity-50 group"
                                    disabled={isProcess} onClick={() => remove(index)}
                                >
                                    <Image
                                        className="h-full w-4 group-enabled:hover:brightness-0"
                                        src={crossIcon}
                                        alt="remove subtask"

                                    />
                                </button>
                            </div>
                        ))}

                        <KButton
                            buttonSize={KButtonSize.Small}
                            buttonType={KButtonType.Secondary}
                            disabled={isProcess}
                            onClick={() => {
                                append({name: "", id: Math.max(...fields.map(f => f.id)) + 1, isNew: true});
                            }}
                        >
                            <>+ Add New Column</>
                        </KButton>
                    </div>

                    <KButton
                        buttonSize={KButtonSize.Small}
                        onClick={handleSubmit(onSubmit)}
                        disabled={isProcess}
                    >
                        {isProcess ? <KProcessing/> : 'Save Changes'}
                    </KButton>
                </form>
            </div>
        </>
    );
}
