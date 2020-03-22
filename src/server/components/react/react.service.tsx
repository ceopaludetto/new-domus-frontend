/* eslint-disable react/no-danger */
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { FilledContext, HelmetProvider } from "react-helmet-async";

import { ApolloProvider } from "@apollo/react-common";
import { getDataFromTree } from "@apollo/react-ssr";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/core";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { Injectable } from "@nestjs/common";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import createEmotionServer, { EmotionCritical } from "create-emotion-server";
import { Request, Response } from "express";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";
import { generate } from "shortid";

import { App } from "@/client/App";
import { createClient } from "@/client/providers/apollo";
import { createCache } from "@/client/providers/emotion";
import { ConfigurationService } from "@/server/components/configuration";

@Injectable()
export class ReactService {
  public constructor(
    private readonly configService: ConfigurationService,
    @InjectPinoLogger(ReactService.name) private readonly logger: PinoLogger
  ) {}

  public async render(req: Request, res: Response) {
    try {
      const nonce = Buffer.from(generate()).toString("base64");
      const cache = createCache(nonce);
      const { extractCritical } = createEmotionServer(cache);
      const extractor = new ChunkExtractor({
        statsFile: process.env.MANIFEST as string
      });
      // const context: { url?: string } = {};
      const helmetContext: FilledContext | {} = {};
      const client = createClient(true, new SchemaLink({ schema: this.configService.schema }));

      if (process.env.NODE_ENV === "production") {
        res.set(
          "Content-Security-Policy",
          `default-src 'self'; style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com; font-src *;`
        );
      }

      const tree = (
        <ChunkExtractorManager extractor={extractor}>
          <CacheProvider value={cache}>
            <HelmetProvider context={helmetContext}>
              <ApolloProvider client={client}>
                <App />
              </ApolloProvider>
            </HelmetProvider>
          </CacheProvider>
        </ChunkExtractorManager>
      );

      await getDataFromTree(tree);
      const markup = extractCritical(renderToString(tree));

      const initialState = client.extract();

      const fullHTML = this.markup(markup, initialState, extractor, (helmetContext as FilledContext).helmet, cache);

      return res.send(fullHTML);
    } catch (error) {
      this.logger.error(error);
      return res.send({ error: true, message: "fail to render" });
    }
  }

  public markup = (
    { html, css, ids }: EmotionCritical,
    initialState: NormalizedCacheObject,
    extractor: ChunkExtractor,
    helmet: FilledContext["helmet"],
    cache: EmotionCache
  ) => {
    const { htmlAttributes, bodyAttributes } = helmet;

    const linkEls = extractor.getLinkElements();
    const styleEls = extractor.getStyleElements();
    const scriptEls = extractor.getScriptElements();

    const prop = { [`data-emotion-${cache.key}`]: ids.join(" ") };

    return renderToStaticMarkup(
      <html lang="pt-BR" {...htmlAttributes.toComponent()}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {linkEls}
          {styleEls}
          <style nonce={cache.nonce} {...prop} dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body {...bodyAttributes.toComponent()}>
          <div id="app" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            id="__APOLLO_STATE__"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(initialState).replace(/</g, "\\u003c")
            }}
          />
          {scriptEls}
        </body>
      </html>
    );
  };
}
