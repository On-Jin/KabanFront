'use client'
import {Column} from "@/lib/types/Column";
import MainTaskComponent from "@/components/MainTaskComponent";
import {useSortable} from "@dnd-kit/sortable";
import clsx from 'clsx';

import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import {CSS} from "@dnd-kit/utilities";
import {DND_COLUMN_PREFIX, DND_MAINTASK_PREFIX} from "@/lib/Constant";
import React, {useEffect} from "react";
import {useBoardStore} from "@/hooks/useStore";
import ComponentCircleColor from "@/components/ColumnCircleColor";

const ColumnComponent = React.memo(({column, mainTaskListIds, isDragElement}: {
        column: Column,
        mainTaskListIds: string[],
        isDragElement: boolean
    }) => {
        const activeId = useBoardStore((state) => state.activeId);

        useEffect(() => {
            console.log(`ChildComponent re-rendered ${column.name}`);
            // console.log(JSON.stringify(column));
        }, []);

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
                <div
                    className={clsx("touch-manipulation shrink-0 grow",
                        {
                            "invisible": !isDragElement && `${DND_COLUMN_PREFIX}${column.id}` === activeId
                        }
                    )}
                    ref={setNodeRef}
                    style={style} {...attributes} {...listeners}
                >
                    <div className="">
                        <div className="flex gap-x-3">
                            <ComponentCircleColor columnId={column.id}/>
                            <p className="pb-6 heading-s text-k-medium-grey">
                                {column.name} ({column.mainTasks.length})
                            </p>
                        </div>
                        <div className="space-y-5 w-[280px]">
                            <SortableContext
                                id={`sortable-maintask-c-${column.id}`}
                                items={mainTaskListIds}
                                strategy={verticalListSortingStrategy}
                            >
                                {column.mainTasks.map((m) => (
                                    <MainTaskComponent key={`${DND_MAINTASK_PREFIX}${m.id}`}
                                                       mainTask={m}
                                                       isDragElement={false}/>
                                ))}
                            </SortableContext>
                        </div>
                    </div>
                </div>
            </>
        );
    }
);

// Adding display name to the component for better debugging and avoiding ESLint warning
ColumnComponent.displayName = 'ColumnComponent';

export default ColumnComponent;
