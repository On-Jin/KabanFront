import KCheckbox from "@/components/KCheckbox";
import KDropDown from "@/components/KDropDown";
import iconVerticalEllipsis from "/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {usePathname, useRouter, useSearchParams,} from 'next/navigation';
import {useBoardStore} from "@/hooks/useStore";
import {ModalState} from "@/components/ModalHandler";
import KProcessing from "@/components/KProcessing";
import clsx from "clsx";
import usePointerEvents from "@/hooks/usePointerEvents";
import {MainTask} from "@/lib/types/MainTask";

export default function MainTaskModal({mainTask, onClose}: {
    mainTask: MainTask,
    onClose: () => void
}) {
    const columnNames = useBoardStore((state) => state.columnNames);
    const updateSubTask = useBoardStore((state) => state.updateSubTask);
    const editStatusMainTask = useBoardStore((state) => state.editStatusMainTask);
    const deleteMainTask = useBoardStore((state) => state.deleteMainTask);
    const [isDeleteProcess, setIsDeleteProcess] = useState(false)
    usePointerEvents(isDeleteProcess);


    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    function setSubTaskComplete(subTaskId: number) {
        const st = mainTask.subTasks.find(subTask => subTask.id === subTaskId)!;
        updateSubTask(subTaskId, !st.isCompleted, undefined);
    }

    function setEditTaskModal() {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('task', mainTask.id.toString());
        params.set('action', ModalState.EditMainTask.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    async function deleteMainTaskHandler() {
        setIsDeleteProcess(true);
        await deleteMainTask(mainTask.id);
        // replace(`${pathname}`);
        onClose();
        setIsDeleteProcess(false);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLButtonElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (!isDeleteProcess && menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDeleteProcess]);

    return (
        <>
            <div
                className={clsx('space-y-6', {"opacity-50": isDeleteProcess})}
            >
                <div className="flex justify-between">
                    <p className="heading-l">
                        {mainTask.title}
                    </p>
                    <button
                        type="button"
                        className="relative px-4 self-center z-10"
                        ref={menuRef}
                        disabled={isDeleteProcess}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                    >
                        <Image
                            className="w-[5px] h-auto"
                            src={iconVerticalEllipsis} alt="task menu"
                        />
                        {isMenuOpen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-[120%]
                                            rounded-lg p-4 space-y-4 w-[190px] bg-white body-l">
                                <p className="text-k-medium-grey hover:enabled:font-bold w-full flex justify-center"
                                   onClick={setEditTaskModal}>
                                    Edit Task
                                </p>

                                <button type="button"
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
                    </button>
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
