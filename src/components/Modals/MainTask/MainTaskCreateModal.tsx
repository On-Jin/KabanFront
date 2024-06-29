import {useBoardStore} from "@/hooks/useStore";
import {SubmitHandler} from "react-hook-form"
import {useState} from "react";
import {MainTask} from "@/lib/types/MainTask";
import {InputMainTask} from "@/lib/forms/InputMainTask";
import usePointerEvents from "@/hooks/usePointerEvents";
import MainTaskForm from "@/components/Modals/MainTask/MainTaskForm";

export default function MainTaskCreateModal({onClose}: {
    onClose: () => void
}) {
    const [isProcess, setIsProcess] = useState(false);
    const columnNames = useBoardStore((state) => state.columnNames);
    const mainTask: MainTask = {description: "", id: 0, status: columnNames[0], subTasks: [], title: ""};
    const addMainTask = useBoardStore((state) => state.addMainTask);
    usePointerEvents(isProcess);

    const onSubmit: SubmitHandler<InputMainTask> = async data => {
        setIsProcess(true)
        addMainTask(data.title, data.description, data.status, data.subtasks.map(s => s.title))
            .then(() => {
                setIsProcess(false);
                onClose();
            });
    };

    return (
        <>
            <div className="space-y-6">
                <p className="heading-l">
                    Add New Task
                </p>
                <MainTaskForm mainTask={mainTask} onClose={onClose} onSubmit={onSubmit} isProcess={isProcess}/>
            </div>
        </>
    );
}
