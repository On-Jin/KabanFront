import KDropDown from "@/components/KDropDown";
import KStringput from "@/components/KStringput";
import {selectMainTaskById, useBoardStore} from "@/hooks/useStore";
import Image from "next/image";
import crossIcon from '/public/icon-cross.svg';
import KButton, {KButtonSize, KButtonType} from "@/components/KButton";
import {useForm, SubmitHandler, useFieldArray, FieldError} from "react-hook-form"
import {useState} from "react";

export type InputSubTask = {
    // Can be the real id or fake id depend on isNew field
    id: number,
    title: string,
    isNew: boolean,
}

export type InputEditTask = {
    title: string,
    description: string,
    status: string,
    subtasks: InputSubTask[];
};

export default function MainTaskEditModal({id}: {
    id: number,
}) {
    const mainTask = useBoardStore(selectMainTaskById)(id);
    const columnNames = useBoardStore((state) => state.columnNames);
    const editMainTask = useBoardStore((state) => state.editMainTask);
    const [isProcess, setIsProcess] = useState(false);


    const {register, setValue, control, handleSubmit, watch, formState: {errors}} = useForm<InputEditTask>(
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

    const {fields, append, prepend, remove, swap, move, insert, replace}
        = useFieldArray({
        control,
        name: "subtasks"
    });

    const onSubmit: SubmitHandler<InputEditTask> = async data => {
        console.log("SUBMIT")
        setIsProcess(true)
        const newSubTasks = data.subtasks.filter(s => s.isNew);
        const deletedSubTaskIds = mainTask.subTasks
            .filter(s => !data.subtasks.some(dataS => dataS.isNew || dataS.id === s.id))
            .map(s => s.id);
        editMainTask(mainTask.id, data.title, data.description, data.status, deletedSubTaskIds, newSubTasks.map(s => s.title))
            .then(() => {
                setIsProcess(false);
            });
    };

    return (
        <>
            <div className="space-y-6">
                <p className="heading-l">
                    Edit Task
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className="body-m text-k-medium-grey">Title</p>
                        <KStringput {...register("title", {required: true})}/>
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Description</p>
                        <KStringput
                            isError={errors.description}
                            {...register("description", {required: false})}
                            className="break-words h-28"
                            placeholder={"e.g. It’s always good to take a break. This \n15 minute break will  recharge the batteries \na little."}/>
                        {errors.description && <span>This field is required</span>}
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Subtaks</p>
                        {fields.map((subTask, index) => (
                            <div key={subTask.id} className="flex items-center gap-x-4">
                                <KStringput
                                    className="grow"
                                    {...register(`subtasks.${index}.title`, {required: true})}
                                    isError={errors.subtasks?.[index] as FieldError}
                                    placeholder={"..."}/>

                                <Image
                                    className="h-full w-4 hover:brightness-0"
                                    src={crossIcon}
                                    alt="remove subtask"
                                    onClick={() => remove(index)}
                                />
                            </div>
                        ))}

                        <KButton
                            buttonSize={KButtonSize.Small}
                            buttonType={KButtonType.Secondary}
                            onClick={() => {
                                append({title: "", id: Math.max(...fields.map(f => f.id)) + 1, isNew: true});
                            }}
                        >
                            + Add New Task
                        </KButton>
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Status</p>
                        <KDropDown
                            {...register("status")}
                            value={watch("status")}
                            options={columnNames}
                            onChange={(value) => setValue("status", value)}
                        />
                    </div>

                    <div>qwewqe {isProcess ? "isP" : "not"}</div>
                    <KButton
                        buttonSize={KButtonSize.Small}
                        onClick={handleSubmit(onSubmit)}
                        disabled={isProcess}
                    >
                        Save Changes
                    </KButton>
                </form>
            </div>
        </>
    );
}
