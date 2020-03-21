import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createClient(isSsr = false, link: any) {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link,
    ssrMode: isSsr,
    connectToDevTools: process.env.NODE_ENV === "development",
    resolvers: {}
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
