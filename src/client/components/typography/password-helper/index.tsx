import * as React from "react";
import { FiCheckCircle } from "react-icons/fi";

import { Typography, Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface PasswordHelperProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  active: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: { active: boolean }) => ({
    color: props.active ? theme.palette.success.main : theme.palette.text.disabled,
  }),
}));

export function PasswordHelper({ children, active, ...rest }: PasswordHelperProps) {
  const classes = useStyles({ active });

  return (
    <Box display="flex">
      <Box mr={2}>
        <FiCheckCircle className={classes.root} size={20} />
      </Box>
      <Box>
        <Typography className={classes.root} component="span" variant="body2" {...rest}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
