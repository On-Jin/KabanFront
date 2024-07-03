import {create} from 'zustand'
import {Board} from "@/lib/types/Board";
import {DocumentNode, FetchResult} from "@apollo/client";
import createApolloClient from "@/lib/ApolloClient";
import {
    ADD_BOARD,
    ADD_COLUMN,
    ADD_MAINTASK,
    ADD_SUBTASKS, DELETE_BOARD, DELETE_COLUMN, DELETE_MAINTASK,
    DELETE_SUBTASKS,
    GET_BOARD_BY_ID_QUERY,
    GET_BOARDS_IDS,
    MOVE_MAINTASK,
    moveColumnMutation,
    moveMainTask, PATCH_BOARD, PATCH_COLUMN, PATCH_MAINTASK,
    PATCH_SUBTASK, POPULATE_ME, UPDATE_MAINTASK
} from "@/lib/gqlMutation";
import {arrayMove} from "@/lib/Utils";
import {Column} from "@/lib/types/Column";
import {produce} from "immer";
import {MainTask} from "@/lib/types/MainTask";
import {useRouter} from "next/navigation";
import {InputColumn} from "@/lib/forms/InputColumn";

interface BoardInfoData {
    id: number,
    name: string,
}

interface BoardState {
    boardIds: BoardInfoData[] | null
    board: Board,
    columnNames: string[],
    activeId: string | null,
    isLoading: boolean,
    isMenuOpen: boolean
}

type BoardAction = {
    selectMainTaskById: (id: number) => MainTask,
    updateBoard: (updatedBoard?: BoardState['board'], gql?: DocumentNode) => void,
    moveColumn: (columnId: number, toIndex: number) => void,
    moveMainTask: (fromIndex: number, toIndex: number, targetColumn: Column, mainTaskId: number, updateState: boolean) => void,
    setActiveId: (newActiveId: string | null) => void,
    fetchBoard: (id: number) => Promise<void>,
    updateSubTask: (id: number, isCompleted?: boolean, title?: string) => Promise<void>,
    editStatusMainTask: (id: number, targetColumnName: string) => Promise<void>,
    fetchIds: () => Promise<void>,
    editMainTask: (id: number, title?: string, description?: string, status?: string, deletedSubTaskIds?: number[], addedSubTaskTitles?: string[]) => Promise<void>,
    addMainTask: (title: string, description?: string, status?: string, subTaskTitles?: string[]) => Promise<void>,
    deleteMainTask: (id: number) => Promise<void>,
    deleteBoard: (id: number) => Promise<number | null>,
    addColumn: (title: string) => Promise<void>,
    addBoard: (name: string, columnNames: string[]) => Promise<number>,
    patchBoard: (boardId: number, name: string, deletedColumnIds: number[], updatedColumnNames: InputColumn[]) => Promise<void>,
    populateMe: () => Promise<number[]>,
    setIsMenuOpen: (isOpen: boolean) => void,
}

const client = createApolloClient();

function generateColumnName(columns: Column[]): string[] {
    return columns.map(c => c.name);
}

const dummyBoard: Board = {id: 0, name: 'dummy', columns: []};

export const useBoardStore = create<BoardState & BoardAction>()((set, get) => ({
    boardIds: null,
    board: dummyBoard,
    columnNames: [],
    activeId: null,
    isLoading: true,
    isMenuOpen: false,
    setIsMenuOpen: (isOpen: boolean) => {
        console.log("setIsMenuOpen call")
        set(produce((state: BoardState) => {
            state.isMenuOpen = isOpen;
        }));
    },
    selectMainTaskById: (id: number): MainTask => {
        const {board} = get();

        for (const column of board.columns) {
            for (const mainTask of column.mainTasks) {
                if (mainTask.id === id) {
                    return mainTask;
                }
            }
        }
        throw new Error(`Unable to select MainTask with id ${id}`);
    },
    fetchIds: async () => {
        const {data} = await client.query({query: GET_BOARDS_IDS});
        set((state) => ({
            boardIds: data.boards.map((b: Board): BoardInfoData => {
                return {id: b.id, name: b.name}
            })
        }));
    },
    fetchBoard: async (id: number) => {
        console.log("fetchboard")
        const {data} = await client.query({query: GET_BOARD_BY_ID_QUERY, variables: {id}})
        set((state) => ({
            board: {...data.board},
            columnNames: generateColumnName(data.board.columns),
            isLoading: false
        }));
    },
    setActiveId: (newActiveId: string | null) => set((state) => ({activeId: newActiveId})),
    deleteBoard: async (id: number) => {
        try {
            await new Promise(f => setTimeout(f, 2000));
            const {data} = await client.mutate({mutation: DELETE_BOARD, variables: {id},});
            const deletedBoardId = data.deleteBoard.board.id;
            console.log(deletedBoardId);
            let {boardIds, fetchBoard} = get();
            boardIds = boardIds!.filter((b => b.id !== deletedBoardId));

            if (boardIds.length !== 0) {
                await fetchBoard(boardIds[0].id);
                set(produce((state: BoardState) => {
                    state.boardIds = state.boardIds!.filter((b => b.id !== deletedBoardId));
                }));
                return boardIds[0].id;
            }
            set(produce((state: BoardState) => {
                state.boardIds = state.boardIds!.filter((b => b.id !== deletedBoardId));
                state.board = dummyBoard;
            }));
            return null;
        } catch (e) {
            console.error(JSON.stringify(e))
            return null;
        }
    },
    deleteMainTask: async (id: number) => {
        try {
            await new Promise(f => setTimeout(f, 2000));
            await client.mutate({mutation: DELETE_MAINTASK, variables: {id},});
        } catch (e) {
            console.error(JSON.stringify(e))
        }
    },
    patchBoard: async (boardId: number, name: string, deletedColumnIds: number[], updatedColumnNames: InputColumn[]) => {
        let promises: Promise<FetchResult<any>>[] = [];
        promises = promises.concat(updatedColumnNames.map(c => {
            if (c.isNew) {
                console.log("ADD_COLUMN")
                return client.mutate({
                    mutation: ADD_COLUMN, variables: {input: {boardId: boardId, name: c.name}},
                });
            }
            console.log("PATCH_COLUMN")
            return client.mutate({
                mutation: PATCH_COLUMN, variables: {input: {id: c.id, name: c.name}},
            });
        }));


        promises = promises.concat(deletedColumnIds.map(columnId => {
            console.log("DELETE_COLUMN")
            return client.mutate({
                mutation: DELETE_COLUMN, variables: {input: {id: columnId}},
            });
        }));

        console.log(promises.length);

        await Promise.all(promises);

        const {data} = await client.mutate({
            mutation: PATCH_BOARD, variables: {input: {id: boardId, name: name}},
        });

        set(produce((state: BoardState) => {
            state.board = data.patchBoard.board
        }));
    },
    populateMe: async () => {
        const {data} = await client.mutate({
            mutation: POPULATE_ME,
        });

        const boards = data.populateMe.boards;

        set((state) => ({
            boardIds: boards.map((b: Board): BoardInfoData => {
                return {id: b.id, name: b.name}
            })
        }));
        return boards.map((b: Board) => b.id);
    },
    addBoard: async (name: string, columnNames: string[]) => {
        const {data} = await client.mutate({
            mutation: ADD_BOARD, variables: {
                input: {
                    name,
                    columnNames
                }
            },
        });
        const newBoard = data.addBoard.board as Board;
        set(produce((state: BoardState) => {
            state.boardIds?.push({id: newBoard.id, name: newBoard.name});
        }));
        return newBoard.id;
    },
    addColumn: async (name: string) => {
        const {board} = get();

        const {data, errors} = await client.mutate({
            mutation: ADD_COLUMN, variables: {
                input: {
                    boardId: board.id,
                    name
                }
            },
        });
        set(produce((state: BoardState) => {
            state.board.columns.push(data.addColumn.column);
            state.columnNames = generateColumnName(state.board.columns)
        }));
    },
    addMainTask: async (title: string, description?: string, status?: string, subTaskTitles?: string[]) => {
        const {board} = get();

        const column = board.columns.find(c => c.name === status);

        if (!column) {
            throw new Error(`AddMainTask : Status (column name) ${status} does not exist.`)
        }

        const {data} = await client.mutate({
            mutation: ADD_MAINTASK, variables: {
                input: {
                    columnId: column.id,
                    description: description,
                    title: title,
                    subTaskTitles
                }
            },
        });
        // TODO
    },
    editMainTask: async (id: number, title?: string, description?: string, status?: string, deletedSubTaskIds?: number[], addedSubTaskTitles?: string[]) => {
        const inputDeleteSubTasks = {
            ids: deletedSubTaskIds != null ? deletedSubTaskIds : [],
        };
        const inputAddSubTasks = {
            mainTaskId: id,
            titles: addedSubTaskTitles != null ? addedSubTaskTitles : []
        };

        let inputPatchMainTask = null;
        if (title != null || description != null)
            inputPatchMainTask = {id, title, description}

        if (inputDeleteSubTasks.ids.length > 0) {
            await client.mutate({
                mutation: DELETE_SUBTASKS, variables: {input: inputDeleteSubTasks},
            });
        }
        if (inputAddSubTasks.titles.length > 0) {
            await client.mutate({
                mutation: ADD_SUBTASKS, variables: {input: inputAddSubTasks},
            });
        }
        await client.mutate({
            mutation: PATCH_MAINTASK, variables: {input: inputPatchMainTask},
        });
        if (status != null) {
            await client.mutate({
                mutation: MOVE_MAINTASK, variables: {id, status: status},
            });
        }

    },
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
        await client.mutate({
            mutation: PATCH_SUBTASK,
            variables: {id, isCompleted, title}
        })
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.log(JSON.stringify(error)));
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
            try {
                const {data} = await client.mutate({mutation: gql});
                const bb: Board = {...data.patchColumn.board};
                if (JSON.stringify(updatedBoard) !== JSON.stringify(bb)) {
                }
            } catch (e) {
                console.log(JSON.stringify(e));
            }
        }
    }
}))
