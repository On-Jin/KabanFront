'use client'

import {useQuery, gql, useSuspenseQuery, TypedDocumentNode} from "@apollo/client";
import {Board} from "@/lib/types/Board";
import ColumnComponent from "@/components/ColumnComponent";
import BoardComponent from "@/components/BoardComponent";
import {useEffect, useState} from "react";

interface Data {
    boards: Board[];
}

interface Variables {
    id: string;
}

// const GET_DOG_QUERY: TypedDocumentNode<Data, Variables> = gql`
//   query GetDog($id: String) {
//     dog(id: $id) {
//       # By default, an object's cache key is a combination of
//       # its __typename and id fields, so we should always make
//       # sure the id is in the response so our data can be
//       # properly cached.
//       id
//       name
//       breed
//     }
//   }
// `;

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
type BoardComponentProps = {
    board: Board;
    updateBoard: (updatedBoard: Board) => void;
};
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


    return (
        <div>
            Boards <br/>
            {boards.map((board) => (<div key={board.id}>{board.name}</div>))}
            <div>
                <div>
                    {boards.map(b => <BoardComponent key={b.id} board={b} updateBoard={updateBoard}/>)}
                </div>
            </div>
        </div>
    );
}