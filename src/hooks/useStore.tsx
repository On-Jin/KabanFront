import {create} from 'zustand'
import {Board} from "@/lib/types/Board";
import {DocumentNode} from "@apollo/client";
import createApolloClient from "@/lib/ApolloClient";
import {GET_BOARD_BY_ID_QUERY, MOVE_MAINTASK, moveColumnMutation, moveMainTask, PATCH_SUBTASK} from "@/lib/gqlMutation";
import {arrayMove} from "@/lib/Utils";
import {Column} from "@/lib/types/Column";
import {produce} from "immer";
import {MainTask} from "@/lib/types/MainTask";

interface BoardState {
    board: Board,
    columnNames: string[],
    activeId: string | null,
    isLoading: boolean
}

type BoardAction = {
    updateBoard: (updatedBoard?: BoardState['board'], gql?: DocumentNode) => void,
    moveColumn: (columnId: number, toIndex: number) => void,
    moveMainTask: (fromIndex: number, toIndex: number, targetColumn: Column, mainTaskId: number, updateState: boolean) => void,
    setActiveId: (newActiveId: string | null) => void,
    fetchBoard: (id: number) => Promise<void>,
    updateSubTask: (id: number, isCompleted?: boolean, title?: string) => Promise<void>,
    editStatusMainTask: (id: number, targetColumnName: string) => Promise<void>,
}

const client = createApolloClient();

function generateColumnName(columns: Column[]): string[] {
    return columns.map(c => c.name);
}

export const selectMainTaskById = (state: BoardState) => (id: number) : MainTask => {
    for (const column of state.board.columns) {
        for (const mainTask of column.mainTasks) {
            console.log(`${column.name} -> ${mainTask.id} === ${id}`)
            if (mainTask.id === id) {
                return mainTask;
            }
        }
    }
    throw new Error(`Unable to select MainTask with id ${id}`);
};

export const useBoardStore = create<BoardState & BoardAction>()((set) => ({
    board: {id: 0, name: 'dummy', columns: []},
    columnNames: [],
    activeId: null,
    isLoading: true,
    fetchBoard: async (id: number) => {
        const {data} = await client.query({query: GET_BOARD_BY_ID_QUERY, variables: {id}});
        set((state) => ({
            board: {...data.board},
            columnNames: generateColumnName(data.board.columns),
            isLoading: false
        }));
    },
    setActiveId: (newActiveId: string | null) => set((state) => ({activeId: newActiveId})),

    // patchSubTask: async () => {
    // },
    updateSubTask: async (id: number, isCompleted?: boolean, title?: string) => {
        set(produce((state: BoardState) => {
            state.board.columns.forEach(c => {
                c.mainTasks.forEach(m => {
                    m.subTasks.forEach(s => {
                        if (s.id == id) {
                            if (isCompleted !== undefined) {
                                s.isCompleted = isCompleted;
                            }
                            if (title) {
                                s.title = title;
                            }
                        }
                    });
                });
            });
        }));
        await client.mutate({mutation: PATCH_SUBTASK, variables: {id, isCompleted, title}});
    },
    moveColumn: async (columnId: number, toIndex: number) => {
        // shallow copy
        set((state) => {
            const updatedColumns = [...state.board.columns];
            const fromIndex = updatedColumns.findIndex((column) => column.id === columnId);
            const [column] = updatedColumns.splice(fromIndex, 1);
            updatedColumns.splice(toIndex, 0, column);
            return {
                board: {
                    ...state.board,
                    columns: updatedColumns,
                },
                columnNames: generateColumnName(updatedColumns)
            }
        })
        await client.mutate({mutation: moveColumnMutation(columnId, toIndex)});
    },
    editStatusMainTask: async (id: number, targetColumnName: string) => {
        set(produce((state: BoardState) => {
            state.board.columns.forEach((column) => {
                column.mainTasks = column.mainTasks.filter((task) => {
                    if (task.id === id && targetColumnName != task.status) {
                        task.status = targetColumnName;
                        const targetColumnObj = state.board.columns.find((c) => c.name === targetColumnName);
                        if (targetColumnObj) {
                            targetColumnObj.mainTasks.push(task);
                        }
                        return false;
                    }
                    return true;
                });
            });
        }));
        await client.mutate({mutation: MOVE_MAINTASK, variables: {id, status: targetColumnName}});
    },
    moveMainTask: async (fromIndex: number, toIndex: number, targetColumn: Column, mainTaskId: number, updateState: boolean) => {

        if (updateState) {
            set((state) => {
                const overColumnIndex = state.board.columns.indexOf(targetColumn);
                const updatedColumns: Column[] =
                    state.board.columns.map((column, toColumnIndex): Column => {
                            if (toColumnIndex === overColumnIndex) {
                                return {
                                    ...column, mainTasks: arrayMove(
                                        targetColumn.mainTasks,
                                        fromIndex,
                                        toIndex
                                    ),
                                };
                            }

                            return column;
                        }
                    );

                return {
                    board: {
                        ...state.board,
                        columns: updatedColumns,
                    }
                }
            })
        }
        await client.mutate({mutation: moveMainTask(mainTaskId, targetColumn.name, toIndex)});
    },
    updateBoard: async (updatedBoard?: Board, gql?: DocumentNode) => {
        if (updatedBoard) {
            set((state) => ({
                board: {
                    ...state.board,
                    ...updatedBoard
                },
                columnNames: generateColumnName(updatedBoard.columns)
            }))
        }

        if (gql) {
            console.log('GO');
            try {
                const {data} = await client.mutate({mutation: gql});
                const bb: Board = {...data.patchColumn.board};
                if (JSON.stringify(updatedBoard) !== JSON.stringify(bb)) {
                    console.log('DIFF');
                }
            } catch (e) {
                console.log(JSON.stringify(e));
            }
        }
    }
}))