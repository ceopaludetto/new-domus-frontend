import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { SchemaLink } from "apollo-link-schema";

export function createClient(isSsr = false, link: HttpLink | SchemaLink) {
  const cache = new InMemoryCache({ freezeResults: true });

  const client = new ApolloClient({
    cache,
    link,
    ssrMode: isSsr,
    connectToDevTools: process.env.NODE_ENV === "development",
    assumeImmutableResults: true,
    resolvers: {},
  });

  if (!isSsr) {
    const apolloState = document.querySelector("#__APOLLO_STATE__");
    if (apolloState && apolloState.innerHTML) {
      cache.restore(JSON.parse(apolloState.innerHTML));
      if (!module.hot) {
        const cacheRoot = apolloState?.parentElement?.removeChild?.(apolloState);
        if (!cacheRoot) throw Error("Fail to remove cache");
      }
    }
  }

  return client;
}
