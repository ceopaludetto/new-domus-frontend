import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";

import { ApolloProvider } from "@apollo/react-common";
import { CacheProvider } from "@emotion/core";
import { loadableReady } from "@loadable/component";
import { HttpLink } from "apollo-link-http";
import { hydrate } from "emotion";

import { createClient } from "@/client/providers/apollo";
import { createCache } from "@/client/providers/emotion";

import { App } from "./App";

const client = createClient(
  false,
  new HttpLink({
    credentials: "include",
    uri: "/graphql"
  })
);

const styles: HTMLStyleElement | null = document.querySelector("[data-emotion-css]");
const cache = createCache(styles?.nonce ?? "");
hydrate(styles?.dataset?.emotionCss?.split(" ") ?? []);
const removed = styles?.parentElement?.removeChild(styles);
if (!removed) throw Error("Falha ao remover server sided css");

loadableReady(() => {
  const root = document.querySelector("#app");
  const method: "render" | "hydrate" = root?.hasChildNodes() ? "hydrate" : "render";

  ReactDOM[method](
    <CacheProvider value={cache}>
      <HelmetProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </HelmetProvider>
    </CacheProvider>,
    root
  );
});

if (module.hot) {
  module.hot.accept();
}
