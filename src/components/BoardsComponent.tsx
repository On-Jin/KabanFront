'use client'

import {useQuery, gql, useSuspenseQuery, TypedDocumentNode} from "@apollo/client";
import {Board} from "@/lib/types/Board";
import ColumnComponent from "@/components/ColumnComponent";
import BoardComponent from "@/components/BoardComponent";

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

export default function BoardsComponent() {
    const {data} = useSuspenseQuery(GET_BOARDS_QUERY, {
        // variables: {id: "1"},
    });
    const dat = data?.boards;
    const b = data.boards[0];

    return (
        <div>
            Boards <br/>
            {data.boards.map((board) => (<div key={board.id}>{board.name}</div>))}
            <div>
                <div>
                    {data?.boards.map(b => <BoardComponent key={b.id} board={b}/>)}
                </div>
            </div>
        </div>
    );
}