import * as React from "react";

import { Paper, Radio, RadioProps, Box, FormControlLabel, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface RadioCardProps extends Omit<RadioProps, "type" | "onChange"> {
  label?: string;
  error?: boolean;
  helperText?: React.ReactNode | string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    width: "100%",
    marginRight: 0,
  },
  paper: {
    transition: theme.transitions.create(["border-color"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export function RadioCard({ error, name, helperText, value, id, label, ...rest }: RadioCardProps) {
  const classes = useStyles();

  return (
    <Box clone overflow="hidden">
      <Paper className={classes.paper} variant="outlined">
        <Box width="100%" justifyContent="flex-start">
          <FormControlLabel
            classes={{ root: classes.root }}
            control={<Radio color="primary" id={id} value={value} {...rest} />}
            label={label}
            labelPlacement="end"
          />
        </Box>
      </Paper>
    </Box>
  );
}
