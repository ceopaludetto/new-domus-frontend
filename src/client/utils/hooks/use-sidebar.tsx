import { createContext, ReactNode, useContext } from "react";
import { useIsomorphicLayoutEffect, useToggle } from "react-use";

import { Theme, useMediaQuery } from "@mui/material";

interface SidebarContextProps {
  open: boolean;
  toggleOpen: (value?: any) => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [open, toggleOpen] = useToggle(false);
  const isUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  useIsomorphicLayoutEffect(() => {
    if (isUp) toggleOpen(false);
  }, [isUp]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <SidebarContext.Provider value={{ open, toggleOpen }}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (!context) throw new Error("useSidebarContext should be used wrapper by SidebarProvider");
  return context;
}
