import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  UUID: { input: any; output: any; }
};

export type AddBoardInput = {
  name: Scalars['String']['input'];
};

export type AddColumnInput = {
  boardId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type AddMainTaskInput = {
  columnId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type AddSubTaskInput = {
  mainTaskId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type AddSubTasksInput = {
  mainTaskId: Scalars['Int']['input'];
  titles: Array<Scalars['String']['input']>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type Author = {
  __typename?: 'Author';
  books: Array<Book>;
  name: Scalars['String']['output'];
};

/** G Description */
export type Board = {
  __typename?: 'Board';
  columns: Array<Column>;
  id: Scalars['Int']['output'];
  /** A name ! */
  name: Scalars['String']['output'];
};

export type BoardDto = {
  __typename?: 'BoardDto';
  columns: Array<ColumnDto>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type BoardPayload = {
  __typename?: 'BoardPayload';
  board: BoardDto;
};

export type BoardsPayload = {
  __typename?: 'BoardsPayload';
  board: Array<Board>;
};

export type Book = {
  __typename?: 'Book';
  title: Scalars['String']['output'];
};

export type Column = {
  __typename?: 'Column';
  id: Scalars['Int']['output'];
  mainTasks: Array<MainTask>;
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

export type ColumnDto = {
  __typename?: 'ColumnDto';
  id: Scalars['Int']['output'];
  mainTasks: Array<MainTaskDto>;
  name: Scalars['String']['output'];
};

export type ColumnPayload = {
  __typename?: 'ColumnPayload';
  column: ColumnDto;
};

export type DeleteBoardInput = {
  id: Scalars['Int']['input'];
};

export type DeleteColumnInput = {
  id: Scalars['Int']['input'];
};

export type DeleteMainTaskInput = {
  id: Scalars['Int']['input'];
};

export type DeleteSubTaskInput = {
  id: Scalars['Int']['input'];
};

export type DeleteSubTasksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type MainTask = {
  __typename?: 'MainTask';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  subTasks: Array<SubTask>;
  title: Scalars['String']['output'];
};

export type MainTaskDto = {
  __typename?: 'MainTaskDto';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  subTasks: Array<SubTaskDto>;
  title: Scalars['String']['output'];
};

export type MainTaskPayload = {
  __typename?: 'MainTaskPayload';
  mainTask: MainTaskDto;
};

export type Me = {
  __typename?: 'Me';
  discordAvatarUrl?: Maybe<Scalars['String']['output']>;
  discordUsername?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
};

export type MoveMainTaskInput = {
  id: Scalars['Int']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBoard: BoardPayload;
  addColumn: ColumnPayload;
  addMainTask: MainTaskPayload;
  addSubTask: MainTaskPayload;
  addSubTasks: MainTaskPayload;
  deleteBoard: BoardPayload;
  deleteColumn: ColumnPayload;
  deleteMainTask: MainTaskPayload;
  deleteSubTask: MainTaskPayload;
  deleteSubTasks: MainTaskPayload;
  moveMainTask: BoardPayload;
  patchBoard: BoardPayload;
  patchColumn: BoardPayload;
  patchMainTask: MainTaskPayload;
  patchSubTask: SubTaskPayload;
  populateMe: BoardsPayload;
};


export type MutationAddBoardArgs = {
  input: AddBoardInput;
};


export type MutationAddColumnArgs = {
  input: AddColumnInput;
};


export type MutationAddMainTaskArgs = {
  input: AddMainTaskInput;
};


export type MutationAddSubTaskArgs = {
  input: AddSubTaskInput;
};


export type MutationAddSubTasksArgs = {
  input: AddSubTasksInput;
};


export type MutationDeleteBoardArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteColumnArgs = {
  input: DeleteColumnInput;
};


export type MutationDeleteMainTaskArgs = {
  input: DeleteMainTaskInput;
};


export type MutationDeleteSubTaskArgs = {
  input: DeleteSubTaskInput;
};


export type MutationDeleteSubTasksArgs = {
  input: DeleteSubTasksInput;
};


export type MutationMoveMainTaskArgs = {
  input: MoveMainTaskInput;
};


export type MutationPatchBoardArgs = {
  input: PatchBoardInput;
};


export type MutationPatchColumnArgs = {
  input: PatchColumnInput;
};


export type MutationPatchMainTaskArgs = {
  input: PatchMainTaskInput;
};


export type MutationPatchSubTaskArgs = {
  input: PatchSubTaskInput;
};


export type MutationPopulateMeArgs = {
  input: AddBoardInput;
};

export type PatchBoardInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PatchColumnInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type PatchMainTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PatchSubTaskInput = {
  id: Scalars['Int']['input'];
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authors: Array<Author>;
  board: BoardDto;
  boards: Array<BoardDto>;
  book: Book;
  bookAuth: Book;
  me: Me;
};


export type QueryBoardArgs = {
  id: Scalars['Int']['input'];
};

export type SubTask = {
  __typename?: 'SubTask';
  id: Scalars['Int']['output'];
  isCompleted: Scalars['Boolean']['output'];
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type SubTaskDto = {
  __typename?: 'SubTaskDto';
  id: Scalars['Int']['output'];
  isCompleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type SubTaskPayload = {
  __typename?: 'SubTaskPayload';
  subTask: SubTaskDto;
};

export type DeleteSubTasksMutationVariables = Exact<{
  input: DeleteSubTasksInput;
}>;


export type DeleteSubTasksMutation = { __typename?: 'Mutation', deleteSubTasks: { __typename?: 'MainTaskPayload', mainTask: { __typename?: 'MainTaskDto', description: string, id: number, status: string, title: string, subTasks: Array<{ __typename?: 'SubTaskDto', id: number, isCompleted: boolean, title: string }> } } };

export type MoveMainTaskMutationVariables = Exact<{
  input: MoveMainTaskInput;
}>;


export type MoveMainTaskMutation = { __typename?: 'Mutation', moveMainTask: { __typename?: 'BoardPayload', board: { __typename?: 'BoardDto', id: number, name: string, columns: Array<{ __typename?: 'ColumnDto', id: number, name: string, mainTasks: Array<{ __typename?: 'MainTaskDto', description: string, id: number, status: string, title: string, subTasks: Array<{ __typename?: 'SubTaskDto', id: number, isCompleted: boolean, title: string }> }> }> } } };


export const DeleteSubTasksDocument = gql`
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
}
    `;
export type DeleteSubTasksMutationFn = Apollo.MutationFunction<DeleteSubTasksMutation, DeleteSubTasksMutationVariables>;

/**
 * __useDeleteSubTasksMutation__
 *
 * To run a mutation, you first call `useDeleteSubTasksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubTasksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubTasksMutation, { data, loading, error }] = useDeleteSubTasksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSubTasksMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubTasksMutation, DeleteSubTasksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubTasksMutation, DeleteSubTasksMutationVariables>(DeleteSubTasksDocument, options);
      }
export type DeleteSubTasksMutationHookResult = ReturnType<typeof useDeleteSubTasksMutation>;
export type DeleteSubTasksMutationResult = Apollo.MutationResult<DeleteSubTasksMutation>;
export type DeleteSubTasksMutationOptions = Apollo.BaseMutationOptions<DeleteSubTasksMutation, DeleteSubTasksMutationVariables>;
export const MoveMainTaskDocument = gql`
    mutation MoveMainTask($input: MoveMainTaskInput!) {
  moveMainTask(input: $input) {
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
export type MoveMainTaskMutationFn = Apollo.MutationFunction<MoveMainTaskMutation, MoveMainTaskMutationVariables>;

/**
 * __useMoveMainTaskMutation__
 *
 * To run a mutation, you first call `useMoveMainTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveMainTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveMainTaskMutation, { data, loading, error }] = useMoveMainTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveMainTaskMutation(baseOptions?: Apollo.MutationHookOptions<MoveMainTaskMutation, MoveMainTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveMainTaskMutation, MoveMainTaskMutationVariables>(MoveMainTaskDocument, options);
      }
export type MoveMainTaskMutationHookResult = ReturnType<typeof useMoveMainTaskMutation>;
export type MoveMainTaskMutationResult = Apollo.MutationResult<MoveMainTaskMutation>;
export type MoveMainTaskMutationOptions = Apollo.BaseMutationOptions<MoveMainTaskMutation, MoveMainTaskMutationVariables>;