import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Switch, Route, Redirect } from "react-router-dom";
import { useToggle } from "react-use";

import { useQuery } from "@apollo/client";

import Roboto400 from "@/client/assets/fonts/roboto-400.woff2";
import Roboto500 from "@/client/assets/fonts/roboto-500.woff2";
import { ProgressBar } from "@/client/components";
import { LoggedQuery, Logged } from "@/client/graphql";
import { usePathWithCondominium } from "@/client/hooks";
import { LocaleProvider } from "@/client/providers/locale";
import { ProgressContext } from "@/client/providers/progress";
import { routes } from "@/client/providers/routes";
import { shouldRenderByAuth } from "@/client/utils/guards";

import "@/client/styles/normalize.scss";

interface AppProps {
  logged: boolean;
}

export function App({ logged }: AppProps) {
  const [isAnimating, toggle] = useToggle(false);
  const { data } = useQuery<LoggedQuery>(Logged);
  const [generatePath] = usePathWithCondominium();

  return (
    <LocaleProvider>
      <ProgressContext.Provider value={{ isAnimating, toggle }}>
        <ProgressBar />
        <Helmet htmlAttributes={{ lang: "pt-BR" }} defaultTitle="Domus" titleTemplate="%s | Domus">
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Testing my all learned skills in web development" />
          <link rel="preload" href={Roboto400} as="font" crossOrigin="anonymous" />
          <link rel="preload" href={Roboto500} as="font" crossOrigin="anonymous" />
        </Helmet>
        <Switch>
          {routes.map(({ name, component: Component, children, meta, ...rest }) => (
            <Route
              key={name}
              render={(props) => {
                if (shouldRenderByAuth(meta?.logged, data?.logged ?? logged)) {
                  return <Component {...props} routes={children} />;
                }

                const redirect = generatePath(meta?.redirectTo);

                return <Redirect from={props.location.pathname} to={redirect} />;
              }}
              {...rest}
            />
          ))}
        </Switch>
      </ProgressContext.Provider>
    </LocaleProvider>
  );
}
