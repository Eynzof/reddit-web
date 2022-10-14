import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Author = {
  __typename?: 'Author';
  books: Array<Book>;
  born?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favouriteBook?: Maybe<Book>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AuthorValidator = {
  born?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  publisher?: Maybe<Publisher>;
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BookValidator = {
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthor: Author;
  addBook: Book;
  createPost: Post;
  deleteAuthor: Scalars['Boolean'];
  deleteBook: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
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
  authorId: Scalars['String'];
  input: BookValidator;
  publisherId?: InputMaybe<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationDeleteAuthorArgs = {
  id: Scalars['String'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  options: UsernamepasswordingInput;
};


export type MutationRegisterArgs = {
  options: UsernamepasswordingInput;
};


export type MutationUpdateAuthorArgs = {
  id: Scalars['String'];
  input: AuthorValidator;
};


export type MutationUpdateBookArgs = {
  id: Scalars['String'];
  input: BookValidator;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Publisher = {
  __typename?: 'Publisher';
  books: Array<Book>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: PublisherType;
  updatedAt: Scalars['DateTime'];
};

/** Type of the publisher */
export enum PublisherType {
  Global = 'GLOBAL',
  Local = 'LOCAL'
}

export type Query = {
  __typename?: 'Query';
  getAuthor?: Maybe<Author>;
  getAuthors: Array<Author>;
  getBook?: Maybe<Book>;
  getBooks: Array<Book>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryGetAuthorArgs = {
  id: Scalars['String'];
};


export type QueryGetBookArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};

export type Tag = {
  __typename?: 'Tag';
  books: Array<Book>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamepasswordingInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', username: string, id: number } | null } };


export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      username
      id
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};