import { Tooltip as MuiTooltip, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const Tooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: theme.typography.caption.fontSize,
  },
}))(MuiTooltip);
