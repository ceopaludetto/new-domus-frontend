import { BiBuilding } from "react-icons/bi";
import { FiUser, FiLock } from "react-icons/fi";
import { Outlet } from "react-router-dom";

import { Grid } from "@mui/material";

import { Page, SettingsLink } from "@/client/components";

export default function ApplicationSettings() {
  return (
    <Page title="Ajustes">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <SettingsLink icon={FiUser} description="Nome, e-mail e outros" to="">
            Informações Pessoais
          </SettingsLink>
          <SettingsLink icon={FiLock} description="Senha e 2FA" to="security">
            Segurança
          </SettingsLink>
          <SettingsLink icon={BiBuilding} description="Nome do condomínio, endereço e outros" to="condominium">
            Condomínio
          </SettingsLink>
        </Grid>
        <Grid item xs={12} lg>
          <Outlet />
        </Grid>
      </Grid>
    </Page>
  );
}
