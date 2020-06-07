export type Maybe<T> = T | null;
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

export type AuthenticationInput = {
  login: Scalars["String"];
  password: Scalars["String"];
};

export enum Gender {
  M = "M",
  F = "F",
  N = "N",
}

export type Mutation = {
  __typename?: "Mutation";
  login: User;
  register: User;
};

export type MutationLoginArgs = {
  input: AuthenticationInput;
};

export type MutationRegisterArgs = {
  input: UserInsertInput;
};

export type Person = {
  __typename?: "Person";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  deletedAt: Scalars["DateTime"];
  name: Scalars["String"];
  email: Scalars["String"];
  gender: Gender;
};

export type PersonInsertInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  gender: Gender;
};

export type Query = {
  __typename?: "Query";
  findUser: User;
  logged: Scalars["Boolean"];
  profile: User;
  showUsers: Array<User>;
};

export type QueryFindUserArgs = {
  id: Scalars["ID"];
};

export type QueryShowUsersArgs = {
  first?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  deletedAt: Scalars["DateTime"];
  login: Scalars["String"];
  password: Scalars["String"];
  personID: Scalars["String"];
  person: Person;
};

export type UserInsertInput = {
  login: Scalars["String"];
  password: Scalars["String"];
  person: PersonInsertInput;
};

export type UserValuesFragment = {
  __typename?: "User";
  id: string;
  login: string;
  person: { __typename?: "Person"; id: string; name: string; email: string };
};

export type LoginMutationVariables = {
  input: AuthenticationInput;
};

export type LoginMutation = { __typename?: "Mutation"; login: { __typename?: "User" } & UserValuesFragment };

export type LoggedQueryVariables = {};

export type LoggedQuery = { __typename?: "Query"; logged: boolean };

export type ShowAllUsersQueryVariables = {};

export type ShowAllUsersQuery = {
  __typename?: "Query";
  showUsers: Array<{ __typename?: "User" } & UserValuesFragment>;
};
