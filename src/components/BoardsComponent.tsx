'use client'

import {gql, useSuspenseQuery, TypedDocumentNode} from "@apollo/client";
import {Board} from "@/lib/types/Board";
import BoardComponent from "@/components/BoardComponent";
import {Suspense, useEffect, useState} from "react";
import {closestCenter, closestCorners, DndContext} from "@dnd-kit/core";
import {
    horizontalListSortingStrategy,
    SortableContext, useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {DND_BOARD_PREFIX, DND_COLUMN_PREFIX, DND_MAINTASK_PREFIX} from "@/lib/Constant";
import ColumnComponent from "@/components/ColumnComponent";
import MainTaskComponent from "@/components/MainTaskComponent";
import {CSS} from "@dnd-kit/utilities";

interface Data {
    boards: Board[];
}

interface Variables {
    id: string;
}

const GET_BOARDS_QUERY: TypedDocumentNode<Data> = gql`
query q {
  boards {
    id
    name
    columns {
      id
      name
      mainTasks {
        description
        id
        status
        title
        subTasks {
          id
          isCompleted
          title
        }
      }
    }
  }
}
`
export default function BoardsComponent() {
    const {data} = useSuspenseQuery(GET_BOARDS_QUERY, {
        // variables: {id: "1"},
    });

    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        if (data) {
            setBoards(data.boards);
        }
    }, [data]);

    const updateBoard = (updatedBoard: Board) => {
        console.log("updateBoard")
        setBoards(prevBoards => {
            const newBoards = prevBoards.map(board => (board.id === updatedBoard.id ? updatedBoard : board));
            console.log('Updated boards:', newBoards);
            return newBoards;
        });
    };

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: `${DND_BOARD_PREFIX}`,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };
    return (
        <div className="touch-manipulation w-full grow flex flex-col
                        ">
            <Suspense fallback={<div>Loading...</div>}>
                {boards.length > 0 && <BoardComponent key={boards[0].id} board={boards[0]} updateBoard={updateBoard}/>}
            </Suspense>
        </div>
    );
}