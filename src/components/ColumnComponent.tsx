'use client'
import {Column} from "@/lib/types/Column";
import MainTaskComponent from "@/components/MainTaskComponent";
import {AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable} from "@dnd-kit/sortable";

import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import {CSS} from "@dnd-kit/utilities";
import {DND_COLUMN_PREFIX, DND_MAINTASK_PREFIX} from "@/lib/Constant";

export default function ColumnComponent({column, mainTaskListIds}: { column: Column, mainTaskListIds: string[] }) {
    const animateLayoutChanges: AnimateLayoutChanges = (args) =>
        defaultAnimateLayoutChanges({...args, wasDragging: true});

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: `${DND_COLUMN_PREFIX}${column.id}`,
    });


    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <>
            <div className="touch-manipulation shrink-0 h-full"
                 ref={setNodeRef}
                 style={style} {...attributes} {...listeners}
            >
                <div className="">
                    <div className="flex gap-x-3">
                        <div className="w-[15px] h-[15px] bg-[#49C4E5] rounded-full"></div>
                        <p className="pb-6 heading-s text-k-medium-grey">
                            {column.name} ({column.mainTasks.length})
                        </p>
                    </div>
                    <div className="space-y-5">
                        <SortableContext
                            id={`sortable-maintask-c-${column.id}`}
                            // items={column.mainTasks.map(m => `${DND_MAINTASK_PREFIX}${m.id}`)}
                            items={mainTaskListIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {column.mainTasks.map((m) => (
                                <MainTaskComponent key={`${DND_MAINTASK_PREFIX}${m.id}`} mainTask={m}/>
                            ))}
                        </SortableContext>
                    </div>
                </div>
            </div>
        </>
    );
}