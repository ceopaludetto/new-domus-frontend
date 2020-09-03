import * as React from "react";
import { MdFilterList } from "react-icons/md";

import clsx from "clsx";

import { Page, Button, IconButton } from "@/client/components";
import u from "@/client/styles/utils.scss";

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
            <IconButton color="text" size="small">
              <MdFilterList />
            </IconButton>
          </div>
        </div>
      }
      fluid
    >
      teste
    </Page>
  );
}
