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
    cache.restore((window as any).__APOLLO_STATE__);
    if (!module.hot) {
      delete (window as any).__APOLLO_STATE__;
    }
  }

  return client;
}
