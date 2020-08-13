import * as React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import clsx from "clsx";

import { Container, Paper, Footer } from "@/client/components";
import u from "@/client/styles/utils.scss";
import type { RouteComponentProps } from "@/client/utils/common.dto";

import s from "./index.scss";

export default function Auth({ routes }: RouteComponentProps) {
  const location = useLocation();
  const isRegister = React.useMemo(() => location.pathname.includes("/auth/signup"), [location]);

  return (
    <>
      <Container className={clsx(s.container, isRegister ? s["xs-register"] : s["xs-not-register"])} fluid>
        <div className={clsx(isRegister ? u["mw-900"] : u["mw-550"], u["w-100"])}>
          <Paper outline size="large">
            <Switch>
              {routes?.map(({ name, component: Component, children, ...rest }) => (
                <Route key={name} render={(props) => <Component {...props} routes={children} />} {...rest} />
              ))}
            </Switch>
          </Paper>
        </div>
      </Container>
      <Footer />
    </>
  );
}
