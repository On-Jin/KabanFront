import KCheckbox from "@/components/KCheckbox";
import KDropDown from "@/components/KDropDown";
import iconVerticalEllipsis from "/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {useState} from "react";
import {usePathname, useRouter, useSearchParams,} from 'next/navigation';
import {selectMainTaskById, useBoardStore} from "@/hooks/useStore";
import {ModalState} from "@/components/ModalHandler";

export default function MainTaskModal({id}: {
    id: number,
}) {
    const columnNames = useBoardStore((state) => state.columnNames);
    const updateSubTask = useBoardStore((state) => state.updateSubTask);
    const editStatusMainTask = useBoardStore((state) => state.editStatusMainTask);
    const mainTask = useBoardStore(selectMainTaskById)(id);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    // const searchParams = useSearchParams();
    // useEffect(() => {
    // const params = new URLSearchParams(searchParams?.toString());
    // params.set('mainTask', mainTask.id.toString());
    // replace(`${pathname}?${params.toString()}`);
    // return () => {
    //     params.delete('mainTask');
    //     replace(`${pathname}?${params.toString()}`);
    // };
    // }, [])

    function setSubTaskComplete(subTaskId: number) {
        const st = mainTask.subTasks.find(subTask => subTask.id === subTaskId)!;
        updateSubTask(subTaskId, !st.isCompleted, undefined)
    }

    function setEditTaskModal() {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('task', mainTask.id.toString());
        params.set('action', ModalState.EditMainTask.toString());
        // window.history.pushState(null, "", `/edit-task?${params.toString()}`)
        replace(`${pathname}?${params.toString()}`);
    }

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
                                <p className="text-k-medium-grey hover:font-bold" onClick={setEditTaskModal}>
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
