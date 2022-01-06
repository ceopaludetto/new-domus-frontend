import { StrictMode } from "react";
import { hydrate } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { CacheProvider } from "@emotion/react";
import { loadableReady } from "@loadable/component";
import { Provider } from "urql";

import { App } from "./app";
import { createURQLClient } from "./providers/client";
import { ApplicationThemeProvider } from "./theme";
import { createApplicationCache } from "./theme/create";
import { CondominiumProvider } from "./utils/hooks";

const root = document.querySelector("#root");
const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const cache = createApplicationCache();

const { client } = createURQLClient(false);
const condominiumState = document.querySelector("#__CONDOMINIUM__")?.innerHTML;
const initialCondominium = condominiumState ? JSON.parse(condominiumState) : null;

loadableReady(() => {
  hydrate(
    <StrictMode>
      <HelmetProvider>
        <CacheProvider value={cache}>
          <ApplicationThemeProvider initialMode={colorMode}>
            <Provider value={client}>
              <CondominiumProvider initialValue={initialCondominium}>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </CondominiumProvider>
            </Provider>
          </ApplicationThemeProvider>
        </CacheProvider>
      </HelmetProvider>
    </StrictMode>,
    root
  );
});

if (module.hot) {
  module.hot.accept();
}
