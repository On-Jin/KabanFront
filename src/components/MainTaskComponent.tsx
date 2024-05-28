import {Column} from "@/lib/types/Column";
import {MainTask} from "@/lib/types/MainTask";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {DND_MAINTASK_PREFIX} from "@/lib/Constant";

export default function MainTaskComponent({mainTask}: { mainTask: MainTask; }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: `${DND_MAINTASK_PREFIX}${mainTask.id}`});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        filter: "drop-shadow(0px 4px 6px #364E7E0A)"
    };


    return (
        <div className="touch-manipulation
                        w-[280px] px-4 py-[1.4rem] space-y-2
                        bg-white dark:bg-k-dark-grey 
                        drop-shadow-[0_4px_6px_#364E7E0A]
                        rounded-md
                        "
             ref={setNodeRef}
             style={style}
             {...attributes}
             {...listeners}>
            <p className="heading-m">
                {mainTask.title}
            </p>
            <p className="body-m text-k-medium-grey">
                0 of 3 substasks
            </p>
        </div>
    );
}