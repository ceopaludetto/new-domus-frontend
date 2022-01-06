import type { ReactNode } from "react";
import type { IconType } from "react-icons";

import { Stack, Typography } from "@mui/material";

interface TabLabelProps {
  children: ReactNode;
  icon: IconType;
}

export function TabLabel({ children, icon: Icon }: TabLabelProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Icon size={18} />
      <Typography>{children}</Typography>
    </Stack>
  );
}
