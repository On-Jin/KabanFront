import {MainTask} from "@/lib/types/MainTask";
import KStringput from "@/components/K/KStringput";
import {FieldError, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import KButton, {KButtonSize, KButtonType} from "@/components/K/KButton";
import KDropDown from "@/components/K/KDropDown";
import KProcessing from "@/components/K/KProcessing";
import {useBoardStore} from "@/hooks/useStore";
import {InputMainTask} from "@/lib/forms/InputMainTask";
import {ReactSVG} from "react-svg";

export default function MainTaskForm({mainTask, onClose, onSubmit, isProcess}: {
    mainTask: MainTask,
    onClose: () => void,
    onSubmit: SubmitHandler<InputMainTask>,
    isProcess: boolean,
}) {

    const placeHolderSelect = ["e.g. Make coffee", "e.g. Drink coffee & smile"]

    const columnNames = useBoardStore((state) => state.columnNames);

    const {register, setValue, control, handleSubmit, watch, formState: {errors}} = useForm<InputMainTask>(
        {
            defaultValues: {
                title: mainTask.title,
                description: mainTask.description,
                status: mainTask.status,
                subtasks: mainTask.subTasks.map(s => ({
                    id: s.id,
                    title: s.title,
                    isNew: s.id == 0 // If id == 0, parent component added default subtask to add
                }))
            }
        }
    );

    const {fields, append, remove}
        = useFieldArray({
        control,
        name: "subtasks"
    });

    return (
        <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="space-y-2">
                <p className="body-m text-k-medium-grey dark:text-white">Title</p>
                <KStringput
                    disabled={isProcess}
                    error={errors.title}
                    placeholder="e.g. Take coffee break"
                    {...register("title", {required: true})}
                />
            </div>
            <div className="space-y-2">
                <p className="body-m text-k-medium-grey dark:text-white">Description</p>
                <KStringput
                    className="break-words h-28"
                    disabled={isProcess}
                    error={errors.description}
                    placeholder={"e.g. It’s always good to take a break. This \n15 minute break will  recharge the batteries \na little."}
                    {...register("description", {required: false})}
                />
            </div>
            <div className="space-y-2">
                <p className="body-m text-k-medium-grey dark:text-white">Subtaks</p>
                <div className="space-y-3">
                    {fields.map((subTask, index) => (
                        <div key={subTask.id} className="flex items-center gap-x-4">
                            <KStringput
                                className="grow"
                                error={errors.subtasks?.[index] as FieldError}
                                disabled={isProcess}
                                placeholder={placeHolderSelect[index % 2]}
                                {...register(`subtasks.${index}.title`, {required: true})}
                            />

                            <button
                                className="disabled:opacity-50 group"
                                disabled={isProcess} onClick={() => remove(index)}
                            >
                                <ReactSVG
                                    className="h-full w-4  fill-[#828FA3] hover:fill-k-red"
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
                            append({title: "", id: Math.max(...fields.map(f => f.id)) + 1, isNew: true});
                        }}
                    >
                        <>+ Add New Task</>
                    </KButton>
                </div>
            </div>
            <div className="space-y-2">
                <p className="body-m text-k-medium-grey dark:text-white">Status</p>
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
    );
}
