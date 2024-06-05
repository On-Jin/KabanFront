import {MainTask} from "@/lib/types/MainTask";
import KCheckbox from "@/components/KCheckbox";
import {useBoards} from "@/context/BoardsContext";
import KDropDown from "@/components/KDropDown";
import iconVerticalEllipsis from "/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {useState} from "react";

export default function MainTaskModal({mainTask, setMainTask}: {
    mainTask: MainTask,
    setMainTask: (value: (((prevState: MainTask) => MainTask) | MainTask)) => void
}) {
    const {boards, updateSubTask} = useBoards();

    function setSubTaskComplete(subTaskId: number) {
        const st = mainTask.subTasks.find(subTask => subTask.id === subTaskId)!;
        st.isCompleted = !st.isCompleted;
        setMainTask({...mainTask});
        updateSubTask(subTaskId, st.isCompleted)
    }

    const columnNames: string[] = [];

    boards.forEach((board) => {
        board.columns.forEach((column) => {
            column.mainTasks.forEach(m => {
                if (m.id == mainTask.id) {
                    board.columns.forEach(c => columnNames.push(c.name));
                }
            });
        });
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <div className="space-y-6" onClick={() => setIsMenuOpen(false)}>
                <div className="flex justify-between">
                    <p className="heading-l">
                        {mainTask.title}
                    </p>
                    <div className="relative px-4 self-center z-10" onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}>
                        <Image
                            className="w-[5px] h-auto"
                            src={iconVerticalEllipsis} alt="task menu"
                        />
                        {isMenuOpen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-[120%]
                                            rounded-lg p-4 space-y-4 w-[190px] bg-white body-l">
                                <p className="text-k-medium-grey hover:font-bold">
                                    Edit Task
                                </p>
                                <p className="text-k-red hover:font-bold">
                                    Delete Task
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <p className="body-l text-k-medium-grey">{mainTask.description}</p>
                <div>
                    <p className="body-m text-k-medium-grey">Subtasks (0 of 3)</p>
                    <div>
                        {mainTask.subTasks.map(s => (
                            <KCheckbox key={s.id} value={s.isCompleted}
                                       updateCheckbox={() => setSubTaskComplete(s.id)}>{s.title}{s.id}</KCheckbox>))}

                    </div>
                </div>
                <div>
                    <p className="body-m text-k-medium-grey">Current Status</p>
                    <KDropDown value={mainTask.status} options={columnNames} onChange={() => {
                    }}/>
                </div>
            </div>
        </>
    );
}