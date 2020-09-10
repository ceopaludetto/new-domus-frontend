import * as React from "react";
import { Route } from "react-router-dom";

import { Tabs, Tab, Box } from "@material-ui/core";

import { Page } from "@/client/components";
import { usePathWithCondominium, usePreload } from "@/client/hooks";
import type { RouteComponentProps } from "@/client/utils/common.dto";
import { retrieveTo } from "@/client/utils/string";

export default function Settings({ routes, location, history }: RouteComponentProps) {
  const [value, setValue] = React.useState(location.pathname);
  const [generatePath] = usePathWithCondominium();
  const [, run] = usePreload();

  async function handleTabClick(e: React.ChangeEvent<Record<string, any>>, v: any) {
    setValue(v);
    await run(v);
    history.push(v);
  }

  return (
    <Page title="Configurações" subtitle="Ajustes">
      <Box mb={3}>
        <Tabs indicatorColor="primary" value={value} onChange={handleTabClick}>
          {routes?.map((r) => {
            const path = retrieveTo(r.path);

            return <Tab value={generatePath(path)} label={r.meta?.displayName} key={r.name} />;
          })}
        </Tabs>
      </Box>
      {routes?.map(({ name, component: Component, children, ...rest }) => (
        <Route key={name} render={(props) => <Component routes={children} {...props} />} {...rest} />
      ))}
    </Page>
  );
}
