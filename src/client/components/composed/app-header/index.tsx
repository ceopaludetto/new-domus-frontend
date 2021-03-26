import { useCallback, useMemo } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";
import { useWindowScroll } from "react-use";

import { IconButton, Grid, Container, Box, Avatar, Hidden, Theme, Divider, fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { Logo } from "@/client/assets/logo";
import { Spacer } from "@/client/components/layout";
import { PreloadLink, Tooltip } from "@/client/components/typography";
import { useMeQuery, useEvictRefreshCookieMutation } from "@/client/graphql/index.graphql";
import { usePreload } from "@/client/hooks";
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
  firstItem: {
    marginRight: "auto!important",
  },
  lastItem: {
    marginLeft: "auto!important",
  },
}));

interface AppHeaderProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function AppHeader({ isOpen, onOpen }: AppHeaderProps) {
  const { data, client } = useMeQuery();
  const [evict] = useEvictRefreshCookieMutation();
  const { handlePreload } = usePreload();

  const { y } = useWindowScroll();
  const hasBorder = useMemo(() => y > 0, [y]);

  const name = useMemo(() => data?.profile.person.name.substring(0, 2), [data]);
  const color = useMemo(() => data?.profile.person.color, [data]);

  const classes = useStyles({ color });

  const handleLogout = useCallback(async () => {
    await handlePreload("/auth/signin");
    await evict();

    await client.resetStore();

    tokenStore.clear();
  }, [client, evict, handlePreload]);

  return (
    <div id="app-header" className={clsx(classes.root, hasBorder && classes.hasBorder)}>
      <Container maxWidth="xl">
        <Box py={{ xs: 1.25, md: 1.5 }}>
          <Box clone justifyContent="center">
            <Grid container alignItems="center">
              <Grid item xs md className={classes.firstItem}>
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
              <Grid item xs md="auto">
                <Hidden mdUp implementation="css">
                  <Box textAlign="center">
                    <Logo height={35} />
                  </Box>
                </Hidden>
              </Grid>
              <Grid item xs md="auto" className={classes.lastItem}>
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                  <Spacer flex>
                    <Tooltip title="Configurações">
                      <IconButton color="secondary" component={PreloadLink} to="/app/settings">
                        <RiSettings2Line />
                      </IconButton>
                    </Tooltip>
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
