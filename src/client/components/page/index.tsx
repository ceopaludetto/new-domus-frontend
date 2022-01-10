import { ReactNode, useMemo, useRef } from "react";

import { Box, Container, SxProps, useScrollTrigger } from "@mui/material";

import { Header } from "../header";

interface PageProps {
  title: string;
  children: ReactNode;
  tabs?: ReactNode;
  nested?: ReactNode;
  contentSx?: SxProps;
  nestedSx?: SxProps;
  actions?: {
    remove?: boolean;
    leading?: ReactNode;
    trailing?: ReactNode;
  };
}

export function Page({ title, children, tabs, actions, nested, nestedSx, contentSx }: PageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const slide = useScrollTrigger({ disableHysteresis: true });

  const top = useMemo(() => {
    if (!tabs) return 0;

    const height = ref.current?.offsetHeight ?? 0;
    return slide ? -height : 0;
  }, [tabs, slide, ref]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>
      <Box sx={{ flex: 1, ...contentSx }}>
        <Box
          sx={{
            backdropFilter: "blur(12px) saturate(120%)",
            position: "sticky",
            mb: 3,
            top,
            zIndex: (theme) => theme.zIndex.appBar,
            transition: (theme) =>
              theme.transitions.create(["top"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.short,
              }),
          }}
        >
          <Header
            ref={ref}
            title={title}
            haveTabs={!!tabs}
            leadingActions={actions?.leading}
            trailingActions={actions?.trailing}
            removeActions={actions?.remove}
          />
          {tabs && <Box sx={{ px: 3, pt: 1, mx: -2 }}>{tabs}</Box>}
        </Box>
        <Container sx={{ px: (theme) => `${theme.spacing(4)}!important` }} maxWidth={false}>
          {children}
        </Container>
      </Box>
      {nested && <Box sx={{ flex: 1, borderLeft: 1, borderColor: "divider", ...nestedSx }}>{nested}</Box>}
    </Box>
  );
}
