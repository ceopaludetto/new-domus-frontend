import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { Outlet } from "react-router-dom";

import { Box, Stack, Tab, Tabs, Theme, Typography, useMediaQuery } from "@mui/material";

import { useRouteMatch } from "@/client/utils/hooks";

import { Page } from "../page";
import { PreloadLink } from "../preload-link";
import { SettingsLink } from "../settings-link";

interface SidePageProps {
  title: ReactNode;
  options: { label: ReactNode; description: ReactNode; icon: IconType; to: string }[];
  basePattern: string;
}

export function SidePage({ title, options, basePattern }: SidePageProps) {
  const showTabs = useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));
  const match = useRouteMatch(options.map((option) => basePattern + option.to));
  const value = match?.pattern.path;

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", flexDirection: { xs: "column", lg: "row" }, minHeight: { lg: "100vh" } }}
    >
      <Box sx={{ flex: { lg: 1 } }}>
        <Page
          title={title}
          tabs={
            showTabs ? (
              <Tabs value={value}>
                {options.map(({ label, icon: Icon, to }) => (
                  <Tab
                    key={to}
                    label={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Icon />
                        <Typography>{label}</Typography>
                      </Stack>
                    }
                    component={PreloadLink}
                    value={basePattern + to}
                    to={to}
                  />
                ))}
              </Tabs>
            ) : undefined
          }
        >
          {!showTabs && (
            <Stack sx={{ mx: -2 }} spacing={2}>
              {options.map(({ label, description, icon, to }) => (
                <SettingsLink key={to} title={label} description={description} icon={icon} to={to} />
              ))}
            </Stack>
          )}
        </Page>
      </Box>
      <Box sx={{ flex: { xs: "0 0 100%", lg: 1.4 }, borderLeft: { xs: 0, lg: 1 }, borderColor: { lg: "divider" } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
