/* eslint-disable react/no-danger */
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FilledContext, HelmetProvider } from "react-helmet-async";

import { ApolloProvider } from "@apollo/react-common";
import { renderToStringWithData } from "@apollo/react-ssr";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { Injectable } from "@nestjs/common";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import { Request, Response } from "express";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";
import { generate } from "shortid";

import { App } from "@/client/App";
import { createClient } from "@/client/providers/apollo";
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
      const extractor = new ChunkExtractor({
        statsFile: process.env.MANIFEST as string,
      });
      // const context: { url?: string } = {};
      const helmetContext: FilledContext | {} = {};
      const client = createClient(true, new SchemaLink({ schema: this.configService.schema }));

      if (process.env.NODE_ENV === "production") {
        res.set(
          "Content-Security-Policy",
          `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com; font-src *;`
        );
      }

      const markup = await renderToStringWithData(
        <ChunkExtractorManager extractor={extractor}>
          <HelmetProvider context={helmetContext}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </HelmetProvider>
        </ChunkExtractorManager>
      );

      const initialState = client.extract();

      const fullHTML = this.markup(markup, initialState, extractor, (helmetContext as FilledContext).helmet, nonce);

      return res.send(fullHTML);
    } catch (error) {
      this.logger.error(error?.message ?? error ?? "Falha ao renderizar React");
      return res.send({ error: true, message: "fail to render" });
    }
  }

  public markup = (
    markup: string,
    initialState: NormalizedCacheObject,
    extractor: ChunkExtractor,
    helmet: FilledContext["helmet"],
    nonce: string
  ) => {
    const { htmlAttributes, bodyAttributes } = helmet;

    const linkEls = extractor.getLinkElements();
    const styleEls = extractor.getStyleElements({ nonce });
    const scriptEls = extractor.getScriptElements({ nonce });

    return renderToStaticMarkup(
      <html lang="pt-BR" {...htmlAttributes.toComponent()}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {linkEls}
          {styleEls}
        </head>
        <body {...bodyAttributes.toComponent()}>
          <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          <script
            nonce={nonce}
            id="__APOLLO_STATE__"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(initialState).replace(/</g, "\\u003c"),
            }}
          />
          {scriptEls}
        </body>
      </html>
    );
  };
}
