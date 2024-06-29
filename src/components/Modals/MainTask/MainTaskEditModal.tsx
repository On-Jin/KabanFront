import KDropDown from "@/components/K/KDropDown";
import KStringput from "@/components/K/KStringput";
import {useBoardStore} from "@/hooks/useStore";
import Image from "next/image";
import crossIcon from '/public/icon-cross.svg';
import KButton, {KButtonSize, KButtonType} from "@/components/K/KButton";
import {useForm, SubmitHandler, useFieldArray, FieldError} from "react-hook-form"
import {useState} from "react";
import KProcessing from "@/components/K/KProcessing";
import {InputMainTask} from "@/lib/forms/InputMainTask";
import usePointerEvents from "@/hooks/usePointerEvents";
import {MainTask} from "@/lib/types/MainTask";

export default function MainTaskEditModal({mainTask, onClose}: {
    mainTask: MainTask,
    onClose: () => void
}) {
    const columnNames = useBoardStore((state) => state.columnNames);
    const editMainTask = useBoardStore((state) => state.editMainTask);
    const [isProcess, setIsProcess] = useState(false);
    usePointerEvents(isProcess);


    const {register, setValue, control, handleSubmit, watch, formState: {errors}} = useForm<InputMainTask>(
        {
            defaultValues: {
                title: mainTask.title,
                description: mainTask.description,
                status: mainTask.status,
                subtasks: mainTask.subTasks.map(s => ({
                    id: s.id,
                    title: s.title,
                    isNew: false
                }))
            }
        }
    );

    const {fields, append, remove}
        = useFieldArray({
        control,
        name: "subtasks"
    });

    const onSubmit: SubmitHandler<InputMainTask> = async data => {
        console.log("SUBMIT")
        setIsProcess(true)
        const newSubTasks = data.subtasks.filter(s => s.isNew);
        const deletedSubTaskIds = mainTask.subTasks
            .filter(s => !data.subtasks.some(dataS => dataS.isNew || dataS.id === s.id))
            .map(s => s.id);
        editMainTask(mainTask.id, data.title, data.description, data.status, deletedSubTaskIds, newSubTasks.map(s => s.title))
            .then(() => {
                setIsProcess(false);
                onClose();
            });
    };

    return (
        <>
            <button onClick={() => setIsProcess(!isProcess)}>switch {`${isProcess}`}</button>
            <div className="space-y-6">
                <p className="heading-l">
                    Edit Task
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className="body-m text-k-medium-grey">Title</p>
                        <KStringput
                            disabled={isProcess}
                            error={errors.title}
                            {...register("title", {required: true})}
                        />
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Description</p>
                        <KStringput
                            className="break-words h-28"
                            disabled={isProcess}
                            error={errors.description}
                            placeholder={"e.g. It’s always good to take a break. This \n15 minute break will  recharge the batteries \na little."}
                            {...register("description", {required: false})}
                        />
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Subtaks</p>
                        {fields.map((subTask, index) => (
                            <div key={subTask.id} className="flex items-center gap-x-4">
                                <KStringput
                                    className="grow"
                                    error={errors.subtasks?.[index] as FieldError}
                                    disabled={isProcess}
                                    placeholder={"..."}
                                    {...register(`subtasks.${index}.title`, {required: true})}
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
                                append({title: "", id: Math.max(...fields.map(f => f.id)) + 1, isNew: true});
                            }}
                        >
                            <>+ Add New Task</>
                        </KButton>
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Status</p>
                        <KDropDown
                            value={watch("status")}
                            options={columnNames}
                            disabled={isProcess}
                            {...register("status")}
                            onChange={(value) => setValue("status", value)}
                        />
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
