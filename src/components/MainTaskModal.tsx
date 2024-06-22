import KCheckbox from "@/components/KCheckbox";
import KDropDown from "@/components/KDropDown";
import React, {useState} from "react";
import {useBoardStore} from "@/hooks/useStore";
import KProcessing from "@/components/KProcessing";
import clsx from "clsx";
import usePointerEvents from "@/hooks/usePointerEvents";
import {MainTask} from "@/lib/types/MainTask";
import useSetUrl from "@/hooks/useSetUrl";
import {ReactSVG} from "react-svg";
import useClickOutside from "@/hooks/useClickOutside";

export default function MainTaskModal({mainTask, onClose}: {
    mainTask: MainTask,
    onClose: () => void
}) {
    const columnNames = useBoardStore((state) => state.columnNames);
    const updateSubTask = useBoardStore((state) => state.updateSubTask);
    const editStatusMainTask = useBoardStore((state) => state.editStatusMainTask);
    const deleteMainTask = useBoardStore((state) => state.deleteMainTask);
    const [isDeleteProcess, setIsDeleteProcess] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {addRef} = useClickOutside<HTMLElement>(setIsMenuOpen);
    usePointerEvents(isDeleteProcess);
    const {setEditTaskModalUrl} = useSetUrl();

    function setSubTaskComplete(subTaskId: number) {
        const st = mainTask.subTasks.find(subTask => subTask.id === subTaskId)!;
        updateSubTask(subTaskId, !st.isCompleted, undefined);
    }

    async function deleteMainTaskHandler() {
        setIsDeleteProcess(true);
        await deleteMainTask(mainTask.id);
        onClose();
        setIsDeleteProcess(false);
    }

    return (
        <>
            <div
                className={clsx('space-y-6', {"opacity-50": isDeleteProcess})}
            >
                <div className="flex justify-between">
                    <p className="heading-l">
                        {mainTask.title}
                    </p>
                    <div className="relative flex">
                        <button
                            type="button"
                            ref={(el) => addRef(el)}
                            className="px-4 z-10"
                            disabled={isDeleteProcess}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                            }}
                        >
                            <ReactSVG className={clsx("")} src="/icon-vertical-ellipsis.svg"/>
                        </button>

                        {isMenuOpen && (
                            <div
                                ref={(el) => addRef(el)}
                                className="absolute left-1/2 transform -translate-x-1/2 top-[100%]
                                            rounded-lg p-4 space-y-4 w-[190px] bg-white body-l">
                                <button
                                    disabled={isDeleteProcess}
                                    className="text-k-medium-grey hover:enabled:font-bold w-full flex justify-center"
                                    onClick={() => setEditTaskModalUrl(mainTask.id)}
                                >
                                    Edit Task
                                </button>

                                <button
                                    disabled={isDeleteProcess}
                                    className="text-k-red hover:enabled:font-bold w-full flex justify-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteMainTaskHandler();
                                    }}>
                                    {isDeleteProcess ? <KProcessing/> : 'Delete Task'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <p className="body-l text-k-medium-grey">{mainTask.description}</p>
                <div>
                    <p className="body-m text-k-medium-grey">Subtasks (0 of 3)</p>
                    <div>
                        {mainTask.subTasks.map(s => (
                            <KCheckbox
                                key={s.id}
                                value={s.isCompleted}
                                updateCheckbox={() => setSubTaskComplete(s.id)}>{s.title}{s.id}
                            </KCheckbox>
                        ))}

                    </div>
                </div>
                <div>
                    <p className="body-m text-k-medium-grey">Current Status</p>
                    <KDropDown
                        value={mainTask.status}
                        options={columnNames}
                        disabled={isDeleteProcess}
                        onChange={(e) => {
                            editStatusMainTask(mainTask.id, e);
                        }}/>
                </div>
            </div>
        </>
    );
}
