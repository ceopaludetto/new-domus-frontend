import { useCallback } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { ButtonBase, Typography, Box, Avatar, Divider } from "@mui/material";
import { usePopupState, bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import { useClient } from "urql";

import { ProfileDocument, useEvictRefreshMutation, useProfileQuery } from "@/client/graphql";
import { accessTokenStorage } from "@/client/providers/storage";
import { useSelectedCondominium } from "@/client/utils/hooks";

import { Menu } from "../menu";

export function SidebarUser() {
  const client = useClient();
  const [, evict] = useEvictRefreshMutation();
  const [{ data }] = useProfileQuery();
  const [selectedCondominium, { hasMultiple, changeCondominium }] = useSelectedCondominium();

  const navigate = useNavigate();
  const profileState = usePopupState({ variant: "popover", popupId: "profile-menu" });

  const handleLogout = useCallback(async () => {
    accessTokenStorage.del();
    await evict();
    await client.query(ProfileDocument).toPromise();

    navigate("/");
  }, [evict, navigate, client]);

  return (
    <>
      <Menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        {...bindMenu(profileState)}
      >
        {hasMultiple && (
          <Box>
            <Typography variant="overline" color="textSecondary" sx={{ px: 1, mb: 2 }}>
              Meus Condomínios
            </Typography>
            {data?.profile.person.condominiums.map((condominium) => (
              <Menu.Item
                onClick={() => changeCondominium(condominium.id)}
                color={condominium.id === selectedCondominium?.id ? "primary.main" : "secondary.main"}
                key={condominium.id}
              >
                {condominium.name}
              </Menu.Item>
            ))}
            <Box my={1} px={1}>
              <Divider />
            </Box>
          </Box>
        )}
        <Menu.Item sx={{ borderRadius: 1 }} icon={FiUser}>
          Perfil
        </Menu.Item>
        <Menu.Item color="error.main" onClick={handleLogout} icon={FiLogOut}>
          Sair
        </Menu.Item>
      </Menu>
      <ButtonBase
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1.75,
          px: 2.25,
          textAlign: "left",
          borderRadius: 1,
          color: "secondary.main",
          width: "100%",
          justifyContent: "flex-start",
        }}
        {...bindTrigger(profileState)}
      >
        <Avatar />
        <Box sx={{ ml: 1.5 }}>
          <Typography color="secondary.main" sx={{ fontWeight: "fontWeightMedium" }}>
            {data?.profile.person.fullName}
          </Typography>
          <Typography color="textSecondary">{selectedCondominium?.name}</Typography>
        </Box>
      </ButtonBase>
    </>
  );
}
