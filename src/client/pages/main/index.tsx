import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { Header, Footer } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/common.dto";

export default function Main({ routes }: RouteComponentProps) {
  return (
    <>
      <Header />
      <Switch>
        {routes?.map(({ name, component: Component, children, ...rest }) => (
          <Route key={name} render={(props) => <Component {...props} routes={children} />} {...rest} />
        ))}
      </Switch>
      <Footer />
    </>
  );
}
