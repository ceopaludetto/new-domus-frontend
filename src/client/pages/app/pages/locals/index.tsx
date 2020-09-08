import * as React from "react";
import { FiFilter } from "react-icons/fi";

import clsx from "clsx";

import { Page, Button, IconButton } from "@/client/components";
import u from "@/client/styles/utils.module.scss";

export default function Locals() {
  return (
    <Page
      title="Locais"
      subtitle="Geral"
      actions={
        <div className={clsx(u.row, u["align-items-xs-center"])}>
          <div className={u.col}>
            <Button>Novo Local</Button>
          </div>
          <div className={u.col}>
            <IconButton tooltip={{ content: "Filtro" }} color="text" size="small">
              <FiFilter />
            </IconButton>
          </div>
        </div>
      }
      helmet={{ title: "Locais" }}
      fluid
    >
      teste
    </Page>
  );
}
