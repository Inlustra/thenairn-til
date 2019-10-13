export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation',
  _?: Maybe<Scalars['Boolean']>,
  createTil: Til,
  deleteTil: Scalars['Boolean'],
  createUser: User,
};


export type MutationCreateTilArgs = {
  input: TilInput
};


export type MutationDeleteTilArgs = {
  id: Scalars['ID']
};


export type MutationCreateUserArgs = {
  email: Scalars['String'],
  username: Scalars['String'],
  password: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  _?: Maybe<Scalars['Boolean']>,
  til: Til,
  tils: Array<Til>,
  user: User,
};


export type QueryTilArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type Til = {
   __typename?: 'Til',
  id: Scalars['ID'],
  title: Scalars['String'],
  code: TilCode,
  author: User,
  tags: Array<Scalars['String']>,
};

export type TilCode = {
   __typename?: 'TilCode',
  language: Scalars['String'],
  body: Scalars['String'],
};

export type TilCodeInput = {
  language: Scalars['String'],
  body: Scalars['String'],
};

export type TilInput = {
  title: Scalars['String'],
  code: TilCodeInput,
  tags: Array<Scalars['String']>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  username: Scalars['String'],
  password: Scalars['String'],
  tils: Array<Til>,
};

