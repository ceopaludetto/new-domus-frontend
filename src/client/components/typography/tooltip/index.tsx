import { Tooltip as MuiTooltip, Theme, emphasize } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const Tooltip = withStyles((theme: Theme) => {
  const emphasis = theme.palette.type === "light" ? 0.8 : 0.98;
  const backgroundColor = emphasize(theme.palette.background.default, emphasis);

  return {
    tooltip: {
      backgroundColor,
      color: theme.palette.getContrastText(backgroundColor),
      fontSize: theme.typography.caption.fontSize,
    },
  };
})(MuiTooltip);
