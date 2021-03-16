/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { usePathWithCondominium, usePermissionGuards } from "@/client/hooks";
import type { RouteComponentProps } from "@/client/utils/types";

interface RouteHandlerProps extends Pick<RouteComponentProps, "routes"> {
  checkAuth?: boolean;
  notFound?: React.FunctionComponent;
  customRoutes?: React.ReactNode;
  initialLogged?: boolean;
}

export function RouteHandler({ routes, checkAuth = true, customRoutes, initialLogged, notFound }: RouteHandlerProps) {
  const { checkAccess } = usePermissionGuards();
  const [generatePath] = usePathWithCondominium();

  return (
    <Switch>
      {routes?.map(({ component: Component, name, children, meta, ...rest }) => (
        <Route
          key={name}
          render={(props) => {
            if (!checkAuth) {
              return <Component routes={children} {...props} />;
            }

            if (checkAccess(meta?.needAuth, initialLogged)) {
              return <Component routes={children} {...props} />;
            }

            const redirectTo = generatePath(meta?.redirectTo);

            return <Redirect from={props.location.pathname} to={redirectTo} />;
          }}
          {...rest}
        />
      ))}
      {!!customRoutes && customRoutes}
      {notFound && <Route component={notFound} />}
    </Switch>
  );
}
