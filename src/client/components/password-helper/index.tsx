import type { HTMLAttributes } from "react";
import { FiCheckCircle } from "react-icons/fi";

import { Typography, Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface PasswordHelperProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  active: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: { active: boolean }) => ({
    color: props.active ? theme.palette.success.main : theme.palette.text.secondary,
  }),
}));

export function PasswordHelper({ children, active, ...rest }: PasswordHelperProps) {
  const classes = useStyles({ active });

  return (
    <Box display="flex" alignItems="center" mb={0.75}>
      <Box mr={2} display="inline-flex">
        <FiCheckCircle className={classes.root} size={20} />
      </Box>
      <Box>
        <Typography className={classes.root} component="span" variant="body1" {...rest}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
