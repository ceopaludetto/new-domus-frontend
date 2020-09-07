import * as React from "react";
import { Route } from "react-router-dom";

import { Page, Tabs } from "@/client/components";
import { usePathWithCondominium } from "@/client/hooks";
import type { RouteComponentProps } from "@/client/utils/common.dto";

export default function Settings({ routes }: RouteComponentProps) {
  const generatePath = usePathWithCondominium();

  return (
    <Page title="Configurações" subtitle="Ajustes">
      <Tabs>
        {routes?.map((r) => {
          const path = Array.isArray(r.path) ? r.path[0] : r.path;

          return (
            <Tabs.Tab key={r.name} to={generatePath(path as string)} exact>
              {r.meta?.displayName}
            </Tabs.Tab>
          );
        })}
      </Tabs>
      {routes?.map(({ name, component: Component, children, ...rest }) => (
        <Route key={name} render={(props) => <Component routes={children} {...props} />} {...rest} />
      ))}
    </Page>
  );
}
