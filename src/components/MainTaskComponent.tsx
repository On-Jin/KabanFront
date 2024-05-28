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
    };


    return (
        <>
            <div className="touch-manipulation" ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {mainTask.title}
            </div>
        </>
    );
}