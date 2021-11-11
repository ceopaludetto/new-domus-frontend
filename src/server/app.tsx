/* eslint-disable react/no-danger */
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { StaticRouter } from "react-router";

import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { ChunkExtractor } from "@loadable/server";
import express from "express";

import { App } from "@/client/app";
import { ApplicationThemeProvider } from "@/client/theme";
import { createApplicationCache } from "@/client/theme/create";
import type { ColorMode } from "@/client/utils/types";

import { applyMiddlewares } from "./middlewares";

const app = express();

applyMiddlewares(app);

app.get("*", async (request, response) => {
  const cache = createApplicationCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const colorMode = (request.header("sec-ch-prefers-color-scheme") ?? "light") as ColorMode;
  const helmetContext: FilledContext = {} as any;

  const extractor = new ChunkExtractor({ statsFile: process.env.CEOP_LOADABLE as string });
  const markup = renderToString(
    extractor.collectChunks(
      <HelmetProvider context={helmetContext}>
        <CacheProvider value={cache}>
          <ApplicationThemeProvider initialMode={colorMode}>
            <StaticRouter location={request.url}>
              <App />
            </StaticRouter>
          </ApplicationThemeProvider>
        </CacheProvider>
      </HelmetProvider>
    )
  );

  const script = extractor.getScriptElements();
  const link = extractor.getLinkTags();
  const style = extractor.getStyleTags();

  const { helmet } = helmetContext;

  const emotionChunks = extractCriticalToChunks(markup);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  const head = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}${link}${style}${emotionCss}`;

  return response.send(
    "<!DOCTYPE html>".concat(
      renderToStaticMarkup(
        <html lang="en-US" {...helmet.htmlAttributes.toComponent()}>
          <head dangerouslySetInnerHTML={{ __html: head }} />
          <body {...helmet.bodyAttributes.toComponent()}>
            <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
            {script}
          </body>
        </html>
      )
    )
  );
});

export { app };
