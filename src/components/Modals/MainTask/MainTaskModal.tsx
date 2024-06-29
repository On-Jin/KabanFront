import KCheckbox from "@/components/K/KCheckbox";
import KDropDown from "@/components/K/KDropDown";
import React from "react";
import {useBoardStore} from "@/hooks/useStore";
import clsx from "clsx";
import {MainTask} from "@/lib/types/MainTask";
import useSetUrl from "@/hooks/useSetUrl";
import EditDeleteMenu, {EditDeleteMenuSize} from "@/components/EditDeleteMenu";

export default function MainTaskModal({mainTask, onClose}: {
    mainTask: MainTask,
    onClose: () => void
}) {
    const columnNames = useBoardStore((state) => state.columnNames);
    const updateSubTask = useBoardStore((state) => state.updateSubTask);
    const editStatusMainTask = useBoardStore((state) => state.editStatusMainTask);

    const {setEditTaskModalUrl, setDeleteTaskModalUrl} = useSetUrl();

    function setSubTaskComplete(subTaskId: number) {
        const st = mainTask.subTasks.find(subTask => subTask.id === subTaskId)!;
        updateSubTask(subTaskId, !st.isCompleted, undefined);
    }

    return (
        <>
            <div
                className={clsx('space-y-6')}
            >
                <div className="flex justify-between md:space-x-4">
                    <p className="heading-l">
                        {mainTask.title}
                    </p>
                    <EditDeleteMenu
                        menuSize={EditDeleteMenuSize.Big}
                        actionEdit={{name: "Edit Task", onClick: () => setEditTaskModalUrl(mainTask.id)}}
                        actionDelete={{name: "Delete Task", onClick: () => setDeleteTaskModalUrl(mainTask.id)}}
                    />
                </div>
                <p className="body-l text-k-medium-grey">{mainTask.description}</p>
                <div className="space-y-4">
                    <p className="body-m text-k-medium-grey">Subtasks (0 of 3)</p>
                    <div className="space-y-2">
                        {mainTask.subTasks.map(s => (
                            <KCheckbox
                                key={s.id}
                                value={s.isCompleted}
                                updateCheckbox={() => {
                                    console.log(s.id)
                                    setSubTaskComplete(s.id);
                                }}
                            >
                                {s.title}
                            </KCheckbox>
                        ))}

                    </div>
                </div>
                <div className="space-y-2">
                    <p className="body-m text-k-medium-grey">Current Status</p>
                    <KDropDown
                        value={mainTask.status}
                        options={columnNames}
                        onChange={(e) => {
                            editStatusMainTask(mainTask.id, e);
                        }}/>
                </div>
            </div>
        </>
    );
}
