import type { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  image: {
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: theme.zIndex.drawer - 101,
  },
  icon: {
    color: theme.palette.text.primary,
    mixBlendMode: "difference",
  },
}));
