import {Board} from "@/lib/types/Board";
import MainTaskComponent from "@/components/MainTaskComponent";
import ColumnComponent from "@/components/ColumnComponent";
import {DndContext, DragOverEvent, UniqueIdentifier} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core/dist/types";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {Column} from "@/lib/types/Column";
import {useContext, useState} from "react";
import {DND_BOARD_PREFIX, DND_COLUMN_PREFIX, DND_MAINTASK_PREFIX} from "@/lib/Constant";
import {MainTask} from "@/lib/types/MainTask";
import {
    ReactServerDOMTurbopackServerNode
} from "next/dist/server/future/route-modules/app-page/vendored/rsc/entrypoints";
import {arrayMove} from "@/lib/Utils";

export default function BoardComponent({board, updateBoard}: {
    board: Board,
    updateBoard: (updatedBoard: Board) => void
}) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const handleUpdate = () => {
        // Simulate an update to the board
        const updatedBoard: Board = {...board, name: board.name + ' updated 4x'};
        updateBoard(updatedBoard);
    };

    function handleDragStart({active}: DragEndEvent) {
        console.log("handleDragStart");
        setActiveId(active.id);
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

    function getMainTaskWithDndId(id: string): MainTask | undefined {
        if (!id.startsWith(DND_MAINTASK_PREFIX))
            return undefined;
        const idToCheck = parseInt(id.substring(DND_MAINTASK_PREFIX.length));
        return board.columns.flatMap(column => column.mainTasks)
            .find(mainTask => mainTask.id === idToCheck);
    }


    function handleDragOver({active, over}: DragOverEvent) {
        const overDndId = over?.id.toString();
        const activeDndId = active.id.toString();

        console.log(`handleDragOver active[${activeDndId}] over[${overDndId}]`);
        if (overDndId == null || getColumnWithDndId(activeDndId)) {
            return;
        }

        const activeColumn = getColumnWithMainTaskDndId(activeDndId);
        const overColumn = getColumnWithMainTaskDndId(overDndId);

        if (!activeColumn || !overColumn) {
            return;
        }

        if (activeColumn === overColumn) {
            return;
        }
        const activeId = getIdFromDndString(activeDndId, DND_MAINTASK_PREFIX);
        const overId = getIdFromDndString(overDndId, DND_MAINTASK_PREFIX);
        const activeIndex = activeColumn.mainTasks.findIndex(m => m.id == activeId);
        const overIndex = overColumn.mainTasks.findIndex(m => m.id == overId);

        let newIndex: number;


        if (overIndex != -1) {
            newIndex = overColumn.mainTasks.length + 1;
        } else {
            const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                over.rect.top + over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0;

            newIndex =
                overIndex >= 0 ? overIndex + modifier : overColumn.mainTasks.length + 1;
        }

        // recentlyMovedToNewContainer.current = true;
        // var newOverColumnMainTasks = [
        //     ...overColumn.mainTasks.slice(0, newIndex),
        //     activeColumn.mainTasks[activeIndex],
        //     ...overColumn.mainTasks.slice(
        //         newIndex,
        //         overColumn.mainTasks.length
        //     ),
        // ];
        //
        // overColumn.mainTasks = newOverColumnMainTasks;

        const activeColumnIndex = board.columns.indexOf(activeColumn);
        const overColumnIndex = board.columns.indexOf(overColumn);

        const nB = {
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


        // activeColumn.mainTasks.filter(m => m.id !== activeId)

        updateBoard(nB);
    }

    function handleDragEnd({active, over}: DragEndEvent) {
        console.log("handleDragEnd");
        console.log(`${active.id} ${over?.id}`)
        const activeDndId = active.id.toString();
        const activeColumn = getColumnWithDndId(activeDndId);
        if (activeColumn != null && over?.id) {
            const overDndId = over?.id.toString();
            const overColumn = getColumnWithDndId(overDndId)!;

            const activeId = getIdFromDndString(activeDndId, DND_COLUMN_PREFIX);
            const overId = getIdFromDndString(overDndId, DND_COLUMN_PREFIX);
            const activeIndex = board.columns.findIndex(m => m.id == activeId);
            const overIndex = board.columns.findIndex(m => m.id == overId);

            const nB = {
                ...board,
                columns: arrayMove(board.columns, activeIndex, overIndex)
            };
            updateBoard(nB);
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
                // setItems((items) => ({
                //     ...items,
                //     [overContainer]: arrayMove(
                //         items[overContainer],
                //         activeIndex,
                //         overIndex
                //     ),
                // }));

                const overColumnIndex = board.columns.indexOf(overColumn);

                const nB = {
                    ...board,
                    columns: board.columns.map((column, index) => {
                            if (index === overColumnIndex) {
                                return {
                                    ...column, mainTasks: arrayMove(
                                        overColumn.mainTasks,
                                        activeIndex,
                                        overIndex
                                    ),
                                };
                            }

                            return column;
                        }
                    ),
                };
                updateBoard(nB);
            }
        }
        setActiveId(null);
    }

    return (
        <div>
            <div>{board.name}</div>
            <button onClick={handleUpdate}>Update Board</button>
            <div>
                <DndContext
                    // sensors={sensors}
                    // collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={board.columns.map(c => `${DND_COLUMN_PREFIX}${c.id}`)}
                        strategy={verticalListSortingStrategy}
                    >

                        {board.columns.map(c => <ColumnComponent key={c.id} column={c}/>)}
                    </SortableContext>


                </DndContext>
            </div>
        </div>
    );
}