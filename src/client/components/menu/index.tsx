import type { IconType } from "react-icons";

import {
  ListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
  MenuProps,
} from "@mui/material";

export function Menu({ children, PaperProps, ...rest }: MenuProps) {
  return (
    <MuiMenu elevation={1} PaperProps={{ ...PaperProps, sx: { px: 1, width: 280, ...PaperProps?.sx } }} {...rest}>
      {children}
    </MuiMenu>
  );
}

interface MenuItemProps extends MuiMenuItemProps {
  icon?: IconType;
  color?: string;
}

function MenuItem({ children, sx, icon: Icon, color = "secondary.main", ...rest }: MenuItemProps) {
  return (
    <MuiMenuItem
      sx={{
        borderRadius: 1,
        px: 1,
        py: 1,
        color,
        "& + &": { mt: 0.5 },
        ...sx,
      }}
      {...rest}
    >
      {Icon && (
        <ListItemIcon sx={{ color, minWidth: "auto!important", mr: 1.5 }}>
          <Icon size={18} />
        </ListItemIcon>
      )}
      <ListItemText
        sx={{
          "& .MuiListItemText-primary": {
            color,
            fontSize: "body1.fontSize",
          },
        }}
      >
        {children}
      </ListItemText>
    </MuiMenuItem>
  );
}

Menu.Item = MenuItem;
