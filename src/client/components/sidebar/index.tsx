import { Fragment, useCallback } from "react";

import { Drawer, List, Box } from "@mui/material";

import { sidebarRoutes } from "@/client/routes/sidebar";
import { findRouteByName } from "@/client/utils/route";

import { SidebarItem } from "../sidebar-item";
import { SidebarUser } from "../sidebar-user";

export function Sidebar() {
  const handleItems = useCallback(
    () => (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List sx={{ py: 0 }} component="nav">
          {sidebarRoutes.map((route) => {
            const configuration = findRouteByName(route.route);
            if (!configuration) return <Fragment key={route.route} />;

            return (
              <SidebarItem key={configuration.name} icon={route.icon} end={route.end} to={route.path ?? "/application"}>
                {route.displayName}
              </SidebarItem>
            );
          })}
        </List>
        <Box sx={{ flex: 1 }} />
        <Box>
          <SidebarUser />
        </Box>
      </Box>
    ),
    []
  );

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          width: "80%",
          maxWidth: 350,
          border: 0,
          p: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {handleItems()}
    </Drawer>
  );
}
