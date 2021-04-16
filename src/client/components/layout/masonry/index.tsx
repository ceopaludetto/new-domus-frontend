import { Children, HTMLAttributes, ReactNode, useMemo } from "react";

import type { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  masonry: {
    columnGap: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      columnCount: 4,
    },
    [theme.breakpoints.between("md", "lg")]: {
      columnCount: 3,
    },
    [theme.breakpoints.between("xs", "md")]: {
      columnCount: 2,
    },
    [theme.breakpoints.down("xs")]: {
      columnCount: 1,
    },
  },
  item: {
    breakInside: "avoid",
    pageBreakInside: "avoid",
    WebkitColumnBreakInside: "avoid",
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

interface MasonryProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Masonry({ children, className, ...rest }: MasonryProps) {
  const classes = useStyles();
  const length = useMemo(() => Children.count(children), [children]);

  return (
    <div className={clsx(classes.masonry)} {...rest}>
      {!!length && Children.map(children, (item) => <div className={classes.item}>{item}</div>)}
    </div>
  );
}
