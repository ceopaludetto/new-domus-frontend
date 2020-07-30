import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider, HttpLink } from "@apollo/client";
import { loadableReady } from "@loadable/component";

import { createClient } from "@/client/providers/apollo";

import { App } from "./App";

const client = createClient(
  false,
  new HttpLink({
    credentials: "same-origin",
    uri: "/graphql",
  })
);

loadableReady(() => {
  const root = document.querySelector("#app");
  const method: "render" | "hydrate" = root?.hasChildNodes() ? "hydrate" : "render";

  ReactDOM[method](
    <React.StrictMode>
      <HelmetProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </HelmetProvider>
    </React.StrictMode>,
    root
  );
});

if (module.hot) {
  module.hot.accept();
}
