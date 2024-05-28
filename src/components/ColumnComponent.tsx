'use client'
import {Column} from "@/lib/types/Column";
import MainTaskComponent from "@/components/MainTaskComponent";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Result} from "postcss";
import {useSortable} from "@dnd-kit/sortable";

import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import {DndContext} from '@dnd-kit/core';
import {CSS} from "@dnd-kit/utilities";
import {DND_COLUMN_PREFIX, DND_MAINTASK_PREFIX} from "@/lib/Constant";

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle: any = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default function ColumnComponent({column}: { column: Column }) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: `${DND_COLUMN_PREFIX}${column.id}`});


    const onDragEnd = (result) => {
        // dropped outside the list
        console.log(result)
        // if (!result.destination) {
        //     return;
        // }
        //
        // const items = reorder(
        //     this.state.items,
        //     result.source.index,
        //     result.destination.index
        // );
        //
        // this.setState({
        //     items
        // });
    }
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <>
            <div className="touch-manipulation" ref={setNodeRef} style={style} {...attributes} {...listeners}>

                <div>
                    <div>{column.name}</div>
                    <div className="bg-k-medium-grey">
                        <SortableContext
                            items={column.mainTasks.map(m => `${DND_MAINTASK_PREFIX}${m.id}`)}
                            strategy={verticalListSortingStrategy}
                        >
                            {column.mainTasks.map((m) => (
                                <MainTaskComponent key={m.id} mainTask={m}/>
                            ))}
                        </SortableContext>
                    </div>
                </div>
            </div>
        </>
    );
}