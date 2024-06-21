import {gql, TypedDocumentNode} from "@apollo/client";
import {Board} from "@/lib/types/Board";


export const DELETE_SUBTASKS = gql`
    mutation DeleteSubTasks($input: DeleteSubTasksInput!) {
        deleteSubTasks(input: $input) {
            mainTask {
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
    }`;

export const ADD_MAINTASK = gql`
    mutation AddMainTask($input: AddMainTaskInput!) {
        addMainTask(input: $input) {
            mainTask {
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
    }`;

export const ADD_SUBTASKS = gql`
    mutation AddSubTasks($input: AddSubTasksInput!) {
        addSubTasks(input: $input) {
            mainTask {
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
    }`;

export const PATCH_MAINTASK = gql`
    mutation PatchMainTask($input: PatchMainTaskInput!) {
        patchMainTask(input: $input) {
            mainTask {
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
    }`;

export const UPDATE_MAINTASK = gql`
    mutation UpdateMainTask(
        $inputDeleteSubTasks: DeleteSubTasksInput!,
        $inputAddSubTasks: AddSubTasksInput!,
        $inputPatchMainTask: PatchMainTaskInput!) {
        deleteSubTasks(input: $inputDeleteSubTasks) {
            mainTask {
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

        addSubTasks(input: $inputAddSubTasks) {
            mainTask {
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

        patchMainTask(input: $inputPatchMainTask) {
            mainTask {
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
`;

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

export const DELETE_MAINTASK = gql`
    mutation DeleteMaiNTask($id: Int!) {
        deleteMainTask(input: { id: $id }) {
            mainTask {
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
`;

export const PATCH_SUBTASK = gql`
    mutation PatchSubTask($id: Int!, $isCompleted: Boolean, $title: String) {
        patchSubTask(input: { id: $id, isCompleted: $isCompleted, title: $title }) {
            subTask {
                id
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
