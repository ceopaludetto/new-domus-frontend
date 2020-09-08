import { InMemoryCache, ApolloClient, HttpLink, ApolloLink } from "@apollo/client";
import type { SchemaLink } from "@apollo/client/link/schema";

import { AccessToken } from "./token";

const tokenStore = new AccessToken();

const setTokenLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();

    const token = context.response.headers.get("X-Access-Token");
    if (token) {
      tokenStore.token = token;
    }

    return response;
  });
});

const getTokenLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => ({
    headers: {
      "X-Access-Token": tokenStore.token,
      ...headers,
    },
  }));

  return forward(operation);
});

export function createClient(isSsr = false, link: HttpLink | SchemaLink) {
  let cache = new InMemoryCache();

  if (!isSsr) {
    const apolloState = document.querySelector("#__APOLLO_STATE__");
    if (apolloState) {
      cache = cache.restore(JSON.parse(apolloState.innerHTML));

      if (process.env.NODE_ENV === "production") {
        apolloState.parentElement?.removeChild(apolloState);
      }
    }
  }

  const client = new ApolloClient({
    cache,
    link: isSsr ? link : setTokenLink.concat(getTokenLink.concat(link)),
    ssrMode: isSsr,
    connectToDevTools: process.env.NODE_ENV === "development",
    assumeImmutableResults: true,
  });

  return client;
}
