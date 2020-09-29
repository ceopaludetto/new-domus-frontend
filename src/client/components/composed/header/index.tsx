import * as React from "react";

import { Button, Box, Container } from "@material-ui/core";

import { useLoggedQuery } from "@/client/graphql";

import { Blurred } from "../../layout";
import { PreloadLink } from "../../typography/preload-link";

export function Header() {
  const { data } = useLoggedQuery();

  return (
    <Box position="fixed" width="100%">
      <Blurred border>
        <Container>
          <Box display="flex" alignItems="center" py={2}>
            <Box flex="1">
              <svg width="40" viewBox="0 0 116 100" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
              </svg>
            </Box>
            <Box>
              {data?.logged ? (
                <Button component={PreloadLink} color="primary" variant="text" size="small" to="/app/:condominium">
                  Abrir
                </Button>
              ) : (
                <>
                  <Button component={PreloadLink} color="primary" variant="text" size="small" to="/auth/signin">
                    Entrar
                  </Button>{" "}
                  <Button
                    component={PreloadLink}
                    color="primary"
                    variant="contained"
                    size="small"
                    to="/auth/signup/step-1"
                  >
                    Cadastre-se
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Blurred>
    </Box>
  );
}
