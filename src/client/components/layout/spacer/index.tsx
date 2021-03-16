import * as React from "react";

import { Theme, Box, BoxProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

interface SpacerProps extends BoxProps {
  vertical?: number;
  horizontal?: number;
  flex?: boolean;
}

const useStyles = makeStyles<Theme, SpacerProps>((theme) => ({
  vertical: {
    "& > * + *": {
      marginTop: (props) => theme.spacing(props?.vertical ?? 0),
    },
  },
  horizontal: {
    "& > * + *": {
      marginLeft: (props) => theme.spacing(props?.horizontal ?? 0),
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
}));

export function Spacer({ children, vertical, horizontal = 1, flex, ...rest }: SpacerProps) {
  const classes = useStyles({ vertical, horizontal });

  return (
    <Box
      className={clsx(!!vertical && classes.vertical, !!horizontal && classes.horizontal, flex && classes.flex)}
      {...rest}
    >
      {children}
    </Box>
  );
}
