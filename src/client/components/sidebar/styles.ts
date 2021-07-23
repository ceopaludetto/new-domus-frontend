import { fade, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 300,
  },
  listItem: {
    color: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5, 2),
    alignItems: "center",
    "&$active": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      "& svg": {
        color: theme.palette.primary.main,
      },
    },
    "& + $listItem": {
      marginTop: theme.spacing(1),
    },
  },
  listItemIcon: {
    paddingRight: theme.spacing(1.3),
    minWidth: "0",
    "& svg": {
      color: theme.palette.secondary.main,
    },
  },
  listItemText: {
    margin: 0,
  },
  listItemTextPrimary: {
    lineHeight: 0.9,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(18),
  },
  active: {},
}));
