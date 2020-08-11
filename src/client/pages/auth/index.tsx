import * as React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import clsx from "clsx";

import { Container, Paper } from "@/client/components";
import u from "@/client/styles/utils.scss";
import type { RouteComponentProps } from "@/client/utils/common.dto";

import s from "./index.scss";

export default function Auth({ routes }: RouteComponentProps) {
  const location = useLocation();

  return (
    <Container className={s.container} fluid>
      <div className={clsx(u.row, u["align-items-xs-center"], u["justify-content-xs-center"], u["h-100"])}>
        <div
          className={clsx(u.col, location.pathname.includes("/auth/signup") ? u["mw-900"] : u["mw-550"], u["w-100"])}
        >
          <Paper outline size="large">
            <Switch>
              {routes?.map(({ name, component: Component, children, ...rest }) => (
                <Route key={name} render={(props) => <Component {...props} routes={children} />} {...rest} />
              ))}
            </Switch>
          </Paper>
        </div>
      </div>
    </Container>
  );
}
