import * as React from "react";

import { StepIconProps as MuiStepIconProps, StepConnector as MuiStepConnector, Theme } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.disabled,
  },
  active: {
    color: theme.palette.primary.main,
  },
}));

type StepIconProps = Omit<MuiStepIconProps, "icon"> & { icon: React.FC<{ size?: number; className?: string }> };

export function StepIcon({ active, completed, icon: Icon }: StepIconProps) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active || completed,
      })}
    >
      <Icon size={20} />
    </div>
  );
}

export const StepConnector = withStyles((theme: Theme) => ({
  completed: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  active: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  line: {
    borderColor: theme.palette.text.disabled,
    borderTopWidth: 2,
    borderRadius: 1,
  },
}))(MuiStepConnector);
