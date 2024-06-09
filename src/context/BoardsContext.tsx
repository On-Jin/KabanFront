import React, {createContext, useContext, useState, useEffect, useCallback, useReducer, Dispatch} from 'react';
import {gql, useQuery, DocumentNode, useLazyQuery} from '@apollo/client';
import {Board} from '@/lib/types/Board';
import createApolloClient from '@/lib/ApolloClient';
import {GET_BOARD_BY_ID_QUERY, GET_BOARDS_IDS, GET_BOARDS_QUERY} from '@/lib/gqlMutation';

interface BoardInfoData {
    id: number,
    name: string,
}

interface BoardsContextProps {
    board: Board | null;
    columnNames: string[];
    boardIds: BoardInfoData[] | null;
    updateBoard: (updatedBoard?: Board, gql?: DocumentNode) => Promise<void>;
    updateSubTask: (subTaskId: number, subTaskIsComplete?: boolean, subTaskTitle?: string) => Promise<void>;
    refreshData: () => Promise<void>;
    selectBoard: (id: number) => void;
}

const BoardsContext = createContext<BoardsContextProps | undefined>(undefined);

export const useBoards = () => {
    const context = useContext(BoardsContext);
    if (!context) {
        throw new Error('useBoards must be used within a BoardsProvider');
    }
    return context;
};

export const BoardsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const client = createApolloClient();
    const [boardIds, setBoardIds] = useState<BoardInfoData[] | null>(null);
    const {data: boardIdsData, refetch} = useQuery(GET_BOARDS_IDS);
    const [getBoardById, {data: boardData}] = useLazyQuery(GET_BOARD_BY_ID_QUERY);
    const [board, setBoard] = useState<Board | null>(null);
    const [columnNames, setColumnNames] = useState<string[]>([]);

    const selectBoard = useCallback((id: number) => {
        getBoardById({variables: {id}});
    }, [getBoardById]);

    useEffect(() => {
        if (board) {
            setColumnNames(board.columns.map(c => c.name));
        }
    }, [board]);


    useEffect(() => {
        if (boardIdsData) {
            setBoardIds(boardIdsData.boards);
        }
    }, [boardIdsData]);

    useEffect(() => {
        if (boardData) {
            setBoard(boardData.board)
        }
    }, [boardData]);


    const updateSubTask = useCallback(async (subTaskId: number, subTaskIsComplete?: boolean, subTaskTitle?: string) => {
        try {
            await client.mutate({
                mutation: gql`
                    mutation PatchSubTask($id: Int!, $isCompleted: Boolean, $title: String){
                        patchSubTask(input: { id: $id, isCompleted: $isCompleted, title: $title }) {
                            board {
                                id
                                name
                            }
                        }
                    }
                `,
                variables: {
                    id: subTaskId,
                    isCompleted: subTaskIsComplete,
                    title: subTaskTitle,
                },
                errorPolicy: "all"
            });
        } catch (e) {
            console.log(JSON.stringify(e));
        }

    }, []);

    const updateBoard = useCallback(async (updatedBoard?: Board, gql?: DocumentNode) => {
        if (updatedBoard) {
            setBoard(updatedBoard);
        }

        if (gql) {
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
    }, []);

    const refreshData = useCallback(async () => {
        const ds = boardIds?.map(b =>
            client.mutate({
                mutation: gql`
                    mutation M {
                        deleteBoard(input: { id: ${b.id} }) {
                            board {
                                id
                                name
                            }
                        }
                    }
                `,
            }),
        )!;
        await Promise.all(ds);
        await client.mutate({
            mutation: gql`
                mutation M {
                    populateMe(input: { name: "Populate me" }) {
                        board {
                            id
                            name
                        }
                    }
                }
            `,
        });
        await refetch();
    }, [boardIds, refetch]);

    return (
        <BoardsContext.Provider
            value={{board, columnNames, boardIds, updateBoard, refreshData, updateSubTask, selectBoard}}>
            {children}
        </BoardsContext.Provider>
    );
};