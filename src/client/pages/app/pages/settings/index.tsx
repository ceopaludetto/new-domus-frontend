import * as React from "react";
import { Route } from "react-router-dom";

import { Page, Tabs } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/common.dto";

export default function Settings({ routes }: RouteComponentProps) {
  return (
    <Page title="Configurações" subtitle="Ajustes">
      <Tabs>
        {routes?.map((r) => (
          <Tabs.Tab key={r.name} to={r.path} exact>
            {r.meta?.displayName}
          </Tabs.Tab>
        ))}
      </Tabs>
      {routes?.map(({ name, component: Component, children, ...rest }) => (
        <Route key={name} render={(props) => <Component routes={children} {...props} />} {...rest} />
      ))}
    </Page>
  );
}
