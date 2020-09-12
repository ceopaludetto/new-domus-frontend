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

// eslint-disable-next-line promise/catch-or-return
loadableReady().then(() => {
  const root = document.querySelector("#app");
  const method: "render" | "hydrate" = root?.hasChildNodes() ? "hydrate" : "render";

  return ReactDOM[method](
    <HelmetProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>,
    root,
    () => {
      const jssStyles = document.querySelector("#jss-server-side");
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  );
});

if (module.hot) {
  module.hot.accept();
}
