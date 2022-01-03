import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

import type * as Types from "./types";

const defaultOptions = {};
export type PersonValuesFragment = {
  __typename?: "Person";
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  cpf: string;
  phone?: string | null | undefined;
  birthDate: string;
};

export type UserValuesFragment = {
  __typename?: "User";
  id: string;
  email: string;
  person: {
    __typename?: "Person";
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    cpf: string;
    phone?: string | null | undefined;
    birthDate: string;
  };
};

export type LoginMutationVariables = Types.Exact<{
  input: Types.AuthenticateUserInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "User";
    id: string;
    email: string;
    person: {
      __typename?: "Person";
      id: string;
      fullName: string;
      firstName: string;
      lastName: string;
      cpf: string;
      phone?: string | null | undefined;
      birthDate: string;
    };
  };
};

export type ProfileQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProfileQuery = {
  __typename?: "Query";
  profile: {
    __typename?: "User";
    id: string;
    email: string;
    person: {
      __typename?: "Person";
      id: string;
      fullName: string;
      firstName: string;
      lastName: string;
      cpf: string;
      phone?: string | null | undefined;
      birthDate: string;
    };
  };
};

export type EvictRefreshMutationVariables = Types.Exact<{ [key: string]: never }>;

export type EvictRefreshMutation = { __typename?: "Mutation"; evictRefresh: boolean };

export const PersonValuesFragmentDoc = /* #__PURE__ */ gql`
  fragment PersonValues on Person {
    id
    fullName
    firstName
    lastName
    cpf
    phone
    birthDate
  }
`;
export const UserValuesFragmentDoc = /* #__PURE__ */ gql`
  fragment UserValues on User {
    id
    email
    person {
      ...PersonValues
    }
  }
  ${PersonValuesFragmentDoc}
`;
export const LoginDocument = /* #__PURE__ */ gql`
  mutation Login($input: AuthenticateUserInput!) {
    login(input: $input) {
      ...UserValues
    }
  }
  ${UserValuesFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ProfileDocument = /* #__PURE__ */ gql`
  query Profile {
    profile {
      ...UserValues
    }
  }
  ${UserValuesFragmentDoc}
`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
}
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
}
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const EvictRefreshDocument = /* #__PURE__ */ gql`
  mutation EvictRefresh {
    evictRefresh
  }
`;
export type EvictRefreshMutationFn = Apollo.MutationFunction<EvictRefreshMutation, EvictRefreshMutationVariables>;

/**
 * __useEvictRefreshMutation__
 *
 * To run a mutation, you first call `useEvictRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvictRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evictRefreshMutation, { data, loading, error }] = useEvictRefreshMutation({
 *   variables: {
 *   },
 * });
 */
export function useEvictRefreshMutation(
  baseOptions?: Apollo.MutationHookOptions<EvictRefreshMutation, EvictRefreshMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EvictRefreshMutation, EvictRefreshMutationVariables>(EvictRefreshDocument, options);
}
export type EvictRefreshMutationHookResult = ReturnType<typeof useEvictRefreshMutation>;
export type EvictRefreshMutationResult = Apollo.MutationResult<EvictRefreshMutation>;
export type EvictRefreshMutationOptions = Apollo.BaseMutationOptions<
  EvictRefreshMutation,
  EvictRefreshMutationVariables
>;
