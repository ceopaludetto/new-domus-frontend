import { Switch, Route, Redirect } from "react-router-dom";

import { useGuards } from "@/client/helpers/hooks";
import type { RouteComponentProps } from "@/client/utils/types";

interface RouteHandlerProps extends Pick<RouteComponentProps, "routes"> {
  checkAuth?: boolean;
}

export function RouteHandler({ routes, checkAuth = true }: RouteHandlerProps) {
  const { checkAccess } = useGuards();

  return (
    <Switch>
      {routes?.map(({ name, component, children, meta, ...rest }) => (
        <Route
          key={name}
          render={(props) => {
            const Component = component;

            if (!checkAuth) {
              return <Component routes={children} {...props} />;
            }

            if (checkAccess(meta?.needAuth)) {
              return <Component routes={children} {...props} />;
            }

            return <Redirect from={props.location.pathname} to={meta?.redirectTo as string} />;
          }}
          {...rest}
        />
      ))}
    </Switch>
  );
}
