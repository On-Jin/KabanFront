import {MainTask} from "@/lib/types/MainTask";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {DND_COLUMN_PREFIX, DND_MAINTASK_PREFIX} from "@/lib/Constant";
import clsx from "clsx";

export default function MainTaskComponent({mainTask, activeId}: { mainTask: MainTask, activeId?: string }) {
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
                    "invisible": `${DND_MAINTASK_PREFIX}${mainTask.id}` === activeId
                }
            )}

            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div>
                <p className="heading-m">
                    {mainTask.title}
                </p>
                <p className="body-m text-k-medium-grey">
                    0 of 3 substasks [{mainTask.id}]
                </p>
            </div>
        </div>
    );
}