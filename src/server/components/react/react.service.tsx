/* eslint-disable react/no-danger */
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { FilledContext, HelmetProvider } from "react-helmet-async";

import { ApolloProvider } from "@apollo/react-common";
import { getDataFromTree } from "@apollo/react-ssr";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { Injectable } from "@nestjs/common";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import { Request, Response } from "express";

import { App } from "~/client/App";
import { createClient } from "~/client/providers/apollo";
import { ConfigurationService } from "~/server/components/configuration";

@Injectable()
export class ReactService {
  public constructor(private readonly configService: ConfigurationService) {}

  public async render(req: Request, res: Response) {
    const extractor = new ChunkExtractor({
      statsFile: process.env.MANIFEST as string
    });
    // const context: { url?: string } = {};
    const helmetContext: FilledContext | {} = {};
    const client = createClient(true, new SchemaLink({ schema: this.configService.schema }));

    const tree = (
      <ChunkExtractorManager extractor={extractor}>
        <HelmetProvider context={helmetContext}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </HelmetProvider>
      </ChunkExtractorManager>
    );

    await getDataFromTree(tree);
    const markup = renderToString(tree);

    const initialState = client.extract();

    res.send(this.markup(markup, initialState, extractor, (helmetContext as FilledContext).helmet));
  }

  public markup = (
    markup: string,
    initialState: NormalizedCacheObject,
    extractor: ChunkExtractor,
    helmet: FilledContext["helmet"]
  ) => {
    const { htmlAttributes, bodyAttributes } = helmet;

    const linkEls = extractor.getLinkElements();
    const styleEls = extractor.getStyleElements();
    const scriptEls = extractor.getScriptElements();

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
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, "\\u003c")};`
            }}
          />
          {scriptEls}
        </body>
      </html>
    );
  };
}
