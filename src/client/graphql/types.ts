export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AddCondominium = {
  character?: InputMaybe<Scalars["String"]>;
  cnpj: Scalars["String"];
  name: Scalars["String"];
};

export type AddPersonInput = {
  birthDate: Scalars["DateTime"];
  condominiums?: InputMaybe<Array<AddCondominium>>;
  cpf: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  phone: Scalars["String"];
};

export type AddUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  person?: InputMaybe<AddPersonInput>;
};

export type AuthenticateUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Condominium = {
  __typename?: "Condominium";
  character: Scalars["String"];
  cnpj: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  people: Array<Person>;
  updatedAt: Scalars["DateTime"];
};

export type CondominiumConnection = {
  __typename?: "CondominiumConnection";
  edges: Array<CondominiumEdge>;
  pageInfo: PageInfo;
};

export type CondominiumEdge = {
  __typename?: "CondominiumEdge";
  cursor: Scalars["String"];
  node: Condominium;
};

export type Mutation = {
  __typename?: "Mutation";
  evictRefresh: Scalars["Boolean"];
  login: User;
  register: User;
};

export type MutationLoginArgs = {
  input: AuthenticateUserInput;
};

export type MutationRegisterArgs = {
  input: AddUserInput;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
};

export type Person = {
  __typename?: "Person";
  birthDate: Scalars["String"];
  condominiums: Array<Condominium>;
  cpf: Scalars["String"];
  createdAt: Scalars["DateTime"];
  firstName: Scalars["String"];
  fullName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  phone?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type Query = {
  __typename?: "Query";
  condominium: Condominium;
  condominiums: CondominiumConnection;
  profile: User;
  user: User;
  users: UserConnection;
};

export type QueryCondominiumArgs = {
  id: Scalars["ID"];
};

export type QueryCondominiumsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["ID"];
  person: Person;
  updatedAt: Scalars["DateTime"];
};

export type UserConnection = {
  __typename?: "UserConnection";
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: "UserEdge";
  cursor: Scalars["String"];
  node: User;
};
