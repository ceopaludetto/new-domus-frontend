import type { IconType } from "react-icons";

import { ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText } from "@mui/material";

import { PreloadNavLink, PreloadNavLinkProps } from "../preload-nav-link";

interface SidebarItemProps extends ListItemButtonProps, Pick<PreloadNavLinkProps, "to" | "exact"> {
  icon: IconType;
}

export function SidebarItem({ children, to, icon: Icon, ...rest }: SidebarItemProps) {
  return (
    <ListItemButton
      sx={{
        py: 1.75,
        px: 2.25,
        borderRadius: 1,
        "& + &": {
          mt: 1.5,
        },
        "&, .MuiListItemIcon-root": {
          color: "secondary.main",
          transition: (theme) =>
            theme.transitions.create(["background-color", "color"], {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
        },
        "&.active": {
          backgroundColor: (theme) => `${theme.palette.secondary.main}!important`,
          color: (theme) => `${theme.palette.secondary.contrastText}!important`,
          ".MuiListItemIcon-root": { color: "secondary.contrastText" },
        },
      }}
      activeClassName="active"
      component={PreloadNavLink as any}
      to={to}
      {...rest}
    >
      <ListItemIcon sx={{ minWidth: "auto", mr: 1.5 }}>
        <Icon size={22} />
      </ListItemIcon>
      <ListItemText sx={{ "& .MuiListItemText-primary": { fontWeight: "fontWeightMedium", lineHeight: 1 } }}>
        {children}
      </ListItemText>
    </ListItemButton>
  );
}
