import * as React from "react";
import { Route } from "react-router-dom";

import clsx from "clsx";

import { Sidebar, AppHeader } from "@/client/components";
import u from "@/client/styles/utils.scss";
import type { RouteComponentProps } from "@/client/utils/common.dto";

export default function App({ routes }: RouteComponentProps) {
  return (
    <main className={clsx(u.row, u["no-gap"])}>
      <aside className={clsx(u.col, u.xs, u["mw-300"], u.relative)}>
        <Sidebar routes={routes} />
      </aside>
      <div className={clsx(u.col, u.xs)}>
        <AppHeader />
        {routes?.map(({ name, component: Component, children, ...rest }) => (
          <Route key={name} render={(props) => <Component routes={children} {...props} />} {...rest} />
        ))}
      </div>
    </main>
  );
}
