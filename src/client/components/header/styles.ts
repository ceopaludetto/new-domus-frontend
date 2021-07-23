import { fade, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: fade(theme.palette.background.default, theme.palette.type === "dark" ? 0.3 : 0.5),
    zIndex: theme.zIndex.appBar,
  },
}));
