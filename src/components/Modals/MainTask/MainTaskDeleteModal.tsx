import {useBoardStore} from "@/hooks/useStore";
import KButton, {KButtonSize, KButtonType} from "@/components/K/KButton";
import {useState} from "react";
import {MainTask} from "@/lib/types/MainTask";
import KProcessing from "@/components/K/KProcessing";
import usePointerEvents from "@/hooks/usePointerEvents";
import clsx from "clsx";

export default function MainTaskDeleteModal({mainTask, onClose}: {
    mainTask: MainTask,
    onClose: () => void
}) {
    const [isProcess, setIsProcess] = useState(false);
    const deleteMainTask = useBoardStore((state) => state.deleteMainTask);
    usePointerEvents(isProcess);
    usePointerEvents(isProcess);

    async function deleteMainTaskHandler() {
        setIsProcess(true);
        await deleteMainTask(mainTask.id);
        onClose();
        setIsProcess(false);
    }


    return (
        <>
            <div
                className={clsx("space-y-6", {"opacity-50": isProcess})}
            >
                <p className="text-k-red heading-l">Delete this task?</p>
                <p className="body-l text-k-medium-grey">
                    Are you sure you want to delete the ‘{mainTask.title}’ task and its subtasks?
                    This action cannot be reversed.
                </p>
                <div className="space-y-6 md:space-y-0 md:flex md:space-x-4">
                    <KButton
                        disabled={isProcess}
                        onClick={deleteMainTaskHandler}
                        buttonSize={KButtonSize.Small}
                        buttonType={KButtonType.Destructive}
                    >
                        {isProcess ? <KProcessing/> : 'Delete'}
                    </KButton>
                    <KButton
                        disabled={isProcess}
                        onClick={onClose}
                        buttonSize={KButtonSize.Small}
                        buttonType={KButtonType.Secondary}
                    >
                        Cancel
                    </KButton>
                </div>
            </div>
        </>
    );
}
