import * as React from "react";
import { FiSettings, FiChevronRight, FiLogOut, FiUser } from "react-icons/fi";

import { useQuery, useMutation } from "@apollo/client";
import {
  IconButton,
  Breadcrumbs,
  Link,
  Typography,
  Grid,
  Container,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

import { PreloadLink, Tooltip } from "@/client/components/typography";
import { Me, MeQuery, EvictRefreshCookie, EvictRefreshCookieMutation } from "@/client/graphql";
import { useBreadcrumbs } from "@/client/hooks";
import { tokenStore } from "@/client/providers/apollo";
import { retrieveTo } from "@/client/utils/string";

export function AppHeader() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
  const breadcrumbs = useBreadcrumbs();
  const { data, client } = useQuery<MeQuery>(Me);
  const [evict] = useMutation<EvictRefreshCookieMutation>(EvictRefreshCookie);
  const name = React.useMemo(() => data?.profile.person.name.substring(0, 2), [data]);

  const handleLogout = React.useCallback(async () => {
    await evict();

    client.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "logged",
    });

    tokenStore.token = "";
  }, [client, evict]);

  return (
    <Container maxWidth="xl">
      <Box py={1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Breadcrumbs separator={<FiChevronRight size={18} />}>
              {breadcrumbs.map((b, i) =>
                breadcrumbs.length - 1 === i ? (
                  <Typography key={b.name} color="textPrimary">
                    {b.meta?.displayName}
                  </Typography>
                ) : (
                  <Link component={PreloadLink} key={b.name} color="inherit" to={retrieveTo(b.path)}>
                    {b.meta?.displayName}
                  </Link>
                )
              )}
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <Tooltip title="Configurações">
                <IconButton component={PreloadLink} to="/app/:condominium/settings">
                  <FiSettings size={20} />
                </IconButton>
              </Tooltip>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar>{name}</Avatar>
              </IconButton>
              <Menu
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(undefined)}
              >
                <MenuItem>
                  <ListItemIcon>
                    <FiUser />
                  </ListItemIcon>
                  <ListItemText primary="Perfil" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <FiLogOut />
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
