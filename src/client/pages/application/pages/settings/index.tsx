import { BiBuildings } from "react-icons/bi";
import { FiUser, FiLock } from "react-icons/fi";
import { Outlet } from "react-router-dom";

import { Tab, Tabs } from "@mui/material";

import { Page, PreloadLink, TabLabel } from "@/client/components";
import { useRouteMatch } from "@/client/utils/hooks";

const base = "/application/:condominium/settings";

export default function ApplicationSettings() {
  const routeMatch = useRouteMatch([base, `${base}/security`, `${base}/condominium`]);
  const currentTab = routeMatch?.pattern.path;

  return (
    <Page
      title="Ajustes"
      tabs={
        <Tabs value={currentTab}>
          <Tab
            label={<TabLabel icon={FiUser}>Informações Pessoais</TabLabel>}
            component={PreloadLink}
            value={base}
            to=""
          />
          <Tab
            label={<TabLabel icon={FiLock}>Segurança</TabLabel>}
            component={PreloadLink}
            value={`${base}/security`}
            to="security"
          />
          <Tab
            label={<TabLabel icon={BiBuildings}>Condomínio</TabLabel>}
            component={PreloadLink}
            value={`${base}/condominium`}
            to="condominium"
          />
        </Tabs>
      }
    >
      <Outlet />
    </Page>
  );
}
