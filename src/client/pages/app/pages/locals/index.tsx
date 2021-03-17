import * as React from "react";
import { MdFilterList, MdAdd } from "react-icons/md";

import { Button, IconButton } from "@material-ui/core";

import { Page, Tooltip, Spacer } from "@/client/components";

export default function Locals() {
  return (
    <Page
      title="Locais"
      subtitle="Geral"
      actions={
        <Spacer flex>
          <Button variant="contained" color="primary" startIcon={<MdAdd />}>
            Novo Local
          </Button>
          <Tooltip title="Filtro">
            <IconButton color="default">
              <MdFilterList />
            </IconButton>
          </Tooltip>
        </Spacer>
      }
      helmetProps={{ title: "Locais" }}
      maxWidth="xl"
    >
      teste
    </Page>
  );
}
