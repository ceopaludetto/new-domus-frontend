import { useCallback } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { ButtonBase, Typography, Box, Avatar } from "@mui/material";
import { usePopupState, bindMenu, bindTrigger } from "material-ui-popup-state/hooks";

import { ProfileDocument, useEvictRefreshMutation, useProfileQuery } from "@/client/graphql";
import { accessTokenStorage } from "@/client/providers/storage";
import { useSelectedCondominium } from "@/client/utils/hooks";

import { Menu } from "../menu";

export function SidebarUser() {
  const [evict] = useEvictRefreshMutation({ refetchQueries: [ProfileDocument] });
  const { data } = useProfileQuery();
  const [selectedCondominium] = useSelectedCondominium();

  const navigate = useNavigate();
  const profileState = usePopupState({ variant: "popover", popupId: "profile-menu" });

  const handleLogout = useCallback(async () => {
    accessTokenStorage(null);
    await evict();

    navigate("/");
  }, [evict, navigate]);

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
        <Menu.Item sx={{ borderRadius: 1 }} icon={FiUser}>
          Perfil
        </Menu.Item>
        <Menu.Item onClick={handleLogout} icon={FiLogOut}>
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
