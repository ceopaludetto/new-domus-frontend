import { Tooltip as MuiTooltip, tooltipClasses, styled } from "@mui/material";

export const Tooltip = styled<typeof MuiTooltip>(({ className, ...props }) => (
  <MuiTooltip {...props} classes={{ popper: className, ...props.classes }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
  },
}));
