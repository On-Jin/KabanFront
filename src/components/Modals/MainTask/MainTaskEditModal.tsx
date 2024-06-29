import {useBoardStore} from "@/hooks/useStore";
import {SubmitHandler} from "react-hook-form"
import {useState} from "react";
import {InputMainTask} from "@/lib/forms/InputMainTask";
import usePointerEvents from "@/hooks/usePointerEvents";
import {MainTask} from "@/lib/types/MainTask";
import MainTaskForm from "@/components/Modals/MainTask/MainTaskForm";

export default function MainTaskEditModal({mainTask, onClose}: {
    mainTask: MainTask,
    onClose: () => void
}) {
    const editMainTask = useBoardStore((state) => state.editMainTask);
    const [isProcess, setIsProcess] = useState(false);
    usePointerEvents(isProcess);

    const onSubmit: SubmitHandler<InputMainTask> = async data => {
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
                <MainTaskForm mainTask={mainTask} onClose={onClose} onSubmit={onSubmit} isProcess={isProcess}/>
            </div>
        </>
    );
}
