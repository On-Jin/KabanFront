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

export const MOVE_MAINTASK = gql`
    mutation MoveMainTask($id: Int!, $status: String, $order: Int) {
        moveMainTask(input: { id: $id, status: $status, order: $order }) {
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

export function moveMainTask(mainTaskId: number, columnName: string, index?: number) {
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

export const PATCH_SUBTASK = gql`
    mutation PatchSubTask($id: Int!, $isCompleted: Boolean, $title: String) {
        patchSubTask(input: { id: $id, isCompleted: $isCompleted, title: $title }) {
            board {
                id
                name
            }
        }
    }
`;

export const GET_BOARDS_IDS = gql`
    query {
        boards {
            id
            name
        }
    }
`;

export const GET_BOARD_BY_ID_QUERY = gql`
    query GetBoard($id: Int!) {
        board(id: $id) {
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
`;

export const GET_BOARDS_QUERY: TypedDocumentNode<Data> = gql`
    query {
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