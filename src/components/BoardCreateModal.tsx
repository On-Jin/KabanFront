import {FieldError, SubmitHandler, useFieldArray, useForm} from "react-hook-form"
import {useState} from "react";
import usePointerEvents from "@/hooks/usePointerEvents";
import KStringput from "@/components/KStringput";
import Image from "next/image";
import crossIcon from '/public/icon-cross.svg';
import KButton, {KButtonSize, KButtonType} from "@/components/KButton";
import KProcessing from "@/components/KProcessing";
import {useBoardStore} from "@/hooks/useStore";
import {useRouter} from "next/navigation";

interface BoardInput {
    name: string,
    columnNames: { name: string }[]
}

export default function BoardCreateModal({onClose}: {
    onClose: () => void
}) {
    const [isProcess, setIsProcess] = useState(false);
    const addBoard = useBoardStore((state) => state.addBoard);
    usePointerEvents(isProcess);
    const {replace} = useRouter();


    const {register, setValue, control, handleSubmit, watch, formState: {errors}}
        = useForm<BoardInput>({defaultValues: {name: "", columnNames: [{name: "Todo"}, {name: "Doing"}]}});

    const {fields, append, remove}
        = useFieldArray({
        control,
        name: "columnNames"
    });

    const onSubmit: SubmitHandler<BoardInput> = async data => {
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
                <button onClick={() => setIsProcess(!isProcess)}>switch {`${isProcess}`}</button>
                <p className="heading-l">
                    Add New Board
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className="body-m text-k-medium-grey">
                            Board Name
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
                                append({name: ""});
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
                        {isProcess ? <KProcessing/> : 'Create New Board'}
                    </KButton>
                </form>
            </div>
        </>
    );
}
