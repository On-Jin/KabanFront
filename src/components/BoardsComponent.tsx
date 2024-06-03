'use client'

import {gql, useSuspenseQuery, TypedDocumentNode, useQuery, DocumentNode} from "@apollo/client";
import {Board} from "@/lib/types/Board";
import BoardComponent from "@/components/BoardComponent";
import React, {Suspense, useCallback, useEffect, useState} from "react";
import createApolloClient from "@/lib/ApolloClient";
import {GET_BOARDS_QUERY} from "@/lib/gqlMutation";

export default function BoardsComponent() {
    const [counter, SetCounter] = useState<number>(0);
    const client = createApolloClient();
    const {data, refetch} = useSuspenseQuery(GET_BOARDS_QUERY);

    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        if (data) {
            setBoards(data.boards);
        }
    }, [data]);

    const updateBoard = useCallback(async (updatedBoard?: Board, gql?: DocumentNode) => {
        console.log("updateBoard")
        if (updatedBoard) {
            setBoards(prevBoards => {
                return prevBoards.map(board => (board.id === updatedBoard.id ? updatedBoard : board));
            });
        }

        if (gql != undefined) {
            try {

                const {data} = await client.mutate({mutation: gql});

                const bb: Board = {
                    ...data.patchColumn.board
                };
                if (JSON.stringify(updatedBoard) != JSON.stringify(bb)) {
                    console.log("DIFF");
                }
            } catch (e) {
                console.log(JSON.stringify(e));
            }
        }
    }, []);

    async function refreshData() {
        let ds = data?.boards?.map(b => {
            return client.mutate({
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
            });
        });
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
    }

    return (
        <>
            <div onClick={() => SetCounter(counter + 1)}>click {counter}</div>
            <button onClick={refreshData}>
                Refresh Data
            </button>
            <div className="touch-manipulation w-full grow flex flex-col">
                <Suspense fallback={<div>Loading...</div>}>
                    {boards.length > 0 &&
                        <BoardComponent key={boards[0].id} board={boards[0]} updateBoard={updateBoard}/>}
                </Suspense>
            </div>
        </>
    );
}