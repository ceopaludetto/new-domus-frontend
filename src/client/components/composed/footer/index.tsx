import * as React from "react";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";

import { Typography, Paper, Link, Container, IconButton, Box, Grid } from "@material-ui/core";

import { PreloadLink } from "@/client/components/typography";
import { routes } from "@/client/providers/routes";
import type { Route } from "@/client/utils/common.dto";
import { retrieveTo } from "@/client/utils/string";

export function Footer() {
  const { current } = React.useRef(routes.find((r: Route) => r.name === "@MAIN"));
  const { current: company } = React.useRef(current?.children?.filter((r: Route) => r.meta?.type === "company"));
  const { current: resource } = React.useRef(current?.children?.filter((r: Route) => r.meta?.type === "resource"));
  const { current: legal } = React.useRef(current?.children?.filter((r: Route) => r.meta?.type === "legal"));

  return (
    <footer>
      <Box clone borderLeft="0" borderRight="0" borderBottom="0">
        <Paper variant="outlined" square>
          <Box py={4}>
            <Container>
              <Grid container>
                <Grid item xs={12} md>
                  <Box mb={2}>
                    <Typography color="primary" gutterBottom variant="subtitle2">
                      Recursos
                    </Typography>
                  </Box>
                  {resource?.map((r) => (
                    <Box key={r.name} mb={1}>
                      <Link component={PreloadLink} to={retrieveTo(r.path)} color="textPrimary">
                        {r.meta?.displayName}
                      </Link>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12} md>
                  <Box mb={2}>
                    <Typography color="primary" gutterBottom variant="subtitle2">
                      Companhia
                    </Typography>
                  </Box>
                  {company?.map((r) => (
                    <Box key={r.name} mb={1}>
                      <Link component={PreloadLink} to={retrieveTo(r.path)} color="textPrimary">
                        {r.meta?.displayName}
                      </Link>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12} md>
                  <Box mb={2}>
                    <Typography color="primary" gutterBottom variant="subtitle2">
                      Legal
                    </Typography>
                  </Box>
                  {legal?.map((r) => (
                    <Box key={r.name} mb={1}>
                      <Link component={PreloadLink} to={retrieveTo(r.path)} color="textPrimary">
                        {r.meta?.displayName}
                      </Link>
                    </Box>
                  ))}
                </Grid>
              </Grid>
              <Box mt={4} textAlign={{ xs: "center", md: "left" }}>
                <svg width="40" viewBox="0 0 116 100" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
                </svg>
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Box flex={{ xs: "0 0 100%", md: "1" }} mt={1} mb={3} textAlign={{ xs: "center", md: "left" }}>
                  <Typography variant="body2">Copyright © 2020 Domus Inc. Todos direitos reservados.</Typography>
                </Box>
                <Box>
                  <IconButton color="primary">
                    <AiOutlineGithub />
                  </IconButton>{" "}
                  <IconButton color="primary">
                    <AiOutlineTwitter />
                  </IconButton>
                </Box>
              </Box>
            </Container>
          </Box>
        </Paper>
      </Box>
    </footer>
  );
}
