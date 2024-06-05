import {MainTask} from "@/lib/types/MainTask";
import KCheckbox from "@/components/KCheckbox";
import {useBoards} from "@/context/BoardsContext";
import KDropDown from "@/components/KDropDown";
import iconVerticalEllipsis from "/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {useState} from "react";
import KStringput from "@/components/KStringput";

export default function MainTaskEditModal({mainTask, setMainTask}: {
    mainTask: MainTask,
    setMainTask: (value: (((prevState: MainTask) => MainTask) | MainTask)) => void
}) {
    const {boards, updateSubTask} = useBoards();

    const [shadowMainTask, setShadowMainTask] = useState(mainTask)

    // function setSubTaskComplete(subTaskId: number) {
    //     const st = mainTask.subTasks.find(subTask => subTask.id === subTaskId)!;
    //     st.isCompleted = !st.isCompleted;
    //     setMainTask({...mainTask});
    //     updateSubTask(subTaskId, st.isCompleted)
    // }

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
                <p className="heading-l">
                    Edit Task
                </p>
                <KStringput inputText={shadowMainTask.title} onChangeInput={value => {
                    setShadowMainTask({...shadowMainTask, title: value});
                }}/>
                <div>
                    <p className="body-m text-k-medium-grey">Current Status</p>
                    <KDropDown value={mainTask.status} options={columnNames} onChange={() => {
                    }}/>
                </div>
            </div>
        </>
    );
}