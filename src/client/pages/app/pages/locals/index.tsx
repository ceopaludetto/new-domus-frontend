import * as React from "react";
import { FiFilter } from "react-icons/fi";

import { Button, IconButton, Box } from "@material-ui/core";

import { Page } from "@/client/components";

export default function Locals() {
  return (
    <Page
      title="Locais"
      subtitle="Geral"
      actions={
        <Box display="flex" alignItems="center">
          <Box pr={2}>
            <Button variant="contained" color="primary">
              Novo Local
            </Button>
          </Box>
          <Box>
            <IconButton color="default">
              <FiFilter />
            </IconButton>
          </Box>
        </Box>
      }
      helmet={{ title: "Locais" }}
      maxWidth="xl"
    >
      teste
    </Page>
  );
}
