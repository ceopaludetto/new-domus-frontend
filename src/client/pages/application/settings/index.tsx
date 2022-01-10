import { BiBuildings } from "react-icons/bi";
import { FiUser, FiLock } from "react-icons/fi";
import { Outlet } from "react-router-dom";

import { Stack } from "@mui/material";

import { Page, SettingsLink } from "@/client/components";

export default function ApplicationSettings() {
  return (
    <Page title="Ajustes" nested={<Outlet />} contentSx={{ flex: 1 }} nestedSx={{ flex: 1.4 }}>
      <Stack sx={{ mx: -2 }} spacing={2}>
        <SettingsLink to="" title="Conta" description="Informações pessoais, área de risco." icon={FiUser} />
        <SettingsLink to="security" title="Segurança" description="Senha, 2FA." icon={FiLock} />
        <SettingsLink
          to="condominium"
          title="Condomínio"
          description="Informações de condomínio, caractere especial."
          icon={BiBuildings}
        />
      </Stack>
    </Page>
  );
}
