// import React, {createContext, useState, useEffect, ReactNode} from 'react';
// import {useQuery, gql, useSuspenseQuery, TypedDocumentNode} from "@apollo/client";
// import {Board} from "@/lib/types/Board";
//
// interface Data {
//     boards: Board[];
// }
//
// interface DataProviderProps {
//     children: ReactNode;
//     initialData?: any;
// }
//
// const GET_BOARDS_QUERY: TypedDocumentNode<Data> = gql`
// query q {
//   boards {
//     id
//     name
//     columns {
//       id
//       name
//       mainTasks {
//         description
//         id
//         status
//         title
//         subTasks {
//           id
//           isCompleted
//           title
//         }
//       }
//     }
//   }
// }
// `
//
// interface BoardsContextType {
//     boards: Board[];
//     setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
// }
//
// const BoardsContext = createContext<BoardsContextType | undefined>(undefined);
//
// const BoardsProvider = ({children}: DataProviderProps) => {
//     // const {data: initialData} = useSuspenseQuery(GET_BOARDS_QUERY, {});
//     const { loading, error, data } = useQuery(GET_BOARDS_QUERY);
//
//     // const {data} = useSuspenseQuery(GET_BOARDS_QUERY, {
//     // });
//     const [boards, setBoards] = useState<Board[]>([]);
//
//     useEffect(() => {
//         console.log(initialData?.boards)
//         setBoards(initialData?.boards);
//     }, [initialData]);
//
//     // Function to update a user
//     // const updateUser = (id, newName) => {
//     //     setBoards((prevUsers) =>
//     //         prevUsers.map((user) => (user.id === id ? { ...user, name: newName } : user))
//     //     );
//     // };
//
//     return (
//         <BoardsContext.Provider value={{boards, setBoards}}>
//             {children}
//         </BoardsContext.Provider>
//     );
// };
//
// export {BoardsContext, BoardsProvider};
