import * as React from "react";
import { MdAdd } from "react-icons/md";

import { Button } from "@material-ui/core";

import { Page, PreloadLink } from "@/client/components";

export default function BlockList() {
  return (
    <Page
      title="Blocos e Apartamentos"
      subtitle="Geral"
      actions={
        <Button
          component={PreloadLink}
          to="/app/blocks/create"
          color="primary"
          variant="contained"
          startIcon={<MdAdd />}
        >
          Novo Bloco
        </Button>
      }
      helmetProps={{ title: "Blocos e Apartamentos" }}
      maxWidth="xl"
    >
      list
    </Page>
  );
}
