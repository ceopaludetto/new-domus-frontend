import * as React from "react";

import { Tabs, Tab, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Page, RouteHandler } from "@/client/components";
import { usePreload, usePathWithCondominium } from "@/client/hooks";
import { retrieveTo } from "@/client/utils/string";
import type { RouteComponentProps } from "@/client/utils/types";
import { CondominiumURL } from "@/client/utils/url";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Settings({ routes, location, history }: RouteComponentProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(() => new CondominiumURL(location).getNormalizedURI());
  const [generatePath] = usePathWithCondominium();
  const { handlePreload } = usePreload();

  const handleTabClick = React.useCallback(
    async (e: React.ChangeEvent<Record<string, any>>, v: any) => {
      await handlePreload(v);

      history.push(v);
    },
    [history, handlePreload]
  );

  const renderTabs = React.useCallback(
    () =>
      routes?.map((route) => {
        const path = retrieveTo(route.path);

        return <Tab value={generatePath(path)} label={route.meta?.displayName} key={route.name} />;
      }),
    [routes, generatePath]
  );

  React.useEffect(() => {
    const condominiumURL = new CondominiumURL(location);

    if (condominiumURL.hasCondominium()) {
      setValue(condominiumURL.getNormalizedURI());
    }
  }, [location]);

  return (
    <Page
      title="Configurações"
      subtitle="Ajustes"
      tabs={
        <Tabs
          className={classes.root}
          indicatorColor="primary"
          value={value}
          onChange={handleTabClick}
          variant="scrollable"
          scrollButtons="off"
        >
          {renderTabs()}
        </Tabs>
      }
    >
      <RouteHandler routes={routes} />
    </Page>
  );
}
