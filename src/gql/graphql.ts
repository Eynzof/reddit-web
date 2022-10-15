/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Author = {
  __typename?: "Author";
  books: Array<Book>;
  born?: Maybe<Scalars["DateTime"]>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  favouriteBook?: Maybe<Book>;
  id: Scalars["ID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type AuthorValidator = {
  born?: InputMaybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  name: Scalars["String"];
};

export type Book = {
  __typename?: "Book";
  author: Author;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  publisher?: Maybe<Publisher>;
  tags: Array<Tag>;
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type BookValidator = {
  title: Scalars["String"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addAuthor: Author;
  addBook: Book;
  createPost: Post;
  deleteAuthor: Scalars["Boolean"];
  deleteBook: Scalars["Boolean"];
  deletePost: Scalars["Boolean"];
  login: UserResponse;
  register: UserResponse;
  updateAuthor: Author;
  updateBook: Book;
  updatePost?: Maybe<Post>;
};

export type MutationAddAuthorArgs = {
  input: AuthorValidator;
};

export type MutationAddBookArgs = {
  authorId: Scalars["String"];
  input: BookValidator;
  publisherId?: InputMaybe<Scalars["String"]>;
};

export type MutationCreatePostArgs = {
  title: Scalars["String"];
};

export type MutationDeleteAuthorArgs = {
  id: Scalars["String"];
};

export type MutationDeleteBookArgs = {
  id: Scalars["String"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Float"];
};

export type MutationLoginArgs = {
  options: UsernamepasswordingInput;
};

export type MutationRegisterArgs = {
  options: UsernamepasswordingInput;
};

export type MutationUpdateAuthorArgs = {
  id: Scalars["String"];
  input: AuthorValidator;
};

export type MutationUpdateBookArgs = {
  id: Scalars["String"];
  input: BookValidator;
};

export type MutationUpdatePostArgs = {
  id: Scalars["Float"];
  title?: InputMaybe<Scalars["String"]>;
};

export type Post = {
  __typename?: "Post";
  createdAt: Scalars["DateTime"];
  id: Scalars["Float"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type Publisher = {
  __typename?: "Publisher";
  books: Array<Book>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  type: PublisherType;
  updatedAt: Scalars["DateTime"];
};

/** Type of the publisher */
export enum PublisherType {
  Global = "GLOBAL",
  Local = "LOCAL",
}

export type Query = {
  __typename?: "Query";
  getAuthor?: Maybe<Author>;
  getAuthors: Array<Author>;
  getBook?: Maybe<Book>;
  getBooks: Array<Book>;
  hello: Scalars["String"];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};

export type QueryGetAuthorArgs = {
  id: Scalars["String"];
};

export type QueryGetBookArgs = {
  id: Scalars["String"];
};

export type QueryPostArgs = {
  id: Scalars["Float"];
};

export type Tag = {
  __typename?: "Tag";
  books: Array<Book>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"];
  id: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  username: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamepasswordingInput = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type LoginMutationVariables = Exact<{
  options: UsernamepasswordingInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: { __typename?: "User"; id: number; username: string } | null;
  };
};

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: { __typename?: "User"; username: string; id: number } | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: { __typename?: "User"; id: number; username: string } | null;
};

export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "options" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UsernamepasswordingInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "options" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "options" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "options" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "username" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "username" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "password" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "password" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}
