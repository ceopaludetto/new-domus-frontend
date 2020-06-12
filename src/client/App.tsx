import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Switch as RouterSwitch, Route } from "react-router-dom";

import OpenSans400 from "@/client/assets/fonts/open-sans-400.woff2";
import OpenSans600 from "@/client/assets/fonts/open-sans-600.woff2";
import { ProgressBar } from "@/client/components";
import { useProgress } from "@/client/hooks";
import { ProgressContext } from "@/client/providers/progress";
import { routes } from "@/client/providers/routes";

import "@/client/styles/normalize.scss";

export function App() {
  const methods = useProgress({ steps: [30, 70], speed: 400, waitUntilEnd: 200 });

  return (
    <ProgressContext.Provider value={methods}>
      <ProgressBar />
      <Helmet htmlAttributes={{ lang: "pt-BR" }}>
        <title>Nest New Graphql</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Testing my all learned skills in web development" />
        <link rel="preload" href={OpenSans400} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={OpenSans600} as="font" crossOrigin="anonymous" />
      </Helmet>
      <RouterSwitch>
        {routes.map(({ name, ...rest }) => (
          <Route key={name} {...rest} />
        ))}
      </RouterSwitch>
    </ProgressContext.Provider>
  );
}
