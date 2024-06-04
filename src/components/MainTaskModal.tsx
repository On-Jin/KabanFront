import {MainTask} from "@/lib/types/MainTask";
import KCheckbox from "@/components/KCheckbox";
import {useBoards} from "@/context/BoardsContext";
import KDropDown from "@/components/KDropDown";
import iconVerticalEllipsis from "/public/icon-vertical-ellipsis.svg";
import Image from "next/image";

export default function MainTaskModal({mainTask,  setMainTask}: {
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

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between">
                    <p className="heading-l">
                        {mainTask.title}
                    </p>
                    <div className="ml-4 self-center">
                        <Image
                            className="w-[10px] h-auto"
                            src={iconVerticalEllipsis} alt="task menu"
                        />
                    </div>
                </div>
                <p className="body-l text-k-medium-grey">{mainTask.description}</p>
                <div>
                    <p className="body-m text-k-medium-grey">Subtasks (0 of 3)</p>
                    <div>{mainTask.subTasks.length}</div>
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