import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";

import { ApolloProvider } from "@apollo/react-common";
import { loadableReady } from "@loadable/component";
import { HttpLink } from "apollo-link-http";

import { createClient } from "@/client/providers/apollo";

import { App } from "./App";

const client = createClient(
  false,
  new HttpLink({
    credentials: "include",
    uri: "/graphql"
  })
);

loadableReady(() => {
  const root = document.querySelector("#app");
  const method: "render" | "hydrate" = root?.hasChildNodes() ? "hydrate" : "render";

  ReactDOM[method](
    <HelmetProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </HelmetProvider>,
    root
  );
});

if (module.hot) {
  module.hot.accept();
}
