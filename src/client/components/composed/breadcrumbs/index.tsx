import { useMemo } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import { Breadcrumbs as MaterialBreadcrumbs, Link, Typography, Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { PreloadLink } from "@/client/components";
import { removeDuplicate, findRoute } from "@/client/utils/preload";
import { retrieveTo } from "@/client/utils/string";

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    color: theme.palette.background.default,
  },
  link: {
    color: theme.palette.background.paper,
  },
}));

export function Breadcrumbs() {
  const location = useLocation();
  const classes = useStyles();

  const crumbs = useMemo(() => removeDuplicate(findRoute(location.pathname)), [location]);

  return (
    <Box display="inline-block" py={0.75} px={2} borderRadius={20} className={classes.box}>
      <MaterialBreadcrumbs separator={<FiChevronRight className={classes.link} size={18} />}>
        {crumbs.map((b, i) =>
          crumbs.length - 1 === i ? (
            <Typography key={b.name} className={classes.text}>
              {b.meta?.displayName}
            </Typography>
          ) : (
            <Link component={PreloadLink} className={classes.link} key={b.name} color="inherit" to={retrieveTo(b.path)}>
              {b.meta?.displayName}
            </Link>
          )
        )}
      </MaterialBreadcrumbs>
    </Box>
  );
}
