import {gql, TypedDocumentNode} from "@apollo/client";
import {Board} from "@/lib/types/Board";

export function moveColumnMutation(columnId: number, index: number) {
    return gql`
                mutation {
                  patchColumn(input: { id: ${columnId}, order: ${index} }) {
                    board {
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
                }
            `;
}

export function moveMainTask(mainTaskId: number, columnName: string, index: number) {
    return gql`
                mutation {
                  moveMainTask(input: { id: ${mainTaskId}, status: "${columnName}" order: ${index} }) {
                    board {
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
                }
            `;
}

interface Data {
    boards: Board[];
}

export const GET_BOARDS_QUERY: TypedDocumentNode<Data> = gql`
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