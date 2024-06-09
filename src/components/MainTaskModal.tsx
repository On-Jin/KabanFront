import {MainTask} from "@/lib/types/MainTask";
import KCheckbox from "@/components/KCheckbox";
import KDropDown from "@/components/KDropDown";
import iconVerticalEllipsis from "/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {usePathname, useSearchParams,} from 'next/navigation';
import {useBoardStore} from "@/hooks/useStore";

export default function MainTaskModal({mainTask}: {
    mainTask: MainTask,
}) {
    const columnNames = useBoardStore((state) => state.columnNames);
    const updateSubTask = useBoardStore((state) => state.updateSubTask);
    const editStatusMainTask = useBoardStore((state) => state.editStatusMainTask);

    const {replace} = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        // run navigation after the first render
        const params = new URLSearchParams(searchParams?.toString());
        params.set('mainTask', mainTask.id.toString());
        replace(`${pathname}?${params.toString()}`);
        return () => {
            params.delete('mainTask');
            replace(`${pathname}?${params.toString()}`);
        };
    }, [])

    function setSubTaskComplete(subTaskId: number) {
        const st = mainTask.subTasks.find(subTask => subTask.id === subTaskId)!;
        updateSubTask(subTaskId, !st.isCompleted, undefined)
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            {pathname}
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
                    <KDropDown value={mainTask.status} options={columnNames} onChange={(e) => {
                        editStatusMainTask(mainTask.id, e);
                    }}/>
                </div>
            </div>
        </>
    );
}