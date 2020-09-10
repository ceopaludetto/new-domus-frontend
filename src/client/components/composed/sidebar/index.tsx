import * as React from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  Theme,
  IconButton,
  Typography,
  NoSsr,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Blurred } from "@/client/components/layout";
import { PreloadNavLink, Tooltip } from "@/client/components/typography";
import { Me, MeQuery, SelectedCondominium, SelectedCondominiumQuery } from "@/client/graphql";
import { usePathWithCondominium } from "@/client/hooks";
import type { RouteComponentProps } from "@/client/utils/common.dto";
import { isMultiCondominium } from "@/client/utils/condominium";
import { retrieveTo } from "@/client/utils/string";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up("md")]: {
      position: "fixed",
      left: 0,
      top: 0,
    },
    width: "100%",
    maxWidth: "300px",
    borderTop: 0,
    borderLeft: 0,
    borderBottom: 0,
  },
  sidebar: {
    flexDirection: "column",
    height: "100vh",
    display: "flex",
  },
  active: {
    color: theme.palette.primary.main,
    "& svg": {
      color: theme.palette.primary.main,
    },
  },
  condominiums: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(["max-height"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },
}));

export function Sidebar({ routes }: Pick<RouteComponentProps, "routes">) {
  const [listOpen, setListOpen] = React.useState(false);
  const { data, client } = useQuery<MeQuery>(Me);
  const history = useHistory();
  const params = useParams();
  const multiCondominiums = React.useMemo(() => isMultiCondominium(data?.profile.person.condominiums), [data]);
  const [generatePath, condominium] = usePathWithCondominium();
  const classes = useStyles();

  const changeSelectedCondominium = React.useCallback(
    (id: string) => {
      client.cache.writeQuery<SelectedCondominiumQuery>({
        query: SelectedCondominium,
        data: {
          __typename: "Query",
          selectedCondominium: id,
        },
      });
    },
    [client]
  );

  const handleCondominiumChange = React.useCallback(
    (id: string) => {
      if (condominium?.id !== id) {
        changeSelectedCondominium(id);
      }
      setListOpen((v) => !v);
    },
    [condominium, setListOpen, changeSelectedCondominium]
  );

  React.useEffect(() => {
    if (condominium && (params as any).condominium !== condominium.id) {
      const path = generatePath("/app/:condominium");
      history.replace(path);
    }
  }, [condominium, generatePath, params, history]);

  return (
    <Paper className={classes.container} square variant="outlined">
      <Blurred className={classes.sidebar}>
        <Box flex="1">
          <List component="nav">
            {routes
              ?.filter((r) => !r.meta?.hidden ?? true)
              ?.map((r) => {
                const Icon = r.meta?.icon;
                const path = retrieveTo(r.path);

                return (
                  <ListItem
                    key={r.name}
                    button
                    component={PreloadNavLink}
                    activeClassName={classes.active}
                    exact
                    to={path}
                  >
                    <ListItemIcon>
                      <Icon size={18} />
                    </ListItemIcon>
                    <ListItemText primary={r.meta?.displayName} />
                  </ListItem>
                );
              })}
          </List>
        </Box>
        <Box display="flex" alignItems="center" className={classes.condominiums}>
          {multiCondominiums ? (
            <>
              <Box flex="1">
                <Typography component="span" variant="body1">
                  {listOpen ? "Selecione um condomínio" : condominium?.companyName}
                </Typography>
              </Box>
              <Box>
                <Tooltip title={listOpen ? "Fechar" : "Alterar condomínio"}>
                  <IconButton color="primary" onClick={() => setListOpen((v) => !v)}>
                    {listOpen ? <FiX /> : <AiOutlineSwap />}
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <Typography component="span" variant="body1">
              {condominium?.companyName}
            </Typography>
          )}
        </Box>
        {multiCondominiums && (
          <NoSsr>
            <Collapse in={listOpen}>
              <div className={classes.list}>
                <List>
                  {data?.profile.person.condominiums.map((c) => (
                    <ListItem button onClick={() => handleCondominiumChange(c.id)} key={c.id}>
                      <ListItemText
                        primaryTypographyProps={{ color: condominium?.id === c.id ? "primary" : "textPrimary" }}
                        primary={c.companyName}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Collapse>
          </NoSsr>
        )}
      </Blurred>
    </Paper>
  );
}
