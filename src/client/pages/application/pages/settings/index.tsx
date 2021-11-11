import { BiBuildings } from "react-icons/bi";
import { FiLock, FiUser } from "react-icons/fi";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

import { Grid } from "@mui/material";

import { Page, SettingsLink } from "@/client/components";

export default function ApplicationSettings({ route }: RouteConfigComponentProps) {
  return (
    <Page title="Ajustes">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <SettingsLink icon={FiUser} description="Informações Pessoais, E-mail" to="/application/settings">
            Configurações da Conta
          </SettingsLink>
          <SettingsLink icon={FiLock} description="Senha, Autenticação" to="/application/settings">
            Segurança
          </SettingsLink>
          <SettingsLink
            icon={BiBuildings}
            description="Nome, Caractere Especial"
            to="/application/settings/condominium"
          >
            Condomínio
          </SettingsLink>
        </Grid>
        <Grid item xs={12} lg={9}>
          {renderRoutes(route?.routes)}
        </Grid>
      </Grid>
    </Page>
  );
}
