import { useMemo } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import { Box, Breadcrumbs as MaterialBreadcrumbs, Link, Typography } from "@material-ui/core";

import { findRoute, removeDuplicate } from "@/client/utils/routes";
import { retrieveTo } from "@/client/utils/string";

import { PreloadLink } from "../preload-link";
import { useStyles } from "./styles";

export function BreadCrumbs() {
  const classes = useStyles();
  const location = useLocation();
  const crumbs = useMemo(() => removeDuplicate(findRoute(location.pathname)), [location.pathname]);

  return (
    <Box display="flex">
      <MaterialBreadcrumbs
        className={classes.root}
        separator={<FiChevronRight className={classes.current} size={18} />}
      >
        {crumbs.map((b, i) =>
          crumbs.length - 1 === i ? (
            <Typography className={classes.current} key={b.name}>
              {b.meta?.title}
            </Typography>
          ) : (
            <Link component={PreloadLink} className={classes.link} key={b.name} color="inherit" to={retrieveTo(b.path)}>
              {b.meta?.title}
            </Link>
          )
        )}
      </MaterialBreadcrumbs>
    </Box>
  );
}
