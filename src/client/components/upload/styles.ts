import type { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    cursor: "pointer",
    width: "100%",
    backgroundColor: theme.palette.type === "light" ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.09)",
    overflow: "hidden",
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    "&:hover, &$active": {
      backgroundColor: theme.palette.type === "light" ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)",
      "& $icon": {
        color: theme.palette.primary.main,
      },
      "&::before": {
        borderColor: theme.palette.primary.main,
      },
    },
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      bottom: 0,
      left: 0,
      borderBottom: `2px dashed ${theme.palette.divider}`,
      transition: theme.transitions.create(["border-color"], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
  },
  titleRoot: {
    minWidth: 0,
  },
  title: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  active: {
    cursor: "drop",
  },
  image: {
    borderRadius: theme.shape.borderRadius,
  },
  file: {
    backgroundColor: theme.palette.type === "light" ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.09)",
  },
  paper: {
    border: `1px solid ${theme.palette.divider}`,
  },
  icon: {
    transition: theme.transitions.create(["color"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));
