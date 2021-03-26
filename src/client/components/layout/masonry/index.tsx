import { Children, useMemo } from "react";

import type { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  masonry: {
    columnGap: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      columnCount: 5,
    },
    [theme.breakpoints.between("md", "lg")]: {
      columnCount: 4,
    },
    [theme.breakpoints.between("xs", "md")]: {
      columnCount: 3,
    },
    [theme.breakpoints.down("xs")]: {
      columnCount: 2,
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

interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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
