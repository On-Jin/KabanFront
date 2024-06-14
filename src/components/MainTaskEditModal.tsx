import KDropDown from "@/components/KDropDown";
import {useState} from "react";
import KStringput from "@/components/KStringput";
import {selectMainTaskById, useBoardStore} from "@/hooks/useStore";
import Image from "next/image";
import crossIcon from '/public/icon-cross.svg';
import KButton, {KButtonSize, KButtonType} from "@/components/KButton";
import {useForm, FormProvider, useFormContext, SubmitHandler} from "react-hook-form"

export type Inputs = {
    example: string,
    exampleRequired: string,
};

export default function MainTaskEditModal({id}: {
    id: number,
}) {
    const mainTask = useBoardStore(selectMainTaskById)(id);
    const columnNames = useBoardStore((state) => state.columnNames);

    const [shadowMainTask, setShadowMainTask] = useState(mainTask)

    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    console.log(watch("example")) // watch input value by passing the name of it

    return (
        <>
            <div className="space-y-6">
                <p className="heading-l">
                    Edit Task
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className="body-m text-k-medium-grey">Title</p>
                        <KStringput inputText={shadowMainTask.title} onChangeInput={value => {
                            setShadowMainTask({...shadowMainTask, title: value});
                        }}/>
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Description</p>
                        <KStringput<Inputs>
                            register={register}
                            className="break-words h-28"
                            inputText={shadowMainTask.description}
                            onChangeInput={value => {
                                setShadowMainTask({...shadowMainTask, description: value});
                            }}
                            canBeEmpty={true}
                            exampleValue={"e.g. It’s always good to take a break. This \n15 minute break will  recharge the batteries \na little."}/>
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Subtaks</p>
                        {shadowMainTask.subTasks.map(subTask => (
                            <>
                                <div className="flex items-center gap-x-4">
                                    <KStringput
                                        className="grow"
                                        inputText={subTask.title}
                                        onChangeInput={value => {
                                            setShadowMainTask({
                                                ...shadowMainTask,
                                                subTasks: shadowMainTask.subTasks.map((s) => {
                                                    if (s === subTask) {
                                                        return {
                                                            ...s,
                                                            title: value,
                                                        };
                                                    }
                                                    return s;
                                                }),
                                            });
                                        }}
                                        exampleValue={"..."}/>

                                    <Image
                                        className="h-full w-4 hover:brightness-0"
                                        src={crossIcon}
                                        alt="remove subtask"
                                        onClick={() => {
                                            setShadowMainTask({
                                                ...shadowMainTask,
                                                subTasks: shadowMainTask.subTasks.filter(s => s !== subTask),
                                            });
                                        }}
                                    />
                                </div>
                            </>
                        ))}

                        <KButton
                            buttonSize={KButtonSize.Small}
                            buttonType={KButtonType.Secondary}
                            onClick={() => {
                                shadowMainTask.subTasks.push({id: 0, isCompleted: false, title: ""})
                                setShadowMainTask({
                                    ...shadowMainTask,
                                });
                            }}
                        >
                            + Add New Task
                        </KButton>
                    </div>
                    <div>
                        <p className="body-m text-k-medium-grey">Status</p>
                        <KDropDown value={mainTask.status} options={columnNames} onChange={() => {
                        }}/>
                    </div>

                    <KButton
                        buttonSize={KButtonSize.Small}
                    >
                        Save Changes
                    </KButton>
                </form>
            </div>
        </>
    );
}
