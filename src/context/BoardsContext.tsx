import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {gql, useQuery, DocumentNode} from '@apollo/client';
import {Board} from '@/lib/types/Board';
import createApolloClient from '@/lib/ApolloClient';
import {GET_BOARDS_QUERY} from '@/lib/gqlMutation';

interface BoardsContextProps {
    boards: Board[];
    updateBoard: (updatedBoard?: Board, gql?: DocumentNode) => Promise<void>;
    updateSubTask: (subTaskId: number, subTaskIsComplete?: boolean, subTaskTitle?: string) => Promise<void>;
    refreshData: () => Promise<void>;
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
    const {data, refetch} = useQuery(GET_BOARDS_QUERY);
    const [boards, setBoards] = useState<Board[]>([]);


    useEffect(() => {
        if (data) {
            setBoards(data.boards);
        }
    }, [data]);

    const updateSubTask = useCallback(async (subTaskId: number, subTaskIsComplete?: boolean, subTaskTitle?: string) => {
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

    }, []);

    // const updateMainTask = useCallback(async (variables: any) => {
    //     await client.mutate({
    //         mutation: gql`
    //             mutation PatchSubTask($id: Int!, $isCompleted: Boolean, $title: String){
    //                 moveSubTask(input: { id: $id, isCompleted: $isCompleted, title: $title }) {
    //                     board {
    //                         id
    //                         name
    //                     }
    //                 }
    //             }
    //         `,
    //         variables,
    //         errorPolicy: "all"
    //     });
    //
    // }, []);
    
    const updateBoard = useCallback(async (updatedBoard?: Board, gql?: DocumentNode) => {
        if (updatedBoard) {
            setBoards(prevBoards => prevBoards.map(board => (board.id === updatedBoard.id ? updatedBoard : board)));
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
        const ds = data?.boards?.map(b =>
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
    }, [data, refetch]);

    return (
        <BoardsContext.Provider value={{boards, updateBoard, refreshData, updateSubTask}}>
            {children}
        </BoardsContext.Provider>
    );
};