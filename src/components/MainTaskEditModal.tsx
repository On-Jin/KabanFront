import {MainTask} from "@/lib/types/MainTask";
import KCheckbox from "@/components/KCheckbox";
import {useBoards} from "@/context/BoardsContext";
import KDropDown from "@/components/KDropDown";
import iconVerticalEllipsis from "/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {useState} from "react";
import KStringput from "@/components/KStringput";
import {selectMainTaskById, useBoardStore} from "@/hooks/useStore";

export default function MainTaskEditModal({id}: {
    id: number,
}) {
    const mainTask = useBoardStore(selectMainTaskById)(id);
    const columnNames = useBoardStore((state) => state.columnNames);

    const [shadowMainTask, setShadowMainTask] = useState(mainTask)

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