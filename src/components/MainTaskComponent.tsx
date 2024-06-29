import {MainTask} from "@/lib/types/MainTask";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {DND_MAINTASK_PREFIX} from "@/lib/Constant";
import clsx from "clsx";
import {useBoardStore} from "@/hooks/useStore";
import useSetUrl from "@/hooks/useSetUrl";

export default function MainTaskComponent({mainTask, isDragElement}: {
    mainTask: MainTask,
    isDragElement: boolean
}) {

    const {setViewMainTaskUrl} = useSetUrl();

    const activeId = useBoardStore((state) => state.activeId);

    const handleOpenModal = function () {
        setViewMainTaskUrl(mainTask.id);
    };

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: `${DND_MAINTASK_PREFIX}${mainTask.id}`,

    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };


    return (
        <div
            className={clsx("touch-manipulation \
                        w-[280px] px-4 py-[1.4rem] space-y-2 \
                        bg-white dark:bg-k-dark-grey  \
                        drop-shadow-[0_4px_6px_#364E7E0A] \
                        rounded-md \
                        ",
                {
                    "invisible": !isDragElement && `${DND_MAINTASK_PREFIX}${mainTask.id}` === activeId
                }
            )}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => {
                handleOpenModal();
            }}
        >
            <div>
                <p className="heading-m">
                    {mainTask.title}
                </p>
                <p className="body-m text-k-medium-grey">
                    {mainTask.subTasks.filter(s => s.isCompleted).length} of {mainTask.subTasks.length} substasks
                </p>
            </div>
        </div>
    );
}
