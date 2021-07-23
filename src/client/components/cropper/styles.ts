import type { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  cropContainer: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
  },
  cropArea: {
    boxShadow: `0 0 0 9999em ${
      theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.3)"
    }!important`,
  },
}));
