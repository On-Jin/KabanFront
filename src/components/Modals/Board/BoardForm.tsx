import {FieldError, SubmitHandler, useFieldArray, useForm} from "react-hook-form"
import usePointerEvents from "@/hooks/usePointerEvents";
import KStringput from "@/components/K/KStringput";
import KButton, {KButtonSize, KButtonType} from "@/components/K/KButton";
import KProcessing from "@/components/K/KProcessing";
import {InputBoard} from "@/lib/forms/InputBoard";
import {InputColumn} from "@/lib/forms/InputColumn";
import {Board} from "@/lib/types/Board";
import {ReactSVG} from "react-svg";

export default function BoardForm({onClose, isProcess, onSubmit, board, prefixBoardOnTitle, submitButtonText}: {
    onClose: () => void,
    isProcess: boolean,
    onSubmit: SubmitHandler<InputBoard>,
    board: Board,
    prefixBoardOnTitle?: boolean,
    submitButtonText: string
}) {
    prefixBoardOnTitle = prefixBoardOnTitle ?? false;
    usePointerEvents(isProcess);


    const {register, setValue, control, handleSubmit, watch, formState: {errors}}
        = useForm<InputBoard>({
        defaultValues: {
            name: board.name,
            columnNames: board.columns.map(c => ({
                name: c.name,
                id: c.id,
                isNew: c.id == 0 // If id == 0, parent component added default Column to add
            } as InputColumn))
        }
    });

    const {fields, append, remove}
        = useFieldArray({
        control,
        name: "columnNames"
    });

    return (
        <>
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-2">
                    <p className="body-m text-k-medium-grey dark:text-white">
                        {prefixBoardOnTitle ? "Board" : ""} Name
                    </p>
                    <KStringput
                        disabled={isProcess}
                        error={errors.name}
                        placeholder="e.g. Web Design"
                        {...register("name", {required: true})}
                    />
                </div>
                <div className="space-y-2">
                    <p className="body-m text-k-medium-grey dark:text-white">{prefixBoardOnTitle ? "Board" : ""} Columns</p>
                    <div className="space-y-3">
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
                                    <ReactSVG
                                        className="h-full w-4  fill-[#828FA3] hover:fill-k-black hover:dark:fill-k-red"
                                        src="/icon-cross.svg"
                                    />
                                </button>
                            </div>
                        ))}

                        <KButton
                            buttonSize={KButtonSize.Small}
                            buttonType={KButtonType.Secondary}
                            disabled={isProcess}
                            onClick={() => {
                                append({name: "", id: 0, isNew: true});
                            }}
                        >
                            <>+ Add New Column</>
                        </KButton>
                    </div>
                </div>
                <KButton
                    buttonSize={KButtonSize.Small}
                    onClick={handleSubmit(onSubmit)}
                    disabled={isProcess}
                >
                    {isProcess ? <KProcessing/> : submitButtonText}
                </KButton>
            </form>
        </>
    );
}
