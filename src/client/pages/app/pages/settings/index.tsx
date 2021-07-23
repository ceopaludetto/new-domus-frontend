import { Tab, Tabs } from "@material-ui/core";

import { Page, PreloadNavLink, RouteHandler } from "@/client/components";
import { useLocationTabs } from "@/client/helpers/hooks";
import type { RouteComponentProps } from "@/client/utils/types";

export default function AppSettings({ routes }: RouteComponentProps) {
  const [page, changePage] = useLocationTabs();

  return (
    <Page
      title="Configurações"
      subtitle="Visão Geral"
      contained
      tabs={
        <Tabs variant="scrollable" indicatorColor="primary" value={page} onChange={changePage}>
          <Tab component={PreloadNavLink} to="/app/settings" value="/app/settings" label="Informações Pessoais" />
          <Tab
            component={PreloadNavLink}
            to="/app/settings/condominium"
            value="/app/settings/condominium"
            label="Condomínio"
          />
          <Tab
            component={PreloadNavLink}
            to="/app/settings/appearance"
            value="/app/settings/appearance"
            label="Aparência"
          />
        </Tabs>
      }
    >
      <RouteHandler routes={routes} />
    </Page>
  );
}
