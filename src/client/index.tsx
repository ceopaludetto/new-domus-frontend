import { hydrate } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { CacheProvider } from "@emotion/react";
import { loadableReady } from "@loadable/component";

import { App } from "./app";
import { ApplicationThemeProvider } from "./theme";
import { createApplicationCache } from "./theme/create";

const root = document.querySelector("#root");
const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const cache = createApplicationCache();

loadableReady(() => {
  hydrate(
    <HelmetProvider>
      <CacheProvider value={cache}>
        <ApplicationThemeProvider initialMode={colorMode}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApplicationThemeProvider>
      </CacheProvider>
    </HelmetProvider>,
    root
  );
});

if (module.hot) {
  module.hot.accept();
}
