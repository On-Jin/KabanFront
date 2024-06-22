'use client'
import {Board} from "@/lib/types/Board";
import ColumnComponent from "@/components/ColumnComponent";
import {
    DndContext,
    DragOverEvent, DragOverlay,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier, useSensor,
    useSensors
} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core/dist/types";
import {horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {Column} from "@/lib/types/Column";
import React, {useEffect, useState} from "react";
import {DND_COLUMN_PREFIX, DND_MAINTASK_PREFIX} from "@/lib/Constant";
import MainTaskComponent from "@/components/MainTaskComponent";
import {createPortal} from "react-dom";
import {useBoardStore} from "@/hooks/useStore";
import KProcessing from "@/components/KProcessing";
import clsx from "clsx";

const BoardComponent = React.memo(() => {
        const moveMainTask = useBoardStore((state) => state.moveMainTask);
        const updateBoard = useBoardStore((state) => state.updateBoard);
        const moveColumn = useBoardStore((state) => state.moveColumn);
        const board = useBoardStore((state) => state.board);
        const activeId = useBoardStore((state) => state.activeId);
        const setActiveId = useBoardStore((state) => state.setActiveId);
        const addColumn = useBoardStore((state) => state.addColumn);
        const [isProcessAddColumn, setIsProcessAddColumn] = useState(false);

        console.log("Board invoked");

        useEffect(() => {
            console.log("Board render");
        });

        // const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

        async function addNewColumn() {
            setIsProcessAddColumn(true);
            await addColumn("Column name");
            setIsProcessAddColumn(false);
        }

        const sensors = useSensors(
            useSensor(MouseSensor, {
                activationConstraint: {
                    distance: 8,
                },
            }),
            useSensor(TouchSensor, {
                activationConstraint: {
                    delay: 250,
                    tolerance: 5,
                },
            })
        );

        function handleDragStart({active}: DragEndEvent) {
            console.log("handleDragStart");
            setActiveId(active.id.toString());
        }

        function getIdFromDndString(id: string, prefix: string) {
            if (!id.startsWith(prefix))
                throw `Prefix ${prefix} not found in id ${id}`;
            return parseInt(id.substring(prefix.length));
        }

        function getColumnWithMainTaskDndId(id: string) {
            if (!id.startsWith(DND_MAINTASK_PREFIX))
                return undefined;
            const idToCheck = parseInt(id.substring(DND_MAINTASK_PREFIX.length));
            return board.columns.find(column => column.mainTasks.some(m => m.id === idToCheck));
        }

        function getColumnWithDndId(id: string): Column | undefined {
            if (!id.startsWith(DND_COLUMN_PREFIX))
                return undefined;
            const idToCheck = parseInt(id.substring(DND_COLUMN_PREFIX.length));
            return board.columns.find(c => c.id === idToCheck);
        }


        function handleDragOver({active, over}: DragOverEvent) {
            const overDndId = over?.id.toString();
            const activeDndId = active.id.toString();

            console.log(`handleDragOver active[${activeDndId}] over[${overDndId}]`);
            if (overDndId == null || getColumnWithDndId(activeDndId)) {
                return;
            }

            const activeColumn = getColumnWithMainTaskDndId(activeDndId);
            let overColumn = overDndId.toString().startsWith(DND_MAINTASK_PREFIX) ? getColumnWithMainTaskDndId(overDndId) : getColumnWithDndId(overDndId);


            if (!activeColumn || !overColumn) {
                return;
            }

            if (activeColumn === overColumn) {
                return;
            }
            const activeId = getIdFromDndString(activeDndId, DND_MAINTASK_PREFIX);
            const overId = getIdFromDndString(overDndId, overDndId.toString().startsWith(DND_MAINTASK_PREFIX) ? DND_MAINTASK_PREFIX : DND_COLUMN_PREFIX);
            const activeIndex = activeColumn.mainTasks.findIndex(m => m.id == activeId);
            const overIndex = overColumn.mainTasks.findIndex(m => m.id == overId);

            let newIndex: number;


            if (overIndex != -1) {
                newIndex = overColumn.mainTasks.length + 1;
            } else {
                newIndex = overColumn.mainTasks.length + 1;
            }

            const activeColumnIndex = board.columns.indexOf(activeColumn);
            const overColumnIndex = board.columns.indexOf(overColumn);

            const newBoard = {
                ...board,
                columns: board.columns.map((column, index) => {
                        if (index === activeColumnIndex)
                            return {...column, mainTasks: column.mainTasks.filter(m => m.id !== activeId)};
                        if (index === overColumnIndex) {
                            return {
                                ...column, mainTasks: [
                                    ...overColumn.mainTasks.slice(0, newIndex),
                                    activeColumn.mainTasks[activeIndex],
                                    ...overColumn.mainTasks.slice(
                                        newIndex,
                                        overColumn.mainTasks.length
                                    ),
                                ]
                            };
                        }

                        return column;
                    }
                ),
            };

            updateBoard(newBoard, undefined);
        }

        function handleDragEnd({active, over}: DragEndEvent) {
            console.log("handleDragEnd");
            const activeDndId = active.id.toString();
            const activeColumn = getColumnWithDndId(activeDndId);
            if (activeColumn != null && over?.id) {
                const overDndId = over?.id.toString();

                const overId = getIdFromDndString(overDndId, DND_COLUMN_PREFIX);
                const overIndex = board.columns.findIndex(m => m.id == overId);

                console.log(`Column ${activeColumn.id} [${activeColumn.name}] to index ${overIndex}`)
                moveColumn(activeColumn.id, overIndex);
            } else {
                const activeColumn = getColumnWithMainTaskDndId(activeDndId);

                if (!activeColumn) {
                    setActiveId(null);
                    return;
                }

                if (over == null) {
                    setActiveId(null);
                    return;
                }
                const overDndId = over?.id.toString();
                const overColumn = getColumnWithMainTaskDndId(overDndId);

                if (overColumn == null) {
                    setActiveId(null);
                    return;
                }

                const activeId = getIdFromDndString(activeDndId, DND_MAINTASK_PREFIX);
                const overId = getIdFromDndString(overDndId, DND_MAINTASK_PREFIX);
                const activeIndex = activeColumn.mainTasks.findIndex(m => m.id == activeId);
                const overIndex = overColumn.mainTasks.findIndex(m => m.id == overId);

                if (activeIndex !== overIndex) {
                    moveMainTask(activeIndex, overIndex, overColumn, activeId, true);
                } else {
                    moveMainTask(activeIndex, overIndex, overColumn, activeId, false);
                }
            }
            setActiveId(null);
        }

        function generateActiveDragElement() {
            if (activeId == null)
                return null;

            if (activeId.toString().startsWith(DND_COLUMN_PREFIX)) {
                const column = board.columns.find(c => activeId == `${DND_COLUMN_PREFIX}${c.id}`)!;
                return (
                    <ColumnComponent
                        column={column}
                        mainTaskListIds={column.mainTasks.map(m => `${DND_MAINTASK_PREFIX}${m.id}`)}
                        isDragElement={true}
                    />
                )
                    ;
            } else if (activeId.toString().startsWith(DND_MAINTASK_PREFIX)) {
                const mainTask = board.columns.flatMap(c => c.mainTasks).find(c => activeId == `${DND_MAINTASK_PREFIX}${c.id}`)!;
                return (
                    <MainTaskComponent
                        mainTask={mainTask}
                        isDragElement={true}
                    />
                );
            } else {
                throw new Error(`ActiveId ${activeId} is not an DND_COLUMN or DND_MAINTASK.`);
            }
        }

        const dragElement = generateActiveDragElement();

        return (
            <div className="flex flex-col grow">
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex flex-col overflow-scroll w-full h-full grow px-4">
                        <div className="flex gap-x-6 pb-8 h-max w-max grow">
                            <SortableContext
                                items={board.columns.map(c => `${DND_COLUMN_PREFIX}${c.id}`)}
                                strategy={horizontalListSortingStrategy}
                            >
                                {
                                    board.columns.map(c =>
                                        <ColumnComponent
                                            key={c.id} column={c}
                                            mainTaskListIds={c.mainTasks.map(m => `${DND_MAINTASK_PREFIX}${m.id}`)}
                                            isDragElement={false}
                                        />)
                                }
                            </SortableContext>
                            <div
                                className="shrink-0 grow w-[280px] flex flex-col"
                            >
                                <div>
                                    <p className="pb-6 heading-s text-transparent">
                                        Add column
                                    </p>
                                </div>
                                <div
                                    className="grow bg-gradient-to-r from-[#E9EFFAFF] to-[#E9EFFA80] flex items-center justify-center rounded-lg">
                                    <button
                                        className={clsx("heading-xl text-k-medium-grey hover:enabled:text-k-purple", {
                                            "pointer-events-none": isProcessAddColumn
                                        })}
                                        onClick={addNewColumn}
                                    >
                                        {isProcessAddColumn ? <KProcessing/> : '+ New Column'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {createPortal(
                        <DragOverlay>
                            {dragElement}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>
        );
    })
;

BoardComponent.displayName = 'BoardComponent';

export default BoardComponent;
