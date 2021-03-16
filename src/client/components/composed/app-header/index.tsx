import * as React from "react";
import { FiLogOut } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";
import { useWindowScroll } from "react-use";

import { IconButton, Grid, Container, Box, Avatar, Hidden, Theme, Divider, fade } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import clsx from "clsx";

import { Spacer } from "@/client/components/layout";
import { PreloadLink, Tooltip } from "@/client/components/typography";
import { useMeQuery, useEvictRefreshCookieMutation } from "@/client/graphql";
import { tokenStore } from "@/client/providers/apollo";

import { Breadcrumbs } from "../breadcrumbs";

const useStyles = makeStyles<Theme, { color?: string }>((theme) => ({
  box: {
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    color: theme.palette.background.default,
  },
  root: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.default,
    borderBottom: "1px solid transparent",
    transition: theme.transitions.create("border-color", {
      delay: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  hasBorder: {
    borderColor: theme.palette.divider,
  },
  avatar: (props) => ({
    backgroundColor: props?.color ?? theme.palette.background.default,
    color: theme.palette.getContrastText(props?.color ?? theme.palette.background.default),
  }),
  divider: {
    backgroundColor: fade(theme.palette.background.default, 0.25),
    margin: theme.spacing(0.75, 0, 0.75, 1.5),
  },
}));

interface AppHeaderProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function AppHeader({ isOpen, onOpen }: AppHeaderProps) {
  const { data, client } = useMeQuery();
  const [evict] = useEvictRefreshCookieMutation();
  const { y } = useWindowScroll();
  const hasBorder = React.useMemo(() => y > 0, [y]);

  const theme = useTheme<Theme>();

  const name = React.useMemo(() => data?.profile.person.name.substring(0, 2), [data]);
  const color = React.useMemo(() => data?.profile.person.color, [data]);

  const classes = useStyles({ color });

  const handleLogout = React.useCallback(async () => {
    await evict();

    client.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "logged",
    });

    client.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "selectedCondominium",
    });

    client.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "profile",
    });

    tokenStore.clear();
  }, [client, evict]);

  return (
    <div id="app-header" className={clsx(classes.root, hasBorder && classes.hasBorder)}>
      <Container maxWidth="xl">
        <Box py={{ xs: 1.25, md: 1.5 }}>
          <Box clone justifyContent={{ xs: "space-between", md: "center" }}>
            <Grid container alignItems="center">
              <Grid item md>
                <Hidden mdUp implementation="css">
                  <Tooltip title={!isOpen ? "Abrir Menu" : "Fechar Menu"}>
                    <IconButton onClick={() => onOpen()}>
                      <MdMenu />
                    </IconButton>
                  </Tooltip>
                </Hidden>
                <Hidden smDown implementation="css">
                  <Breadcrumbs />
                </Hidden>
              </Grid>
              <Grid item xs="auto">
                <Hidden mdUp implementation="css">
                  <Box textAlign="center">
                    <svg
                      width="40"
                      viewBox="0 0 116 100"
                      fill={theme.palette.secondary.main}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
                    </svg>
                  </Box>
                </Hidden>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <Spacer flex>
                    <Hidden smDown implementation="css">
                      <Tooltip title="Configurações">
                        <IconButton component={PreloadLink} to="/app/settings">
                          <RiSettings2Line />
                        </IconButton>
                      </Tooltip>
                    </Hidden>
                    <Box className={classes.box} p={0.75} borderRadius={30} display="flex" alignItems="center">
                      <Spacer flex>
                        <Avatar classes={{ root: classes.avatar }}>{name}</Avatar>
                        <Divider orientation="vertical" flexItem className={classes.divider} />
                        <Tooltip title="Sair">
                          <IconButton className={classes.text} onClick={handleLogout}>
                            <FiLogOut />
                          </IconButton>
                        </Tooltip>
                      </Spacer>
                    </Box>
                  </Spacer>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
